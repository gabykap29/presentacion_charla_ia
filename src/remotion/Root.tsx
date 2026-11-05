import React from "react";
import { Composition } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { C, FPS, H, W } from "./theme";
import * as S from "./slides/Slides";

/** hold = segundo en que termina la animación de entrada; ahí la presentación espera al presentador. */
type SlideDef = { id: string; frames: number; el: React.ReactElement; hold?: number };

const secs = (s: number) => Math.round(s * FPS);

export const SLIDES: SlideDef[] = [
  { id: "portada", frames: secs(7), hold: 5, el: <S.Portada /> },
  { id: "agenda", frames: secs(9), hold: 3.5, el: <S.Agenda /> },
  { id: "m1", frames: secs(4), hold: 2.5, el: <S.Divisor n="I" title="Conceptos fundamentales" time="5 min" color={C.teal} mood="wow" /> },
  { id: "que-es-ia", frames: secs(9), hold: 5, el: <S.QueEsIA /> },
  { id: "trad-vs-gen", frames: secs(10), hold: 3.5, el: <S.TradVsGen /> },
  { id: "m2", frames: secs(4), hold: 2.5, el: <S.Divisor n="II" title="¿Cómo genera una respuesta un LLM?" time="5 min" color={C.sky} mood="think" /> },
  { id: "llm", frames: secs(11), hold: 6.5, el: <S.LLMFlujo /> },
  { id: "prompt-token", frames: secs(10), hold: 4.5, el: <S.PromptToken /> },
  { id: "alucinaciones", frames: secs(10), hold: 4.5, el: <S.Alucinaciones /> },
  { id: "m3", frames: secs(4), hold: 2.5, el: <S.Divisor n="III" title="Herramientas para el día a día" time="15 min" color={C.violet} mood="happy" accessory="glasses" /> },
  { id: "apps", frames: secs(9), hold: 4, el: <S.AppsEscritorio /> },
  { id: "ollama", frames: secs(10), hold: 4, el: <S.Ollama /> },
  { id: "notebook", frames: secs(9), hold: 4, el: <S.Notebook /> },
  { id: "m4", frames: secs(4), hold: 2.5, el: <S.Divisor n="IV" title="Buenas prácticas y asistentes" time="15 min" color={C.amber} mood="love" accessory="helmet" /> },
  { id: "prompts", frames: secs(10), hold: 4.5, el: <S.Prompts /> },
  { id: "asistentes", frames: secs(10), hold: 3.5, el: <S.Asistentes /> },
  { id: "mensaje", frames: secs(9), hold: 3.5, el: <S.Mensaje /> },
  { id: "debate", frames: secs(8), hold: 3, el: <S.Debate /> },
  { id: "futuro", frames: secs(8), el: <S.Futuro /> },
];

export const TRANSITION = 15;

export const Charla: React.FC = () => (
  <TransitionSeries>
    {SLIDES.flatMap((s, i) => {
      const nodes: React.ReactNode[] = [
        <TransitionSeries.Sequence key={s.id} durationInFrames={s.frames}>{s.el}</TransitionSeries.Sequence>,
      ];
      if (i < SLIDES.length - 1) {
        nodes.push(
          <TransitionSeries.Transition
            key={`t-${s.id}`}
            presentation={i % 3 === 0 ? slide({ direction: "from-right" }) : fade()}
            timing={linearTiming({ durationInFrames: TRANSITION })}
          />,
        );
      }
      return nodes;
    })}
  </TransitionSeries>
);

export const totalFrames =
  SLIDES.reduce((a, s) => a + s.frames, 0) - TRANSITION * (SLIDES.length - 1);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Charla" component={Charla} durationInFrames={totalFrames} fps={FPS} width={W} height={H} />
    {SLIDES.map((s) => (
      <Composition
        key={s.id}
        id={`slide-${s.id}`}
        component={() => s.el}
        durationInFrames={s.frames}
        fps={FPS}
        width={W}
        height={H}
      />
    ))}
  </>
);
