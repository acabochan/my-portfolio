"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

const illustrations = [
  { src: "/my-portfolio/images/illustration 1.png", width: 2000, height: 1494 },
  { src: "/my-portfolio/images/illustration 2.png", width: 1200, height: 1333 },
  { src: "/my-portfolio/images/illustration 3.png", width: 3000, height: 1912 },
  { src: "/my-portfolio/images/illustration 4.png", width: 2160, height: 1620 },
];

export default function IllustrationsPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null ? null : (current - 1 + illustrations.length) % illustrations.length
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % illustrations.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-[#f2ede7] text-[#04081c]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-8 md:px-12">
        <h1
          className="mb-12 text-6xl font-normal text-[#d55555] md:text-8xl"
          style={{ fontFamily: '"Maragsa", Georgia, serif' }}
        >
          Illustrations
        </h1>

        <div className="columns-1 gap-6 md:columns-2">
          {illustrations.map((illustration, index) => (
            <div key={illustration.src} className="mb-6 break-inside-avoid">
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d55555]"
                aria-label={`Open illustration ${index + 1} in full screen`}
              >
                <Image
                  src={illustration.src}
                  alt={`Illustration ${index + 1}`}
                  width={illustration.width}
                  height={illustration.height}
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
          aria-label={`Illustration ${selectedIndex + 1} enlarged`}
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
                  ? (selectedIndex - 1 + illustrations.length) % illustrations.length
                  : (selectedIndex + 1) % illustrations.length
              );
            }}
            className="inline-flex max-h-[82vh] max-w-[88vw] cursor-pointer items-center justify-center"
            aria-label="Click the left or right half to browse illustrations"
          >
            <Image
              src={illustrations[selectedIndex].src}
              alt={`Illustration ${selectedIndex + 1}`}
              width={illustrations[selectedIndex].width}
              height={illustrations[selectedIndex].height}
              className="h-auto max-h-[82vh] w-auto max-w-[88vw] object-contain"
              sizes="100vw"
            />
          </button>
        </div>
      )}
    </div>
  );
}
