import type { Telemetry } from "@/lib/types";

export function TelemetryGrid({ t, powerOn }: { t: Telemetry; powerOn: boolean }) {
  const cells = [
    { k: "ALT", v: powerOn ? `${t.altitudeM.toFixed(1)} m` : "—" },
    { k: "IAS", v: powerOn ? `${t.airspeedMs.toFixed(1)} m/s` : "—" },
    { k: "BATT", v: `${t.batteryPct.toFixed(0)}%` },
    { k: "V", v: powerOn ? `${t.voltageV.toFixed(1)} V` : "0.0 V" },
    { k: "GPS", v: powerOn ? `${t.gpsSats} sat` : "0 sat" },
    { k: "RSSI", v: powerOn ? `${t.rssi.toFixed(0)}%` : "0%" },
    { k: "HDG", v: powerOn ? `${t.heading.toFixed(0)}°` : "—" },
    { k: "T/W", v: powerOn ? t.thrustMargin.toFixed(2) : "—" },
  ];

  return (
    <div className="grid grid-cols-4 gap-px bg-[var(--stroke)] border border-[var(--stroke)]">
      {cells.map((c) => (
        <div key={c.k} className="bg-[var(--panel)] px-3 py-2">
          <div className="font-mono text-[10px] tracking-widest text-[var(--mute)]">{c.k}</div>
          <div className="font-mono text-lg tabular-nums">{c.v}</div>
        </div>
      ))}
    </div>
  );
}
