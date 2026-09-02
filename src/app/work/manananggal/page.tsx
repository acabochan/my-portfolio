"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/navbar";

const spreads = [
  { src: "/my-portfolio/images/Andrea_Spread1.jpg", width: 4316, height: 2788 },
  { src: "/my-portfolio/images/Andrea_Spread2.jpg", width: 4249, height: 2784 },
  { src: "/my-portfolio/images/Andrea_Spread3.jpeg", width: 2876, height: 1849 },
  { src: "/my-portfolio/images/Andrea_Spread4.jpeg", width: 2896, height: 1872 },
  { src: "/my-portfolio/images/Andrea_Spread5.jpeg", width: 2841, height: 1844 },
  { src: "/my-portfolio/images/Andrea_Spread6.jpeg", width: 2783, height: 1845 },
  { src: "/my-portfolio/images/Andrea_Spread7.jpeg", width: 2885, height: 1882 },
  { src: "/my-portfolio/images/Andrea_Spread8.jpeg", width: 2866, height: 1880 },
];

const pages = [
  { src: "/my-portfolio/images/Andrea_Cover.jpeg", width: 3022, height: 1971 },
  ...spreads,
];

export default function ManananggalPage() {
  const [currentSpread, setCurrentSpread] = useState(0);

  const showPrevious = () => {
    setCurrentSpread((current) => (current - 1 + pages.length) % pages.length);
  };

  const showNext = () => {
    setCurrentSpread((current) => (current + 1) % pages.length);
  };

  const selectedSpread = pages[currentSpread];

  return (
    <div className="min-h-screen bg-white text-[#04081c]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-8 md:px-12">
        <h1
          className="mb-12 text-6xl font-normal text-[#d55555] md:text-8xl"
          style={{ fontFamily: '"Maragsa", Georgia, serif' }}
        >
          Manananggal
        </h1>

        <section className="mb-16" aria-label="Click through the Manananggal zine">
          <p className="mb-4 text-sm font-medium text-[#d55555]">
            Click / flip through
          </p>

          <button
            type="button"
            onClick={showNext}
            className="block w-full cursor-pointer"
            aria-label="Show next Manananggal spread"
          >
            <Image
              src={selectedSpread.src}
              alt={currentSpread === 0 ? "Manananggal zine cover" : `Manananggal zine spread ${currentSpread}`}
              width={selectedSpread.width}
              height={selectedSpread.height}
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
              aria-label="Show previous Manananggal spread"
            >
              Previous
            </button>
            <span className="text-sm text-[#d55555]" aria-live="polite">
              {currentSpread + 1} / {pages.length}
            </span>
            <button
              type="button"
              onClick={showNext}
              className="rounded-full border-2 border-[#d55555] px-5 py-2 text-sm font-medium text-[#d55555] transition-colors hover:bg-[#d55555] hover:text-white"
              aria-label="Show next Manananggal spread"
            >
              Next
            </button>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {spreads.map((spread, index) => (
            <Image
              key={spread.src}
              src={spread.src}
              alt={`Manananggal zine spread ${index + 1}`}
              width={spread.width}
              height={spread.height}
              priority={index < 2}
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
