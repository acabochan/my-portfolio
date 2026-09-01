import Link from "next/link";
import Navbar from "@/components/navbar";

const games = [
  {
    title: "Absolute Momentum",
    video: "/my-portfolio/absolute-momentum.mp4",
  },
  {
    title: "Wizard Tower",
    video: "/my-portfolio/wizard-tower.mp4",
  },
  {
    title: "Stick It Up",
    video: "/my-portfolio/stick-it-up.mp4",
  },
];

export default function PieDevPage() {
  return (
    <div className="min-h-screen bg-[#f2ede7] text-[#04081c]">
      <Navbar />

      <main className="px-6 pb-20 pt-8 md:px-12 lg:px-16 xl:px-30">
        <header className="mb-16 max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d55555]">
            Indie game studio
          </p>
          <h1 className="pie-title mb-6 text-6xl leading-none text-[#d55555] md:text-8xl">
            PIE Dev
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
            Gameplay development and programming for PIE Dev, an indie game
            studio focused on building playful, memorable game experiences.
          </p>
        </header>

        <section className="space-y-16" aria-label="PIE Dev gameplay videos">
          {games.map((game, index) => (
            <article key={game.video}>
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <h2 className="pie-title text-3xl text-[#d55555] md:text-4xl">
                  {game.title}
                </h2>
                <span className="text-sm text-[#d55555]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="overflow-hidden rounded-lg bg-black shadow-[7px_7px_0_#d55555]">
                <video
                  className="block aspect-video w-full object-contain"
                  controls
                  preload="metadata"
                  playsInline
                >
                  <source src={game.video} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-16 flex justify-end">
          <Link
            href="/work"
            className="group relative inline-flex overflow-hidden rounded-full border-2 border-[#d55555] px-6 py-3 text-[15.2px] font-medium text-[#d55555] transition-colors duration-300 hover:text-[#f2ede7]"
          >
            <span className="absolute inset-0 translate-y-full bg-[#d55555] transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <span className="relative z-10">Back to work</span>
          </Link>
        </div>
      </main>

      <style>{`
        .pie-title {
          font-family: "Maragsa", Georgia, serif;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}
