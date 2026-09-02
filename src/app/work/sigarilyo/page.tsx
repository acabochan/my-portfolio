"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/navbar";

const images = Array.from(
  { length: 9 },
  (_, index) => `/my-portfolio/images/sigarilyo_${index + 1}.png`
);

export default function SigarilyoPage() {
  const [currentImage, setCurrentImage] = useState(0);

  const showPrevious = () => {
    setCurrentImage((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentImage((current) => (current + 1) % images.length);
  };

  return (
    <div className="min-h-screen bg-white text-[#04081c]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-8 md:px-12">
        <h1
          className="mb-12 text-6xl font-normal text-[#d55555] md:text-8xl"
          style={{ fontFamily: '"Maragsa", Georgia, serif' }}
        >
          Sigarilyo
        </h1>

        <section className="mb-16" aria-label="Click through the Sigarilyo zine">
          <p className="mb-4 text-sm font-medium text-[#d55555]">
            Click / flip through
          </p>

          <button
            type="button"
            onClick={showNext}
            className="block w-full cursor-pointer"
            aria-label="Show next Sigarilyo page"
          >
            <Image
              src={images[currentImage]}
              alt={`Sigarilyo zine page ${currentImage + 1}`}
              width={3811}
              height={2858}
              priority
              className="h-auto w-full"
              sizes="(min-width: 1152px) 1056px, 100vw"
            />
          </button>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={showPrevious}
              className="rounded-full border-2 border-[#d55555] px-5 py-2 text-sm font-medium text-[#d55555] transition-colors hover:bg-[#d55555] hover:text-white"
              aria-label="Show previous Sigarilyo page"
            >
              Previous
            </button>
            <span className="text-sm text-[#d55555]" aria-live="polite">
              {currentImage + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={showNext}
              className="rounded-full border-2 border-[#d55555] px-5 py-2 text-sm font-medium text-[#d55555] transition-colors hover:bg-[#d55555] hover:text-white"
              aria-label="Show next Sigarilyo page"
            >
              Next
            </button>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Sigarilyo zine page ${index + 1}`}
              width={3811}
              height={2858}
              priority={index === 0}
              className="h-auto w-full"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            href="/work"
            className="group relative inline-flex overflow-hidden rounded-full border-2 border-[#d55555] px-6 py-3 text-[15.2px] font-medium text-[#d55555] transition-colors duration-300 hover:text-[#f2ede7]"
          >
            <span className="absolute inset-0 translate-y-full bg-[#d55555] transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <span className="relative z-10">Back to work</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
