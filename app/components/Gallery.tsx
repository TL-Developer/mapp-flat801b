"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
};

type GalleryProps = {
  images: GalleryImage[];
};

export function Gallery({ images }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenIndex(null);
      }
    }
    if (openIndex !== null) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex]);

  const hasImages = images.length > 0;
  const safeImages = hasImages
    ? images
    : [{ src: "/images/placeholder.jpg", alt: "Imagem do apartamento" }];

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {safeImages.map((p, index) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group cursor-pointer relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-80" />
            <figcaption className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-black/55 px-2 py-1 text-[11px] text-neutral-100 backdrop-blur">
              {p.alt}
            </figcaption>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 border-1 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative h-full w-full max-h-[90vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="absolute cursor-pointer right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-neutral-100 hover:bg-black"
            >
              Fechar
            </button>
            <Image
              src={safeImages[openIndex].src}
              alt={safeImages[openIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

