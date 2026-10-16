import { WhatsAppIcon } from "@/components/icons";
import { STEPS, getWhatsAppLink } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  return (
    <section className="bg-background py-20 text-navy sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading title="cómo funciona" subtitle="De la idea a la ola en 4 pasos" />

        <div className="relative mt-14 lg:mt-16">
          {/* Conector: vertical en mobile, horizontal en desktop */}
          <div
            aria-hidden
            className="absolute top-7 bottom-7 left-7 w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,var(--navy)_55%,transparent_0)] bg-[length:1px_7px] opacity-50 lg:right-[12.5%] lg:bottom-auto lg:left-[12.5%] lg:h-px lg:w-auto lg:translate-x-0 lg:bg-[linear-gradient(to_right,var(--navy)_55%,transparent_0)] lg:bg-[length:7px_1px]"
          />
          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3.5rem_1fr] items-start gap-5 lg:grid-cols-1 lg:justify-items-center lg:gap-0 lg:text-center"
              >
                <span className="grid size-14 place-items-center rounded-full bg-navy font-serif text-2xl text-sand italic">
                  {i + 1}
                </span>
                <div className="pt-2 lg:pt-0">
                  <h3 className="font-serif text-[1.4rem] italic lg:mt-6">{step.title}</h3>
                  <p className="mt-2 max-w-[32ch] text-[0.95rem] leading-relaxed text-navy/80">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-coral px-10 font-semibold text-navy transition-colors hover:bg-navy hover:text-sand sm:w-auto"
          >
            <WhatsAppIcon className="size-5" />
            Empezar
          </a>
        </div>
      </div>
    </section>
  );
}
