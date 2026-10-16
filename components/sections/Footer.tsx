import { Mail } from "lucide-react";

import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { FOOTER, SITE, WHATSAPP_DISPLAY, getWhatsAppLink, trips } from "@/data/site";

const linkClass =
  "inline-flex min-h-11 items-center gap-3 text-sm text-sand/80 transition-colors hover:text-white";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy pb-[calc(env(safe-area-inset-bottom)+1.5rem)] text-sand">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:pt-20">
        <div>
          <a href="#top" className="inline-flex min-h-11 items-center gap-3 text-2xl font-bold tracking-tight">
            <LogoMark className="size-11" />
            <span>
              AP<span className="text-coral">Surf</span>Trips
            </span>
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-sand/70">{FOOTER.tagline}</p>
        </div>

        <nav aria-label="Destinos">
          <h3 className="text-xs font-semibold tracking-[0.18em] text-sky uppercase">Destinos</h3>
          <ul className="mt-3 grid grid-cols-2 gap-x-4">
            {trips.map((trip) => (
              <li key={trip.id}>
                <a href={trip.pdf} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {trip.shortTitle}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.18em] text-sky uppercase">Contacto</h3>
          <ul className="mt-3">
            <li>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <WhatsAppIcon className="size-4" /> {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={linkClass}>
                <Mail className="size-4" aria-hidden /> {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <InstagramIcon className="size-4" /> {SITE.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-sand/15 px-5 pt-6 text-xs text-sand/60 sm:px-8">
        © {year} {SITE.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
