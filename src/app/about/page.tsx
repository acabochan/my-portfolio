"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import Image from "next/image";
import HoverWord from "@/components/HoverWord";

export default function About() {
  const sections = [
    {
      id: 1,
      title: "01. INTRO",
      content: (
        <>
          Hi, I’m <span style={{ color: "#d55555" }}>Andrea Cabochan</span> (she/her) — a
          Computer Science + Fine Arts student at Tufts University, building things that sit at the
          intersection of <span style={{ color: "#d55555" }}>interactive systems</span>,{" "}
          <span style={{ color: "#d55555" }}>computer graphics</span>, and{" "}
          <span style={{ color: "#d55555" }}>playful storytelling</span>.
          <br />
          <br />
          I love projects where engineering and aesthetics have to cooperate: real-time 3D, VR/XR
          interactions, UI that feels alive, and tools that let people explore. I’m especially drawn
          to work that connects creativity with impact — whether that’s accessibility, education, or
          sustainability.
          <br />
          <br />
          Outside of class, you’ll usually find me making weird little prototypes, designing
          game-like experiences, or iterating on a visual detail until it feels “right.”
        </>
      ),
    },
    {
      id: 2,
      title: "02. EDUCATION",
      content: (
        <>
          <span style={{ color: "#d55555" }}>Tufts University</span> — B.A. Computer Science + Fine Arts{" "}
          <span style={{ color: "#999" }}>(Expected May 2027)</span>
          <br />
          GPA: 3.46 (Dean’s List)
          <br />
          <br />
          My coursework and studio work bounce between systems thinking and making:
          algorithms/data structures, graphics/VFX/R&amp;D, interactive media, and design-oriented
          production. I like learning by building — projects, tools, prototypes, and experiments.
        </>
      ),
    },
    {
      id: 3,
      title: "03. EXPERIENCE",
      content: (
        <>
          <span style={{ color: "#d55555" }}>Teaching Assistant — C++ Data Structures & Algorithms (Tufts)</span>
          <br />
          I support students through debugging, problem-solving, and concept clarity — especially
          around memory, pointers, and algorithmic thinking.
          <br />
          <br />
          <span style={{ color: "#d55555" }}>Product Design — Develop For Good</span>
          <br />
          Designed and iterated on user-facing features with an emphasis on clear interaction flows,
          visual hierarchy, and accessibility-minded UI.
          <br />
          <br />
          <span style={{ color: "#d55555" }}>Digital Content Intern — Office of Sustainability</span>
          <br />
          Created and organized digital content to support sustainability communication and campus
          engagement.
          <br />
          <br />
          Recent technical highlights include: a C++/OpenGL renderer (shaders, lighting, textures),
          Unity XR prototypes (audio-reactive VFX + UI controls), and interactive portfolio work in
          Next.js.
        </>
      ),
    },
    {
      id: 4,
      title: "04. LEADERSHIP",
      content: (
        <>
          I care a lot about communities that help people make ambitious work.
          <br />
          <br />
          <span style={{ color: "#d55555" }}>SIGGRAPH (Treasurer)</span> — helping plan events, funding,
          and resources for graphics/creative tech projects.
          <br />
          <span style={{ color: "#d55555" }}>Women in Tech (Co-Design Chair)</span> — supporting design
          + tech programming and collaboration.
          <br />
          <span style={{ color: "#d55555" }}>SMFA Student Government (Facilities &amp; Tech Rep)</span> —
          advocating for student needs and better creative infrastructure.
          <br />
          <br />
          I like roles where I can make systems smoother: organizing, documenting, designing better
          workflows, and making things feel welcoming.
        </>
      ),
    },
    {
      id: 5,
      title: "05. SKILLS",
      content: (
        <>
          <span style={{ color: "#d55555" }}>Programming & Dev</span>: C++, C, Java, JavaScript/TypeScript,
          React, Next.js, Unity (C#)
          <br />
          <span style={{ color: "#d55555" }}>Graphics & Interactive</span>: OpenGL, shaders/HLSL basics,
          real-time lighting, 3D pipelines, XR prototyping
          <br />
          <span style={{ color: "#d55555" }}>ML / Data</span>: Python, basic modeling workflows, curiosity-driven
          experimentation
          <br />
          <span style={{ color: "#d55555" }}>Design</span>: UI/UX, visual systems, prototyping, iteration, creative coding
          <br />
          <br />
          Strengths I bring to teams: translating ideas into prototypes quickly, balancing visuals + engineering,
          and caring about the “feel” of an interaction as much as the functionality.
        </>
      ),
    },
  ];

  const [openSection, setOpenSection] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [typedTitles, setTypedTitles] = useState(sections.map((s) => s.title));

  const toggleSection = (section) =>
    setOpenSection(openSection === section ? null : section);

  const canvasRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => setMounted(true), []);

  // Typing animation
  useEffect(() => {
    if (!mounted) return;
    setTypedTitles(Array(sections.length).fill(""));
    let charIndex = 0;
    const maxLength = Math.max(...sections.map((s) => s.title.length));
    const interval = setInterval(() => {
      setTypedTitles((prev) =>
        prev.map((_, i) => sections[i].title.slice(0, charIndex + 1))
      );
      charIndex++;
      if (charIndex >= maxLength) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, [mounted]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const gridSize = 20; // size of each "pixel"

    const startDrawing = (e) => {
      drawing.current = true;
      draw(e);
    };

    const endDrawing = () => {
      drawing.current = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // clear on mouse up
    };

    const draw = (e) => {
      if (!drawing.current) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Snap to nearest grid cell
      const x = Math.floor(mouseX / gridSize) * gridSize;
      const y = Math.floor(mouseY / gridSize) * gridSize;

      ctx.fillStyle = "#d55555";
      ctx.fillRect(x, y, gridSize, gridSize);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mouseleave", endDrawing);
    canvas.addEventListener("mousemove", draw);

    // Resize canvas to match container
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", endDrawing);
      canvas.removeEventListener("mouseleave", endDrawing);
      canvas.removeEventListener("mousemove", draw);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f2ede7",
        minHeight: "100vh",
        fontFamily: "'Maragsa', serif", // titles/labels default
      }}
    >
      <Navbar />
      <main style={{ display: "flex", height: "calc(100vh - 80px)" }}>
        {/* Left side */}
        <div style={{ width: "40%", position: "relative", overflow: "hidden" }}>
          <Image
            src="/me.jpg"
            alt="Photo of Andrea"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "auto",
              cursor: "crosshair",
            }}
          />
        </div>

        {/* Right side */}
        <div style={{ width: "60%", overflowY: "auto", padding: "3rem 4rem" }}>
          <div style={{ maxWidth: "750px" }}>
            {sections.map((section, index) => (
              <div key={section.id} style={{ marginBottom: "2rem" }}>
                <div
                  onClick={() => toggleSection(section.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    padding: "1rem 0",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "2.25rem",
                      color: "#d55555",
                      margin: 0,
                      fontWeight: "normal",
                      minHeight: "2.5rem",
                      letterSpacing: "0.02em",
                      fontFamily: "'Maragsa', serif", // ensure title stays Maragsa
                    }}
                  >
                    <HoverWord
                      text={typedTitles[index]}
                      style={{
                        color: "#d55555",
                        fontSize: "2.25rem",
                        fontWeight: "normal",
                        fontFamily: "'Maragsa', serif",
                      }}
                    />
                    {mounted &&
                      typedTitles[index].length < section.title.length && (
                        <span>|</span>
                      )}
                  </h2>
                  <div
                    style={{
                      marginLeft: "3rem",
                      transform:
                        openSection === section.id
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src="/arrow.png"
                      alt="Toggle section"
                      width={40}
                      height={40}
                      priority
                    />
                  </div>
                </div>

                <div
                  style={{
                    maxHeight: openSection === section.id ? "700px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                    paddingLeft: "1rem",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem 0",
                      color: "#666",
                      fontSize: "1.05rem",
                      lineHeight: "1.65",
                      fontFamily: "'DM Sans', sans-serif", // ✅ paragraphs
                      letterSpacing: "0.01em",
                    }}
                  >
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
