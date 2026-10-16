"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { WhatsAppIcon } from "@/components/icons";
import { REVEAL, getWhatsAppLink } from "@/data/site";

export default function ScrollReveal() {
  const ref = React.useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.15"],
  });

  // Se abre desde el centro: el recorte arranca en 18% arriba/abajo y 30% a los lados.
  const clipPath = useTransform(scrollYProgress, (p) => {
    const t = 1 - Math.min(1, Math.max(0, p));
    return `inset(${18 * t}% ${30 * t}% round ${24 * t}px)`;
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);

  return (
    <section ref={ref} className="relative bg-background">
      <motion.div
        className="relative h-[85svh] min-h-[480px] w-full overflow-hidden"
        style={reduced ? undefined : { clipPath }}
      >
        <motion.div className="absolute inset-0" style={reduced ? undefined : { scale }}>
          <Image
            src={REVEAL.image}
            alt={REVEAL.alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: REVEAL.objectPosition }}
          />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_24_44/0.75),rgb(12_24_44/0.15)_60%)]"
        />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-[clamp(3rem,10vh,6rem)] text-center text-white"
          style={reduced ? undefined : { opacity: textOpacity }}
        >
          <h2 className="max-w-[16ch] text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1.02] font-bold tracking-tight text-balance">
            {REVEAL.title}
          </h2>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-coral px-8 font-semibold text-navy transition-colors hover:bg-white sm:w-auto"
          >
            <WhatsAppIcon className="size-5" />
            {REVEAL.cta}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
