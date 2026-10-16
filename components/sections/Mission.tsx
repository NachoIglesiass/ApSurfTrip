"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Palmtree, Sprout, Waves } from "lucide-react";
import { MotionConfig, motion } from "motion/react";

import { MISSION } from "@/data/site";
import { cn } from "@/lib/utils";

const ICONS = { waves: Waves, palmtree: Palmtree, sprout: Sprout } as const;

const CIRCLE = {
  coral: "bg-coral",
  sky: "bg-sky",
  navy: "bg-navy",
} as const;

type Slide = { readonly src: string; readonly alt: string };

/** Mini-slider con flechas, dots y swipe táctil. */
function MissionSlider({ images }: { images: readonly Slide[] }) {
  const [index, setIndex] = React.useState(0);
  const start = React.useRef<{ x: number; y: number } | null>(null);
  const count = images.length;

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <div
      className="group/slider relative aspect-[3/2] w-full touch-pan-y overflow-hidden bg-muted select-none"
      role="region"
      aria-roledescription="carrusel"
      onPointerDown={(e) => {
        start.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        if (!start.current) return;
        const dx = e.clientX - start.current.x;
        const dy = e.clientY - start.current.y;
        start.current = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
      }}
      onPointerCancel={() => {
        start.current = null;
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            className="relative h-full w-full shrink-0"
            aria-hidden={i !== index}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              draggable={false}
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 80vw, 90vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Foto anterior"
        className="absolute top-1/2 left-1 grid size-12 -translate-y-1/2 place-items-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0/0.45)] transition-opacity hover:opacity-80 sm:left-3"
      >
        <ChevronLeft className="size-12" strokeWidth={1} aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Foto siguiente"
        className="absolute top-1/2 right-1 grid size-12 -translate-y-1/2 place-items-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0/0.45)] transition-opacity hover:opacity-80 sm:right-3"
      >
        <ChevronRight className="size-12" strokeWidth={1} aria-hidden />
      </button>

      <div className="absolute bottom-1 left-3 flex sm:bottom-2 sm:left-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ver foto ${i + 1} de ${count}`}
            aria-current={i === index}
            className="grid h-11 w-[18px] place-items-center pointer-coarse:w-11"
          >
            <span
              className={cn(
                "block size-[9px] rounded-full transition-colors",
                i === index ? "bg-coral" : "bg-white",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Mission() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="nosotros"
        className="scroll-mt-20 bg-background py-16 text-navy sm:py-20 lg:py-24"
      >
        {/* Encabezado */}
        <header className="mx-auto max-w-[860px] px-6 text-center">
          <div className="inline-flex flex-col items-center">
            <h2 className="border-b border-navy px-4 pb-2 font-script text-[clamp(1.9rem,4.2vw,2.6rem)] leading-[1.6] lowercase sm:px-5">
              {MISSION.title}
            </h2>
            <p className="mt-3 text-[0.8rem] font-semibold tracking-[0.14em] uppercase sm:text-sm">
              {MISSION.subtitle}
            </p>
          </div>
          <p className="mt-8 text-[0.95rem] leading-relaxed text-navy/90">
            {MISSION.intro}
          </p>
        </header>

        {/* Timeline */}
        <div className="relative mx-auto mt-14 max-w-[1300px] px-5 sm:px-8 lg:mt-16">
          {/* Línea punteada: a la izquierda en mobile, al centro en desktop. */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[calc(1.25rem+1.75rem)] w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,var(--navy)_55%,transparent_0)] bg-[length:1px_7px] opacity-70 sm:left-[calc(2rem+1.75rem)] lg:-top-5 lg:-bottom-5 lg:left-1/2"
          />

          <ol className="relative flex flex-col gap-14 lg:gap-10">
            {MISSION.blocks.map((block, i) => {
              const Icon = ICONS[block.icon];
              const flip = i % 2 === 1; // texto a la izquierda, foto a la derecha

              return (
                <motion.li
                  key={block.title}
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-5 gap-y-6 sm:gap-x-8 lg:grid-cols-[minmax(0,1fr)_clamp(9rem,13vw,15.75rem)_minmax(0,1fr)] lg:items-center lg:gap-x-0"
                >
                  {/* Ícono sobre la línea */}
                  <div className="col-start-1 row-start-1 flex justify-center pt-2 lg:col-start-2 lg:pt-0">
                    <span
                      className={cn(
                        "grid size-14 place-items-center rounded-full text-white sm:size-16 lg:size-[92px]",
                        CIRCLE[block.color],
                      )}
                    >
                      <Icon className="size-[52%]" strokeWidth={1.1} aria-hidden />
                    </span>
                  </div>

                  {/* Slider */}
                  <div
                    className={cn(
                      "col-start-2 row-start-1",
                      flip ? "lg:col-start-3" : "lg:col-start-1",
                    )}
                  >
                    <MissionSlider images={block.images} />
                  </div>

                  {/* Texto */}
                  <div
                    className={cn(
                      "col-start-2 row-start-2 lg:row-start-1 lg:max-w-[330px]",
                      flip
                        ? "lg:col-start-1 lg:justify-self-end lg:text-right"
                        : "lg:col-start-3",
                    )}
                  >
                    <p className="font-hand text-[clamp(2.75rem,4vw,3.4rem)] leading-none font-medium">
                      {i + 1}.
                    </p>
                    <h3 className="mt-3 font-serif text-[clamp(1.4rem,2vw,1.65rem)] italic lg:mt-8">
                      {block.title}
                    </h3>
                    <p className="mt-4 text-[0.95rem] leading-[1.45] text-navy/90">
                      {block.text}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>
    </MotionConfig>
  );
}
