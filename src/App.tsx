import { useCallback, useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import "./index.css";
import { Charla, SLIDES, TRANSITION, totalFrames } from "./remotion/Root";
import { FPS, H, W } from "./remotion/theme";
import { startAmbient } from "./remotion/ambient";

/** Frame donde empieza cada slide dentro del video continuo. */
const starts = SLIDES.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : (acc[i - 1] ?? 0) + (SLIDES[i - 1]?.frames ?? 0) - TRANSITION);
  return acc;
}, []);

/** Frame en que cada slide ya terminó de animarse y espera al presentador (null = la última, sigue hasta el final). */
const holds = SLIDES.map((s, i) => {
  if (s.hold === undefined) return null;
  return (starts[i] ?? 0) + Math.min(Math.round(s.hold * FPS), s.frames - TRANSITION - 1);
});

const slideAt = (f: number) => Math.max(0, starts.findLastIndex((s) => s <= f + 1));

export function App() {
  const ref = useRef<PlayerRef>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(false); // false = modo presentación, true = video corrido
  const autoRef = useRef(auto);
  autoRef.current = auto;

  /** Siguiente: reproduce la entrada de la slide siguiente (con transición). */
  const next = useCallback(() => {
    const p = ref.current;
    if (!p) return;
    const idx = slideAt(p.getCurrentFrame());
    const target = starts[idx + 1];
    if (target === undefined) return;
    p.seekTo(target);
    p.play();
  }, []);

  /** Anterior: muestra la slide previa ya armada, sin volver a esperar su animación. */
  const prev = useCallback(() => {
    const p = ref.current;
    if (!p) return;
    const idx = slideAt(p.getCurrentFrame());
    const target = Math.max(idx - 1, 0);
    p.pause();
    p.seekTo(holds[target] ?? starts[target] ?? 0);
  }, []);

  const goTo = useCallback((i: number) => {
    const p = ref.current;
    if (!p) return;
    p.seekTo(starts[i] ?? 0);
    p.play();
  }, []);

  // Reloj ambiental: mantiene vivos fondo, partículas y confeti aunque el Player esté en pausa.
  useEffect(() => startAmbient(FPS), []);

  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    const onFrame = (e: { detail: { frame: number } }) => {
      const f = e.detail.frame;
      const idx = slideAt(f);
      setCurrent(idx);
      const hold = holds[idx];
      if (!autoRef.current && hold != null && f >= hold && p.isPlaying()) {
        p.pause();
        p.seekTo(hold);
      }
    };
    p.addEventListener("frameupdate", onFrame);
    return () => p.removeEventListener("frameupdate", onFrame);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === "ArrowRight" || k === "PageDown" || k === " " || k === "Enter") { e.preventDefault(); next(); }
      else if (k === "ArrowLeft" || k === "PageUp" || k === "Backspace") { e.preventDefault(); prev(); }
      else if (k === "Home") goTo(0);
      else if (k === "End") goTo(SLIDES.length - 1);
      else if (k.toLowerCase() === "a") setAuto((a) => !a);
      else if (k.toLowerCase() === "f") {
        if (document.fullscreenElement) void document.exitFullscreen();
        else void wrapRef.current?.requestFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo]);

  return (
    <div ref={wrapRef} onClick={next} style={{ width: "100vw", height: "100vh", position: "relative", background: "#0a0f1f", cursor: "pointer" }}>
      <Player
        ref={ref}
        component={Charla}
        durationInFrames={totalFrames}
        fps={FPS}
        compositionWidth={W}
        compositionHeight={H}
        style={{ width: "100%", height: "100%" }}
        autoPlay
        acknowledgeRemotionLicense
      />

      <div className="hud" onClick={(e) => e.stopPropagation()} style={{
        position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8,
        alignItems: "center", padding: "8px 14px", borderRadius: 999, background: "rgba(10,15,31,0.7)",
        backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", fontFamily: "system-ui, sans-serif",
        cursor: "default",
      }}>
        {SLIDES.map((s, i) => (
          <button key={s.id} title={`${i + 1}. ${s.id}`} onClick={() => goTo(i)} aria-label={`Ir a la slide ${i + 1}`}
            style={{
              width: i === current ? 26 : 10, height: 10, borderRadius: 5, border: 0, padding: 0, cursor: "pointer",
              background: i === current ? "#2DD4BF" : "rgba(255,255,255,0.35)", transition: "all .25s",
            }} />
        ))}
        <span style={{ color: "#9AA6C4", fontSize: 13, marginLeft: 8 }}>{current + 1} / {SLIDES.length}</span>
        <button onClick={() => setAuto((a) => !a)} title="Atajo: A"
          style={{
            marginLeft: 6, padding: "4px 12px", borderRadius: 999, cursor: "pointer", fontSize: 13, fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.3)", color: auto ? "#0A0F1F" : "#fff", background: auto ? "#FBBF24" : "transparent",
          }}>
          {auto ? "▶ Video automático" : "Presentación"}
        </button>
      </div>
      <style>{`.hud{opacity:0;transition:opacity .3s}div:hover>.hud,.hud:hover{opacity:1}`}</style>
    </div>
  );
}

export default App;
