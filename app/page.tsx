import Link from "next/link";
import { SPECS, SUCCESS, TEAM } from "@/lib/project-data";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--amber)]">FINAL YEAR PROJECT · VIVA SOFTWARE</p>
      <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight leading-tight md:text-4xl">
        UAV that delivers flotation to people stranded in flood water.
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--mute)] leading-7">
        First-response bridge until rescue teams arrive. The operator flies GPS-assisted;
        a spring-loaded pin holds the payload and stays locked if power is lost.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/console" className="cmd inline-flex items-center">
          Open operator console
        </Link>
        <Link href="/specs" className="cmd inline-flex items-center">
          Airframe &amp; budget
        </Link>
      </div>

      <section className="mt-14 grid gap-10 md:grid-cols-3">
        {TEAM.map((m) => (
          <div key={m.name}>
            <p className="font-mono text-[10px] tracking-widest text-[var(--mute)]">{m.role.toUpperCase()}</p>
            <p className="mt-1 text-lg">{m.name}</p>
          </div>
        ))}
      </section>

      <section className="mt-14 grid gap-px border border-[var(--stroke)] bg-[var(--stroke)] md:grid-cols-2">
        {SPECS.map((s) => (
          <div key={s.label} className="bg-[var(--panel)] px-4 py-3">
            <p className="font-mono text-[10px] tracking-widest text-[var(--mute)]">{s.label.toUpperCase()}</p>
            <p className="mt-1">{s.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-sm font-medium">Demonstration flow</h2>
        <ol className="mt-4 grid gap-2 font-mono text-sm md:grid-cols-4">
          {["Takeoff", "Transit & hover", "Confirm & deploy", "RTL"].map((step, i) => (
            <li key={step} className="border border-[var(--stroke)] px-3 py-3">
              <span className="text-[var(--amber)]">{String(i + 1).padStart(2, "0")}</span>
              <div className="mt-1">{step}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-sm font-medium">Success criteria</h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--mute)]">
          {SUCCESS.map((s) => (
            <li key={s} className="border-l-2 border-[var(--stroke)] pl-3">
              {s}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
