"use client";

import { useEffect, useReducer } from "react";
import {
  arm,
  cancelDeploy,
  confirmDeploy,
  cutPower,
  initialMission,
  requestDeploy,
  reset,
  restorePower,
  rtl,
  takeoff,
  tick,
  type MissionState,
} from "@/lib/mission";
import { CameraFeed } from "./CameraFeed";
import { MissionMap } from "./MissionMap";
import { TelemetryGrid } from "./TelemetryGrid";

type Action =
  | { type: "tick" }
  | { type: "arm" }
  | { type: "takeoff" }
  | { type: "deploy" }
  | { type: "cancel" }
  | { type: "confirm" }
  | { type: "rtl" }
  | { type: "cut" }
  | { type: "restore" }
  | { type: "reset" };

function reducer(state: MissionState, action: Action): MissionState {
  switch (action.type) {
    case "tick":
      return tick(state);
    case "arm":
      return arm(state);
    case "takeoff":
      return takeoff(state);
    case "deploy":
      return requestDeploy(state);
    case "cancel":
      return cancelDeploy(state);
    case "confirm":
      return confirmDeploy(state);
    case "rtl":
      return rtl(state);
    case "cut":
      return cutPower(state);
    case "restore":
      return restorePower(state);
    case "reset":
      return reset(state);
  }
}

export function OperatorConsole() {
  const [state, dispatch] = useReducer(reducer, undefined, initialMission);

  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "tick" }), 80);
    return () => clearInterval(id);
  }, []);

  const pinLabel = state.pinEngaged ? "PIN ENGAGED" : "PIN RETRACTED";
  const canDeploy = state.phase === "hover" && state.powerOn;
  const canTakeoff = state.phase === "armed";
  const inFlight = !["idle", "landed", "armed"].includes(state.phase);

  return (
    <div className="grid gap-4 p-4 xl:grid-cols-[1.3fr_0.9fr]">
      <section className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <figure>
            <figcaption className="mb-1 font-mono text-[10px] tracking-widest text-[var(--mute)]">OPERATOR VISION</figcaption>
            <CameraFeed state={state} />
          </figure>
          <figure>
            <figcaption className="mb-1 font-mono text-[10px] tracking-widest text-[var(--mute)]">SITUATION</figcaption>
            <MissionMap state={state} />
          </figure>
        </div>
        <TelemetryGrid t={state.telemetry} powerOn={state.powerOn} />
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <StatusChip label={state.mode} tone={state.powerOn ? "ok" : "alert"} />
          <StatusChip label={state.payload} tone={state.payload === "RELEASED" ? "amber" : "ok"} />
          <StatusChip label={pinLabel} tone={state.pinEngaged ? "ok" : "amber"} />
          <StatusChip label={state.powerOn ? "POWER ON" : "POWER LOSS"} tone={state.powerOn ? "ok" : "alert"} />
          <span className="ml-auto font-mono text-[var(--mute)]">Phase {state.phase}</span>
        </div>
      </section>

      <aside className="flex flex-col gap-4">
        <div className="border border-[var(--stroke)] bg-[var(--panel)] p-4">
          <h2 className="text-sm font-medium">Pilot commands</h2>
          <p className="mt-1 text-xs text-[var(--mute)]">
            Final release is operator-only. Power loss keeps the spring pin locked.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" className="cmd" onClick={() => dispatch({ type: "arm" })}>
              Arm
            </button>
            <button type="button" className="cmd" disabled={!canTakeoff} onClick={() => dispatch({ type: "takeoff" })}>
              Takeoff
            </button>
            <button type="button" className="cmd cmd-alert" disabled={!canDeploy} onClick={() => dispatch({ type: "deploy" })}>
              Arm release
            </button>
            <button type="button" className="cmd" disabled={!inFlight} onClick={() => dispatch({ type: "rtl" })}>
              RTL
            </button>
            <button type="button" className="cmd" onClick={() => dispatch({ type: state.powerOn ? "cut" : "restore" })}>
              {state.powerOn ? "Cut power (fail-safe)" : "Restore power"}
            </button>
            <button type="button" className="cmd" onClick={() => dispatch({ type: "reset" })}>
              Reset mission
            </button>
          </div>

          {state.confirmOpen && (
            <div className="mt-4 border border-[var(--alert)] bg-[var(--ink)] p-3">
              <p className="text-sm">Confirm flotation drop? Target must be in camera box.</p>
              <div className="mt-3 flex gap-2">
                <button type="button" className="cmd cmd-alert flex-1" onClick={() => dispatch({ type: "confirm" })}>
                  Confirm deploy
                </button>
                <button type="button" className="cmd flex-1" onClick={() => dispatch({ type: "cancel" })}>
                  Hold
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 border border-[var(--stroke)] bg-[var(--panel)] p-4 min-h-[240px]">
          <h2 className="text-sm font-medium">Event log</h2>
          <ul className="mt-3 max-h-[320px] space-y-2 overflow-auto font-mono text-[11px]">
            {state.logs.map((e) => (
              <li key={e.id} className="flex gap-2">
                <span className="text-[var(--mute)]">{new Date(e.t).toLocaleTimeString()}</span>
                <span className={logColor(e.level)}>{e.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function StatusChip({ label, tone }: { label: string; tone: "ok" | "alert" | "amber" }) {
  const color =
    tone === "ok" ? "text-[var(--ok)]" : tone === "alert" ? "text-[var(--alert)]" : "text-[var(--amber)]";
  return <span className={`font-mono text-[11px] tracking-wide ${color}`}>{label}</span>;
}

function logColor(level: string) {
  if (level === "ok") return "text-[var(--ok)]";
  if (level === "alert") return "text-[var(--alert)]";
  if (level === "warn") return "text-[var(--amber)]";
  return "text-[var(--paper)]";
}
