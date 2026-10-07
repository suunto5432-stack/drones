import { OperatorConsole } from "@/components/OperatorConsole";

export default function ConsolePage() {
  return (
    <div>
      <div className="px-5 pt-4">
        <h1 className="text-lg font-medium">Operator console</h1>
        <p className="text-xs text-[var(--mute)]">
          Simulated Pixhawk telemetry for bench and viva demos. Hardware radio is not required.
        </p>
      </div>
      <OperatorConsole />
    </div>
  );
}
