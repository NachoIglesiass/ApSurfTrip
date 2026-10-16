import Image from "next/image";
import { Star } from "lucide-react";

import { TESTIMONIALS } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="scroll-mt-16 bg-white py-20 text-navy sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl sm:px-8">
        <SectionHeading
          title="testimonios"
          subtitle="Lo que dicen los que ya surfearon"
          className="px-5 sm:px-0"
        />

        {/* Carrusel con scroll-snap en mobile/tablet, grilla de 3 en desktop */}
        <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 sm:scroll-px-0 sm:px-0 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0">
          {TESTIMONIALS.map((t) => (
            <li
              key={t.name}
              className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-[46%] lg:w-auto"
            >
              <figure className="flex h-full flex-col rounded-2xl bg-background p-7">
                <div
                  className="flex gap-0.5 text-coral"
                  role="img"
                  aria-label={`${t.rating} de 5 estrellas`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className="size-4"
                      fill={i < t.rating ? "currentColor" : "none"}
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <Image
                    src={t.photo}
                    alt={`Foto de ${t.name}`}
                    width={56}
                    height={56}
                    sizes="56px"
                    className="size-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-navy/70">Surf trip a {t.trip}</p>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
