"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { NAV_LINKS, SITE, getWhatsAppLink } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll de fondo y cierra con Escape mientras el menú está abierto.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow,color] duration-300",
        solid
          ? "bg-sand/85 text-navy shadow-[0_1px_0_rgb(31_58_99/0.08)] backdrop-blur-md"
          : "bg-transparent text-white",
      )}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20"
      >
        <a
          href="#top"
          className="relative z-10 flex min-h-11 items-center gap-2.5 text-xl font-bold tracking-tight lg:text-2xl"
          onClick={() => setOpen(false)}
        >
          <LogoMark className="size-9 lg:size-10" />
          <span>
            AP<span className="text-coral">Surf</span>Trips
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center px-4 text-sm font-medium tracking-wide opacity-90 transition-opacity hover:opacity-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-coral px-5 text-sm font-semibold text-navy transition-colors hover:bg-white sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Consultar
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-10 grid size-11 place-items-center rounded-full lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Panel mobile a pantalla completa */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 bg-navy pt-[calc(env(safe-area-inset-top)+5rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)] text-sand lg:hidden"
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-6">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center font-serif text-4xl italic"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-4">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-coral px-6 text-base font-semibold text-navy"
            >
              <WhatsAppIcon className="size-5" />
              Consultar por WhatsApp
            </a>
            <p className="text-center text-sm text-sand/60">{SITE.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
