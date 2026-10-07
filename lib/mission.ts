import { HOME_BASE } from "./project-data";
import type { EventLog, FlightMode, MissionPhase, PayloadState, Telemetry } from "./types";

export type MissionState = {
  phase: MissionPhase;
  mode: FlightMode;
  payload: PayloadState;
  pinEngaged: boolean;
  powerOn: boolean;
  armed: boolean;
  confirmOpen: boolean;
  telemetry: Telemetry;
  logs: EventLog[];
  progress: number;
};

const BASE_TELEMETRY: Telemetry = {
  altitudeM: 0,
  airspeedMs: 0,
  batteryPct: 94,
  voltageV: 22.4,
  gpsSats: 14,
  rssi: 92,
  heading: 42,
  lat: HOME_BASE.lat,
  lng: HOME_BASE.lng,
  thrustMargin: 2.05,
};

export function initialMission(): MissionState {
  return {
    phase: "idle",
    mode: "STANDBY",
    payload: "LOCKED",
    pinEngaged: true,
    powerOn: true,
    armed: false,
    confirmOpen: false,
    telemetry: { ...BASE_TELEMETRY },
    logs: [
      {
        id: "boot",
        t: Date.now(),
        level: "ok",
        message: "Ground station linked. Release pin locked (fail-safe).",
      },
    ],
    progress: 0,
  };
}

function log(level: EventLog["level"], message: string): EventLog {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, t: Date.now(), level, message };
}

export function tick(state: MissionState): MissionState {
  if (!state.powerOn) {
    return {
      ...state,
      telemetry: {
        ...state.telemetry,
        voltageV: 0,
        rssi: 0,
        batteryPct: state.telemetry.batteryPct,
      },
    };
  }

  const next = { ...state, telemetry: { ...state.telemetry } };
  const t = next.telemetry;
  t.batteryPct = Math.max(18, t.batteryPct - 0.012);
  t.voltageV = 16.8 + (t.batteryPct / 100) * 6.4;
  t.rssi = clamp(88 + Math.sin(Date.now() / 900) * 6, 70, 99);
  t.gpsSats = 13 + Math.round((Math.sin(Date.now() / 4000) + 1) * 1.2);
  t.heading = (t.heading + (next.phase === "idle" ? 0 : 0.4)) % 360;

  switch (next.phase) {
    case "takeoff": {
      t.altitudeM = Math.min(18, t.altitudeM + 0.35);
      t.airspeedMs = 1.2;
      t.thrustMargin = 1.92;
      if (t.altitudeM >= 18) {
        next.phase = "transit";
        next.mode = "GUIDED";
        next.logs = [log("info", "18 m AGL. Transit toward target."), ...next.logs].slice(0, 40);
      }
      break;
    }
    case "transit": {
      t.airspeedMs = 8.4;
      t.altitudeM = 18 + Math.sin(Date.now() / 800) * 0.3;
      t.lat += 0.000018;
      t.lng += 0.000028;
      next.progress = Math.min(100, next.progress + 1.1);
      if (next.progress >= 100) {
        next.phase = "hover";
        next.mode = "LOITER";
        t.airspeedMs = 0.4;
        next.logs = [log("ok", "On station. Loiter. Operator confirms target."), ...next.logs].slice(0, 40);
      }
      break;
    }
    case "hover":
    case "confirm": {
      t.airspeedMs = 0.3 + Math.sin(Date.now() / 500) * 0.15;
      t.altitudeM = 12 + Math.sin(Date.now() / 700) * 0.2;
      t.thrustMargin = 1.88;
      break;
    }
    case "deployed": {
      t.airspeedMs = 0.4;
      break;
    }
    case "rtl": {
      t.airspeedMs = 7.6;
      t.altitudeM = Math.max(8, t.altitudeM);
      t.lat += (HOME_BASE.lat - t.lat) * 0.08;
      t.lng += (HOME_BASE.lng - t.lng) * 0.08;
      next.progress = Math.max(0, next.progress - 1.4);
      if (Math.abs(t.lat - HOME_BASE.lat) < 0.00004) {
        next.phase = "landed";
        next.mode = "LAND";
        next.armed = false;
        t.altitudeM = 0;
        t.airspeedMs = 0;
        next.logs = [log("ok", "Landed. Mission complete."), ...next.logs].slice(0, 40);
      }
      break;
    }
    default:
      break;
  }

  return next;
}

export function arm(state: MissionState): MissionState {
  if (!state.powerOn) return withLog(state, "alert", "Cannot arm — airframe power is off.");
  if (state.phase !== "idle" && state.phase !== "landed") return state;
  return {
    ...state,
    phase: "armed",
    mode: "ARMED",
    armed: true,
    payload: "LOCKED",
    pinEngaged: true,
    progress: 0,
    telemetry: { ...BASE_TELEMETRY, batteryPct: state.telemetry.batteryPct },
    logs: [log("warn", "Motors armed. Payload pin locked."), ...state.logs].slice(0, 40),
  };
}

export function takeoff(state: MissionState): MissionState {
  if (state.phase !== "armed") return withLog(state, "warn", "Arm the airframe before takeoff.");
  return {
    ...state,
    phase: "takeoff",
    mode: "TAKEOFF",
    logs: [log("info", "Takeoff commanded. Climbing to 18 m."), ...state.logs].slice(0, 40),
  };
}

export function requestDeploy(state: MissionState): MissionState {
  if (state.phase !== "hover") return withLog(state, "warn", "Deploy only from a confirmed hover.");
  return {
    ...state,
    phase: "confirm",
    confirmOpen: true,
    payload: "ARMED",
    logs: [log("alert", "Release armed. Pilot confirmation required."), ...state.logs].slice(0, 40),
  };
}

export function cancelDeploy(state: MissionState): MissionState {
  return {
    ...state,
    phase: "hover",
    confirmOpen: false,
    payload: "LOCKED",
    pinEngaged: true,
    logs: [log("info", "Deploy cancelled. Pin re-locked."), ...state.logs].slice(0, 40),
  };
}

export function confirmDeploy(state: MissionState): MissionState {
  if (!state.powerOn) return withLog(state, "alert", "Power loss — pin remains engaged. Payload held.");
  if (state.phase !== "confirm") return state;
  return {
    ...state,
    phase: "deployed",
    confirmOpen: false,
    payload: "RELEASED",
    pinEngaged: false,
    logs: [log("ok", "Servo retracted. Flotation released."), ...state.logs].slice(0, 40),
  };
}

export function rtl(state: MissionState): MissionState {
  if (state.phase === "idle" || state.phase === "landed") return state;
  return {
    ...state,
    phase: "rtl",
    mode: "RTL",
    confirmOpen: false,
    logs: [log("info", "Return-to-launch commanded."), ...state.logs].slice(0, 40),
  };
}

export function cutPower(state: MissionState): MissionState {
  return {
    ...state,
    powerOn: false,
    confirmOpen: false,
    payload: state.payload === "RELEASED" ? "RELEASED" : "LOCKED",
    pinEngaged: state.payload === "RELEASED" ? false : true,
    logs: [
      log(
        "alert",
        state.payload === "RELEASED"
          ? "Power cut after release. Cradle empty."
          : "Power cut. Spring pin stays engaged — payload secured.",
      ),
      ...state.logs,
    ].slice(0, 40),
  };
}

export function restorePower(state: MissionState): MissionState {
  return {
    ...state,
    powerOn: true,
    logs: [log("ok", "Power restored. Telemetry reacquired."), ...state.logs].slice(0, 40),
  };
}

export function reset(state: MissionState): MissionState {
  const battery = state.telemetry.batteryPct;
  const next = initialMission();
  next.telemetry.batteryPct = battery;
  next.logs = [log("info", "Mission reset. Pin locked, airframe disarmed."), ...state.logs].slice(0, 40);
  return next;
}

function withLog(state: MissionState, level: EventLog["level"], message: string): MissionState {
  return { ...state, logs: [log(level, message), ...state.logs].slice(0, 40) };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
