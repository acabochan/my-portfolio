"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function Work() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam && ["all", "code", "art"].includes(filterParam)) {
      setSelectedFilter(filterParam);
    }
  }, [searchParams]);

  const filters = [
    { id: "all", label: "All" },
    { id: "code", label: "Code" },
    { id: "art", label: "Art" },
  ];

  // Helper: navigate for internal links, open new tab for external links
  const goToProject = (project) => {
    if (!project?.link) return;

    const isExternal = /^https?:\/\//i.test(project.link);
    if (isExternal) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    } else {
      router.push(project.link);
    }
  };

  const onLinkKeyDown = (e, project) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToProject(project);
    }
  };

  const projects = [
    {
      id: 1,
      title: "ASL ABC's",
      description:
        "An interactive learning application that helps users practice ASL fingerspelling",
      category: "code",
      image: "/images/ASL_ABC.png",
      tech: ["React", "Next.js", "TypeScript"],
      link: "https://github.com/trinchngk/OOP-Final",
    },
    {
      id: 10,
      title: "Can I Dance Too? (Pwede rin ba akong sumayaw?)",
      description: "A book.",
      category: "art",
      image: "/images/cover.png",
      link: "/projects/can-i-dance-too",
    },
    {
      id: 2,
      title: "AngioPilot",
      description:
        "An XR training simulation in Xcode using RealityKit and Swift for Apple Vision Pro, designed to replicate vascular catheterization procedures in a 3D immersive environment",
      category: "code",
      image: "/images/angio.png",
      tech: ["Swift", "RealityKit", "Xcode"],
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7401239328380620800/",
    },
    {
      id: 11,
      title: "Manananggal",
      description: "A zine.",
      category: "art",
      image: "/images/mananangal.jpg",
      link: "/projects/manananggal",
    },
    {
      id: 3,
      title: "Play2Learn",
      description:
        "Built with a team of four during Brown University's 24-hour hackathon, Play2Learn provides educational mini-games and quizzes across a variety of subjects.",
      category: "code",
      image: "/images/Play2Learn.png",
      tech: ["JavaScript", "React", "Firebase"],
      link: "https://github.com/aprameyak/play2learn?tab=readme-ov-file",
    },
    {
      id: 12,
      title: "Sigarilyo",
      description: "A zine.",
      category: "art",
      image: "/images/sigarilyo.jpg",
      link: "/projects/sigarilyo",
    },
    {
      id: 4,
      title: "LGBTQ+ Senior Housing Web App",
      description:
        "A user-friendly scheduling and community web application designed for LGBTQ+ senior housing residents.",
      category: "code",
      image: "/images/LGBTQ.png",
      tech: ["React", "Node.js", "PostgreSQL"],
      link: "https://lgbtq-senior-housing.vercel.app/",
    },
    {
      id: 13,
      title: "Out For Lunch",
      description: "Interactive Web.",
      category: "art",
      image: "/images/square.png",
      link: "/projects/out-for-lunch",
    },
    {
      id: 5,
      title: "Denoising Speech with MathWorks",
      description:
        "A deep learning project focused on suppressing background noise from speech signals using a CNN-LSTM model.",
      category: "code",
      image: "/images/matlab.png",
      tech: ["MATLAB", "Deep Learning", "CNN-LSTM"],
      link: "https://github.com/BTTAI-9/Team-9",
    },
    {
      id: 14,
      title: "Thanks For Resisting",
      description: "Bags",
      category: "art",
      image: "/images/square.png",
      link: "/projects/thanks-for-resisting",
    },
    {
      id: 6,
      title: "Trial & Error",
      description:
        "A point and click detective game set in a sci fi world designed to teach kids how to think critically for false information.",
      category: "code",
      image: "/images/trial.png",
      tech: ["Unity", "C#", "Ink"],
      link: "https://duwendie.itch.io/trial-error",
    },
    {
      id: 15,
      title: "A Guide To Nightly Prayers",
      description: "brochure",
      category: "art",
      image: "/images/square.png",
      link: "/projects/nightly-prayers",
    },
    {
      id: 7,
      title: "Good Samaritan Shelter Website Redesign",
      description:
        "Led as the product and design manager for the redesign and implementation of Good Samaritan Shelter's website and implemented a searchable database of services",
      category: "code",
      image: "/images/goodsam.png",
      tech: ["WordPress", "PHP", "JavaScript"],
      link: "https://www.goodsamaritanshelter.org/",
    },
    {
      id: 16,
      title: "Illustrations",
      description: "Illustrations",
      category: "art",
      image: "/images/self_destruction.png",
      link: "/projects/illustrations",
    },
    {
      id: 8,
      title: "Procedural Gear Generator",
      description:
        "Procedural Tool based from Maya's primitive polygon Pipes to create customizable gears for 3D modeling and animation projects.",
      category: "code",
      image: "/images/square.png",
      tech: ["Python", "Maya API", "Procedural"],
      link: "/projects/procedural-gear-generator",
    },
    {
      id: 17,
      title: "Root",
      description: "App design",
      category: "art",
      image: "/images/root.png",
      link: "/projects/root",
    },
    {
      id: 9,
      title: "Real-Time 3D Rendering Engine",
      description:
        "A real-time 3D rendering project, featuring custom shader programming, dynamic lighting and shadows, textured 3D models, and user-controlled camera navigation.",
      category: "code",
      image: "/images/square.png",
      tech: ["C++", "OpenGL", "GLSL"],
      link: "/projects/realtime-rendering-engine",
    },
    {
      id: 21,
      title: "Lets Play Dolls",
      description: "App design",
      category: "art",
      image: "/images/square.png",
      link: "/projects/lets-play-dolls",
    },
    {
      id: 18,
      title: "Women In Tech Brand Design",
      description: "App design",
      category: "art",
      image: "/images/square.png",
      link: "/projects/women-in-tech-brand",
    },
    {
      id: 19,
      title: "Game of I_____tion",
      description: "App design",
      category: "art",
      image: "/images/square.png",
      link: "/projects/game-of-imitation",
    },
    {
      id: 20,
      title: "Predator",
      description: "Web E",
      category: "art",
      image: "/images/square.png",
      link: "/projects/predator",
    },
  ];

  const filteredProjects = useMemo(() => {
    return selectedFilter === "all"
      ? projects
      : projects.filter((project) => project.category === selectedFilter);
  }, [selectedFilter, projects]);

  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    if (viewMode === "list") {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [viewMode]);

  return (
    <div style={{ backgroundColor: "#f2ede7", minHeight: "100vh" }}>
      <style jsx>{`
        /* Code tech pills (bottom of image, appear on hover) */
        .code-tech-row {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: flex-start;
          pointer-events: none;

          opacity: 0;
          transform: translateY(6px);
          transition: opacity 220ms ease, transform 220ms ease;
        }

        /* List pop-in */
        @keyframes listPopIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .list-row {
          opacity: 0;
          transform: translateY(10px);
          animation: listPopIn 420ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .list-row {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        .grid-card:hover .code-tech-row {
          opacity: 1;
          transform: translateY(0);
        }

        .tech-pill {
          display: inline-flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: #d55555;
          color: #f2ede7;
          font-size: 0.875rem; /* text-sm */
          line-height: 1.25rem;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
        }

        @font-face {
          font-family: "Maragsa";
          src: url("/fonts/maragsa.otf") format("opentype");
          font-display: swap;
          font-weight: normal;
          font-style: normal;
        }

        .maragsa-font {
          font-family: "Maragsa", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
        }

        .wave-button {
          position: relative;
          overflow: hidden;
        }

        .wave-fill {
          position: absolute;
          inset: 0;
          background-color: #d55555;
          transform: translateY(100%);
          transition: transform 0.3s ease-out;
          z-index: 1;
        }

        .wave-button:hover .wave-fill {
          transform: translateY(0);
        }

        .wave-button span,
        .wave-button svg {
          position: relative;
          z-index: 10;
        }

        .grid-card {
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          height: 420px;
          background: transparent;
          cursor: pointer;
          outline: none;
        }

        .grid-card:focus-visible {
          box-shadow: 0 0 0 3px rgba(213, 85, 85, 0.35);
        }

        .grid-card:hover {
          transform: scale(1.05);
          box-shadow: 5px 5px 0 #d55555;
        }

        .card-image {
          position: relative;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          border-radius: 0.5rem;
        }

        .card-image-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }

        .code-bottom {
          background: #f2ede7;
          padding: 18px 20px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }

        /* Art overlay hover (LIGHT offwhite overlay, RED title) */
        .art-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 18px;

          background: rgba(242, 237, 231, 0.65); /* offwhite tint */
          backdrop-filter: blur(4px);

          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.22s ease, transform 0.22s ease;
          pointer-events: none;
        }

        .grid-card:hover .art-overlay {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <Navbar />

      <main className="px-10 md:px-12 lg:px-16 xl:px-30 pt-15 pb-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`
                  wave-button px-6 py-3 rounded-full border-2 transition-colors duration-300 
                  ${
                    selectedFilter === filter.id
                      ? "bg-[#d55555] border-[#d55555] text-[#f2ede7]"
                      : "bg-transparent border-[#d55555] text-[#d55555] hover:text-[#f2ede7]"
                  }
                `}
                style={{ fontSize: "15.2px", fontWeight: "500" }}
              >
                <span>{filter.label}</span>
                <div className="wave-fill" />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`
                wave-button p-3 rounded-full border-2 transition-colors duration-300
                ${
                  viewMode === "grid"
                    ? "bg-[#d55555] border-[#d55555] text-[#f2ede7]"
                    : "bg-transparent border-[#d55555] text-[#d55555] hover:text-[#f2ede7]"
                }
              `}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
              </svg>
              <div className="wave-fill" />
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`
                wave-button p-3 rounded-full border-2 transition-colors duration-300
                ${
                  viewMode === "list"
                    ? "bg-[#d55555] border-[#d55555] text-[#f2ede7]"
                    : "bg-transparent border-[#d55555] text-[#d55555] hover:text-[#f2ede7]"
                }
              `}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
              </svg>
              <div className="wave-fill" />
            </button>
          </div>
        </div>

        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-15">
            {filteredProjects.map((project) => {
              const isArt = project.category === "art";
              const tech = Array.isArray(project.tech) ? project.tech : [];

              return (
                <div
                  key={project.id}
                  className="grid-card"
                  role="link"
                  tabIndex={0}
                  aria-label={`Open ${project.title}`}
                  onClick={() => goToProject(project)}
                  onKeyDown={(e) => onLinkKeyDown(e, project)}
                >
                  <div className="card-image">
                    <div
                      className="card-image-bg"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />

                    {!isArt && tech.length > 0 && (
                      <div className="code-tech-row" aria-hidden="true">
                        {tech.slice(0, 6).map((t) => (
                          <span key={`${project.id}-${t}`} className="tech-pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {isArt && (
                      <div className="art-overlay">
                        <h3 className="maragsa-font text-[#d55555] text-lg font-semibold leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-[#d55555] text-sm mt-1 opacity-90">
                          {project.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {!isArt && (
                    <div className="code-bottom">
                      <h3 className="text-base font-semibold mb-2 maragsa-font text-[#d55555]">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {viewMode === "list" && (
          <div className="space-y-8 mt-15">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="list-row flex items-center justify-between py-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                style={{ animationDelay: `${index * 55}ms` }}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => goToProject(project)}
                role="link"
                tabIndex={0}
                aria-label={`Open ${project.title}`}
                onKeyDown={(e) => onLinkKeyDown(e, project)}
              >
                <h3
                  className="maragsa-font text-[#d55555]"
                  style={{ fontSize: "50px", fontWeight: "500" }}
                >
                  {project.title}
                </h3>

                <div className="flex-1 flex justify-center">
                  <span className="maragsa-font text-[#d55555]" style={{ fontSize: "15px" }}>
                    {project.category}
                  </span>
                </div>

                <div className="max-w-xs text-right">
                  <p className="text-[#d55555]" style={{ fontSize: "17px" }}>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "list" && hoveredProject && (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: `${mousePosition.x + 20}px`,
              top: `${mousePosition.y - 80}px`,
            }}
          >
            <div className="w-100 h-65 bg-gray-300 rounded-lg shadow-xl overflow-hidden">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${hoveredProject.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 mt-8">
            <p className="text-gray-500">No projects found for the selected filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}
