import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  C, Card, CardTitle, FONT_BODY, FONT_DISPLAY, Background, Reveal, Slide, Text, typed,
} from "../theme";
import claudeLogo from "../logos/claude.svg";
import openaiLogo from "../logos/openai.svg";
import ollamaLogo from "../logos/ollama.svg";
import antigravityLogo from "../logos/antigravity.svg";
import { useAmbientFrame } from "../ambient";
import { Bubble, Confetti, Robot, type Accessory, type Mood } from "../Robot";

/** Logo de marca sobre una placa redondeada */
const Logo: React.FC<{ src: string; size?: number; bg?: string }> = ({ src, size = 96, bg = "rgba(255,255,255,0.1)" }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.26, background: bg, flex: "none",
    display: "grid", placeItems: "center", border: `2px solid ${C.border}`,
  }}>
    <img src={src} width={size * 0.62} height={size * 0.62} alt="" />
  </div>
);

const Mascot: React.FC<{ mood?: Mood; color?: string; accessory?: Accessory; wave?: boolean; size?: number }> = ({
  mood = "happy", color = C.teal, accessory = "none", wave = false, size = 190,
}) => <Robot size={size} mood={mood} color={color} accessory={accessory} arms={wave ? "wave" : "down"} delay={18} />;

/* ───────── Portada ───────── */
export const Portada: React.FC = () => {
  const frame = useAmbientFrame();
  const glow = 0.6 + 0.4 * Math.sin(frame / 15);
  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, color: C.text }}>
      <Background accent={C.violet} />
      <AbsoluteFill style={{ justifyContent: "center", padding: "0 160px", width: 1150 }}>
        <Reveal>
          <div style={{ color: C.teal, fontSize: 30, letterSpacing: 8, textTransform: "uppercase", fontWeight: 600 }}>
            Conversatorio
          </div>
        </Reveal>
        <Reveal delay={8}>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 140, margin: "20px 0 0", lineHeight: 1, fontWeight: 700 }}>
            Inteligencia Artificial
          </h1>
        </Reveal>
        <Reveal delay={18}>
          <h2
            style={{
              fontFamily: FONT_DISPLAY, fontSize: 56, margin: "24px 0 0", fontWeight: 500,
              background: `linear-gradient(90deg, ${C.teal}, ${C.violet})`,
              WebkitBackgroundClip: "text", color: "transparent",
              filter: `drop-shadow(0 0 ${20 * glow}px ${C.violet}66)`,
            }}
          >
            Los desafíos del futuro… y en el día a día
          </h2>
        </Reveal>
      </AbsoluteFill>
      <div style={{ position: "absolute", right: 150, top: 330 }}>
        <Bubble text="¡Hola! Soy Robi 👋 Hoy exploramos la IA juntos." delay={40} maxWidth={520} fontSize={36} tail="bottom" style={{ position: "absolute", right: 60, top: -190, width: 520 }} />
        <Robot size={440} color={C.teal} mood="happy" arms="wave" delay={10} />
      </div>
    </AbsoluteFill>
  );
};

/* ───────── Agenda ───────── */
const modulos = [
  { n: "I", t: "Conceptos fundamentales", m: "5 min", c: C.teal },
  { n: "II", t: "¿Cómo genera una respuesta un LLM?", m: "5 min", c: C.sky },
  { n: "III", t: "Herramientas para el día a día", m: "15 min", c: C.violet },
  { n: "IV", t: "Buenas prácticas y asistentes personalizados", m: "15 min", c: C.amber },
  { n: "★", t: "Cierre y debate abierto", m: "5 min", c: C.rose },
];
export const Agenda: React.FC = () => (
  <Slide kicker="Hoja de ruta" title="¿Qué vamos a ver?" mascot={<Mascot mood="wow" color={C.violet} wave />}>
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {modulos.map((m, i) => (
        <Reveal key={m.n} delay={20 + i * 10} from="left">
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div style={{
              width: 84, height: 84, borderRadius: 22, background: m.c, color: C.bg,
              display: "grid", placeItems: "center", fontFamily: FONT_DISPLAY, fontSize: 44, fontWeight: 700,
            }}>{m.n}</div>
            <div style={{ fontSize: 46, flex: 1 }}>{m.t}</div>
            <div style={{ fontSize: 34, color: m.c, fontWeight: 600 }}>{m.m}</div>
          </div>
        </Reveal>
      ))}
    </div>
  </Slide>
);

/* ───────── Divisor de módulo ───────── */
export const Divisor: React.FC<{ n: string; title: string; time: string; color: string; mood?: Mood; accessory?: Accessory }> = ({ n, title, time, color, mood = "happy", accessory = "none" }) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [10, 40], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, color: C.text }}>
      <Background accent={color} />
      <div style={{ position: "absolute", right: 170, top: 270 }}>
        <Robot size={460} color={color} mood={mood} accessory={accessory} arms="wave" delay={14} />
      </div>
      <AbsoluteFill style={{ justifyContent: "center", padding: "0 160px", width: 1150 }}>
        <Reveal from="scale">
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 300, fontWeight: 700, color, lineHeight: 0.9 }}>{n}</div>
        </Reveal>
        <div style={{ height: 6, width: `${w}%`, maxWidth: 700, background: color, borderRadius: 3, margin: "20px 0" }} />
        <Reveal delay={14}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 84, fontWeight: 700 }}>{title}</div>
        </Reveal>
        <Reveal delay={22}>
          <div style={{ fontSize: 38, color: C.muted, marginTop: 12 }}>Módulo · {time}</div>
        </Reveal>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ───────── M1: ¿Qué es la IA? ───────── */
export const QueEsIA: React.FC = () => {
  const frame = useCurrentFrame();
  const items = [
    { t: "Percibir", d: "Reconocer imágenes, voz y texto", c: C.teal },
    { t: "Aprender", d: "Encontrar patrones en grandes cantidades de datos", c: C.sky },
    { t: "Decidir", d: "Predecir, clasificar y recomendar", c: C.violet },
    { t: "Crear", d: "Generar texto, imágenes, audio y código", c: C.amber },
  ];
  return (
    <Slide kicker="Módulo I" title="¿Qué es la Inteligencia Artificial?" accent={C.teal} mascot={<Mascot mood="think" color={C.teal} />}>
      <Reveal delay={15}>
        <Text size={42} color={C.text}>
          Sistemas de computación que realizan tareas que normalmente requieren <b style={{ color: C.teal }}>inteligencia humana</b>.
        </Text>
      </Reveal>
      <div style={{ display: "flex", gap: 28, marginTop: 60 }}>
        {items.map((it, i) => (
          <Card key={it.t} color={it.c} delay={35 + i * 12}>
            <CardTitle color={it.c}>{it.t}</CardTitle>
            <Text size={32}>{it.d}</Text>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 50, height: 6, borderRadius: 3, background: C.panel, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${interpolate(frame, [40, 140], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}%`,
          background: `linear-gradient(90deg, ${C.teal}, ${C.amber})`,
        }} />
      </div>
    </Slide>
  );
};

/* ───────── M1: Tradicional vs Generativa ───────── */
export const TradVsGen: React.FC = () => (
  <Slide kicker="Módulo I" title="IA tradicional vs. IA generativa" accent={C.teal}>
    <div style={{ display: "flex", gap: 40 }}>
      <Card color={C.sky} delay={20}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <CardTitle color={C.sky}>IA tradicional</CardTitle>
          <Robot size={110} color={C.sky} mood="think" accessory="glasses" delay={30} />
        </div>
        <Text size={34} color={C.text}>Analiza y <b>clasifica</b> lo que ya existe.</Text>
        <ul style={{ fontSize: 32, color: C.muted, lineHeight: 1.7, paddingLeft: 30, marginTop: 24 }}>
          <li>Filtro de spam</li>
          <li>Recomendaciones de series</li>
          <li>Detección de fraude</li>
          <li>Diagnóstico por imágenes</li>
        </ul>
        <Text size={30} color={C.sky}>Salida: una etiqueta o un número</Text>
      </Card>
      <Reveal delay={40} from="scale" style={{ alignSelf: "center", fontFamily: FONT_DISPLAY, fontSize: 56, color: C.muted }}>VS</Reveal>
      <Card color={C.amber} delay={30}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <CardTitle color={C.amber}>IA generativa</CardTitle>
          <Robot size={110} color={C.amber} mood="wow" arms="cheer" delay={40} />
        </div>
        <Text size={34} color={C.text}><b>Crea</b> contenido nuevo a partir de lo aprendido.</Text>
        <ul style={{ fontSize: 32, color: C.muted, lineHeight: 1.7, paddingLeft: 30, marginTop: 24 }}>
          <li>Redactar textos y resúmenes</li>
          <li>Generar imágenes y video</li>
          <li>Escribir código</li>
          <li>Conversar en lenguaje natural</li>
        </ul>
        <Text size={30} color={C.amber}>Salida: contenido nuevo</Text>
      </Card>
    </div>
  </Slide>
);

/* ───────── M2: ¿Cómo responde un LLM? ───────── */
export const LLMFlujo: React.FC = () => {
  const frame = useCurrentFrame();
  const amb = useAmbientFrame();
  const answer = "La IA es una herramienta que potencia tu trabajo.";
  const steps = [
    { t: "Prompt", d: "Tu pregunta o instrucción", c: C.teal },
    { t: "Tokens", d: "El texto se parte en piezas", c: C.sky },
    { t: "LLM", d: "Predice el siguiente token", c: C.violet },
    { t: "Respuesta", d: "Se arma token por token", c: C.amber },
  ];
  return (
    <Slide kicker="Módulo II" title="¿Qué es un LLM?" accent={C.sky} mascot={<Mascot mood="think" color={C.sky} />}>
      <Reveal delay={12}>
        <Text size={40} color={C.text}>
          <b style={{ color: C.sky }}>Large Language Model</b>: un modelo entrenado con enormes cantidades de texto para predecir la siguiente palabra (token).
        </Text>
      </Reveal>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 56 }}>
        {steps.map((s, i) => (
          <React.Fragment key={s.t}>
            <Card color={s.c} delay={30 + i * 16}>
              <CardTitle color={s.c}>{s.t}</CardTitle>
              <Text size={30}>{s.d}</Text>
            </Card>
            {i < steps.length - 1 && (
              <Reveal delay={38 + i * 16} from="left" style={{ fontSize: 56, color: C.muted }}>→</Reveal>
            )}
          </React.Fragment>
        ))}
      </div>
      <Reveal delay={100}>
        <div style={{
          marginTop: 48, padding: "26px 36px", borderRadius: 20, background: C.panel,
          border: `2px solid ${C.border}`, fontSize: 40, fontFamily: "monospace", color: C.text, minHeight: 60,
        }}>
          <span style={{ color: C.amber }}>▸ </span>{typed(answer, frame, 105, 22)}
          <span style={{ opacity: Math.floor(amb / 10) % 2 }}>▌</span>
        </div>
      </Reveal>
    </Slide>
  );
};

/* ───────── M2: Prompt y Token ───────── */
const tokens = ["La", " inteli", "gencia", " artificial", " nos", " ayuda", " a", " crear", "."];
const tokColors = [C.teal, C.sky, C.violet, C.amber, C.rose];
export const PromptToken: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Slide kicker="Módulo II" title="Prompt y token" accent={C.sky} mascot={<Mascot mood="wow" color={C.amber} />}>
      <div style={{ display: "flex", gap: 40 }}>
        <Card color={C.teal} delay={14}>
          <CardTitle color={C.teal}>¿Qué es un prompt?</CardTitle>
          <Text size={36}>La <b style={{ color: C.text }}>instrucción</b> que le damos al modelo: pregunta, contexto, ejemplos y formato esperado.</Text>
          <Text size={32} color={C.teal}><br />La calidad de la respuesta depende de la calidad del prompt.</Text>
        </Card>
        <Card color={C.amber} delay={24}>
          <CardTitle color={C.amber}>¿Qué es un token?</CardTitle>
          <Text size={36}>La <b style={{ color: C.text }}>unidad mínima</b> que procesa el modelo: una palabra, parte de una palabra o un signo.</Text>
          <Text size={32} color={C.amber}><br />Más o menos, 1 token ≈ ¾ de palabra.</Text>
        </Card>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 54, fontFamily: "monospace", fontSize: 54 }}>
        {tokens.map((t, i) => {
          const show = frame > 50 + i * 8;
          const pop = interpolate(frame, [50 + i * 8, 58 + i * 8], [0.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <span key={i} style={{
              opacity: show ? 1 : 0, transform: `scale(${pop})`, whiteSpace: "pre",
              background: `${tokColors[i % tokColors.length]}33`, border: `2px solid ${tokColors[i % tokColors.length]}`,
              borderRadius: 12, padding: "4px 14px",
            }}>{t}</span>
          );
        })}
      </div>
    </Slide>
  );
};

/* ───────── M2: Alucinaciones ───────── */
export const Alucinaciones: React.FC = () => {
  const frame = useCurrentFrame();
  const glitching = frame > 60;
  const shake = frame > 60 && frame < 75 ? Math.sin(frame * 3) * 6 : 0;
  return (
    <Slide kicker="Módulo II" title="Alucinaciones" accent={C.rose} mascot={<Mascot mood={glitching ? "glitch" : "happy"} color={C.rose} />}>
      <Reveal delay={12}>
        <Text size={42} color={C.text}>
          El modelo puede responder con total seguridad… algo <b style={{ color: C.rose }}>falso</b>.
        </Text>
      </Reveal>
      <Reveal delay={40} style={{ marginTop: 44 }}>
        <div style={{ transform: `translateX(${shake}px)`, padding: "30px 40px", borderRadius: 24, background: `${C.rose}18`, border: `2px solid ${C.rose}`, fontSize: 38 }}>
          <span style={{ color: C.muted }}>Usuario:</span> ¿Quién escribió el artículo “X” de 2019?<br />
          <span style={{ color: C.rose }}>IA:</span> “Fue escrito por la Dra. María Pérez en la revista Nature.” <span style={{ color: C.rose }}>⚠ inventado</span>
        </div>
      </Reveal>
      <div style={{ display: "flex", gap: 28, marginTop: 44 }}>
        {[
          { t: "Verificá", d: "Contrastá datos, citas y cifras con fuentes reales." },
          { t: "Dale contexto", d: "Adjuntá tus documentos para que responda sobre ellos." },
          { t: "Permití el “no sé”", d: "Pedile que avise cuando no esté seguro." },
        ].map((x, i) => (
          <Card key={x.t} color={C.teal} delay={80 + i * 12}>
            <CardTitle color={C.teal}>{x.t}</CardTitle>
            <Text size={30}>{x.d}</Text>
          </Card>
        ))}
      </div>
    </Slide>
  );
};

/* ───────── M3: Apps de escritorio ───────── */
export const AppsEscritorio: React.FC = () => (
  <Slide kicker="Módulo III" title="Aplicaciones de escritorio" accent={C.violet}>
    <div style={{ display: "flex", gap: 32 }}>
      {[
        { n: "Claude", logo: claudeLogo, c: C.amber, d: "Asistente conversacional y de código. Trabaja con tus archivos y carpetas." },
        { n: "Codex", logo: openaiLogo, c: C.sky, d: "Agente de programación de OpenAI: lee, edita y ejecuta código en tu equipo." },
        { n: "Antigravity", logo: antigravityLogo, c: C.violet, d: "Entorno de desarrollo con agentes de Google que planifican y construyen." },
      ].map((a, i) => (
        <Card key={a.n} color={a.c} delay={20 + i * 14}>
          <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 26 }}>
            <Logo src={a.logo} size={120} />
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 52, fontWeight: 700, color: a.c }}>{a.n}</div>
          </div>
          <Text size={32}>{a.d}</Text>
        </Card>
      ))}
    </div>
    <Reveal delay={90}>
      <Text size={36} color={C.text}><br />💡 Ya no son solo un chat: son <b style={{ color: C.violet }}>agentes</b> que trabajan junto a vos.</Text>
    </Reveal>
  </Slide>
);

/* ───────── M3: Ollama ───────── */
export const Ollama: React.FC = () => {
  const frame = useCurrentFrame();
  const amb = useAmbientFrame();
  const cmd = "ollama run llama3.2";
  return (
    <Slide kicker="Módulo III" title="Modelos locales con Ollama" accent={C.violet}>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
          <Reveal delay={10} from="scale" style={{ alignSelf: "flex-start", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Logo src={ollamaLogo} size={120} />
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 72, fontWeight: 700 }}>Ollama</div>
            </div>
          </Reveal>
          {[
            ["🔒", "Privacidad", "Tus datos no salen de tu computadora"],
            ["💸", "Gratis", "Sin suscripción ni costo por uso"],
            ["✈️", "Sin internet", "Funciona offline una vez descargado"],
          ].map(([i, t, d], k) => (
            <Reveal key={t} delay={20 + k * 12} from="left">
              <div style={{ display: "flex", gap: 22, alignItems: "center", fontSize: 34 }}>
                <span style={{ fontSize: 56 }}>{i}</span>
                <span><b style={{ color: C.violet }}>{t}</b> — <span style={{ color: C.muted }}>{d}</span></span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={30} from="right" style={{ flex: 1 }}>
          <div style={{ background: "#05080F", borderRadius: 20, border: `2px solid ${C.border}`, overflow: "hidden" }}>
            <div style={{ background: "#151B2E", padding: "12px 20px", display: "flex", gap: 10 }}>
              {[C.rose, C.amber, C.teal].map((c) => <span key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />)}
            </div>
            <div style={{ padding: 30, fontFamily: "monospace", fontSize: 34, color: C.teal, minHeight: 230 }}>
              $ {typed(cmd, frame, 50, 14)}<span style={{ opacity: Math.floor(amb / 10) % 2 }}>▌</span>
              {frame > 50 + 40 && <div style={{ color: C.text, marginTop: 20 }}>&gt;&gt;&gt; Hola, ¿en qué te ayudo?</div>}
            </div>
          </div>
        </Reveal>
      </div>
    </Slide>
  );
};

/* ───────── M3: Gemini Notebook ───────── */
export const Notebook: React.FC = () => (
  <Slide kicker="Módulo III" title="Gemini Notebook (ex NotebookLM)" accent={C.violet} mascot={<Mascot mood="happy" color={C.sky} accessory="book" />}>
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <Card color={C.sky} delay={18}>
        <CardTitle color={C.sky}>1 · Tus fuentes</CardTitle>
        <Text size={32}>PDFs, apuntes, artículos, videos y páginas web.</Text>
      </Card>
      <Reveal delay={30} style={{ fontSize: 56, color: C.muted }}>→</Reveal>
      <Card color={C.violet} delay={30}>
        <CardTitle color={C.violet}>2 · Notebook</CardTitle>
        <Text size={32}>Responde <b style={{ color: C.text }}>solo con lo que subiste</b>, citando la fuente.</Text>
      </Card>
      <Reveal delay={42} style={{ fontSize: 56, color: C.muted }}>→</Reveal>
      <Card color={C.amber} delay={42}>
        <CardTitle color={C.amber}>3 · Resultados</CardTitle>
        <Text size={32}>Resúmenes, guías de estudio, mapas mentales y audio tipo podcast.</Text>
      </Card>
    </div>
    <Reveal delay={90}>
      <Text size={36} color={C.text}><br />✅ Ideal para estudiar y reducir las alucinaciones.</Text>
    </Reveal>
  </Slide>
);

/* ───────── M4: Ingeniería de prompts ───────── */
export const Prompts: React.FC = () => {
  const frame = useCurrentFrame();
  const parts = [
    { l: "R", t: "Rol", d: "Actuá como docente de enfermería", c: C.teal },
    { l: "C", t: "Contexto", d: "Estudiantes de primer año, sin práctica previa", c: C.sky },
    { l: "T", t: "Tarea", d: "Explicá la técnica de lavado de manos", c: C.violet },
    { l: "F", t: "Formato", d: "5 pasos numerados y un resumen final", c: C.amber },
    { l: "L", t: "Límites", d: "Máximo 200 palabras, tono simple", c: C.rose },
  ];
  return (
    <Slide kicker="Módulo IV" title="Ingeniería de prompts: pedir bien" accent={C.amber} mascot={<Mascot mood={frame > 95 ? "love" : "think"} color={C.amber} accessory="glasses" />}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {parts.map((p, i) => (
          <Reveal key={p.t} delay={18 + i * 12} from="left">
            <div style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 36 }}>
              <div style={{ width: 70, height: 70, borderRadius: 18, background: p.c, color: C.bg, display: "grid", placeItems: "center", fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40 }}>{p.l}</div>
              <b style={{ width: 190, color: p.c }}>{p.t}</b>
              <span style={{ color: C.muted }}>“{p.d}”</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={95}>
        <Text size={34} color={C.text}><br />Y siempre: <b style={{ color: C.amber }}>iterá</b>. El primer resultado es un borrador.</Text>
      </Reveal>
    </Slide>
  );
};

/* ───────── M4: Asistentes personalizados ───────── */
export const Asistentes: React.FC = () => (
  <Slide kicker="Módulo IV" title="Asistentes personalizados" accent={C.amber}>
    <div style={{ display: "flex", gap: 32 }}>
      {[
        { e: "🩺", n: "Enfermería y Ciencias de la Salud", c: C.teal, acc: "stethoscope" as Accessory, l: ["Guías de procedimientos", "Simulación de casos clínicos", "Repaso de farmacología"] },
        { e: "🏭", n: "Ingeniería en Producción", c: C.sky, acc: "helmet" as Accessory, l: ["Análisis de procesos", "Control de calidad y mejora continua", "Planificación de la producción"] },
        { e: "🧭", n: "Licenciatura en Turismo", c: C.amber, acc: "hat" as Accessory, l: ["Itinerarios a medida", "Atención al visitante multilingüe", "Contenido para promoción"] },
      ].map((a, i) => (
        <Card key={a.n} color={a.c} delay={20 + i * 16}>
          <Robot size={150} color={a.c} mood="happy" accessory={a.acc} arms="wave" delay={30 + i * 16} phase={i * 25} style={{ marginBottom: 8 }} />
          <CardTitle color={a.c}>{a.n}</CardTitle>
          <ul style={{ fontSize: 30, color: C.muted, lineHeight: 1.5, paddingLeft: 28, margin: 0 }}>
            {a.l.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </Card>
      ))}
    </div>
  </Slide>
);

/* ───────── Cierre: mensaje ───────── */
export const Mensaje: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: FONT_BODY, color: C.text }}>
    <Background accent={C.rose} />
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 180px" }}>
      <Reveal>
        <div style={{ color: C.rose, fontSize: 30, letterSpacing: 8, textTransform: "uppercase", fontWeight: 600 }}>Mensaje final</div>
      </Reveal>
      <Reveal delay={12}>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 88, lineHeight: 1.12, margin: "30px 0 0" }}>
          La IA no viene a <span style={{ color: C.rose, textDecoration: "line-through" }}>reemplazar</span> nuestro trabajo
        </h1>
      </Reveal>
      <Reveal delay={45}>
        <h2 style={{
          fontFamily: FONT_DISPLAY, fontSize: 72, margin: "30px 0 0", fontWeight: 700,
          background: `linear-gradient(90deg, ${C.teal}, ${C.amber})`, WebkitBackgroundClip: "text", color: "transparent",
        }}>
          sino a potenciar nuestro talento y capacidad.
        </h2>
      </Reveal>
    </AbsoluteFill>
    <div style={{ position: "absolute", left: 90, bottom: 20 }}>
      <Robot size={200} color={C.teal} mood="love" arms="cheer" delay={70} />
    </div>
    <div style={{ position: "absolute", right: 90, bottom: 20 }}>
      <Robot size={200} color={C.amber} mood="happy" arms="cheer" delay={80} flip phase={20} />
    </div>
  </AbsoluteFill>
);

/* ───────── Debate ───────── */
export const Debate: React.FC = () => (
  <Slide kicker="Cierre" title="Debate abierto" accent={C.teal} mascot={<Mascot mood="think" color={C.violet} wave />}>
    <div style={{ display: "flex", gap: 32 }}>
      {[
        { e: "❓", t: "Preguntas", d: "Sacarse dudas sin miedo a preguntar.", c: C.teal },
        { e: "🗣️", t: "Charla abierta", d: "Un espacio para debatir entre colegas.", c: C.violet },
        { e: "🤝", t: "Experiencias", d: "¿Cómo la usás hoy en tu trabajo o estudio?", c: C.amber },
      ].map((x, i) => (
        <Card key={x.t} color={x.c} delay={20 + i * 14}>
          <div style={{ fontSize: 90 }}>{x.e}</div>
          <CardTitle color={x.c}>{x.t}</CardTitle>
          <Text size={34}>{x.d}</Text>
        </Card>
      ))}
    </div>
  </Slide>
);

/* ───────── Final ───────── */
export const Futuro: React.FC = () => {
  const frame = useAmbientFrame();
  const pulse = 1 + 0.03 * Math.sin(frame / 12);
  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, color: C.text }}>
      <Background accent={C.violet} />
      <Confetti start={20} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center", paddingBottom: 120 }}>
        <Reveal from="scale">
          <h1 style={{
            fontFamily: FONT_DISPLAY, fontSize: 150, margin: 0, transform: `scale(${pulse})`,
            background: `linear-gradient(90deg, ${C.teal}, ${C.violet}, ${C.rose})`,
            WebkitBackgroundClip: "text", color: "transparent",
          }}>
            El futuro que imaginas…
          </h1>
        </Reveal>
        <Reveal delay={40}>
          <div style={{ fontSize: 44, color: C.muted, marginTop: 30 }}>¡Gracias!</div>
        </Reveal>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 10, display: "flex", justifyContent: "center", gap: 70 }}>
        <Robot size={210} color={C.teal} mood="happy" accessory="stethoscope" arms="cheer" jump delay={30} />
        <Robot size={210} color={C.violet} mood="love" arms="cheer" jump delay={36} phase={10} />
        <Robot size={210} color={C.amber} mood="wow" accessory="helmet" arms="cheer" jump delay={42} phase={20} />
        <Robot size={210} color={C.rose} mood="happy" accessory="hat" arms="cheer" jump delay={48} phase={30} />
      </div>
    </AbsoluteFill>
  );
};
