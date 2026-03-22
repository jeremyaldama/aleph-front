export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#f7fafc] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(9,129,255,0.16),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(15,23,42,0.08),transparent_35%),radial-gradient(circle_at_30%_70%,rgba(46,204,164,0.15),transparent_35%)]" />

      <section className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 pb-20 pt-18 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:pt-24">
        <div className="space-y-7">
          <p className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 shadow-sm">
            Bodega Gente Platform
          </p>
          <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Buy Smarter Together
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-slate-600">
            Coordinate procurement across retailers, tokenize inventory lots,
            and unlock institutional pricing through one shared supply
            intelligence ledger.
          </p>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Join as Retailer
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400"
            >
              Join as Supplier
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
            <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                Aggregated demand
              </p>
              <p className="mt-1 text-3xl font-semibold text-slate-900">
                $4.2M
              </p>
              <p className="text-sm text-emerald-600">+18.4% vs last cycle</p>
            </div>

            <div className="space-y-4">
              <article className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    Campaign A-17
                  </span>
                  <span className="font-semibold text-slate-900">73%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-full w-[73%] rounded-full bg-sky-500" />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Target closes in 4 days
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    Campaign B-04
                  </span>
                  <span className="font-semibold text-slate-900">49%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-full w-[49%] rounded-full bg-teal-500" />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Target closes in 11 days
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-slate-500">
                  Tokenized lot status
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-500">Issued</p>
                    <p className="text-lg font-semibold text-slate-900">
                      1,280
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-500">Settled</p>
                    <p className="text-lg font-semibold text-slate-900">
                      1,096
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-6xl px-6 pb-20 lg:px-10">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Core Ledger Capabilities
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Group Purchase Campaigns",
              desc: "Retailers coordinate demand windows to secure larger negotiated allocations and better terms.",
            },
            {
              title: "Tokenized Ownership",
              desc: "Split inventory into tokenized shares so participants can own fractions of each procurement lot.",
            },
            {
              title: "Financing Layers",
              desc: "Embedded credit layers synchronize repayment schedules with campaign milestones and delivery events.",
            },
            {
              title: "Optimized Logistics",
              desc: "Asset-light orchestration routes inventory efficiently through partner networks and dynamic consolidation.",
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_34px_-28px_rgba(15,23,42,0.7)]"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative bg-slate-950 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.24),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(45,212,191,0.2),transparent_25%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_1fr] lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-200">
              Institutional Scale
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              Operate campaigns with structured velocity
            </h2>
            <p className="mt-4 max-w-lg text-slate-300">
              Every campaign is measurable end-to-end, from pooled commitments
              to tokenized settlement and final logistics execution.
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-400/20 text-sm font-semibold text-sky-200">
                  1
                </span>
                <span className="text-sm font-medium">Aggregate Phase</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-400/20 text-sm font-semibold text-teal-200">
                  2
                </span>
                <span className="text-sm font-medium">Tokenize Phase</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-300">
              Live campaign
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              Cold Storage Commodities - Q2
            </h3>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <div className="mb-1 flex justify-between text-slate-300">
                  <span>Progress</span>
                  <span className="font-semibold text-white">81%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full w-[81%] rounded-full bg-sky-300" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/10 p-3">
                  <p className="text-slate-300">Savings</p>
                  <p className="mt-1 text-lg font-semibold">12.7%</p>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <p className="text-slate-300">Participants</p>
                  <p className="mt-1 text-lg font-semibold">46</p>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <p className="text-slate-300">Value</p>
                  <p className="mt-1 text-lg font-semibold">$1.9M</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-18 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Trusted by ecosystem partners
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-500 sm:grid-cols-3 lg:grid-cols-6">
          {[
            "Mercado Norte",
            "Andes Foods",
            "LogixPort",
            "Pivote Credit",
            "Trazia Labs",
            "Nova Frio",
          ].map((name) => (
            <div
              key={name}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-center font-medium shadow-sm"
            >
              {name}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_16px_36px_-28px_rgba(15,23,42,0.65)] sm:p-10">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Ready to evolve your purchasing power?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Launch your first coordinated campaign in days and give your teams a
            transparent, tokenized supply chain from commitment to delivery.
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Book a Platform Walkthrough
          </a>
        </div>
      </section>
    </main>
  );
}
