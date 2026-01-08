"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const IntroSection = () => {
  const [mode, setMode] = useState("developer"); // 'developer' | 'artist'
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  const images = useMemo(
    () => [
      "/images/angio.png",
      "/images/ASL_ABC.png",
      "/images/dolls.jpg",
      "/images/goodsam.png",
      "/images/Play2Learn.png",
      "/images/sigarilyo.jpg",
      "/images/ThankYou.jpg",
      "/images/WIT.png",
      "/images/trial.png",
    ],
    []
  );

  useEffect(() => {
    const el = sectionRef.current;
    const floater = floatRef.current;
    if (!el || !floater) return;

    let rafId = 0;
    let mounted = true;
    let lastX = 0;
    let pendingX = 0;

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    const updateFloat = () => {
      rafId = 0;
      if (!mounted) return;

      const rect = el.getBoundingClientRect();

      // Clamp X so the 300px image never goes outside the section
      const x = clamp(pendingX - 150, 0, rect.width - 300);

      // LOCK Y: keep a fixed vertical position inside the section
      // tweak the 0.38 to move it up/down (0 = top, 1 = bottom)
      const lockedY = (rect.height - 300) * 0.38;

      floater.style.transform = `translate(${x}px, ${Math.max(0, lockedY)}px)`;
    };

    const onMove = (e: { clientX: number; movementX: number; }) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;

      pendingX = x;

      // Only horizontal movement affects image cycling
      const dx = e.movementX ?? x - lastX;
      const speed = Math.abs(dx);
      lastX = x;

      if (speed > 6) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }

      if (!rafId) rafId = requestAnimationFrame(updateFloat);
    };

    // Initial position: center
    const rect = el.getBoundingClientRect();
    pendingX = rect.width * 0.5;
    lastX = pendingX;
    updateFloat();

    el.addEventListener("mousemove", onMove);

    return () => {
      mounted = false;
      el.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [images.length]);

  const developerContent = {
    description:
      "I focus on software engineering and full-stack development, with an emphasis on front-end systems, computer graphics, XR/VR experiences, and creative tooling. My work sits at the intersection of engineering and technical art, where I use code as both infrastructure and a creative medium to build interactive, visually driven systems. I’m deeply mission-driven and often work with nonprofits and social-impact organizations to build tools that improve accessibility, communication, and community support.",
  };

  const artistContent = {
    description:
      "My practice moves across visual design, illustration, graphic design, printmaking, 3D modeling, bookmaking, interactive media, and experimental web art. I use design as a way of questioning and communicating, weaving together my intersecting identities and lived experiences. Through both physical and digital forms, I translate the personal into the shared, creating work that invites connection, reflection, and recognition."
  };

  const currentContent = mode === "developer" ? developerContent : artistContent;

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "99vw",
        marginLeft: 0,
        marginRight: 0,
        padding: "72px 15%",
        overflow: "hidden",
        background: "rgba(242, 237, 231, 0.72)",
        backdropFilter: "blur(10px)",
      }}
    >
      <style jsx>{`
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

        .wave-button span {
          position: relative;
          z-index: 10;
          transition: color 0.3s ease-out;
        }

        .wave-button:hover span {
          color: #f2ede7;
        }

        .wave-button:hover svg {
          stroke: #f2ede7;
        }

        .wave-button svg {
          transition: stroke 0.3s ease-out;
        }
      `}</style>

      {/* Image (moves only left/right) */}
      <div
        ref={floatRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 300,
          height: 300,
          pointerEvents: "none",
          zIndex: 1,
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "none",
            borderRadius: 0,
            boxShadow: "0 18px 40px rgba(0,0,0,0.14)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 760 }}>
        <div style={{ marginBottom: 18 }}>
          <h1
            style={{
              fontSize: 44,
              fontWeight: "normal",
              color: "#d55555",
              fontFamily: "'Maragsa', serif",
              margin: 0,
              marginBottom: 12,
              lineHeight: 1.05,
            }}
          >
            Hi, I&apos;m Andrea.
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "#2d2d2d",
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
              lineHeight: 1.5,
              opacity: 0.9,
            }}
          >
            I&apos;m a computer science + fine arts student working across technology and art.
          </p>
        </div>

        <div style={{ marginBottom: 18, display: "flex", gap: 16 }}>
          <button
            type="button"
            onClick={() => setMode("developer")}
            className="wave-button"
            style={{
              padding: "12px 24px",
              fontSize: "15.2px",
              fontWeight: "500",
              fontFamily: "'Maragsa', serif",
              background: mode === "developer" ? "#d55555" : "transparent",
              color: mode === "developer" ? "#f2ede7" : "#d55555",
              border: "2px solid #d55555",
              borderRadius: 999,
              cursor: "pointer",
              transition: "color 0.3s ease-out",
            }}
          >
            <span>Developer</span>
            {mode !== "developer" && <div className="wave-fill" />}
          </button>
          <button
            type="button"
            onClick={() => setMode("artist")}
            className="wave-button"
            style={{
              padding: "12px 24px",
              fontSize: "15.2px",
              fontWeight: "500",
              fontFamily: "'Maragsa', serif",
              background: mode === "artist" ? "#d55555" : "transparent",
              color: mode === "artist" ? "#f2ede7" : "#d55555",
              border: "2px solid #d55555",
              borderRadius: 999,
              cursor: "pointer",
              transition: "color 0.3s ease-out",
            }}
          >
            <span>Artist</span>
            {mode !== "artist" && <div className="wave-fill" />}
          </button>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            borderRadius: 16,
            padding: "16px 18px",
            border: "none",
          }}
        >
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "#2d2d2d",
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
            }}
          >
            {currentContent.description}
          </p>
        </div>

        {/* Social Links */}
        <div style={{ marginTop: 24, display: "flex", gap: 16, alignItems: "center", pointerEvents: "auto" }}>
          <a
            href="https://github.com/acabochan8/85"
            target="_blank"
            rel="noopener noreferrer"
            className="wave-button"
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.45)",
              borderRadius: "50%",
              transition: "all 0.2s ease",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              pointerEvents: "auto",
            }}
          >
            <svg style={{ position: "relative", zIndex: 10, pointerEvents: "none" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <div className="wave-fill" style={{ pointerEvents: "none" }} />
          </a>
          
          <a
            href="https://www.linkedin.com/in/andreacabochan/"
            target="_blank"
            rel="noopener noreferrer"
            className="wave-button"
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.45)",
              borderRadius: "50%",
              transition: "all 0.2s ease",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              pointerEvents: "auto",
            }}
          >
            <svg style={{ position: "relative", zIndex: 10, pointerEvents: "none" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <div className="wave-fill" style={{ pointerEvents: "none" }} />
          </a>
          
          <a
            href="https://www.instagram.com/_duendie/"
            target="_blank"
            rel="noopener noreferrer"
            className="wave-button"
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.45)",
              borderRadius: "50%",
              transition: "all 0.2s ease",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              pointerEvents: "auto",
            }}
          >
            <svg style={{ position: "relative", zIndex: 10, pointerEvents: "none" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <div className="wave-fill" style={{ pointerEvents: "none" }} />
          </a>
          
          <a
            href="mailto:.andrea_lorraince.cabochan@tufts.edu"
            className="wave-button"
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.45)",
              borderRadius: "50%",
              transition: "all 0.2s ease",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              pointerEvents: "auto",
            }}
          >
            <svg style={{ position: "relative", zIndex: 10, pointerEvents: "none" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <div className="wave-fill" style={{ pointerEvents: "none" }} />
          </a>
        </div>
      </div>
    </section>
  );
}; 

export default IntroSection;