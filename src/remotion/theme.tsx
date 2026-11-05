import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useAmbientFrame } from "./ambient";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";

const display = loadDisplay("normal", { weights: ["500", "700"], subsets: ["latin"] });
const body = loadBody("normal", { weights: ["400", "600"], subsets: ["latin"] });

export const FONT_DISPLAY = display.fontFamily;
export const FONT_BODY = body.fontFamily;

export const C = {
  bg: "#0A0F1F",
  panel: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.14)",
  text: "#F4F6FB",
  muted: "#9AA6C4",
  teal: "#2DD4BF",
  violet: "#A78BFA",
  amber: "#FBBF24",
  rose: "#FB7185",
  sky: "#38BDF8",
};

export const FPS = 30;
export const W = 1920;
export const H = 1080;

/** Fade + slide-up entrance. `delay` in frames. */
export const useReveal = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return p;
};

export const Reveal: React.FC<{
  delay?: number;
  from?: "up" | "left" | "right" | "scale";
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, from = "up", style, children }) => {
  const p = useReveal(delay);
  const d = (1 - p) * 50;
  const transform =
    from === "up"
      ? `translateY(${d}px)`
      : from === "left"
        ? `translateX(${-d}px)`
        : from === "right"
          ? `translateX(${d}px)`
          : `scale(${0.85 + 0.15 * p})`;
  return <div style={{ opacity: p, transform, ...style }}>{children}</div>;
};

export const Background: React.FC<{ accent?: string }> = ({ accent = C.teal }) => {
  const frame = useAmbientFrame();
  const t = frame / 60;
  const blob = (x: number, y: number, size: number, color: string, ph: number): React.CSSProperties => ({
    position: "absolute",
    left: x + Math.sin(t + ph) * 60,
    top: y + Math.cos(t * 0.8 + ph) * 50,
    width: size,
    height: size,
    borderRadius: "50%",
    background: color,
    filter: "blur(140px)",
    opacity: 0.35,
  });
  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      <div style={blob(-200, -150, 800, accent, 0)} />
      <div style={blob(1200, 500, 900, C.violet, 2)} />
      <div style={blob(700, -300, 500, C.sky, 4)} />
      {Array.from({ length: 26 }, (_, i) => {
        const speed = 0.4 + random(`ps${i}`) * 1.1;
        const y = 1180 - ((frame * speed + random(`py${i}`) * 1300) % 1300);
        const x = random(`px${i}`) * 1920 + Math.sin(frame / 40 + i) * 20;
        return (
          <div key={i} style={{
            position: "absolute", left: x, top: y, fontFamily: "monospace", fontSize: 22 + random(`pf${i}`) * 30,
            color: i % 3 === 0 ? C.violet : accent, opacity: 0.1 + random(`po${i}`) * 0.14,
          }}>{random(`pb${i}`) > 0.5 ? "1" : "0"}</div>
        );
      })}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </AbsoluteFill>
  );
};

export const Slide: React.FC<{
  accent?: string;
  kicker?: string;
  title?: string;
  mascot?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ accent = C.teal, kicker, title, mascot, children }) => (
  <AbsoluteFill style={{ fontFamily: FONT_BODY, color: C.text }}>
    <Background accent={accent} />
    {mascot && <div style={{ position: "absolute", right: 110, top: 40 }}>{mascot}</div>}
    <AbsoluteFill style={{ padding: "90px 120px", display: "flex", flexDirection: "column" }}>
      {kicker && (
        <Reveal>
          <div style={{ color: accent, fontSize: 28, letterSpacing: 6, textTransform: "uppercase", fontWeight: 600 }}>
            {kicker}
          </div>
        </Reveal>
      )}
      {title && (
        <Reveal delay={5}>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 76, fontWeight: 700, margin: "14px 0 0", lineHeight: 1.05, maxWidth: 1400 }}>
            {title}
          </h1>
        </Reveal>
      )}
      <div style={{ flex: 1, marginTop: 50, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {children}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

export const Card: React.FC<{
  color?: string;
  delay?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ color = C.teal, delay = 0, style, children }) => (
  <Reveal delay={delay} style={{ flex: 1, ...style }}>
    <div
      style={{
        height: "100%",
        boxSizing: "border-box",
        background: C.panel,
        border: `2px solid ${C.border}`,
        borderTop: `6px solid ${color}`,
        borderRadius: 28,
        padding: "36px 40px",
        backdropFilter: "blur(8px)",
      }}
    >
      {children}
    </div>
  </Reveal>
);

export const CardTitle: React.FC<{ color?: string; children: React.ReactNode }> = ({ color = C.text, children }) => (
  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 48, fontWeight: 700, color, marginBottom: 18 }}>{children}</div>
);

export const Text: React.FC<{ size?: number; color?: string; children: React.ReactNode }> = ({
  size = 34,
  color = C.muted,
  children,
}) => <div style={{ fontSize: size, lineHeight: 1.4, color }}>{children}</div>;

/** Typewriter helper */
export const typed = (text: string, frame: number, start: number, cps = 30, fps = FPS) => {
  const n = Math.max(0, Math.floor(((frame - start) / fps) * cps));
  return text.slice(0, n);
};

export { interpolate };
