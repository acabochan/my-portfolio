"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Work() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const filters = [
    { id: "all", label: "All" },
    { id: "code", label: "Code" },
    { id: "design", label: "Design" }
  ];

  // Sample project data with images
  const projects = [
    {
      id: 1,
      title: "E-commerce Website",
      description: "A full-stack e-commerce platform built with Next.js",
      category: "code",
      image: "/images/project1.jpg"
    },
    {
      id: 2,
      title: "Mobile App Design",
      description: "UI/UX design for a fitness tracking mobile application",
      category: "design",
      image: "/images/project2.jpg"
    },
    {
      id: 3,
      title: "React Dashboard",
      description: "Admin dashboard with real-time analytics",
      category: "code",
      image: "/images/project3.jpg"
    },
    {
      id: 4,
      title: "Brand Identity",
      description: "Complete brand identity design for startup",
      category: "design",
      image: "/images/project4.jpg"
    }
  ];

  const filteredProjects = selectedFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  // Debug logging
  console.log('All projects:', projects);
  console.log('Selected filter:', selectedFilter);
  console.log('Filtered projects:', filteredProjects);
  console.log('View mode:', viewMode);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Always listen for mouse movement when in list mode
    if (viewMode === "list") {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [viewMode]);

  return (
    <div style={{ backgroundColor: "#f2ede7", minHeight: "100vh" }}>
      <Navbar />
      <main className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`
                  relative overflow-hidden px-6 py-3 rounded-full border-2 transition-colors duration-300
                  ${selectedFilter === filter.id 
                    ? 'bg-[#d55555] border-[#d55555] text-white' 
                    : 'bg-transparent border-[#d55555] text-[#d55555] hover:text-white'
                  }
                `}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '15.2px',
                  fontWeight: '500'
                }}
              >
                <span className="relative z-10">{filter.label}</span>
                {selectedFilter !== filter.id && (
                  <div 
                    className="absolute inset-0 bg-[#d55555] transform translate-y-full transition-transform duration-300 ease-out hover:translate-y-0"
                    style={{ zIndex: 1 }}
                  />
                )}
              </button>
            ))}
          </div>
          
          {/* View mode toggle */}
          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors duration-200 ${
                viewMode === "grid" ? "bg-[#d55555] text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors duration-200 ${
                viewMode === "list" ? "bg-[#d55555] text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {console.log('Rendering grid with projects:', filteredProjects)}
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback for missing images
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {console.log('Rendering list with projects:', filteredProjects)}
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => {
                  console.log('Hovering over:', project.title);
                  setHoveredProject(project);
                }}
                onMouseLeave={() => {
                  console.log('Left project');
                  setHoveredProject(null);
                }}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  <div className="mt-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      project.category === "code" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-purple-100 text-purple-800"
                    }`}>
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mouse-following popup for list view */}
        {viewMode === "list" && hoveredProject && (
          <div 
            className="fixed pointer-events-none z-50"
            style={{
              left: `${mousePosition.x + 20}px`,
              top: `${mousePosition.y - 60}px`,
            }}
          >
            <div className="w-48 h-32 bg-gray-300 rounded-lg shadow-xl border-2 border-white overflow-hidden">
              <div className="w-full h-full bg-gray-400 flex items-center justify-center text-gray-600 text-sm font-medium">
                {hoveredProject.title}
              </div>
            </div>
          </div>
        )}
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found for the selected filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}