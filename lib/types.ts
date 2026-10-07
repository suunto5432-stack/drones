export type FlightMode =
  | "STANDBY"
  | "ARMED"
  | "TAKEOFF"
  | "LOITER"
  | "GUIDED"
  | "RTL"
  | "LAND";

export type MissionPhase =
  | "idle"
  | "armed"
  | "takeoff"
  | "transit"
  | "hover"
  | "confirm"
  | "deployed"
  | "rtl"
  | "landed";

export type PayloadState = "LOCKED" | "ARMED" | "RELEASED";

export type LogLevel = "info" | "warn" | "alert" | "ok";

export type Telemetry = {
  altitudeM: number;
  airspeedMs: number;
  batteryPct: number;
  voltageV: number;
  gpsSats: number;
  rssi: number;
  heading: number;
  lat: number;
  lng: number;
  thrustMargin: number;
};

export type EventLog = {
  id: string;
  t: number;
  level: LogLevel;
  message: string;
};

export type DropTest = {
  id: string;
  date: string;
  type: "Dry drop" | "Power-loss" | "Water demo";
  result: "Pass" | "Fail";
  notes: string;
};
