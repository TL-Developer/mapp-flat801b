export type ListingPhoto = {
  /**
   * Can be a local path in /public (e.g. "/photos/mapp-flat801b/01.jpg")
   * or a remote URL (e.g. "https://a0.muscache.com/im/pictures/...").
   */
  src: string;
  alt: string;
};

export type ListingAmenityGroup = {
  title: string;
  items: string[];
};

export type Listing = {
  name: string;
  tagline?: string;
  locationLine?: string;
  airbnbUrl: string;
  whatsappUrl?: string;
   instagramUrl?: string;
  description: string[];
  highlights: string[];
  amenityGroups: ListingAmenityGroup[];
  houseRules: string[];
  checkInOut?: {
    checkInFrom?: string;
    checkOutUntil?: string;
    selfCheckIn?: boolean;
  };
  photos: ListingPhoto[];
};

// NOTE:
// Airbnb usually blocks automated access, so this file is intentionally
// "data-driven": you paste the info (and photo URLs) here.
export const listing: Listing = {
  name: "Mapp Rio • Flat 801B",
  tagline: "Hospedagem premium • Estadia curta e média duração",
  locationLine: "São Paulo • Reública • Centro • Brasil",
  airbnbUrl: "https://airbnb.com.br/h/mapp-flat801b",
  // Troque pelo seu número real se quiser CTA direto no WhatsApp.
  whatsappUrl:
    "https://wa.me/5515991069958?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20me%20hospedar%20em%20um%20MAPP.",
  instagramUrl: "https://www.instagram.com/flat.801b/",
  description: [
    "Bem-vindo ao Mapp Rio Flat 801 B.",
    "Este site é a vitrine da acomodação. Aqui você encontra descrição, comodidades e galeria de fotos — e pode reservar pelo Airbnb.",
  ],
  highlights: [
    "Apartamento completo e bem localizado",
    "Check-in prático (autônomo, se aplicável)",
    "Wi‑Fi de alta velocidade",
    "Enxoval e limpeza profissional",
    "Escritório no local",
  ],
  amenityGroups: [
    {
      title: "Conforto",
      items: ["Ar-condicionado", "Cama confortável", "Roupa de cama e banho", "Ventiladores"],
    },
    {
      title: "Cozinha & lavanderia",
      items: ["Cozinha equipada", "Geladeira", "Micro-ondas"],
    },
    {
      title: "Tecnologia",
      items: ["Wi‑Fi", "Smart TV / streaming"],
    },
    {
      title: "Comodidades próximas",
      items: ["Mini mercado Market4You"],
    },
  ],
  houseRules: [
    "Não fumar",
    "Respeitar horário de silêncio do condomínio",
    "Somente hóspedes informados na reserva",
  ],
  checkInOut: {
    checkInFrom: "15:00",
    checkOutUntil: "11:00",
    selfCheckIn: true,
  },
  photos: [
    // Ajuste os nomes conforme os arquivos que você colocou em /public/images.
    { src: "/images/01.jpg", alt: "Sala" },
    { src: "/images/02.jpg", alt: "Quarto" },
    { src: "/images/03.jpg", alt: "Cozinha" },
    { src: "/images/04.jpg", alt: "Banheiro" },
    { src: "/images/05.jpg", alt: "Vista" },
    { src: "/images/06.jpg", alt: "Detalhes" },
  ],
};

