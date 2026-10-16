"use client";

import * as React from "react";
import Image from "next/image";
import { FileText } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { getWhatsAppLink, type Trip } from "@/data/site";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const toItems = (trips: Trip[]): WorksWheelItem[] =>
  trips.map((trip) => ({
    title: trip.title,
    shortTitle: trip.shortTitle,
    region: trip.region,
    image: trip.image,
    pdf: trip.pdf,
    whatsapp: getWhatsAppLink(trip.whatsappMessage),
  }));

/** Carrusel con scroll-snap para mobile y tablet. */
function TripsCarousel({ items }: { items: WorksWheelItem[] }) {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [active, setActive] = React.useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    // Al final del recorrido la última card puede no llegar al borde de snap.
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
    setActive(atEnd ? items.length - 1 : Math.round(el.scrollLeft / step));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({
      left: card.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft),
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-8 flex flex-col sm:mt-10">
      <ul
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-2 sm:scroll-px-8 sm:px-8"
      >
        {items.map((trip) => (
          <li
            key={trip.title}
            className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-[48%]"
          >
            <article className="overflow-hidden rounded-2xl bg-card shadow-[0_20px_40px_-24px_rgb(31_58_99/0.45)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={trip.image}
                  alt={`Surf en ${trip.shortTitle}`}
                  fill
                  sizes="(min-width: 768px) 48vw, (min-width: 640px) 60vw, 85vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold tracking-[0.18em] text-coral uppercase">
                  {trip.region}
                </p>
                <h3 className="mt-1 font-serif text-2xl italic">{trip.title}</h3>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={trip.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-navy/30 px-2 text-[0.8125rem] font-semibold whitespace-nowrap sm:text-sm"
                  >
                    <FileText className="size-4" aria-hidden />
                    Ver más
                  </a>
                  <a
                    href={trip.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-coral px-2 text-[0.8125rem] font-semibold whitespace-nowrap text-navy sm:text-sm"
                  >
                    <WhatsAppIcon className="size-4" />
                    Me interesa
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex justify-center">
        {items.map((trip, i) => (
          <button
            key={trip.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir a ${trip.shortTitle}`}
            aria-current={i === active}
            className="grid size-11 place-items-center"
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-all",
                i === active ? "w-6 bg-coral" : "w-2 bg-navy/25",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/** `trips` llega desde page.tsx con las fotos locales ya resueltas. */
export default function Trips({ trips }: { trips: Trip[] }) {
  const items = React.useMemo(() => toItems(trips), [trips]);
  // null hasta montar: el server y la hidratación renderizan el mismo placeholder.
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section
      id="destinos"
      className="flex h-svh min-h-[640px] flex-col justify-center bg-background pt-16 text-navy lg:min-h-[680px] lg:justify-start lg:pt-24"
    >
      <header className="px-5 text-center sm:px-8">
        <h2 className="font-script text-[clamp(1.9rem,4.2vw,2.6rem)] leading-[1.6]">
          nuestros destinos
        </h2>
        <p className="mt-1 text-[0.8rem] font-semibold tracking-[0.14em] uppercase sm:text-sm">
          Olas de clase mundial
        </p>
        <p className="mx-auto mt-3 hidden max-w-xl text-[0.95rem] text-navy/80 lg:block">
          Girá la rueda con el scroll o arrastrando, y elegí tu próximo trip.
        </p>
      </header>

      {isDesktop === null ? (
        <div className="flex-1" />
      ) : isDesktop ? (
        <WorksWheel items={items} className="min-h-0 flex-1" />
      ) : (
        <TripsCarousel items={items} />
      )}
    </section>
  );
}
