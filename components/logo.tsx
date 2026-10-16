import { cn } from "@/lib/utils";

/**
 * Isotipo de APSurfTrips. Se pinta con una máscara CSS sobre `currentColor`,
 * así toma el color del texto (blanco sobre el hero, navy con el navbar sólido).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        mask: "url(/assets/logo-ap-mark.png) center / contain no-repeat",
        WebkitMask: "url(/assets/logo-ap-mark.png) center / contain no-repeat",
      }}
    />
  );
}
