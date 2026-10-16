"use client";

import * as React from "react";

/**
 * Lee un media query en el cliente. Devuelve `null` en el servidor y durante la
 * hidratación, así el primer render coincide con el HTML del servidor y recién
 * después se elige la variante correcta (sin hydration mismatch).
 */
export function useMediaQuery(query: string): boolean | null {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return React.useSyncExternalStore<boolean | null>(
    subscribe,
    () => window.matchMedia(query).matches,
    () => null,
  );
}

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)") === true;
}
