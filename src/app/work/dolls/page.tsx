"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

const dolls = [
  { width: 2858, height: 3811 },
  { width: 4644, height: 3484 },
  { width: 2858, height: 3811 },
  { width: 4710, height: 3532 },
  { width: 5162, height: 3870 },
  { width: 2858, height: 3811 },
  { width: 5342, height: 3544 },
  { width: 4688, height: 3518 },
  { width: 2858, height: 3811 },
  { width: 4058, height: 3044 },
  { width: 4232, height: 3174 },
  { width: 2904, height: 2178 },
  { width: 3868, height: 2902 },
  { width: 3754, height: 2816 },
  { width: 5282, height: 3962 },
  { width: 2858, height: 3811 },
].map((image, index) => ({
  ...image,
  src: `/my-portfolio/images/dolls/dolls_${index + 1}.png`,
  alt: `Let's Play Dolls print ${index + 1}`,
}));

export default function DollsPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null ? null : (current - 1 + dolls.length) % dolls.length
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % dolls.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-white text-[#04081c]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-8 md:px-12">
        <h1
          className="mb-12 text-6xl font-normal text-[#d55555] md:text-8xl"
          style={{ fontFamily: '"Maragsa", Georgia, serif' }}
        >
          Let&apos;s Play Dolls
        </h1>

        <div className="columns-1 gap-6 md:columns-2">
          {dolls.map((doll, index) => (
            <div key={doll.src} className="mb-6 break-inside-avoid">
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d55555]"
                aria-label={`Open doll print ${index + 1} in full screen`}
              >
                <Image
                  src={doll.src}
                  alt={doll.alt}
                  width={doll.width}
                  height={doll.height}
                  priority={index < 2}
                  className="h-auto w-full"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </button>
            </div>
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

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`Doll print ${selectedIndex + 1} enlarged`}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              const bounds = event.currentTarget.getBoundingClientRect();
              const clickedLeftHalf = event.clientX < bounds.left + bounds.width / 2;
              setSelectedIndex(
                clickedLeftHalf
                  ? (selectedIndex - 1 + dolls.length) % dolls.length
                  : (selectedIndex + 1) % dolls.length
              );
            }}
            className="inline-flex max-h-[82vh] max-w-[88vw] cursor-pointer items-center justify-center"
            aria-label="Click the left or right half to browse doll prints"
          >
            <Image
              src={dolls[selectedIndex].src}
              alt={dolls[selectedIndex].alt}
              width={dolls[selectedIndex].width}
              height={dolls[selectedIndex].height}
              className="h-auto max-h-[82vh] w-auto max-w-[88vw] object-contain"
              sizes="100vw"
            />
          </button>
        </div>
      )}
    </div>
  );
}
