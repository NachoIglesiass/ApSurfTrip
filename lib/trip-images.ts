// Solo servidor (usa fs): se resuelve en build y el resultado se pasa como prop.
import fs from "node:fs";
import path from "node:path";

import type { Trip } from "@/data/site";

const EXTENSIONS = ["jpg", "webp", "png"] as const;

/**
 * Si existe /public/trips/{id}.jpg (o .webp / .png), esa foto reemplaza a la de
 * Unsplash definida en data/site.ts.
 */
export function withLocalTripImages(trips: Trip[]): Trip[] {
  return trips.map((trip) => {
    for (const ext of EXTENSIONS) {
      const file = path.join(process.cwd(), "public", "trips", `${trip.id}.${ext}`);
      if (fs.existsSync(file)) return { ...trip, image: `/trips/${trip.id}.${ext}` };
    }
    return trip;
  });
}
