export default function RetailerDashboard() {
  return (
    <main className="relative min-h-screen bg-[#f7fafc] text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
        {/* Purpose header */}
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            My Tokenized Inventory
          </h1>
          <p className="mt-2 text-slate-600">
            Monitor your portfolio of group purchases, tokenized holdings, and
            pending deliveries. Manage claims, redeem for physical goods, or
            pledge additional demand.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_16px_-30px_rgba(15,23,42,0.5)]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              Total Savings Achieved
            </p>
            <p className="mt-2 text-4xl font-bold text-emerald-600">$18.7K</p>
            <p className="mt-1 text-sm text-emerald-600">
              +12.3% vs previous quarter
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_16px_-30px_rgba(15,23,42,0.5)]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              Active Holdings
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-950">8,472</p>
            <p className="mt-1 text-sm text-slate-600">
              tokens | $124.3K value
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_16px_-30px_rgba(15,23,42,0.5)]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              Pending Deliveries
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-950">4</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-700">
                Ships today
              </span>
            </div>
          </div>
        </div>

        {/* Tabs & Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_12px_34px_-28px_rgba(15,23,42,0.7)]">
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex gap-6 text-sm font-medium">
              <button className="border-b-2 border-slate-900 pb-2 text-slate-900">
                In Transit
              </button>
              <button className="pb-2 text-slate-600 hover:text-slate-900">
                Pledged / Available
              </button>
              <button className="pb-2 text-slate-600 hover:text-slate-900">
                Redeemed
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">
                    Asset / Campaign
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">
                    Token Balance
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">
                    Demand Progress
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">
                    Est. Delivery
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  {
                    asset: "Fresh Produce - Tomatoes (SKU: TOM-2024-Q1)",
                    tokens: "1,240",
                    progress: "87%",
                    price: "$0.68 (↓12% vs MSRP)",
                    delivery: "Mar 28",
                  },
                  {
                    asset: "Cold Storage - Dairy Mix (SKU: DAI-2024-Q1)",
                    tokens: "2,847",
                    progress: "73%",
                    price: "$1.24 (↓8% vs MSRP)",
                    delivery: "Apr 5",
                  },
                  {
                    asset: "Frozen Proteins - Chicken (SKU: CHK-2024-Q1)",
                    tokens: "4,385",
                    progress: "91%",
                    price: "$2.44 (↓15% vs MSRP)",
                    delivery: "Apr 12",
                  },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {item.asset}
                    </td>
                    <td className="px-6 py-4 text-slate-900">{item.tokens}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: item.progress }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">
                          {item.progress}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.price}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {item.delivery}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400">
                          Pledge
                        </button>
                        <button className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700">
                          Redeem
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-50 to-slate-50 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">
                Ready to claim your physical goods?
              </h2>
              <p className="mt-2 max-w-2xl text-slate-600">
                Select items to redeem and we will coordinate delivery to your
                location on your preferred date. Your escrow will automatically
                release upon carrier confirmation.
              </p>
            </div>
            <button className="whitespace-nowrap rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700">
              Redeem for Physical Delivery
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
