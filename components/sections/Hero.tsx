"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ChevronDown } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons";
import { getWhatsAppLink } from "@/data/site";
import { useMediaQuery } from "@/hooks/use-media-query";

/** Encuadre del video (object-position). Cambialo para centrar la ola. */
const VIDEO_POSITION = "center";
const VIDEO_POSITION_MOBILE = "center";

const POSTER = "/assets/hero-poster.jpg";
// TODO: temporal hasta generar las versiones optimizadas con ffmpeg. Si los
// archivos de arriba no existen, el navegador cae a este <source>.
const FALLBACK_SOURCE = { src: "/assets/hero.mp4", type: "video/mp4" };
/** hero.mp4 trae franjas negras incrustadas: 117px arriba y abajo sobre 1080. */
const FALLBACK_LETTERBOX = 117 / 1080;

const DESKTOP_SOURCES = [
  { src: "/assets/hero-1080.webm", type: "video/webm" },
  { src: "/assets/hero-1080.mp4", type: "video/mp4" },
  FALLBACK_SOURCE,
];
// Si se agrega hero-mobile.mp4 (vertical), generar hero-mobile-720.mp4 y apuntar acá.
const MOBILE_SOURCES = [{ src: "/assets/hero-720.mp4", type: "video/mp4" }, FALLBACK_SOURCE];

const WORDS = ["tu próxima ola", "surf trips", "olas perfectas", "aventuras"];
const WORD_INTERVAL = 3000;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Hero() {
  const reduced = useReducedMotion() ?? false;
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const sectionRef = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const posterRef = React.useRef<HTMLImageElement>(null);
  const [videoReady, setVideoReady] = React.useState(false);
  const [isFallback, setIsFallback] = React.useState(false);
  const [posterOk, setPosterOk] = React.useState(true);
  const [wordIndex, setWordIndex] = React.useState(0);

  // La fuente se decide recién después del mount: cada dispositivo baja un solo video.
  const variant = isDesktop === null || prefersReduced !== false ? null : isDesktop ? "desktop" : "mobile";
  const sources = variant === "desktop" ? DESKTOP_SOURCES : MOBILE_SOURCES;
  const objectPosition = variant === "mobile" ? VIDEO_POSITION_MOBILE : VIDEO_POSITION;

  // El error del poster puede dispararse antes de hidratar: se revisa también al montar.
  React.useEffect(() => {
    const img = posterRef.current;
    if (img?.complete && img.naturalWidth === 0) setPosterOk(false);
  }, []);

  React.useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), WORD_INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced]);

  // Pausa el video fuera de pantalla para liberar CPU/batería mientras se scrollea.
  React.useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [variant]);

  const handleCanPlay = () => {
    setVideoReady(true);
    setIsFallback(videoRef.current?.currentSrc.endsWith(FALLBACK_SOURCE.src) ?? false);
    // Si el navegador bloquea el autoplay (ej. ahorro de batería en iOS) queda el poster.
    videoRef.current?.play().catch(() => {});
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex h-svh min-h-[560px] w-full items-end justify-center overflow-hidden bg-navy text-white"
    >
      {/* Poster debajo del video: se ve mientras carga y cuando no hay autoplay. */}
      {posterOk && (
        // eslint-disable-next-line @next/next/no-img-element -- mismo archivo que el poster del video
        <img
          ref={posterRef}
          src={POSTER}
          alt=""
          aria-hidden
          fetchPriority="high"
          onError={() => setPosterOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
        />
      )}

      {variant && (
        <video
          key={variant}
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          // Con el fallback, el video se agranda para que las franjas negras queden fuera del encuadre.
          style={
            isFallback
              ? {
                  objectPosition,
                  height: `${100 / (1 - 2 * FALLBACK_LETTERBOX)}%`,
                  top: `${(-100 * FALLBACK_LETTERBOX) / (1 - 2 * FALLBACK_LETTERBOX)}%`,
                }
              : { objectPosition }
          }
          poster={posterOk ? POSTER : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          aria-hidden
          tabIndex={-1}
          onCanPlay={handleCanPlay}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}

      {/* Overlays en divs aparte: nunca filtros ni blend sobre el <video>. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[150px] bg-linear-to-b from-black/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-t from-black/55 via-black/15 to-transparent"
      />

      <motion.div
        variants={container}
        initial={reduced ? false : "hidden"}
        animate="show"
        className="relative z-10 flex w-full max-w-4xl flex-col items-center px-5 pb-[calc(env(safe-area-inset-bottom)+5.5rem)] text-center sm:px-8 sm:pb-[calc(env(safe-area-inset-bottom)+7rem)]"
      >
        <h1 className="flex flex-col items-center">
          <motion.span
            variants={item}
            className="relative block h-[clamp(4.25rem,9.5vw,8rem)] w-full font-script text-[clamp(2.5rem,6vw,5rem)] leading-none text-[#7FD1EE] [text-shadow:0_2px_18px_rgb(0_0_0/0.35)]"
          >
            <AnimatePresence initial={false}>
              <motion.span
                key={WORDS[wordIndex]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.span>
          <motion.span
            variants={item}
            className="mt-4 block text-[clamp(0.95rem,1.8vw,1.5rem)] font-semibold tracking-[0.25em] uppercase [text-shadow:0_1px_10px_rgb(0_0_0/0.3)]"
          >
            Te está esperando
          </motion.span>
        </h1>

        <motion.div
          variants={item}
          aria-hidden
          className="mt-5 h-px w-[clamp(200px,25vw,340px)] bg-white/70"
        />

        <motion.p
          variants={item}
          className="mt-5 max-w-[46rem] text-[clamp(0.65rem,1vw,0.8rem)] leading-relaxed font-medium tracking-[0.2em] text-balance text-white/85 uppercase"
        >
          Surf trips a medida · Argentina · Brasil · Perú · Marruecos · Costa Rica
        </motion.p>

        <motion.div variants={item} className="mt-7 flex w-full flex-wrap justify-center gap-3">
          <a
            href="#destinos"
            className="inline-flex max-w-[320px] grow items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-navy transition-colors hover:bg-sand sm:grow-0"
          >
            Ver destinos
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-[320px] grow items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:grow-0"
          >
            <WhatsAppIcon className="size-4" />
            Hablar con un asesor
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        href="#destinos"
        aria-label="Bajar a destinos"
        className="absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-10 mx-auto grid size-11 place-items-center text-white/80 transition-colors hover:text-white"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="size-7" strokeWidth={1.5} aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
