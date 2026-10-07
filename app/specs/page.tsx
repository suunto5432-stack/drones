import { BUDGET, SPECS, TIMELINE } from "@/lib/project-data";

export default function SpecsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Airframe &amp; bill of materials</h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--mute)]">
        650 mm-class X-frame, Pixhawk-class autopilot, modular cradle. Prototype total 77,500–148,500 PKR.
      </p>

      <section className="mt-8 grid gap-px border border-[var(--stroke)] bg-[var(--stroke)] sm:grid-cols-2">
        {SPECS.map((s) => (
          <div key={s.label} className="bg-[var(--panel)] px-4 py-3">
            <p className="font-mono text-[10px] tracking-widest text-[var(--mute)]">{s.label.toUpperCase()}</p>
            <p className="mt-1">{s.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium">Budget (PKR)</h2>
        <table className="mt-4 w-full text-left text-sm">
          <thead className="font-mono text-[10px] tracking-widest text-[var(--mute)]">
            <tr>
              <th className="py-2 pr-4">GROUP</th>
              <th className="py-2">RANGE</th>
            </tr>
          </thead>
          <tbody>
            {BUDGET.map((b) => (
              <tr key={b.group} className="border-t border-[var(--stroke)]">
                <td className="py-2 pr-4">{b.group}</td>
                <td className="py-2 font-mono">{b.range}</td>
              </tr>
            ))}
            <tr className="border-t border-[var(--stroke)]">
              <td className="py-2 pr-4 font-medium">Estimated prototype total</td>
              <td className="py-2 font-mono text-[var(--amber)]">77,500 – 148,500</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium">Fail-safe release</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--mute)]">
          A spring-loaded pin holds the flotation device. An SG90 / MG90S-class servo retracts the pin only
          when the operator confirms deploy. If power is lost, the pin stays engaged — unlike an electromagnet,
          which fails open.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium">14-week plan</h2>
        <ol className="mt-4 space-y-3">
          {TIMELINE.map((t) => (
            <li key={t.weeks} className="grid gap-1 border-l-2 border-[var(--stroke)] pl-4 md:grid-cols-[80px_1fr]">
              <span className="font-mono text-xs text-[var(--amber)]">Wk {t.weeks}</span>
              <div>
                <div className="text-sm">{t.phase}</div>
                <div className="text-xs text-[var(--mute)]">{t.work}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
