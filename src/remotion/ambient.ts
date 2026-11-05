import { useSyncExternalStore } from "react";
import { useCurrentFrame } from "remotion";

/**
 * Reloj "ambiental": sigue corriendo aunque el Player esté en pausa, para que el fondo,
 * las partículas, el confeti y los cursores sigan vivos mientras se habla en una slide.
 * Solo se activa en la app (startAmbient); en Remotion Studio / render se usa el frame normal.
 */
let enabled = false;
let now = 0;
const subs = new Set<() => void>();
const subscribe = (cb: () => void) => {
  subs.add(cb);
  return () => void subs.delete(cb);
};
const snapshot = () => now;

export const startAmbient = (fps: number) => {
  enabled = true;
  const t0 = performance.now();
  let raf = 0;
  const tick = () => {
    now = ((performance.now() - t0) / 1000) * fps;
    subs.forEach((cb) => cb());
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(raf);
    enabled = false;
  };
};

export const useAmbientFrame = () => {
  const frame = useCurrentFrame();
  const t = useSyncExternalStore(subscribe, snapshot, snapshot);
  return enabled ? t : frame;
};
