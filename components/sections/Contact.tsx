"use client";

import * as React from "react";

import { WhatsAppIcon } from "@/components/icons";
import {
  CONTACT,
  CONTACT_UNDECIDED,
  MONTHS,
  WHATSAPP_DISPLAY,
  getWhatsAppLink,
  trips,
} from "@/data/site";
import SectionHeading from "./SectionHeading";

// text-base en mobile: con menos de 16px iOS hace zoom al enfocar el campo.
const fieldClass =
  "mt-2 block min-h-12 w-full rounded-xl border border-navy/20 bg-white px-4 text-base text-navy transition-colors outline-none focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral md:text-[0.95rem]";

const labelClass = "text-xs font-semibold tracking-[0.14em] uppercase";

export default function Contact() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const trip = String(data.get("trip") ?? "");
    const month = String(data.get("month") ?? "");
    const surfers = String(data.get("surfers") ?? "");

    const people = Number(surfers) === 1 ? "1 surfer" : `${surfers} surfers`;
    const message = `¡Hola APSurfTrips! 🏄 Soy ${name}. Me interesa ${trip} para ${month}, somos ${people}. ¿Me pasan info?`;

    window.open(getWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contacto" className="scroll-mt-16 bg-background py-20 text-navy sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="text-center lg:text-left">
          <SectionHeading title="contacto" subtitle="Hablemos de tu trip" className="lg:text-left" />
          <h3 className="mt-8 font-serif text-[clamp(1.75rem,3.4vw,2.6rem)] leading-tight italic text-balance">
            {CONTACT.title}
          </h3>
          <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-navy/80 lg:mx-0">
            {CONTACT.text}
          </p>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 text-lg font-semibold text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            <WhatsAppIcon className="size-6" />
            Escribinos por WhatsApp
          </a>
          <p className="mt-4 text-sm text-navy/70">
            o escribinos directo al{" "}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-semibold text-navy underline decoration-coral decoration-2 underline-offset-4"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid gap-5 rounded-3xl bg-white p-6 shadow-[0_30px_60px_-40px_rgb(31_58_99/0.5)] sm:grid-cols-2 sm:p-8"
        >
          <label className="sm:col-span-2">
            <span className={labelClass}>Nombre</span>
            <input name="name" required autoComplete="name" placeholder="Tu nombre" className={fieldClass} />
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Destino</span>
            <select name="trip" required defaultValue="" className={fieldClass}>
              <option value="" disabled>
                Elegí un destino
              </option>
              {trips.map((trip) => (
                <option key={trip.id} value={trip.title}>
                  {trip.title}
                </option>
              ))}
              <option value={CONTACT_UNDECIDED.value}>{CONTACT_UNDECIDED.label}</option>
            </select>
          </label>
          <label>
            <span className={labelClass}>Mes</span>
            <select name="month" required defaultValue="" className={fieldClass}>
              <option value="" disabled>
                ¿Cuándo?
              </option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={labelClass}>Surfers</span>
            <input
              name="surfers"
              type="number"
              inputMode="numeric"
              min={1}
              max={30}
              defaultValue={1}
              required
              className={fieldClass}
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-8 font-semibold text-sand transition-colors hover:bg-coral hover:text-navy sm:col-span-2"
          >
            <WhatsAppIcon className="size-5" />
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
