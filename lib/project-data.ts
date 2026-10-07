import type { DropTest } from "./types";

export const TEAM = [
  { name: "Rehman Iqbal", role: "Systems & Integration" },
  { name: "Abdullah Tahir", role: "Airframe & Propulsion" },
  { name: "Muhammad Umer", role: "Payload & Software" },
];

export const SPECS = [
  { label: "Airframe", value: "650 mm X-frame quadcopter" },
  { label: "Payload", value: "~1.8 kg flotation + release + camera" },
  { label: "Thrust-to-weight", value: "2 : 1 target" },
  { label: "Total thrust", value: "4.8 kg (4 × 1.2 kg motors)" },
  { label: "All-up weight", value: "~4.3 kg" },
  { label: "Control", value: "Human-in-the-loop, GPS-assisted" },
  { label: "Autopilot", value: "Pixhawk-class (ArduPilot / PX4)" },
  { label: "Budget", value: "77,500 – 148,500 PKR" },
];

export const BUDGET = [
  { group: "Frame + motors + ESCs + propulsion", range: "15,000 – 28,000" },
  { group: "Flight controller (Pixhawk clone)", range: "12,000 – 20,000" },
  { group: "Radio transmitter + receiver", range: "15,000 – 20,000" },
  { group: "Li-Po, GPS, telemetry, camera", range: "21,500 – 38,000" },
  { group: "Release mechanism, servo, mounting", range: "6,500 – 14,500" },
  { group: "Flotation device", range: "5,000 – 25,000" },
];

export const TIMELINE = [
  { weeks: "1–3", phase: "Procurement & Planning", work: "Finalize components, order hardware, confirm payload weight" },
  { weeks: "4–6", phase: "Assembly & Bench Testing", work: "Frame build, motor/ESC wiring, release fabrication" },
  { weeks: "7–9", phase: "Software Integration", work: "Flight-control config, telemetry, camera, release logic" },
  { weeks: "10–11", phase: "Ground & Tethered Flights", work: "Stability, payload flights, drop tests" },
  { weeks: "12–14", phase: "Water Demo & Documentation", work: "Controlled water demonstration, final report" },
];

export const SUCCESS = [
  "Stable hover and short transit with ~1.8 kg payload",
  "≥ 9/10 successful dry drops; no accidental release on power loss",
  "Documented fail-safe: pin stays engaged without power",
  "At least one controlled water deployment to a mannequin",
  "Full report, BOM, assembly notes, and demo video",
];

export const SEED_TESTS: DropTest[] = [
  { id: "T01", date: "Wk 10", type: "Dry drop", result: "Pass", notes: "Empty cradle, servo retract 0.8 s" },
  { id: "T02", date: "Wk 10", type: "Dry drop", result: "Pass", notes: "Weighted dummy 1.2 kg" },
  { id: "T03", date: "Wk 11", type: "Dry drop", result: "Pass", notes: "Full flotation mock 1.8 kg" },
  { id: "T04", date: "Wk 11", type: "Power-loss", result: "Pass", notes: "Battery cut at hover — pin remained engaged" },
  { id: "T05", date: "Wk 11", type: "Dry drop", result: "Pass", notes: "Repeat drop after power restore" },
  { id: "T06", date: "Wk 12", type: "Water demo", result: "Pass", notes: "Pool drop, mannequin contact within 2 m" },
];

export const HOME_BASE = { lat: 31.5204, lng: 74.3587 };
export const TARGET = { lat: 31.5221, lng: 74.3612 };
