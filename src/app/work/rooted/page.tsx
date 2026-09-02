import Link from "next/link";
import Navbar from "@/components/navbar";

export default function RootedPage() {
  return (
    <div className="min-h-screen bg-white text-[#04081c]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-8 md:px-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d55555]">
          First-place winner at the Tufts Producthon.
        </p>
        <h1
          className="mb-6 text-6xl font-normal text-[#d55555] md:text-8xl"
          style={{ fontFamily: '"Maragsa", Georgia, serif' }}
        >
          Rooted
        </h1>

        <section className="mb-10 max-w-3xl text-lg leading-relaxed text-[#40404a] md:text-xl">
          <p>
            Built in just 36 hours, Rooted is a platform designed to make it
            easier to find volunteer opportunities while supporting local,
            community-centered organizations. It helps people take meaningful
            action without endless scrolling by creating real connections that
            strengthen the communities they are already part of. Our team used
            competitive analysis, in-depth user interviews, and market
            validation to guide our design decisions.
          </p>
        </section>

        <video
          className="block w-full"
          controls
          preload="metadata"
          playsInline
        >
          <source src="/my-portfolio/RootedUI.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>

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
