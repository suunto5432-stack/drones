"use client";

import { useMemo, useState } from "react";
import { SEED_TESTS } from "@/lib/project-data";
import type { DropTest } from "@/lib/types";

export default function TestsPage() {
  const [rows, setRows] = useState<DropTest[]>(SEED_TESTS);
  const [notes, setNotes] = useState("Dry drop, payload 1.8 kg");
  const [type, setType] = useState<DropTest["type"]>("Dry drop");
  const [result, setResult] = useState<DropTest["result"]>("Pass");

  const summary = useMemo(() => {
    const pass = rows.filter((r) => r.result === "Pass").length;
    return { total: rows.length, pass, rate: rows.length ? Math.round((pass / rows.length) * 100) : 0 };
  }, [rows]);

  function add() {
    const id = `T${String(rows.length + 1).padStart(2, "0")}`;
    setRows((prev) => [
      ...prev,
      { id, date: "Live", type, result, notes: notes.trim() || "—" },
    ]);
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Drop tests</h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--mute)]">
        Criterion: ≥ 9/10 successful dry drops and a documented power-loss lock.
      </p>

      <div className="mt-6 flex gap-8 font-mono text-sm">
        <div>
          <div className="text-[10px] tracking-widest text-[var(--mute)]">TRIALS</div>
          {summary.total}
        </div>
        <div>
          <div className="text-[10px] tracking-widest text-[var(--mute)]">PASS</div>
          {summary.pass}
        </div>
        <div>
          <div className="text-[10px] tracking-widest text-[var(--mute)]">RATE</div>
          {summary.rate}%
        </div>
      </div>

      <div className="mt-8 grid gap-3 border border-[var(--stroke)] bg-[var(--panel)] p-4 md:grid-cols-[1fr_160px_120px_auto]">
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border border-[var(--stroke)] bg-[var(--ink)] px-3 py-2 text-sm"
          placeholder="Notes"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as DropTest["type"])}
          className="border border-[var(--stroke)] bg-[var(--ink)] px-3 py-2 text-sm"
        >
          <option>Dry drop</option>
          <option>Power-loss</option>
          <option>Water demo</option>
        </select>
        <select
          value={result}
          onChange={(e) => setResult(e.target.value as DropTest["result"])}
          className="border border-[var(--stroke)] bg-[var(--ink)] px-3 py-2 text-sm"
        >
          <option>Pass</option>
          <option>Fail</option>
        </select>
        <button type="button" className="cmd" onClick={add}>
          Log trial
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="font-mono text-[10px] tracking-widest text-[var(--mute)]">
            <tr>
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">WHEN</th>
              <th className="py-2 pr-4">TYPE</th>
              <th className="py-2 pr-4">RESULT</th>
              <th className="py-2">NOTES</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-[var(--stroke)]">
                <td className="py-2 pr-4 font-mono">{r.id}</td>
                <td className="py-2 pr-4">{r.date}</td>
                <td className="py-2 pr-4">{r.type}</td>
                <td className={`py-2 pr-4 ${r.result === "Pass" ? "text-[var(--ok)]" : "text-[var(--alert)]"}`}>
                  {r.result}
                </td>
                <td className="py-2 text-[var(--mute)]">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
