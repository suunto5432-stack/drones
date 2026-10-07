"use client";

import { useEffect, useRef } from "react";
import type { MissionState } from "@/lib/mission";

export function CameraFeed({ state }: { state: MissionState }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let raf = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#123038";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#1c4c56";
      for (let i = 0; i < 8; i++) {
        const y = 70 + Math.sin(frame / 18 + i) * 6 + i * 28;
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x <= w; x += 8) {
          ctx.lineTo(x, y + Math.sin(x / 40 + frame / 12 + i) * 4);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.fill();
      }

      const personX = w * 0.62 + Math.sin(frame / 30) * 6;
      const personY = h * 0.58;
      ctx.fillStyle = "#c4b08a";
      ctx.beginPath();
      ctx.arc(personX, personY - 18, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3a2a22";
      ctx.fillRect(personX - 6, personY - 8, 12, 22);

      if (state.payload === "RELEASED") {
        ctx.strokeStyle = "#d45a3a";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(personX - 10, personY + 10, 16, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(232,165,75,0.55)";
      ctx.lineWidth = 1;
      ctx.strokeRect(w * 0.5, h * 0.42, w * 0.24, h * 0.28);
      ctx.fillStyle = "#e8a54b";
      ctx.font = "11px ui-monospace, monospace";
      ctx.fillText("TGT CONFIRM", w * 0.5 + 6, h * 0.42 - 6);

      ctx.fillStyle = "rgba(11,20,22,0.55)";
      ctx.fillRect(0, 0, w, 28);
      ctx.fillRect(0, h - 24, w, 24);
      ctx.fillStyle = "#c8d4d6";
      ctx.fillText(state.powerOn ? "CAM 1 · FPV · LIVE" : "CAM 1 · NO SIGNAL", 10, 18);
      ctx.fillText(`${state.telemetry.altitudeM.toFixed(1)} m AGL`, 10, h - 8);
      ctx.fillText(state.mode, w - 90, 18);

      frame += 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [state.mode, state.payload, state.powerOn, state.telemetry.altitudeM]);

  return (
    <div className="relative h-full min-h-[260px] bg-black">
      <canvas ref={ref} width={640} height={360} className="h-full w-full object-cover" />
      {!state.powerOn && (
        <div className="absolute inset-0 grid place-items-center bg-black/70 font-mono text-xs text-[var(--alert)]">
          VIDEO LINK LOST
        </div>
      )}
    </div>
  );
}
