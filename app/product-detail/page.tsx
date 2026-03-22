export default function ProductDetail() {
  return (
    <main className="relative min-h-screen bg-[#f7fafc] text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
        {/* Product Header */}
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_350px]">
          <div>
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
              ✓ Verified Supplier
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Premium Silica-Grade Solar Glass Lot
            </h1>
            <p className="mt-2 text-slate-600">
              Batch ID: BAT-2024-GL-044 | 48,200 units | ISO 9001 certified
            </p>
            <div className="mt-6 space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-600">Supplier</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">SolarTech Industries</p>
                <p className="text-sm text-slate-600">★★★★★ 4.8/5 | 247 successful campaigns | Est. $342M in volume</p>
              </div>
            </div>
          </div>

          {/* Sticky Acquisition Card */}
          <div className="sticky top-6 h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_34px_-28px_rgba(15,23,42,0.7)]">
            <p className="text-xs font-semibold uppercase text-slate-600">Acquire Allocation</p>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Token Quantity</label>
                <input
                  type="number"
                  placeholder="500"
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Token Price</span>
                  <span className="font-semibold text-slate-900">$18.50</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 text-sm">
                  <span className="font-semibold text-slate-700">Est. Cost</span>
                  <span className="text-lg font-bold text-slate-900">$9,250</span>
                </div>
              </div>
              <button className="w-full rounded-xl bg-sky-600 py-3 text-sm font-semibold text-white hover:bg-sky-700">
                Confirm Purchase
              </button>
              <p className="text-xs text-slate-600">
                💰 Funds held in escrow until MOQ is met. Auto-release on settlement.
              </p>
            </div>
          </div>
        </div>

        {/* Specifications & Inventory Grid */}
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Product Specifications</h2>
            <div className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
              {[
                { label: "Material Grade", value: "Silica-Grade 99.9%" },
                { label: "Batch Size", value: "48,200 units" },
                { label: "Certifications", value: "ISO 9001, IEC 61215, CE" },
                { label: "Coating", value: "Anti-reflective (AR)" },
                { label: "Origin", value: "Germany" },
                { label: "Manufacturing Date", value: "Jan 2024" },
              ].map((spec, idx) => (
                <div key={idx} className="flex justify-between border-b border-slate-100 pb-3 last:border-0">
                  <span className="text-sm text-slate-600">{spec.label}</span>
                  <span className="font-semibold text-slate-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Distribution */}
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Inventory Distribution</h2>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
              <div className="grid grid-cols-6 gap-1">
                {Array.from({ length: 24 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square rounded-lg ${ idx < 17 ? "bg-emerald-400" : "bg-slate-200" }`}
                  />
                ))}
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-slate-900">
                71% Claimed <span className="text-emerald-600">•</span> 29% Available
              </p>
              <p className="mt-2 text-center text-xs text-slate-600">
                34,223 units claimed by 847 retailers
              </p>
            </div>
          </div>
        </div>

        {/* Progress, Timer, Ledger */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase text-slate-600">MOQ Threshold</p>
            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div className="h-full w-[71%] rounded-full bg-emerald-500" />
            </div>
            <p className="mt-2 text-sm text-slate-600">34,223 / 48,200 units (71%)</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase text-slate-600">Campaign Closes In</p>
            <p className="mt-3 text-3xl font-bold text-sky-600">4d 18h 24m</p>
            <p className="mt-2 text-sm text-slate-600">Target date: March 30, 2026</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase text-slate-600">Est. Delivery</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">April 15–22</p>
            <p className="mt-2 text-sm text-slate-600">FOB Frankfurt → distributed</p>
          </div>
        </div>

        {/* Real-Time Ledger Activity */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-950">Real-Time Ledger Activity</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {[
              { time: "2 min ago", retailer: "Mercado del Sur", action: "Purchased", amount: "1,200 tokens" },
              { time: "8 min ago", retailer: "Andes Fresh Co.", action: "Purchased", amount: "850 tokens" },
              { time: "14 min ago", retailer: "LogixPort Alliance", action: "Purchased", amount: "2,100 tokens" },
              { time: "28 min ago", retailer: "Nova Retail Group", action: "Purchased", amount: "3,500 tokens" },
              { time: "1 hr ago", retailer: "Pivote Networks", action: "Pledged", amount: "5,000 tokens" },
            ].map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900">{entry.retailer}</p>
                  <p className="text-xs text-slate-500">{entry.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">{entry.action}</p>
                  <p className="text-sm font-bold text-emerald-600">{entry.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
