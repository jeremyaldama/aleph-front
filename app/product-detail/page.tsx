"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import type { RetailerDashboardProductResponseDto } from "@/generated/aleph-be";
import {
  getRetailerDashboardProducts,
  getStoredAccessToken,
  loadWorkflowPoolState,
} from "@/lib/aleph-rwa";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 10 ? 2 : 0,
  }).format(value);
}

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku");

  const [products, setProducts] = useState<
    RetailerDashboardProductResponseDto[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [poolSummary, setPoolSummary] =
    useState<ReturnType<typeof loadWorkflowPoolState>>(null);

  useEffect(() => {
    async function loadData() {
      const accessToken = getStoredAccessToken();
      const dashboardProducts = await getRetailerDashboardProducts(accessToken);
      setProducts(dashboardProducts);
      setPoolSummary(loadWorkflowPoolState());
      setLoading(false);
    }

    void loadData();
  }, []);

  const product = useMemo(() => {
    if (!sku) {
      return products[0] ?? null;
    }

    return products.find((item) => item.sku === sku) ?? null;
  }, [products, sku]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7fafc] px-6 py-10 text-slate-900 lg:px-10">
        <p className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Loading product details...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f7fafc] px-6 py-10 text-slate-900 lg:px-10">
        <div className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-xl font-semibold text-slate-950">
            Product not found
          </h1>
          <Link
            href="/retailer-dashboard"
            className="mt-3 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to Retailer Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const poolMatchesProduct = poolSummary && poolSummary.sku === product.sku;
  const progress = poolMatchesProduct
    ? Math.round((poolSummary.pledgedQuantity / poolSummary.threshold) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-900">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.7)]">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Product Detail
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {product.name}
          </h1>
          <p className="mt-2 text-slate-600">
            Supplier: {product.supplierName}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Unit Price</p>
              <p className="text-xl font-semibold text-slate-900">
                {formatCurrency(product.unitPrice)} / {product.unit}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Minimum Pool Quantity</p>
              <p className="text-xl font-semibold text-slate-900">
                {product.minimumOrderQuantity * 10} {product.unit}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Available Quantity</p>
              <p className="text-xl font-semibold text-slate-900">
                {product.availableQuantity}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">SKU</p>
              <p className="text-xl font-semibold text-slate-900">
                {product.sku}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              What Happens Next
            </p>
            <ol className="mt-2 space-y-2 text-sm text-slate-700">
              <li>1. Create a pool for this product.</li>
              <li>2. Other retailers apply into the pool.</li>
              <li>3. Supplier dispatches when threshold is reached.</li>
              <li>4. The order is tokenized and each store owes its share.</li>
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/retailer-dashboard?sku=${encodeURIComponent(product.sku)}`}
              className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Create Pool for This Product
            </Link>
            <Link
              href="/retailer-dashboard"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Back to Products
            </Link>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.7)]">
          <h2 className="text-lg font-semibold text-slate-950">
            Pool Status for This Product
          </h2>

          {!poolMatchesProduct ? (
            <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              No active pool yet for this product. Create one from the Retailer
              Dashboard.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-slate-700">{poolSummary.poolName}</p>

              <div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {poolSummary.pledgedQuantity} / {poolSummary.threshold}{" "}
                  pledged ({Math.min(progress, 100)}%)
                </p>
              </div>

              <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                Stage:{" "}
                <span className="font-semibold">
                  {poolSummary.stage.replace("_", " ")}
                </span>
              </p>

              {poolSummary.tokenizedAt && (
                <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  Tokenized on{" "}
                  {new Date(poolSummary.tokenizedAt).toLocaleString()}
                </p>
              )}

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Store Participation
                </p>
                {poolSummary.participants.map((participant) => (
                  <div
                    key={participant.merchantId}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
                  >
                    <span className="font-medium text-slate-800">
                      {participant.merchantId}
                    </span>
                    <span className="text-slate-600">
                      {participant.quantity} units
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

function ProductDetailFallback() {
  return (
    <main className="min-h-screen bg-[#f7fafc] px-6 py-10 text-slate-900 lg:px-10">
      <p className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        Loading product details...
      </p>
    </main>
  );
}

export default function ProductDetail() {
  return (
    <Suspense fallback={<ProductDetailFallback />}>
      <ProductDetailContent />
    </Suspense>
  );
}
