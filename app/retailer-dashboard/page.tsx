"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import type { RetailerDashboardProductResponseDto } from "@/generated/aleph-be";
import {
  aggregatePool,
  commitRetailerOrderWithAutoVerify,
  createPurchasePool,
  getRetailerDashboardProducts,
  getStoredAccessToken,
  getStoredRetailerId,
  loadWorkflowPoolState,
  saveWorkflowPoolState,
  tokenizeAggregatedOrder,
  WORKFLOW_POOL_STORAGE_KEY,
  type WorkflowParticipant,
  type WorkflowPoolState,
} from "@/lib/aleph-rwa";

const SIMULATED_RETAILERS = [
  "merchant-201",
  "merchant-309",
  "merchant-441",
  "merchant-512",
  "merchant-690",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 10 ? 2 : 0,
  }).format(value);
}

function getPoolProgress(pool: WorkflowPoolState | null) {
  if (!pool) {
    return 0;
  }

  return Math.min(
    100,
    Math.round((pool.pledgedQuantity / pool.threshold) * 100),
  );
}

function getStageLabel(pool: WorkflowPoolState | null) {
  if (!pool) {
    return "No active pool";
  }

  if (pool.stage === "tokenized") {
    return "Tokenized and allocated";
  }

  if (pool.stage === "threshold_reached") {
    return "Threshold reached. Ready for supplier dispatch";
  }

  return "Open for retailer applications";
}

function RetailerDashboardContent() {
  const searchParams = useSearchParams();
  const skuFromQuery = searchParams.get("sku");

  const [products, setProducts] = useState<
    RetailerDashboardProductResponseDto[]
  >([]);
  const [selectedSku, setSelectedSku] = useState<string>("");
  const [desiredQuantity, setDesiredQuantity] = useState<number>(0);
  const [poolState, setPoolState] = useState<WorkflowPoolState | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const selectedProduct = useMemo(
    () => products.find((product) => product.sku === selectedSku) ?? null,
    [products, selectedSku],
  );

  const poolProgress = useMemo(() => getPoolProgress(poolState), [poolState]);

  useEffect(() => {
    async function loadProducts() {
      setLoadingProducts(true);
      const accessToken = getStoredAccessToken();
      const fetchedProducts = await getRetailerDashboardProducts(accessToken);
      setProducts(fetchedProducts);

      const existingPool = loadWorkflowPoolState();
      if (existingPool) {
        setPoolState(existingPool);
        setSelectedSku(existingPool.sku);
        const matched = fetchedProducts.find(
          (product) => product.sku === existingPool.sku,
        );
        setDesiredQuantity(matched?.minimumOrderQuantity ?? 0);
      } else if (skuFromQuery) {
        setSelectedSku(skuFromQuery);
        const matched = fetchedProducts.find(
          (product) => product.sku === skuFromQuery,
        );
        setDesiredQuantity(matched?.minimumOrderQuantity ?? 0);
      } else {
        const firstSku = fetchedProducts[0]?.sku ?? "";
        if (firstSku) {
          setSelectedSku(firstSku);
          setDesiredQuantity(fetchedProducts[0]?.minimumOrderQuantity ?? 0);
        }
      }

      setLoadingProducts(false);
    }

    void loadProducts();
  }, [skuFromQuery]);

  async function handleCreatePool() {
    if (!selectedProduct) {
      return;
    }

    setActionLoading(true);
    setStatusMessage("");

    const accessToken = getStoredAccessToken();
    if (!accessToken) {
      setActionLoading(false);
      setStatusMessage(
        "Missing bearer token. Please log in again before creating a pool.",
      );
      return;
    }

    const retailerId = getStoredRetailerId();
    const minimumThreshold = selectedProduct.minimumOrderQuantity * 10;
    const initialQuantity = Math.max(
      selectedProduct.minimumOrderQuantity,
      desiredQuantity,
    );

    const poolName = `${selectedProduct.name} - Retailer Pool`;
    let poolId = `pool-local-${Date.now()}`;

    try {
      const createdPool = await createPurchasePool(
        {
          name: poolName,
          allowedMerchants: [retailerId, ...SIMULATED_RETAILERS],
        },
        accessToken,
      );
      poolId = createdPool.poolId;
      setStatusMessage(
        "Pool created on backend. Now open for retailer applications.",
      );
    } catch {
      setStatusMessage(
        "Pool could not be created on backend right now. UI switched to local simulation mode.",
      );
    }

    try {
      await commitRetailerOrderWithAutoVerify(
        {
          poolId,
          merchantId: retailerId,
          sku: selectedProduct.sku,
          quantity: initialQuantity,
          unitPrice: selectedProduct.unitPrice,
        },
        accessToken,
      );
    } catch (error) {
      const fallbackMessage =
        "Commitment failed on backend. Pool remains visible in UI simulation mode.";

      if (error instanceof Error) {
        setStatusMessage(`${fallbackMessage} ${error.message}`);
      } else {
        setStatusMessage(fallbackMessage);
      }
    }

    const nextPool: WorkflowPoolState = {
      poolId,
      poolName,
      sku: selectedProduct.sku,
      productName: selectedProduct.name,
      threshold: minimumThreshold,
      pledgedQuantity: initialQuantity,
      stage:
        initialQuantity >= minimumThreshold ? "threshold_reached" : "pool_open",
      supplierName: selectedProduct.supplierName,
      participants: [
        {
          merchantId: retailerId,
          quantity: initialQuantity,
        },
      ],
    };

    setPoolState(nextPool);
    saveWorkflowPoolState(nextPool);
    setActionLoading(false);
  }

  function handleSimulateApplications() {
    if (!poolState || poolState.stage === "tokenized") {
      return;
    }

    let pledgedQuantity = poolState.pledgedQuantity;
    const participants: WorkflowParticipant[] = [...poolState.participants];

    for (const merchantId of SIMULATED_RETAILERS) {
      if (
        participants.some(
          (participant) => participant.merchantId === merchantId,
        )
      ) {
        continue;
      }

      const simulatedQuantity = Math.ceil(
        poolState.threshold * (0.08 + Math.random() * 0.14),
      );
      participants.push({ merchantId, quantity: simulatedQuantity });
      pledgedQuantity += simulatedQuantity;

      if (pledgedQuantity >= poolState.threshold) {
        break;
      }
    }

    const nextState: WorkflowPoolState = {
      ...poolState,
      pledgedQuantity,
      participants,
      stage:
        pledgedQuantity >= poolState.threshold
          ? "threshold_reached"
          : "pool_open",
    };

    setPoolState(nextState);
    saveWorkflowPoolState(nextState);

    setStatusMessage(
      pledgedQuantity >= poolState.threshold
        ? "Threshold reached. Supplier can now dispatch this pool and trigger tokenization."
        : "More retailers still need to apply before threshold is reached.",
    );
  }

  async function handleDispatchAndTokenize() {
    if (!poolState || poolState.stage !== "threshold_reached") {
      return;
    }

    setActionLoading(true);

    const accessToken = getStoredAccessToken();
    let orderId = poolState.orderId ?? `order-local-${Date.now()}`;

    try {
      const aggregatedOrder = await aggregatePool(
        poolState.poolId,
        accessToken,
      );
      orderId = aggregatedOrder.orderId;
    } catch {
      // Keep local fallback if aggregation endpoint is unavailable.
    }

    try {
      const tokenizedOrder = await tokenizeAggregatedOrder(
        orderId,
        accessToken,
      );
      orderId = tokenizedOrder.orderId;
      setStatusMessage(
        "Supplier dispatch confirmed and tokenization registered on backend.",
      );
    } catch {
      setStatusMessage(
        "Dispatch/tokenization endpoint is unavailable. UI moved forward with local tokenization state.",
      );
    }

    const eta = new Date();
    eta.setDate(eta.getDate() + 6);

    const nextState: WorkflowPoolState = {
      ...poolState,
      stage: "tokenized",
      orderId,
      tokenizedAt: new Date().toISOString(),
      estimatedDelivery: eta.toISOString(),
    };

    setPoolState(nextState);
    saveWorkflowPoolState(nextState);
    setActionLoading(false);
  }

  function handleResetPool() {
    setPoolState(null);
    window.localStorage.removeItem(WORKFLOW_POOL_STORAGE_KEY);
    setStatusMessage("Workflow reset. You can start a new pool.");
  }

  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-900">
      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
        <header className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_32px_-28px_rgba(15,23,42,0.7)]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
            Retailer First Step
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Products Available for Retailer Pools
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            First you select a product, then create a pool, then other retailers
            apply, then supplier dispatches once threshold is reached, and
            finally each store receives its tokenized share.
          </p>
        </header>

        {statusMessage && (
          <p className="mb-6 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
            {statusMessage}
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-950">
                Product Catalog
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {products.length} products
              </span>
            </div>

            {loadingProducts ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                Loading retailer product feed...
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {products.map((product) => {
                  const isSelected = selectedSku === product.sku;

                  return (
                    <article
                      key={product.sku}
                      className={`rounded-2xl border bg-white p-5 shadow-[0_10px_24px_-28px_rgba(15,23,42,0.7)] transition ${
                        isSelected
                          ? "border-sky-400 ring-2 ring-sky-100"
                          : "border-slate-200"
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-950">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Supplier: {product.supplierName}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-slate-500">Unit Price</p>
                          <p className="font-semibold text-slate-900">
                            {formatCurrency(product.unitPrice)} / {product.unit}
                          </p>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-slate-500">MOQ</p>
                          <p className="font-semibold text-slate-900">
                            {product.minimumOrderQuantity}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedSku(product.sku);
                            setDesiredQuantity(product.minimumOrderQuantity);
                          }}
                          className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                        >
                          Use in Pool Builder
                        </button>
                        <Link
                          href={`/product-detail?sku=${encodeURIComponent(product.sku)}`}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400"
                        >
                          View Details
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_24px_-28px_rgba(15,23,42,0.7)]">
              <h2 className="text-lg font-semibold text-slate-950">
                Pool Builder
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {getStageLabel(poolState)}
              </p>

              {selectedProduct ? (
                <div className="mt-4 space-y-4">
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Selected Product
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedProduct.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {selectedProduct.supplierName}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Target threshold:{" "}
                      {selectedProduct.minimumOrderQuantity * 10}{" "}
                      {selectedProduct.unit}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Your committed quantity
                    </label>
                    <input
                      type="number"
                      min={selectedProduct.minimumOrderQuantity}
                      value={desiredQuantity}
                      onChange={(event) =>
                        setDesiredQuantity(Number(event.target.value))
                      }
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
                    />
                  </div>

                  <button
                    onClick={handleCreatePool}
                    disabled={actionLoading}
                    className="w-full rounded-xl bg-sky-600 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
                  >
                    1) Create Pool with This Product
                  </button>

                  <button
                    onClick={handleSimulateApplications}
                    disabled={!poolState || actionLoading}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-60"
                  >
                    2) Simulate Other Retailers Applying
                  </button>

                  <button
                    onClick={handleDispatchAndTokenize}
                    disabled={
                      poolState?.stage !== "threshold_reached" || actionLoading
                    }
                    className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                  >
                    3) Dispatch + Tokenize Allocation
                  </button>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-600">
                  Select a product to start the workflow.
                </p>
              )}
            </div>

            {poolState && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_24px_-28px_rgba(15,23,42,0.7)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-950">
                    Active Pool Snapshot
                  </h3>
                  <button
                    onClick={handleResetPool}
                    className="text-xs font-semibold text-slate-600 underline-offset-2 hover:underline"
                  >
                    Reset
                  </button>
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  {poolState.poolName}
                </p>

                <div className="mt-4 h-2 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${poolProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {poolState.pledgedQuantity} / {poolState.threshold} pledged (
                  {poolProgress}%)
                </p>

                {poolState.tokenizedAt && (
                  <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                    Tokenized at{" "}
                    {new Date(poolState.tokenizedAt).toLocaleString()} |
                    Estimated delivery{" "}
                    {poolState.estimatedDelivery
                      ? new Date(
                          poolState.estimatedDelivery,
                        ).toLocaleDateString()
                      : "TBD"}
                  </p>
                )}

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Tokenization Shares by Store
                  </p>
                  {poolState.participants.map((participant) => {
                    const share = Math.round(
                      (participant.quantity / poolState.pledgedQuantity) * 100,
                    );

                    return (
                      <div
                        key={participant.merchantId}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
                      >
                        <span className="font-medium text-slate-800">
                          {participant.merchantId}
                        </span>
                        <span className="text-slate-600">
                          {participant.quantity} units ({share}% token share)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

function RetailerDashboardFallback() {
  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-900">
      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Loading retailer dashboard...
        </div>
      </section>
    </main>
  );
}

export default function RetailerDashboard() {
  return (
    <Suspense fallback={<RetailerDashboardFallback />}>
      <RetailerDashboardContent />
    </Suspense>
  );
}
