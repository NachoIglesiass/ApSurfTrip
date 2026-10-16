import type { Metadata, Viewport } from "next";
import { Caveat, Homemade_Apple, Montserrat, Noto_Serif } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
});

const homemadeApple = Homemade_Apple({
  variable: "--font-homemade-apple",
  subsets: ["latin"],
  weight: "400",
});

// Script para numerales: los de Homemade Apple no se leen bien ("1." parece "/.").
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "APSurfTrips | Surf trips a las mejores olas del mundo",
  description:
    "Agencia de surf trips: Praia do Rosa, Itamambuca, Taghazout, Miramar, Chicama y Santa Teresa. Viajes a medida con asesoramiento experto.",
};

export const viewport: Viewport = {
  // Necesario para que env(safe-area-inset-*) funcione en iOS.
  viewportFit: "cover",
  themeColor: "#1f3a63",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${notoSerif.variable} ${homemadeApple.variable} ${caveat.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
