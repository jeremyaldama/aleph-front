export default function SupplierDashboard() {
  return (
    <main className="relative min-h-screen bg-[#f7fafc] text-slate-900">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[200px_1fr] lg:px-10">
        {/* Sidebar Navigation */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4">
          <nav className="space-y-2 text-sm font-medium">
            {[
              { label: "Inventory", icon: "📦" },
              { label: "Token Wallet", icon: "💰" },
              { label: "Logistics Map", icon: "🗺️" },
              { label: "Certifications", icon: "✓" },
            ].map((item, idx) => (
              <button
                key={idx}
                className={`w-full rounded-lg px-3 py-2 text-left transition ${
                  idx === 0
                    ? "bg-sky-100 text-sky-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div>
          {/* Purpose & KPI */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-slate-950">
              Supply-Side Operations Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Monitor demand aggregation, manage published inventory lots, and coordinate fulfillment across active campaigns. Track yield projections and retailer interest in real-time.
            </p>
          </div>

          {/* KPI Section */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_12px_34px_-28px_rgba(15,23,42,0.7)]">
            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-600">
                  Projected Revenue (Active Campaigns)
                </p>
                <p className="mt-3 text-5xl font-bold text-slate-950">$1.24M</p>
                <div className="mt-4 flex gap-6 text-sm">
                  <div>
                    <p className="text-slate-600">Contracted Volume</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">142,400 units</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Avg Settlement</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">April 18, 2026</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Tokenized Value</p>
                    <p className="mt-1 text-lg font-bold text-emerald-600">$856K</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-600">Market Demand Signals</p>
                <div className="mt-3 space-y-2 text-sm">
                  {[
                    { product: "Glass (Solar)", value: "$342M" },
                    { product: "Dairy & Cold", value: "$218M" },
                    { product: "Fresh Produce", value: "$187M" },
                    { product: "Proteins (Frozen)", value: "$156M" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-slate-600">{item.product}</span>
                      <span className="font-bold text-slate-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Published Inventory Lots Grid */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-950">
                Published Inventory Lots
              </h2>
              <button className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
                + Publish New Lot
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  product: "Premium Silica-Grade Solar Glass",
                  batch: "BAT-2024-GL-044",
                  qty: "48,200 units",
                  price: "$18.50/token",
                  location: "Frankfurt, Germany",
                  progress: "71%",
                },
                {
                  product: "Organic Whole Milk (UHT, 1L)",
                  batch: "BAT-2024-DM-052",
                  qty: "28,400 units",
                  price: "$3.20/token",
                  location: "Spain",
                  progress: "58%",
                },
                {
                  product: "Fresh Roma Tomatoes (Premium)",
                  batch: "BAT-2024-TO-067",
                  qty: "35,600 units",
                  price: "$0.68/token",
                  location: "Ecuador",
                  progress: "87%",
                },
              ].map((lot, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_16px_-30px_rgba(15,23,42,0.5)]"
                >
                  <div className="mb-3 h-24 rounded-lg bg-slate-100" />
                  <h3 className="font-semibold text-slate-900">{lot.product}</h3>
                  <p className="mt-1 text-xs text-slate-500">{lot.batch}</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <p className="font-semibold text-slate-900">{lot.qty}</p>
                    <p className="text-slate-600">{lot.price}</p>
                    <p className="text-slate-600">📍 {lot.location}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: lot.progress }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{lot.progress}</span>
                  </div>
                  <button className="mt-4 w-full rounded-lg border border-slate-300 bg-white py-2 text-xs font-semibold text-slate-700 hover:border-slate-400">
                    Manage Lot
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Live Aggregation Map */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_12px_34px_-28px_rgba(15,23,42,0.7)]">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-slate-950">
                Live Aggregation Map
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">
                      Item Identifier
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">
                      Retailer Interest
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">
                      Yield Projection
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    {
                      item: "BAT-2024-GL-044 (Solar Glass)",
                      retailers: "847",
                      status: "Aggregating",
                      yield: "$856K",
                    },
                    {
                      item: "BAT-2024-DM-052 (Dairy Mix)",
                      retailers: "423",
                      status: "Aggregating",
                      yield: "$284K",
                    },
                    {
                      item: "BAT-2024-TO-067 (Fresh Tomatoes)",
                      retailers: "612",
                      status: "Dispatched",
                      yield: "$138K",
                    },
                    {
                      item: "BAT-2024-CH-089 (Frozen Chicken)",
                      retailers: "376",
                      status: "Fulfilled",
                      yield: "$91K",
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {row.item}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-600">
                            {row.retailers.charAt(0)}
                          </span>
                          <span className="text-sm text-slate-600">{row.retailers} retailers</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${ row.status === "Aggregating"
                              ? "bg-sky-100 text-sky-700"
                              : row.status === "Dispatched"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {row.yield}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-sm font-semibold text-sky-600 hover:text-sky-700">
                          Manage →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-r from-teal-50 to-slate-50 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Ready to publish a new inventory lot?
                </h2>
                <p className="mt-2 max-w-2xl text-slate-600">
                  Set your batch specifications, pricing, and fulfillment terms. Bodega Gente will aggregate retailer demand, tokenize your inventory, and manage settlement end-to-end.
                </p>
              </div>
              <button className="whitespace-nowrap rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 hover:bg-teal-700">
                Publish New Lot
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
