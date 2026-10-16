import { cn } from "@/lib/utils";

/** Encabezado de sección: título script + subtítulo en mayúsculas espaciadas. */
export default function SectionHeading({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <header className={cn("text-center", className)}>
      <div className="inline-flex flex-col items-center">
        <h2 className="border-b border-current px-4 pb-2 font-script text-[clamp(1.9rem,4.2vw,2.6rem)] leading-[1.6] sm:px-5">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 text-[0.8rem] font-semibold tracking-[0.14em] uppercase sm:text-sm">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}
