"use client";

import { useEffect, useMemo, useState } from "react";
import { loadWorkflowPoolState, type WorkflowPoolState } from "@/lib/aleph-rwa";

function getReadiness(pool: WorkflowPoolState | null) {
  if (!pool) {
    return 0;
  }

  return Math.min(
    100,
    Math.round((pool.pledgedQuantity / pool.threshold) * 100),
  );
}

export default function SupplierDashboard() {
  const [poolState, setPoolState] = useState<WorkflowPoolState | null>(null);

  useEffect(() => {
    const sync = () => setPoolState(loadWorkflowPoolState());
    sync();

    const interval = window.setInterval(sync, 1500);
    return () => window.clearInterval(interval);
  }, []);

  const readiness = useMemo(() => getReadiness(poolState), [poolState]);

  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-900">
      <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-10 lg:px-10">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.7)]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
            Supplier Operations
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Pool Fulfillment and Tokenization Monitor
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            This dashboard mirrors the retailer workflow: wait until pool
            threshold is met, dispatch inventory, then confirm tokenized split
            so each participating store owes its share.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Pool Readiness
            </p>
            <p className="mt-2 text-4xl font-semibold text-slate-950">
              {readiness}%
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Threshold progress for supplier dispatch
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Current Stage
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {poolState ? poolState.stage.replace("_", " ") : "no active pool"}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Dispatch is allowed at threshold reached
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Retailers in Pool
            </p>
            <p className="mt-2 text-4xl font-semibold text-slate-950">
              {poolState ? poolState.participants.length : 0}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Each will owe a tokenized portion
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.7)]">
          <h2 className="text-xl font-semibold text-slate-950">Active Pool</h2>

          {!poolState ? (
            <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              No pool currently active. Once a retailer creates a pool, the
              supplier view will update here.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-700">{poolState.poolName}</p>
                <p className="mt-1 text-sm text-slate-600">
                  Product: {poolState.productName} ({poolState.sku})
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Supplier: {poolState.supplierName}
                </p>
              </div>

              <div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${readiness}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {poolState.pledgedQuantity} / {poolState.threshold} pledged
                </p>
              </div>

              <div className="rounded-xl border border-slate-200">
                <div className="border-b border-slate-200 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">
                    Tokenized Allocation by Store
                  </p>
                </div>
                <div className="divide-y divide-slate-200">
                  {poolState.participants.map((participant) => {
                    const share = Math.round(
                      (participant.quantity / poolState.pledgedQuantity) * 100,
                    );

                    return (
                      <div
                        key={participant.merchantId}
                        className="flex items-center justify-between px-4 py-3 text-sm"
                      >
                        <span className="font-medium text-slate-900">
                          {participant.merchantId}
                        </span>
                        <span className="text-slate-600">
                          {participant.quantity} units ({share}% owed share)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {poolState.stage === "threshold_reached" && (
                <p className="rounded-lg bg-sky-50 px-4 py-3 text-sm text-sky-700">
                  Threshold met. Supplier dispatch can proceed, followed by
                  tokenization finalization.
                </p>
              )}

              {poolState.stage === "tokenized" && (
                <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Dispatch and tokenization confirmed. Each store now owes
                  according to its tokenized allocation.
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
