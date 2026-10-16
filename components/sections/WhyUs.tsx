import { Compass, Headset, Smile, Tag } from "lucide-react";

import { BENEFITS } from "@/data/site";
import SectionHeading from "./SectionHeading";

const ICONS = { compass: Compass, headset: Headset, tag: Tag, smile: Smile } as const;

export default function WhyUs() {
  return (
    <section className="bg-white py-20 text-navy sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading title="por qué elegirnos" subtitle="Por qué APSurfTrips" />

        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {BENEFITS.map((b) => {
            const Icon = ICONS[b.icon];
            return (
              <li key={b.title} className="text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-sky/25 text-navy">
                  <Icon className="size-7" strokeWidth={1.4} aria-hidden />
                </span>
                <h3 className="mt-5 font-serif text-[1.4rem] italic">{b.title}</h3>
                <p className="mx-auto mt-3 max-w-[30ch] text-[0.95rem] leading-relaxed text-navy/80">
                  {b.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
