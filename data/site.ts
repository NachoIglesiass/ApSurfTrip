// Todo el contenido editable del sitio vive acá.

// Número en formato internacional para wa.me (sin "+", espacios ni guiones).
export const WHATSAPP_NUMBER = "5492291403866";
/** Cómo se muestra el número en el footer y en contacto. */
export const WHATSAPP_DISPLAY = "+54 2291 40-3866";

/** Mensaje general: navbar, hero, cómo funciona, scroll-reveal, contacto y footer. */
export const WHATSAPP_GENERAL_MESSAGE =
  "¡Hola APSurfTrips! 🏄 Quiero info sobre sus surf trips.";

export const SITE = {
  name: "APSurfTrips",
  // TODO: reemplazar con los datos reales.
  email: "hola@apsurftrips.com",
  instagram: "https://instagram.com/apsurftrips",
  instagramHandle: "@apsurftrips",
};

/** Arma una URL de Unsplash con un tamaño de origen razonable para next/image. */
const unsplash = (id: string, w = 2000, extra = "") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80${extra}`;

/** Link a WhatsApp con el mensaje codificado. Sin argumento usa el mensaje general. */
export function getWhatsAppLink(message: string = WHATSAPP_GENERAL_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Plantilla del mensaje de cada trip (botón "Me interesa"). */
const tripMessage = (title: string, region: string) =>
  `¡Hola APSurfTrips! 🏄 Me interesa el ${title} (${region}). ¿Me pasan fechas, precios y disponibilidad?`;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const HERO = {
  title: "Surfeá las mejores olas del mundo",
  subtitle:
    "Surf trips curados a los mejores destinos del planeta. Vos elegís la ola, nosotros nos ocupamos del resto.",
  video: "/assets/hero.mp4",
  videoMobile: "/assets/hero-mobile.mp4",
  // No hay ffmpeg instalado para extraer un frame del video: se usa una foto de un tubo.
  // TODO: reemplazar por /assets/hero-poster.jpg (frame del video).
  poster: unsplash("1459745930869-b3d0d72c3cbb", 1920),
  /** Encuadre del video. Cambialo (ej. "30% center") para centrar la ola en celular. */
  objectPosition: "center",
  /**
   * hero.mp4 trae franjas negras (letterbox) incrustadas: 117px arriba y abajo en
   * un video de 1080px. El video se agranda para que queden fuera del encuadre.
   * Si lo reemplazás por un video sin franjas, poné 0.
   */
  letterbox: 117 / 1080,
};

/* ------------------------------------------------------------------ */
/* Trips                                                               */
/* ------------------------------------------------------------------ */

export interface Trip {
  id: string;
  title: string;
  /** Nombre corto (sin "Surf Trip"): índice del WorksWheel y footer. */
  shortTitle: string;
  region: string;
  /**
   * Foto de portada. Para reemplazarla alcanza con poner el archivo en
   * /public/trips/{id}.jpg (o .webp / .png): si existe, se usa esa en lugar de
   * esta URL de Unsplash (ver lib/trip-images.ts).
   */
  image: string;
  /** Link al PDF con toda la info del viaje (Google Drive). */
  pdf: string;
  /** Mensaje de WhatsApp del botón "Me interesa". Editable por trip. */
  whatsappMessage: string;
}

export const trips: Trip[] = [
  {
    id: "praia-do-rosa",
    title: "Surf Trip Praia do Rosa",
    shortTitle: "Praia do Rosa",
    region: "Santa Catarina, Brasil",
    image: unsplash("1617202227468-7597afc7046d", 1600),
    pdf: "https://drive.google.com/file/d/1Bhxaotn4D93OByiyZ0HX8es5pifRRfxE/view",
    whatsappMessage: tripMessage("Surf Trip Praia do Rosa", "Santa Catarina, Brasil"),
  },
  {
    id: "itamambuca",
    title: "Surf Trip Itamambuca",
    shortTitle: "Itamambuca",
    region: "Ubatuba, Brasil",
    image: unsplash("1515323048176-f0a4f5201d31", 1600),
    pdf: "https://drive.google.com/file/d/1zePieKDctmE6wuz9VQVM-u_dSHiOpFxp/view",
    whatsappMessage: tripMessage("Surf Trip Itamambuca", "Ubatuba, Brasil"),
  },
  {
    id: "taghazout",
    title: "Surf Trip Taghazout",
    shortTitle: "Taghazout",
    region: "Marruecos",
    image: unsplash("1706007473856-14c727df7da5", 1600),
    pdf: "https://drive.google.com/file/d/1vkqHCjT_GhayBdRYv0upa-VLdesIo5ZQ/view",
    whatsappMessage: tripMessage("Surf Trip Taghazout", "Marruecos"),
  },
  {
    id: "miramar",
    title: "Surf Trip Miramar",
    shortTitle: "Miramar",
    region: "Buenos Aires, Argentina",
    image: unsplash("1730087356417-ec7c8c93ef86", 1600),
    pdf: "https://drive.google.com/file/d/1E3tWNly2LwL00yw3BO2O7vJkaSK6Ypxd/view",
    whatsappMessage: tripMessage("Surf Trip Miramar", "Buenos Aires, Argentina"),
  },
  {
    id: "chicama",
    title: "Surf Trip Chicama",
    shortTitle: "Chicama",
    region: "La Libertad, Perú",
    image: unsplash("1615169019958-78e317e81166", 1600),
    pdf: "https://drive.google.com/file/d/1NVEHVVZSORokWbsCgfPVvLmVA1Hh3rFb/view",
    whatsappMessage: tripMessage("Surf Trip Chicama", "La Libertad, Perú"),
  },
  {
    id: "santa-teresa",
    title: "Surf Trip Santa Teresa",
    shortTitle: "Santa Teresa",
    region: "Costa Rica",
    image: unsplash("1717697453509-039c2dd77663", 1600),
    pdf: "https://drive.google.com/file/d/1VRm6y1CbhX4G4Xu5hmEKR3b4oJJhLdXn/view",
    whatsappMessage: tripMessage("Surf Trip Santa Teresa", "Costa Rica"),
  },
];

/** Opción extra del select de contacto. `value` es lo que entra en el mensaje. */
export const CONTACT_UNDECIDED = {
  label: "Todavía no sé / quiero asesoramiento",
  value: "asesoramiento para elegir destino",
};

/* ------------------------------------------------------------------ */
/* Nuestra misión                                                      */
/* ------------------------------------------------------------------ */

export const MISSION = {
  title: "nuestra misión",
  subtitle: "Lo que hacemos por vos",
  // TODO: texto provisorio.
  intro:
    "APSurfTrips nace de una idea simple: que cada viaje sea el viaje de tu vida. Queremos que vivas las mismas olas y experiencias que tuvimos la suerte de vivir nosotros.",
  blocks: [
    {
      icon: "waves",
      color: "coral",
      title: "Viajes a medida",
      text: "Armamos tu surf trip según tu nivel, tus gustos y tu presupuesto, con consejos honestos basados en haber surfeado cada destino.",
      images: [
        { src: unsplash("1505142468610-359e7d316be0", 1400), alt: "Vista aérea de una ola rompiendo sobre agua turquesa" },
        { src: unsplash("1502680390469-be75c86b636f", 1400), alt: "Surfista dentro de un tubo" },
        { src: unsplash("1518837695005-2083093ee35b", 1400), alt: "Superficie del océano al atardecer" },
      ],
    },
    {
      icon: "palmtree",
      color: "sky",
      title: "Experiencias auténticas",
      text: "Guías locales y anfitriones elegidos a mano para que conozcas cada destino de verdad, más allá del line-up.",
      images: [
        { src: unsplash("1573843981267-be1999ff37cd", 1400), alt: "Bungalows sobre el agua en Maldivas" },
        { src: unsplash("1537996194471-e657df975ab4", 1400), alt: "Templo sobre un lago en Bali" },
        { src: unsplash("1517760444937-f6397edcbbcd", 1400), alt: "Persona frente a una cascada en la selva" },
      ],
    },
    {
      icon: "sprout",
      color: "navy",
      title: "Surf responsable",
      text: "Diseñamos cada viaje con principios de turismo responsable: buenos para vos, para las comunidades locales y para el océano.",
      images: [
        { src: unsplash("1502933691298-84fc14542831", 1400), alt: "Surfista sobre una tabla en agua cristalina" },
        { src: unsplash("1506929562872-bb421503ef21", 1400), alt: "Vista aérea de una playa con botes de pescadores" },
        { src: unsplash("1509233725247-49e657c54213", 1400), alt: "Palmeras frente a una playa tropical" },
      ],
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Por qué APSurfTrips                                                 */
/* ------------------------------------------------------------------ */

export const BENEFITS = [
  {
    icon: "compass",
    title: "Viajes seleccionados",
    text: "Solo trabajamos con destinos, olas y alojamientos que conocemos y recomendamos.",
  },
  {
    icon: "headset",
    title: "Asesoramiento experto",
    text: "Surfistas que te asesoran de verdad: temporada, nivel, tablas y logística.",
  },
  {
    icon: "tag",
    title: "Mejores precios",
    text: "Acuerdos directos con operadores locales para que pagues lo justo.",
  },
  {
    icon: "smile",
    title: "Cero estrés",
    text: "Vuelos, traslados, barcos y alojamiento resueltos. Vos solo remás.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Cómo funciona                                                       */
/* ------------------------------------------------------------------ */

export const STEPS = [
  { title: "Consultás", text: "Escribinos por WhatsApp con el destino y las fechas que tenés en mente." },
  { title: "Te armamos la propuesta", text: "Recibís un plan a medida con olas, alojamiento y presupuesto." },
  { title: "Reservás", text: "Confirmás con una seña y nos ocupamos de toda la logística." },
  { title: "Surfeás", text: "Llegás, te instalás y solo pensás en la próxima sesión." },
] as const;

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

export const REVEAL = {
  title: "Tu próxima ola te está esperando",
  cta: "Planeá tu trip",
  image: "/assets/surfer.png",
  alt: "Surfista dentro de un tubo visto desde abajo del agua",
  /** Encuadre en pantallas angostas: el surfista está a la derecha de la foto. */
  objectPosition: "70% center",
};

/* ------------------------------------------------------------------ */
/* Testimonios                                                         */
/* ------------------------------------------------------------------ */

// TODO: reemplazar con testimonios reales
export const TESTIMONIALS = [
  {
    name: "Sofía Martínez",
    trip: "Chicama",
    photo: unsplash("1494790108377-be9c29b29330", 400, "&h=400&crop=faces"),
    rating: 5,
    quote:
      "Olas larguísimas y cero preocupaciones. Nos armaron todo a medida y el alojamiento superó cualquier expectativa.",
  },
  {
    name: "Martín Rivas",
    trip: "Taghazout",
    photo: unsplash("1507003211169-0a1dd7228f2d", 400, "&h=400&crop=faces"),
    rating: 5,
    quote:
      "El asesoramiento fue clave: elegimos la temporada justa y surfeamos olas increíbles todos los días. Ya estamos planeando el próximo.",
  },
  {
    name: "Lucía Fernández",
    trip: "Praia do Rosa",
    photo: unsplash("1438761681033-6461ffad8d80", 400, "&h=400&crop=faces"),
    rating: 5,
    quote:
      "Fui con nivel intermedio y me recomendaron los spots ideales para mejorar. Atención impecable de principio a fin.",
  },
];

/* ------------------------------------------------------------------ */
/* Contacto y footer                                                   */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  title: "¿Listo para tu próximo surf trip?",
  text: "Contanos a dónde querés ir y te respondemos en el día. Sin compromiso.",
};

export const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const NAV_LINKS = [
  { href: "#destinos", label: "Destinos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export const FOOTER = {
  tagline: "Surf trips curados a las mejores olas del mundo.",
};
