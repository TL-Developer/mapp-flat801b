import Image from "next/image";
import { listing } from "@/lib/listings/mapp-flat801b";
import { Gallery } from "@/app/components/Gallery";
import fs from "fs";
import path from "path";

type GalleryImage = {
  src: string;
  alt: string;
};

function getGalleryImages(): GalleryImage[] {
  const dir = path.join(process.cwd(), "public", "images");

  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    return files
      .filter(
        (entry) =>
          entry.isFile() &&
          /\.(jpe?g|avif|png|webp)$/i.test(entry.name)
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) => ({
        src: `/images/${entry.name}`,
        alt: entry.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      }));
  } catch {
    return [];
  }
}

export default function Home() {
  const whatsappUrl = listing.whatsappUrl ?? listing.airbnbUrl;
  const galleryImages = getGalleryImages();
  const heroBackground = (galleryImages[2] ?? listing.photos[0])?.src;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-white/5">
              <Image
                src="/images/logo.jpg"
                alt={listing.name}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-[0.12em]">
                {listing.name}
              </span>
              <span className="text-xs text-neutral-400">{listing.locationLine}</span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
            <a href="#sobre" className="hover:text-white">
              Sobre
            </a>
            <a href="#video" className="hover:text-white">
              Vídeo
            </a>
            <a href="#fotos" className="hover:text-white">
              Fotos
            </a>
            <a href="#comodidades" className="hover:text-white">
              Comodidades
            </a>
            <a href="#guias" className="hover:text-white">
              Guias
            </a>
            <a href="#regras" className="hover:text-white">
              Regras
            </a>
            <a href="#contato" className="hover:text-white">
              Reserva
            </a>
            {listing.instagramUrl && (
              <a
                href={listing.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={listing.airbnbUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-100 transition hover:border-white/30 md:inline-flex"
            >
              Ver no Airbnb
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.25)] transition hover:bg-emerald-400/20 hover:text-emerald-100"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Falar / Reservar
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 space-y-24 md:space-y-32">
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {listing.tagline ?? "Hospedagem premium"}
            </span>

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {listing.name}
            </h1>

            <div className="max-w-xl space-y-2 text-balance text-sm text-neutral-300 sm:text-base">
              {listing.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#fotos"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-medium text-neutral-950 shadow-lg shadow-emerald-500/25 transition hover:bg-neutral-100"
              >
                Ver fotos
              </a>
              <a
                href={listing.airbnbUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-neutral-100 hover:border-white/40"
              >
                Reservar no Airbnb
                <span className="text-xs text-neutral-400">link oficial</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-xs text-neutral-400">
              {listing.highlights.slice(0, 5).map((h) => (
                <div key={h} className="space-y-1">
                  <p className="font-semibold text-neutral-200">{h}</p>
                  <p className="text-neutral-400/90">—</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-emerald-400/10 to-neutral-900 p-1.5 shadow-[0_35px_120px_rgba(34,197,94,0.18)] sm:h-[320px]">
            {heroBackground && (
              <Image
                src={heroBackground}
                alt={listing.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover opacity-40"
              />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.45),_transparent_55%)]" />
            <div className="relative flex h-full flex-col justify-between rounded-2xl bg-neutral-950/50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-400">Acomodação</p>
                  <p className="text-sm font-medium text-neutral-50">{listing.name}</p>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Link oficial no Airbnb
                </span>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-[11px] text-neutral-300">
                  {(galleryImages.length ? galleryImages : listing.photos)
                    .slice(0, 3)
                    .map((p) => (
                    <div
                      key={p.src}
                      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 768px) 33vw, 180px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                      <p className="absolute bottom-2 left-2 rounded-full bg-black/45 px-2 py-1 text-[10px] font-medium backdrop-blur">
                        {p.alt}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <div>
                    <p className="font-medium text-neutral-100">Check-in / Check-out</p>
                    <p className="text-[11px] text-neutral-400">
                      {listing.checkInOut?.checkInFrom
                        ? `Check-in a partir de ${listing.checkInOut.checkInFrom}`
                        : "Consulte no Airbnb"}
                      {listing.checkInOut?.checkOutUntil
                        ? ` • Check-out até ${listing.checkInOut.checkOutUntil}`
                        : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-neutral-400">reservas e valores</p>
                    <p className="text-sm font-semibold text-emerald-300">
                      direto no Airbnb
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre este espaço */}
        <section id="sobre" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold sm:text-xl">Sobre este espaço</h2>
            <p className="max-w-3xl text-sm text-neutral-300">
              Flat confortável e funcional, localizado em região estratégica no coração
              do Centro de São Paulo, com fácil acesso a serviços, mercados,
              restaurantes e atrações culturais. Próximo a três estações de metrô,
              Teatro Municipal, Edifício Itália, Bar Brahma, Galeria do Rock, Santa
              Ifigênia e Rua 25 de Março. Conta com estacionamentos nas proximidades,
              ponto de ônibus em frente à Av. Rio Branco, acesso facilitado por
              aplicativos de transporte e bicicletário de uso livre. Ideal para
              trabalho ou turismo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-100">O espaço</h3>
              <p className="text-sm text-neutral-300">
                O apartamento acomoda confortavelmente até 6 pessoas. Conta com 1 cama
                de casal, 1 sofá-cama e 1 cama de solteiro com cama auxiliar. O lar é
                aconchegante e totalmente equipado com utensílios domésticos
                essenciais, incluindo micro-ondas, panelas, potes, utensílios e
                aparelho de jantar.
              </p>
              <p className="text-sm text-neutral-300">
                A residência também dispõe de mesa de escritório e bancada funcional,
                ideal para estudo ou trabalho.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-100">
                Acesso do hóspede
              </h3>
              <p className="text-sm text-neutral-300">
                Os hóspedes poderão utilizar as áreas comuns do condomínio, respeitando
                sempre as normas internas. Estão disponíveis para uso:
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-300">
                <li>Playground</li>
                <li>Brinquedoteca</li>
                <li>Piscina</li>
                <li>Mesa de ping-pong</li>
                <li>Fitness / Academia</li>
                <li>Espaço Crossfit</li>
              </ul>
              <p className="text-sm text-neutral-300">
                Essas áreas funcionam diariamente das 9h às 22h.
              </p>
              <p className="text-sm text-neutral-300">
                O coworking também está disponível para uso, porém mediante reserva
                prévia, conforme regras do condomínio, com uso de até 4h por dia.
              </p>
              <p className="text-sm text-neutral-300">
                Pedimos a gentileza de respeitar os horários e zelar pelos espaços, para
                garantir uma boa experiência a todos.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-neutral-100">Endereço</h3>
              <p className="text-sm text-neutral-300">
                Av. Rio Branco, 82 — CEP 01206-000 · Centro, São Paulo - SP
              </p>
            </div>

            <h3 className="text-sm font-semibold text-neutral-100">
              Outras observações
            </h3>
            <p className="text-sm text-neutral-300">
              Sempre à disposição no que precisarem. Fiquem à vontade.
            </p>
          </div>
        </section>

        {/* Vídeo */}
        <section id="video" className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold sm:text-xl">Vídeo do apartamento</h2>
              <p className="max-w-2xl text-sm text-neutral-300">
                Assista a um tour rápido pelo {listing.name}.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/60">
            <video
              controls
              className="h-full w-full"
              poster={
                (galleryImages[0] ?? listing.photos[0])?.src ?? undefined
              }
            >
              <source src="/images/video_1.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo HTML5.
            </video>
          </div>
        </section>

        {/* Fotos */}
        <section id="fotos" className="space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold sm:text-xl">Fotos</h2>
              <p className="max-w-2xl text-sm text-neutral-300">
                Galeria do {listing.name}.
              </p>
            </div>
            <a
              href={listing.airbnbUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-neutral-100 transition hover:border-white/30"
            >
              Ver galeria completa no Airbnb
            </a>
          </div>

          <Gallery
            images={galleryImages.length ? galleryImages : listing.photos}
          />
        </section>

        {/* O que esse lugar oferece */}
        <section id="comodidades" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold sm:text-xl">
              O que esse lugar oferece
            </h2>
            <p className="max-w-2xl text-sm text-neutral-300">
              Lista detalhada das comodidades, serviços e itens disponíveis (e não
              disponíveis) no {listing.name}.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">Banheiro</h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Chuveiro externo</li>
                  <li>Água quente</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Quarto e lavanderia
                </h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Cabides</li>
                  <li>Cobertores e travesseiros extras</li>
                  <li>Blackout nas cortinas</li>
                  <li>Local para guardar roupas: guarda-roupa</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Entretenimento
                </h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Conexão à Ethernet</li>
                  <li>TV</li>
                  <li>Mesa de ping pong</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">Família</h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Cadeira alta</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Segurança doméstica
                </h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Câmeras de segurança na parte externa da propriedade</li>
                  <li>
                    Condomínio equipado com câmeras nas áreas internas e externas, para
                    maior controle, monitoramento e segurança de moradores e visitantes.
                  </li>
                  <li>Extintor de incêndio</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Internet e escritório
                </h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Wi‑Fi</li>
                  <li>Espaço de trabalho exclusivo</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Cozinha e sala de jantar
                </h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Cozinha completa onde os hóspedes podem preparar refeições</li>
                  <li>Geladeira Panasonic</li>
                  <li>Micro-ondas</li>
                  <li>Itens básicos de cozinha (vasilhas, panelas, óleo, sal, pimenta)</li>
                  <li>Louças e talheres (tigelas, pratos, copos etc.)</li>
                  <li>Fogão a gás</li>
                  <li>Taças de vinho</li>
                  <li>Torradeira</li>
                  <li>Liquidificador</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Características da localização
                </h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Entrada privada (por outra rua ou prédio)</li>
                  <li>Lavanderia nas proximidades</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">Ar livre</h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Bicicletas</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">Condomínio</h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Mini Mercado Market4you</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Estacionamento e instalações
                </h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Piscina</li>
                  <li>Elevador (cabine ampla e porta larga)</li>
                  <li>Academia privativa no prédio</li>
                  <li>Estacionamento pago fora da propriedade</li>
                  <li>Ventiladores no apartamento</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">Serviços</h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>
                    Animais somente com autorização prévia (animais de assistência
                    sempre permitidos)
                  </li>
                  <li>Self check-in com fechadura inteligente</li>
                </ul>
              </article>
            </div>

            <div className="space-y-3">
              <article className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">Não incluso</h3>
                <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                  <li>Máquina de lavar roupas</li>
                  <li>Secadora</li>
                  <li>Ar-condicionado</li>
                  <li>Itens de banheiro considerados “básico” pelo Airbnb</li>
                  <li>Detector de fumaça</li>
                  <li>Alarme/detector de monóxido de carbono</li>
                  <li>Aquecimento</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Segurança e propriedade
                </h3>
                <p className="mt-2 text-[12px] text-neutral-300">
                  Evite surpresas ao conferir estas informações importantes sobre a
                  propriedade do anfitrião.
                </p>
                <ul className="mt-3 space-y-1 text-[12px] text-neutral-300">
                  <li>
                    <span className="font-medium">Dispositivos de segurança</span>
                  </li>
                  <li>Câmeras de segurança na parte externa da propriedade.</li>
                  <li>
                    Condomínio equipado com câmeras de segurança nas áreas internas e
                    externas, garantindo maior controle, monitoramento e segurança aos
                    moradores e visitantes.
                  </li>
                </ul>
                <ul className="mt-3 space-y-1 text-[12px] text-neutral-300">
                  <li>
                    <span className="font-medium">Alarme de monóxido de carbono não informado</span>
                  </li>
                  <li>
                    O anfitrião não informou que a propriedade tem um detector de
                    monóxido de carbono. Sugerimos levar um detector portátil para sua
                    viagem.
                  </li>
                </ul>
                <ul className="mt-3 space-y-1 text-[12px] text-neutral-300">
                  <li>
                    <span className="font-medium">Detector de fumaça não informado</span>
                  </li>
                  <li>
                    O anfitrião não informou que a propriedade tem um detector de
                    fumaça. Sugerimos levar um detector portátil para sua viagem.
                  </li>
                </ul>
                <ul className="mt-3 space-y-1 text-[12px] text-neutral-300">
                  <li>
                    <span className="font-medium">Informações da propriedade</span>
                  </li>
                  <li>Não há estacionamento na propriedade.</li>
                  <li>
                    Não tem vagas de estacionamento no condomínio, mas há em volta
                    estacionamentos credenciados com seguro próximos.
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Guias turísticos e pontos de interesse */}
        <section id="guias" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold sm:text-xl">
              Guias turísticos e pontos de interesse próximos
            </h2>
            <p className="max-w-3xl text-sm text-neutral-300">
              Algumas sugestões de lugares clássicos para conhecer na região central de
              São Paulo — ideais para combinar com sua estadia no {listing.name}.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">Bar Brahma</h3>
                <p className="text-[11px] text-emerald-200">
                  323 moradores locais recomendam
                </p>
              </div>
              <p className="text-sm text-neutral-300">
                Bar tradicional e icônico de São Paulo, fundado em 1948 na esquina das
                avenidas Ipiranga e São João, no Centro Histórico. Une charme histórico
                e clima boêmio, com gastronomia e música ao vivo — especialmente samba e
                MPB — criando uma experiência bem paulistana.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Sujinho Centro da Cidade
                </h3>
                <p className="text-[11px] text-emerald-200">
                  45 moradores locais recomendam
                </p>
              </div>
              <p className="text-sm text-neutral-300">
                Restaurante tradicional conhecido por suas carnes generosas e ambiente
                clássico e descontraído. Famoso pela bisteca bovina de cerca de 700 g e
                pratos fartos, é uma ótima opção para almoço ou jantar com clima de
                restaurante brasileiro raiz.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Mercado Municipal de São Paulo (Mercadão)
                </h3>
                <p className="text-[11px] text-emerald-200">
                  1006 moradores locais recomendam
                </p>
              </div>
              <p className="text-sm text-neutral-300">
                Mercado histórico inaugurado em 1933, famoso pelos vitrais coloridos, as
                bancas de frutas, temperos, queijos e embutidos e, claro, pelos
                sanduíches de mortadela e pastéis generosos. Ponto obrigatório para
                experimentar a culinária local.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">Ponto Chic</h3>
                <p className="text-[11px] text-emerald-200">
                  39 moradores locais recomendam
                </p>
              </div>
              <p className="text-sm text-neutral-300">
                Restaurante tradicional famoso por ser o berço do lanche bauru, criado
                em 1934. Ambiente clássico e receita original com pão francês, queijo
                derretido, rosbife, tomate e picles fazem do local um ícone da
                gastronomia paulistana.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Galeria do Rock
                </h3>
                <p className="text-[11px] text-emerald-200">
                  282 moradores locais recomendam
                </p>
              </div>
              <p className="text-sm text-neutral-300">
                Edifício icônico inaugurado em 1963, com dezenas de lojas voltadas para
                música, moda alternativa e cultura urbana. Ponto de encontro de tribos,
                com camisetas, vinis, estúdios de tatuagem e um ambiente vibrante.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Teatro Municipal de São Paulo
                </h3>
                <p className="text-[11px] text-emerald-200">
                  715 moradores locais recomendam
                </p>
              </div>
              <p className="text-sm text-neutral-300">
                Um dos espaços culturais mais importantes da cidade, inaugurado em 1911
                e inspirado nos grandes teatros europeus. Palco de óperas, balés e
                concertos, também oferece visitas guiadas que revelam a riqueza
                arquitetônica interna.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">Sampa Sky</h3>
                <p className="text-[11px] text-emerald-2
00">
                  179 moradores locais recomendam
                </p>
              </div>
              <p className="text-sm text-neutral-300">
                Mirante panorâmico no 42º andar do Edifício Mirante do Vale, com decks
                de vidro que se projetam para fora da fachada, dando a sensação de
                flutuar sobre São Paulo. Um dos pontos mais fotogênicos da cidade para
                ver o skyline e o pôr do sol.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Rua 25 de Março
                </h3>
                <p className="text-[11px] text-emerald-200">Muitos locais recomendam</p>
              </div>
              <p className="text-sm text-neutral-300">
                Uma das áreas de comércio mais movimentadas do Brasil, famosa pela
                grande variedade de lojas e preços acessíveis. Ideal para compras de
                artigos de festa, bijuterias, roupas, presentes e muito mais.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Rua Santa Ifigênia
                </h3>
                <p className="text-[11px] text-emerald-200">Muitos locais recomendam</p>
              </div>
              <p className="text-sm text-neutral-300">
                Polo tradicional de comércio de eletrônicos e tecnologia, com muitas
                lojas especializadas em computadores, componentes, cabos e equipamentos
                de som. Muito procurado por técnicos e quem busca bons preços em
                tecnologia.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Edifício Copan
                </h3>
                <p className="text-[11px] text-emerald-200">
                  81 moradores locais recomendam
                </p>
              </div>
              <p className="text-sm text-neutral-300">
                Ícone da arquitetura moderna brasileira, projetado por Oscar Niemeyer.
                Com formato curvo e centenas de unidades residenciais, reúne comércio,
                restaurantes e um recorte diverso da vida paulistana em um único
                edifício.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Farol Santander
                </h3>
                <p className="text-[11px] text-emerald-200">
                  356 moradores locais recomendam
                </p>
              </div>
              <p className="text-sm text-neutral-300">
                Centro cultural instalado em prédio histórico que foi sede do Banco
                Banespa. Reúne exposições, espaços interativos, café, áreas de lazer e
                um mirante com vista privilegiada da cidade.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Pinacoteca do Estado de São Paulo
                </h3>
                <p className="text-[11px] text-emerald-200">
                  1562 moradores locais recomendam
                </p>
              </div>
              <p className="text-sm text-neutral-300">
                Um dos museus de arte mais importantes do Brasil, com acervo focado em
                arte brasileira do século XIX à contemporaneidade. Localizado em prédio
                histórico próximo à Estação da Luz.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">Anhangabaú</h3>
                <p className="text-[11px] text-emerald-200">Muitos locais recomendam</p>
              </div>
              <p className="text-sm text-neutral-300">
                Praça e vale no Centro, ideal para caminhadas, fotos e eventos ao ar
                livre. Costuma receber programações culturais e é um bom ponto para
                sentir o movimento da cidade.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Rua General Osório
                </h3>
                <p className="text-[11px] text-emerald-200">Muitos locais recomendam</p>
              </div>
              <p className="text-sm text-neutral-300">
                Região conhecida pelo comércio de peças para motos e carros, com muitas
                lojas especializadas e preços competitivos.
              </p>
            </article>

            <article className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  Hospital da Mulher
                </h3>
                <p className="text-[11px] text-emerald-200">
                  13 moradores locais recomendam
                </p>
              </div>
              <p className="text-sm text-neutral-300">
                Hospital público estadual especializado em saúde feminina, localizado na
                Av. Rio Branco. Referência em atendimentos ginecológicos, obstétricos e
                outras especialidades, atendendo pelo SUS.
              </p>
            </article>
          </div>
        </section>

        {/* Regras */}
        <section id="regras" className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold sm:text-xl">Regras da casa</h2>
              <p className="max-w-3xl text-sm text-neutral-300">
                Lembre-se de que você vai estar na casa de alguém, por isso, trate o
                espaço com cuidado e respeito.
              </p>
              <p className="max-w-3xl text-[12px] text-neutral-400">
                Em caso de divergência, prevalecem as políticas e regras da página
                oficial no Airbnb.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-neutral-200">
              <p className="font-medium text-neutral-100">Check-in / Check-out</p>
              <p className="mt-1 text-neutral-300">
                {listing.checkInOut?.checkInFrom
                  ? `Check-in a partir de ${listing.checkInOut.checkInFrom}`
                  : "Check-in: consulte no Airbnb"}
              </p>
              <p className="text-neutral-300">
                {listing.checkInOut?.checkOutUntil
                  ? `Check-out até ${listing.checkInOut.checkOutUntil}`
                  : "Check-out: consulte no Airbnb"}
              </p>
              {typeof listing.checkInOut?.selfCheckIn === "boolean" ? (
                <p className="mt-1 text-neutral-400">
                  {listing.checkInOut.selfCheckIn ? "Check-in autônomo" : "Check-in com anfitrião"}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-2 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-sm font-semibold text-neutral-100">
                Durante sua estadia
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                <li>Máximo de 6 hóspedes.</li>
                <li>
                  Horário de silêncio: <span className="font-medium">22:00 - 08:00</span>.
                </li>
                <li>Não são permitidas festas ou eventos.</li>
                <li>Fotografia comercial permitida.</li>
                <li>Proibido fumar.</li>
                <li>
                  Animais de estimação: <span className="font-medium">não são permitidos</span>, salvo
                  autorização prévia registrada na plataforma. Animais de assistência
                  sempre são permitidos.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-sm font-semibold text-neutral-100">
                Antes de deixar o local
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                <li>Recolha as toalhas usadas.</li>
                <li>Tire o lixo.</li>
                <li>Desligue luzes e equipamentos.</li>
                <li>Devolva as chaves (se houver) e/ou controle.</li>
                <li>Tranque tudo.</li>
              </ul>
            </article>
          </div>

          <div className="grid gap-4 pt-2 md:grid-cols-2">
            <article className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-neutral-100">
                Silêncio e convivência
              </h3>
              <p className="text-sm text-neutral-300">
                Pedimos respeito às normas do condomínio e à Lei do Silêncio,
                especialmente no período entre 22h e 8h. Evite ruídos excessivos.
              </p>
            </article>

            <article className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-neutral-100">
                Proibido fumar
              </h3>
              <p className="text-sm text-neutral-300">
                É terminantemente proibido fumar dentro do apartamento. Caso a regra
                seja descumprida, será aplicada taxa adicional de limpeza.
              </p>
            </article>

            <article className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-neutral-100">
                Cuidados com o imóvel
              </h3>
              <p className="text-sm text-neutral-300">
                O hóspede é responsável pela conservação do imóvel, móveis,
                eletrodomésticos e utensílios. Quaisquer danos, perdas ou quebras serão
                cobrados conforme as regras do Airbnb.
              </p>
            </article>

            <article className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-neutral-100">
                Limpeza e organização
              </h3>
              <p className="text-sm text-neutral-300">
                O apartamento deve ser entregue em condições adequadas, com:
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-300">
                <li>Louça limpa</li>
                <li>Lixo descartado nos locais indicados</li>
                <li>Móveis no local original</li>
              </ul>
            </article>

            <article className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-neutral-100">
                Uso de água e energia
              </h3>
              <p className="text-sm text-neutral-300">
                Utilize de forma consciente. Ao sair do apartamento, desligue luzes e
                equipamentos.
              </p>
            </article>

            <article className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-neutral-100">Segurança</h3>
              <p className="text-sm text-neutral-300">
                Certifique-se de fechar portas e janelas ao sair. O anfitrião não se
                responsabiliza por objetos pessoais esquecidos no imóvel.
              </p>
            </article>

            <article className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-2">
              <h3 className="text-sm font-semibold text-neutral-100">
                Fechadura inteligente e controle
              </h3>
              <p className="text-sm text-neutral-300">
                O mau uso da fechadura ou controle implicará cobrança para reposição.
              </p>
            </article>

            <article className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-2">
              <h3 className="text-sm font-semibold text-neutral-100">Proibições</h3>
              <ul className="mt-2 grid gap-2 text-sm text-neutral-200 sm:grid-cols-3">
                <li className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  ❌ Festas ou eventos
                </li>
                <li className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  ❌ Substituição de hóspedes durante a estadia
                </li>
                <li className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  ❌ Alterações no layout do apartamento
                </li>
              </ul>
            </article>

            <article className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-2">
              <h3 className="text-sm font-semibold text-neutral-100">
                Piscina: horário e regras
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-300">
                <li>Funcionamento: terça a domingo, das 08h às 22h</li>
                <li>Fechada às segundas-feiras para manutenção</li>
                <li>
                  Não é permitido circular pelos elevadores e áreas comuns com roupas
                  de banho
                </li>
              </ul>
            </article>
          </div>
        </section>

        {/* Contato */}
        <section
          id="contato"
          className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-emerald-500/10 to-sky-500/5 p-6 md:p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold sm:text-xl">
                Pronto para reservar o {listing.name}?
              </h2>
              <p className="max-w-xl text-sm text-neutral-100">
                Para valores, disponibilidade e regras completas, use o link do Airbnb.
                Se preferir, fale conosco diretamente para tirar dúvidas.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 text-xs text-neutral-100">
              <p className="font-medium">Sugestão de mensagem:</p>
              <code className="rounded-2xl bg-black/40 px-3 py-2 text-[11px] text-neutral-200">
                Olá, gostaria de me hospedar no Mapp Rio Flat 801 B entre [datas]
                para [nº de pessoas]. Pode me enviar disponibilidade e valores?
              </code>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={listing.airbnbUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-neutral-950 shadow-[0_22px_60px_rgba(255,255,255,0.18)] transition hover:bg-neutral-100"
            >
              Reservar no Airbnb
            </a>
            {listing.whatsappUrl ? (
              <a
                href={listing.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-neutral-950 shadow-[0_22px_60px_rgba(16,185,129,0.4)] transition hover:bg-emerald-300"
              >
                Falar no WhatsApp
              </a>
            ) : null}
            <p className="text-xs text-neutral-200">
              Recomendado: finalize pelo Airbnb para garantir políticas e pagamentos.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-neutral-950/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-[11px] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-medium text-neutral-300">{listing.name}</span>{" "}
            • site informativo + link oficial de reserva.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-neutral-500">
            <p>
              Link oficial:{" "}
              <a
                href={listing.airbnbUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-neutral-300"
              >
                Airbnb
              </a>
            </p>
            {listing.instagramUrl && (
              <p>
                Instagram:{" "}
                <a
                  href={listing.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-neutral-300"
                >
                  @flat.801b
                </a>
              </p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
