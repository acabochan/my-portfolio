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
          Hi, I’m <span style={{ color: "#d55555" }}>Andrea Cabochan</span> (she/her) a
          Computer Science + Fine Arts student at Tufts University, building things that sit at the
          intersection of <span style={{ color: "#d55555" }}>interactive systems</span>,{" "}
          <span style={{ color: "#d55555" }}>computer graphics</span>, and{" "}
          <span style={{ color: "#d55555" }}>playful storytelling</span>.
          <br />
          <br />
          I love projects where engineering and aesthetics have to cooperate: real-time 3D, VR/XR
          interactions, UI that feels alive, and tools that let people explore. I’m especially drawn
          to work that connects creativity with impact. 
          <br />
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
        </>
      ),
    },
    {
      id: 3,
      title: "03. EXPERIENCE",
      content: (
        <>
          <span style={{ color: "#d55555" }}>
            AI Fellow — Break Through Tech @ MIT
          </span>
          <br />
          Selected from 4,000+ applicants for a 12-month applied AI fellowship.
          Built full ML pipelines in Python (Scikit-learn) on the UCI Census dataset,
          earning a Cornell University certificate in data science. Collaborated on a
          CNN-LSTM speech-denoising project, contributing preprocessing, model training,
          and performance evaluation.
          <br />
          <br />

          <span style={{ color: "#d55555" }}>
            Developer — MedXR (Apple Vision Pro Sprint)
          </span>
          <br />
          Developed an XR vascular catheterization training simulation using Swift and
          RealityKit for Apple Vision Pro. Built front-end systems connecting
          hand-tracking and tool interactions to reactive spatial UI for precise,
          immersive feedback.
          <br />
          <br />

          <span style={{ color: "#d55555" }}>
            Teaching Assistant — C++ Data Structures & Algorithms (Tufts)
          </span>
          <br />
          Lead weekly labs and office hours for ~160 students, supporting debugging,
          memory management, pointers, and algorithmic problem-solving. Provide detailed
          feedback through grading and one-on-one support.
          <br />
          <br />

          <span style={{ color: "#d55555" }}>
            Spatial Mapping Researcher — Tufts Idea Lab
          </span>
          <br />
          Built Python tools for real-time spatial navigation, including a Tkinter GUI
          for ultrasonic sensors, LiDAR point-cloud visualization, and an audio
          feedback system translating distance data into adaptive sound cues for
          visually impaired users.
          <br />
          <br />

          <span style={{ color: "#d55555" }}>
            Developer Intern — Fablevision
          </span>
          <br />
          Developed Unity (C#) gameplay systems, custom tools, and a dialogue framework
          for educational games. Collaborated closely with artists and educators,
          shipping the puzzle-driven narrative game <i>Trial and Error</i>.
          <br />
          <br />

          <span style={{ color: "#d55555" }}>
            Summer Learning Mentee — Academy Software Foundation
          </span>
          <br />
          Built Maya automation tools using Python, Qt, and MEL, alongside a C++/OpenGL
          3D renderer featuring custom shaders, lighting, shadows, and textured models
          with user-controlled navigation.
          <br />
          <br />

          <span style={{ color: "#d55555" }}>
            Product Manager — Develop For Good
          </span>
          <br />
          Led a cross-functional team redesigning goodsamaritanshelter.org, improving
          service discovery for 50+ resources. Defined scope, authored technical and
          design documentation, facilitated stakeholder meetings, and created
          wireframes and mockups to guide development.
          <br />
          <br />

          <span style={{ color: "#d55555" }}>
            Web Developer — JumboCode
          </span>
          <br />
          Built and deployed a React/Next.js scheduling platform for LGBTQ senior
          housing, featuring mobile-first UI, secure authentication (Clerk), and
          PostgreSQL-backed data management.
          <br />
          <br />

          <span style={{ color: "#d55555" }}>
            Digital Content & Marketing Intern — Office of Sustainability (Tufts)
          </span>
          <br />
          Curated and published sustainability-focused content across social media,
          newsletters, and web platforms. Redesigned and updated campus sustainability
          pages, contributing to a 45% increase in website traffic and a 40% average
          newsletter open rate through HTML-based formatting and content organization.
          <br />
          <br />

          <span style={{ color: "#d55555" }}>
            Website Manager — Tufts Observer
          </span>
          <br />
          Managed and maintained the publication’s website, overseeing content updates,
          layout consistency, and ongoing improvements to usability and visual
          presentation.
          <br />
          <br />

          <span style={{ color: "#d55555" }}>
            Graphic Design Intern — Medfield TV
          </span>
          <br />
          Created motion graphics and edited video content for broadcast projects.
          Managed visual assets, maintained organized project files, and collaborated
          with a creative team to deliver engaging media under tight timelines.
        </>
      ),
    },
    {
      id: 4,
title: "04. LEADERSHIP",
content: (
  <>
    I care deeply about communities that support ambitious, creative, and
    technical work. Here are some of the organizations I’ve been involved with at
    Tufts and in the Boston area:
    <br />
    <br />

    <span style={{ color: "#d55555" }}>
      SMFA Student Government Association (Facilities &amp; Technology Rep)
    </span>
    <br />
    Advocated for student needs and improved creative infrastructure by working
    directly with faculty and administration.
    <br />
    <br />

    <span style={{ color: "#d55555" }}>
      SIGGRAPH (Treasurer)
    </span>
    <br />
    Managed funding, budgeting, and event planning to support graphics and
    creative technology projects.
    <br />
    <br />

    <span style={{ color: "#d55555" }}>
      Women In Tech (Design Co-Head)
    </span>
    <br />
    Led design initiatives and supported programming that bridges design and
    technology communities.
    <br />
    <br />

    <span style={{ color: "#d55555" }}>
      Women In Computer Science (Web Designer)
    </span>
    <br />
    Designed and maintained web content to support outreach and community
    engagement.
    <br />
    <br />

    <span style={{ color: "#d55555" }}>
      Tufts Observer (Lead Website Designer)
    </span>
    <br />
    Oversaw website design and structure, ensuring clarity, consistency, and
    accessibility for a student-run publication.
    <br />
    <br />

    <span style={{ color: "#d55555" }}>
      Society of Asian Scientists and Engineers (Social Media Manager)
    </span>
    <br />
    Managed digital presence and content strategy to highlight events and
    strengthen community visibility.
    <br />
    <br />

    <span style={{ color: "#d55555" }}>
      Philippine Student Union (Media Relations)
    </span>
    <br />
    Supported event promotion and community storytelling through visual and
    written media.
    <br />
    <br />

    <span style={{ color: "#d55555" }}>
      Pole Dance (Design Lead)
    </span>
    <br />
    Led visual design for promotional materials and performances.
    <br />
    <br />

    <span style={{ color: "#d55555" }}>
      D1 (Media Specialist)
    </span>
    <br />
    Produced and managed media assets to support branding and outreach.
    <br />
  </>
),
    },
    {
      id: 5,
      title: "05. SKILLS",
      content: (
        <>
<span style={{ color: "#d55555" }}>Programming & Development</span>
    <br />

C++, C, Java, JavaScript / TypeScript, Python, MATLAB, Tailwind CSS, SQL
React, Next.js, Unity (C#), Swift, Xcode, Git
    <br />
    <br />
<span style={{ color: "#d55555" }}>Machine Learning</span>
    <br />

Python (TensorFlow, NumPy, scikit-learn)
Deep learning architectures: CNN, LSTM, CNN-LSTM
Classical ML models: Logistic Regression, Random Forest, Gradient Boosting
Feature engineering & preprocessing workflows
Model training, evaluation, and experimentation
    <br />
    <br />

<span style={{ color: "#d55555" }}>Graphics & Interactive</span>
    <br />

OpenGL, shader programming (HLSL basics), real-time lighting, XR prototyping, TouchDesigner
    <br />
    <br />
<span style={{ color: "#d55555" }}>Design & Tools</span>
    <br />

UI/UX design, visual systems, prototyping & iteration
Figma, Blender, Maya, Houdini, Substance Painter
Adobe Creative Suite (Photoshop, Illustrator, After Effects, Premiere Pro, Indesign)

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
    maxHeight: openSection === section.id ? "2000px" : "0", // bigger cap
    overflow: "hidden",
    transition: "max-height 0.35s ease",
    paddingLeft: "1rem",
  }}
>
<div
  className="pretty-scroll"
  style={{
    padding: "1rem 0",
    color: "#666",
    fontSize: "1.05rem",
    lineHeight: "1.65",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.01em",
    maxHeight: "520px",
    overflowY: "auto",
    paddingRight: "0.75rem",
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
