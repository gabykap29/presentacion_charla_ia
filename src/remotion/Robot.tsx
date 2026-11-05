import React from "react";
import { random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT_DISPLAY, typed } from "./theme";
import { useAmbientFrame } from "./ambient";

export type Mood = "happy" | "wow" | "think" | "glitch" | "love";
export type Accessory = "none" | "stethoscope" | "helmet" | "hat" | "glasses" | "book";
export type Arms = "down" | "wave" | "cheer";

type RobotProps = {
  size?: number;
  color?: string; // color de acento (ojos, luces)
  mood?: Mood;
  accessory?: Accessory;
  arms?: Arms;
  delay?: number;
  jump?: boolean;
  phase?: number;
  flip?: boolean;
  style?: React.CSSProperties;
};

export const Robot: React.FC<RobotProps> = ({
  size = 240, color = C.teal, mood = "happy", accessory = "none", arms = "down",
  delay = 0, jump = false, phase = 0, flip = false, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame + phase;
  // Robot completamente quieto: sin flotar, parpadear, pulsar ni mover los brazos.
  void frame; void fps; void phase; void delay; void jump; void f;
  const bob = 0;
  const tilt = 0;
  const blink = 1;
  const pulse = 1;
  const flame = 12;

  const rArm = arms === "wave" ? -140 : arms === "cheer" ? -150 : -6;
  const lArm = arms === "cheer" ? 150 : 6;

  const glitchOn = mood === "glitch";
  const jx = 0;
  const eyeColor = glitchOn ? C.rose : color;

  const eyes = () => {
    const glow = { filter: `drop-shadow(0 0 6px ${eyeColor})` };
    if (mood === "happy")
      return (
        <g stroke={eyeColor} strokeWidth="7" strokeLinecap="round" fill="none" style={glow}>
          <path d={`M68 ${82 - 2 * blink} Q80 ${64 + (1 - blink) * 14} 92 ${82 - 2 * blink}`} />
          <path d={`M108 ${82 - 2 * blink} Q120 ${64 + (1 - blink) * 14} 132 ${82 - 2 * blink}`} />
        </g>
      );
    if (mood === "wow")
      return (
        <g fill={eyeColor} style={glow}>
          <ellipse cx="80" cy="78" rx="12" ry={14 * blink} />
          <ellipse cx="120" cy="78" rx="12" ry={14 * blink} />
          <circle cx="84" cy="73" r="4" fill="#fff" />
          <circle cx="124" cy="73" r="4" fill="#fff" />
        </g>
      );
    if (mood === "think")
      return (
        <g fill={eyeColor} style={glow}>
          <ellipse cx="80" cy="78" rx="9" ry={11 * blink} />
          <ellipse cx="120" cy="78" rx="12" ry={14 * blink} />
          <rect x="66" y="58" width="28" height="5" rx="2.5" transform="rotate(-10 80 60)" />
        </g>
      );
    if (mood === "love")
      return (
        <g fill={C.rose} style={{ filter: `drop-shadow(0 0 6px ${C.rose})` }}>
          <text x="80" y="92" fontSize={34 + 4 * pulse} textAnchor="middle">♥</text>
          <text x="120" y="92" fontSize={34 + 4 * pulse} textAnchor="middle">♥</text>
        </g>
      );
    // glitch
    return (
      <g stroke={C.rose} strokeWidth="7" strokeLinecap="round" fill="none" transform={`translate(${jx} 0)`}>
        <path d="M70 68 L90 88 M90 68 L70 88" />
        <path d="M110 68 L130 88 M130 68 L110 88" />
      </g>
    );
  };

  const mouth = () => {
    const common = { stroke: eyeColor, strokeWidth: 5, strokeLinecap: "round" as const, fill: "none" };
    if (mood === "wow") return <ellipse cx="100" cy="97" rx="7" ry={6 + 2 * pulse} fill={eyeColor} />;
    if (mood === "think") return <path d="M90 97 L112 95" {...common} />;
    if (mood === "glitch") return <path d="M82 96 l7 -6 l7 8 l7 -8 l7 8 l7 -6" {...common} />;
    return <path d="M88 94 Q100 105 112 94" {...common} />;
  };

  const arm = (cx: number, angle: number, k: string) => (
    <g key={k} transform={`rotate(${angle} ${cx} 150)`}>
      <rect x={cx - 7} y="146" width="14" height="46" rx="7" fill="url(#metal)" stroke="#8C9AC4" strokeWidth="1.5" />
      <circle cx={cx} cy="194" r="10" fill={color} />
    </g>
  );

  return (
    <div
      style={{
        width: size, height: size * 1.17, display: "inline-block",
        transform: `translateY(${bob}px) rotate(${tilt}deg) scale(1) scaleX(${flip ? -1 : 1})`,
        transformOrigin: "50% 90%", ...style,
      }}
    >
      <svg viewBox="-20 -10 240 280" width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F4F7FF" />
            <stop offset="1" stopColor="#B7C3E6" />
          </linearGradient>
        </defs>

        {/* propulsor */}
        <ellipse cx="100" cy={214 + flame / 2} rx="16" ry={flame} fill={C.amber} opacity="0.85" />
        <ellipse cx="100" cy={212 + flame / 3} rx="8" ry={flame * 0.6} fill="#fff" opacity="0.9" />
        <rect x="80" y="196" width="40" height="12" rx="6" fill="#6B7AA6" />

        {/* brazo izquierdo (detrás) */}
        {arm(54, lArm, "l")}

        {/* cuerpo */}
        <rect x="52" y="126" width="96" height="76" rx="26" fill="url(#metal)" stroke="#8C9AC4" strokeWidth="2" />
        <circle cx="100" cy="162" r="13" fill="#0A0F1F" />
        <circle cx="100" cy="162" r={6 + 3 * pulse} fill={eyeColor} opacity={0.6 + 0.4 * pulse} style={{ filter: `drop-shadow(0 0 8px ${eyeColor})` }} />

        {/* antena */}
        <line x1="100" y1="30" x2="100" y2="8" stroke="#8C9AC4" strokeWidth="5" strokeLinecap="round" />
        <circle cx="100" cy="6" r="8" fill={eyeColor} opacity={0.6 + 0.4 * pulse} style={{ filter: `drop-shadow(0 0 10px ${eyeColor})` }} />

        {/* cabeza */}
        <rect x="30" y="58" width="12" height="36" rx="6" fill={color} />
        <rect x="158" y="58" width="12" height="36" rx="6" fill={color} />
        <rect x="38" y="30" width="124" height="100" rx="32" fill="url(#metal)" stroke="#8C9AC4" strokeWidth="2" />
        <rect x="50" y="46" width="100" height="68" rx="22" fill="#0A0F1F" />
        <g transform={`translate(${glitchOn ? jx : 0} 0)`}>{eyes()}{mouth()}</g>
        

        {/* brazo derecho (delante) */}
        {arm(146, rArm, "r")}

        {/* accesorios */}
        {accessory === "stethoscope" && (
          <g>
            <path d="M70 128 Q64 176 100 184 Q136 176 130 128" stroke="#5B6B94" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="100" cy="188" r="9" fill="#CBD5F0" stroke="#5B6B94" strokeWidth="3" />
          </g>
        )}
        {accessory === "helmet" && (
          <g>
            <path d="M40 48 Q40 6 100 6 Q160 6 160 48 Z" fill={C.amber} stroke="#B7821A" strokeWidth="2" />
            <rect x="92" y="6" width="16" height="30" rx="4" fill="#E0A315" />
            <rect x="32" y="44" width="136" height="11" rx="5.5" fill="#E0A315" stroke="#B7821A" strokeWidth="2" />
          </g>
        )}
        {accessory === "hat" && (
          <g>
            <path d="M62 42 Q62 2 100 2 Q138 2 138 42 Z" fill="#F2D38C" stroke="#B89448" strokeWidth="2" />
            <rect x="62" y="28" width="76" height="9" fill={C.rose} />
            <ellipse cx="100" cy="44" rx="84" ry="12" fill="#F2D38C" stroke="#B89448" strokeWidth="2" />
          </g>
        )}
        {accessory === "glasses" && (
          <g stroke="#fff" strokeWidth="4" fill="rgba(255,255,255,0.08)">
            <circle cx="80" cy="80" r="19" />
            <circle cx="120" cy="80" r="19" />
            <line x1="99" y1="80" x2="101" y2="80" />
          </g>
        )}
        {accessory === "book" && (
          <g transform="translate(0 6)">
            <path d="M58 168 L100 176 L142 168 L142 208 L100 216 L58 208 Z" fill={C.sky} stroke="#fff" strokeWidth="3" />
            <line x1="100" y1="176" x2="100" y2="216" stroke="#fff" strokeWidth="3" />
            <path d="M68 182 L92 186 M68 192 L92 196 M108 186 L132 182 M108 196 L132 192" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* burbuja de pensamiento */}
        {mood === "think" &&
          [0, 1, 2].map((i) => (
            <circle key={i} cx={166 + i * 12} cy={30 - i * 16} r={4 + i * 3} fill="#fff"
              opacity={1} />
          ))}
      </svg>
    </div>
  );
};

/** Globo de diálogo con efecto máquina de escribir */
export const Bubble: React.FC<{
  text: string; delay?: number; color?: string; maxWidth?: number; fontSize?: number;
  tail?: "left" | "right" | "bottom"; style?: React.CSSProperties;
}> = ({ text, delay = 0, color = C.teal, maxWidth = 620, fontSize = 40, tail = "right", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const tailStyle: React.CSSProperties =
    tail === "right" ? { right: -14, top: 40 } : tail === "left" ? { left: -14, top: 40 } : { left: 60, bottom: -14 };
  return (
    <div
      style={{
        position: "relative", maxWidth, padding: "26px 34px", borderRadius: 30, background: "#fff", color: "#0A0F1F",
        fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize, lineHeight: 1.25,
        border: `5px solid ${color}`, transform: `scale(${p})`, opacity: p, transformOrigin: "bottom right",
        boxShadow: `0 10px 40px ${color}55`, ...style,
      }}
    >
      {typed(text, frame, delay + 6, 28)}
      <div style={{ position: "absolute", width: 26, height: 26, background: "#fff", transform: "rotate(45deg)",
        borderRight: tail === "right" ? `5px solid ${color}` : undefined, borderTop: tail === "right" ? `5px solid ${color}` : undefined,
        borderLeft: tail === "left" ? `5px solid ${color}` : undefined, borderBottom: tail !== "right" ? `5px solid ${color}` : undefined,
        ...tailStyle }} />
    </div>
  );
};

/** Lluvia de confeti */
export const Confetti: React.FC<{ count?: number; start?: number }> = ({ count = 70, start = 0 }) => {
  const local = useCurrentFrame() - start;
  const frame = useAmbientFrame();
  const colors = [C.teal, C.violet, C.amber, C.rose, C.sky];
  if (local < 0) return null;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const x = random(`cx${i}`) * 1920;
        const speed = 3 + random(`cs${i}`) * 5;
        const y = ((frame * speed + random(`cy${i}`) * 1200) % 1300) - 120;
        const rot = frame * (4 + random(`cr${i}`) * 8);
        return (
          <div key={i} style={{
            position: "absolute", left: x + Math.sin(frame / 12 + i) * 30, top: y, width: 16, height: 26,
            background: colors[i % colors.length], borderRadius: 3, transform: `rotate(${rot}deg)`, opacity: 0.9,
          }} />
        );
      })}
    </>
  );
};
