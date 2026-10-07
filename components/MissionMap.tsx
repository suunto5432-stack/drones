"use client";

import { HOME_BASE, TARGET } from "@/lib/project-data";
import type { MissionState } from "@/lib/mission";

export function MissionMap({ state }: { state: MissionState }) {
  const { lat, lng } = state.telemetry;
  const x = mapRange(lng, HOME_BASE.lng - 0.001, TARGET.lng + 0.0004, 12, 88);
  const y = mapRange(lat, HOME_BASE.lat - 0.0004, TARGET.lat + 0.0004, 82, 16);

  return (
    <div className="relative h-full min-h-[260px] overflow-hidden bg-[#0e1c22]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect width="100" height="100" fill="#0e1c22" />
        <path
          d="M0 40 Q 20 28 38 42 T 72 38 T 100 48 L 100 100 L 0 100 Z"
          fill="#16343c"
        />
        <path
          d="M0 58 Q 24 50 46 62 T 100 58 L 100 100 L 0 100 Z"
          fill="#1a4650"
        />
        <path d="M8 18 L 28 22 L 24 38 L 6 34 Z" fill="#243028" />
        <path d="M70 8 L 96 14 L 90 32 L 66 24 Z" fill="#2a3428" />
      </svg>
      <div className="absolute left-[14%] top-[78%] -translate-x-1/2 -translate-y-1/2">
        <span className="block h-2 w-2 rounded-full bg-[var(--paper)]" />
        <span className="mt-1 block font-mono text-[10px] text-[var(--mute)]">HOME</span>
      </div>
      <div className="absolute left-[78%] top-[22%] -translate-x-1/2 -translate-y-1/2">
        <span className="block h-2.5 w-2.5 rotate-45 border border-[var(--amber)] bg-transparent" />
        <span className="mt-1 block font-mono text-[10px] text-[var(--amber)]">TARGET</span>
      </div>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        <span
          className={`block h-3 w-3 rounded-full ${state.powerOn ? "bg-[var(--ok)]" : "bg-[var(--alert)]"}`}
        />
        <span className="mt-1 block font-mono text-[10px] whitespace-nowrap">UAV</span>
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex justify-between font-mono text-[10px] text-[var(--mute)]">
        <span>
          {lat.toFixed(5)} N · {lng.toFixed(5)} E
        </span>
        <span>Lahore flood overlay · simulated</span>
      </div>
    </div>
  );
}

function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = (v - inMin) / (inMax - inMin);
  return outMin + Math.min(1, Math.max(0, t)) * (outMax - outMin);
}
