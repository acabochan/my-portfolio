"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Work() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardPositions, setCardPositions] = useState({});
  const [draggedCard, setDraggedCard] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const filters = [
    { id: "all", label: "All" },
    { id: "code", label: "Code" },
    { id: "design", label: "Design" }
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Website",
      description: "A full-stack e-commerce platform built with Next.js",
      category: "code",
      image: "/images/square.png"
    },
    {
      id: 2,
      title: "Mobile App Design",
      description: "UI/UX design for a fitness tracking mobile application",
      category: "design",
      image: "/images/square.png"
    },
    {
      id: 3,
      title: "React Dashboard",
      description: "Admin dashboard with real-time analytics",
      category: "code",
      image: "/images/square.png"
    },
    {
      id: 4,
      title: "Brand Identity",
      description: "Complete brand identity design for startup",
      category: "design",
      image: "/images/square.png"
    }
  ];

  const filteredProjects = useMemo(() => {
    return selectedFilter === "all"
      ? projects
      : projects.filter(project => project.category === selectedFilter);
  }, [selectedFilter]);

  // Initialize random positions for cards
  useEffect(() => {
    if (viewMode === "messy" && containerRef.current) {
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newPositions = {};
      
      filteredProjects.forEach((project, index) => {
        // Create a scattered, messy layout
        const x = Math.random() * (containerRect.width - 320) + 20;
        const y = Math.random() * 500 + 20 + (index * 80);
        const rotation = (Math.random() - 0.5) * 20; // Random rotation between -10 and 10 degrees
        
        newPositions[project.id] = { x, y, rotation, zIndex: index + 1 };
      });
      
      setCardPositions(newPositions);
    }
  }, [viewMode, filteredProjects]);

  // Handle mouse tracking for list view
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (viewMode === "list") {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [viewMode]);

  // Handle dragging for messy view
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggedCard && viewMode === "messy") {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        setCardPositions(prev => ({
          ...prev,
          [draggedCard]: {
            ...prev[draggedCard],
            x: newX,
            y: newY,
            zIndex: Math.max(...Object.values(prev).map(p => p.zIndex || 0)) + 1
          }
        }));
      }
    };

    const handleMouseUp = () => {
      setDraggedCard(null);
      setDragOffset({ x: 0, y: 0 });
    };

    if (draggedCard) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedCard, dragOffset, viewMode]);

  const handleCardMouseDown = (e, projectId) => {
    if (viewMode !== "messy") return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDraggedCard(projectId);
    setDragOffset({ x: offsetX, y: offsetY });
    
    // Bring card to front
    setCardPositions(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        zIndex: Math.max(...Object.values(prev).map(p => p.zIndex || 0)) + 1
      }
    }));
  };

  return (
    <div style={{ backgroundColor: "#f2ede7", minHeight: "100vh" }}>
      <style jsx>{`
        @font-face {
          font-family: 'Maragsa';
          src: url('./fonts/maragsa.otf') format('opentype'),
               url('/fonts/maragsa.otf') format('opentype');
          font-display: swap;
          font-weight: normal;
          font-style: normal;
        }

        .maragsa-font {
          font-family: 'Maragsa', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
        }

        .grid-card:hover {
          transform: scale(1.05);
          box-shadow: 5px 5px 0 #d55555;
        }

        .messy-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: grab;
        }

        .messy-card:hover {
          transform: scale(1.02) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }

        .messy-card:active {
          cursor: grabbing;
        }

        .messy-card.dragging {
          transition: none;
          transform: scale(1.05) !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2) !important;
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
                  ${selectedFilter === filter.id
                    ? 'bg-[#d55555] border-[#d55555] text-[#f2ede7]'
                    : 'bg-transparent border-[#d55555] text-[#d55555] hover:text-[#f2ede7]'
                  }
                `}
                style={{
                  fontSize: '15.2px',
                  fontWeight: '500'
                }}
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
                ${viewMode === "grid"
                  ? 'bg-[#d55555] border-[#d55555] text-[#f2ede7]'
                  : 'bg-transparent border-[#d55555] text-[#d55555] hover:text-[#f2ede7]'
                }
              `}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
              </svg>
              <div className="wave-fill" />
            </button>

            <button
              onClick={() => setViewMode("messy")}
              className={`
                wave-button p-3 rounded-full border-2 transition-colors duration-300
                ${viewMode === "messy"
                  ? 'bg-[#d55555] border-[#d55555] text-[#f2ede7]'
                  : 'bg-transparent border-[#d55555] text-[#d55555] hover:text-[#f2ede7]'
                }
              `}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" transform="rotate(5 12 12)" />
                <path d="M6 4h12v2H6zm2 5h8v2H8zm-1 5h10v2H7z" transform="rotate(-3 12 12)" />
              </svg>
              <div className="wave-fill" />
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`
                wave-button p-3 rounded-full border-2 transition-colors duration-300
                ${viewMode === "list"
                  ? 'bg-[#d55555] border-[#d55555] text-[#f2ede7]'
                  : 'bg-transparent border-[#d55555] text-[#d55555] hover:text-[#f2ede7]'
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
            {filteredProjects.map((project) => (
              <div key={project.id} className="grid-card bg-[#f2ede7] rounded-lg overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-sm font-medium maragsa-font">
                    {project.category === "code" ? "💻" : "🎨"} {project.title}
                  </div>
                </div>
                <div className="p-6 bg-[#f2ede7]">
                  <h3 className="text-lg font-semibold mb-2 maragsa-font text-[#d55555]">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "messy" && (
          <div 
            ref={containerRef}
            className="relative mt-15"
            style={{ height: "800px", overflow: "hidden" }}
          >
            {filteredProjects.map((project) => {
              const position = cardPositions[project.id] || { x: 0, y: 0, rotation: 0, zIndex: 1 };
              return (
                <div
                  key={project.id}
                  className={`messy-card absolute w-80 bg-white rounded-xl shadow-lg overflow-hidden select-none ${
                    draggedCard === project.id ? 'dragging' : ''
                  }`}
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `rotate(${position.rotation}deg)`,
                    zIndex: position.zIndex,
                    boxShadow: draggedCard === project.id 
                      ? '0 15px 35px rgba(0, 0, 0, 0.2)' 
                      : '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseDown={(e) => handleCardMouseDown(e, project.id)}
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-b border-gray-200">
                  </div>
                  <div className="p-6 bg-[#d55555]">
                    <h3 className="text-lg font-semibold mb-2 maragsa-font text-[#f2ede7]">{project.title}</h3>
                    <p className="text-[#f2ede7] text-sm">{project.description}</p>
                    <div className="mt-3">
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {viewMode === "list" && (
          <div className="space-y-8 mt-15">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between py-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Title on the left */}
                <h3 className="maragsa-font text-[#d55555]" style={{ fontSize: '54.3px', fontWeight: '500' }}>
                  {project.title}
                </h3>
                
                {/* Category in the middle-right */}
                <div className="flex-1 flex justify-center">
                  <span className="maragsa-font text-[#d55555]" style={{ fontSize: '17px' }}>
                    {project.category}
                  </span>
                </div>
                
                {/* Description on the far right */}
                <div className="max-w-xs text-right">
                  <p className="text-[#d55555]" style={{ fontSize: '17px' }}>
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
            <div className="w-64 h-48 bg-gray-300 rounded-lg shadow-xl border-2 border-white overflow-hidden">
              <div className="w-full h-full bg-gray-400 flex items-center justify-center text-gray-600 text-base font-medium maragsa-font">
                {hoveredProject.title}
              </div>
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