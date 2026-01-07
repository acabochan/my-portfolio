"use client";

import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);
  const [buttonPositions, setButtonPositions] = useState({
    work: { x: 0, y: 0 },
    about: { x: 0, y: 0 },
    resume: { x: 0, y: 0 },
    skills: { x: 0, y: 0 }
  });

  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (section) => {
    setIsOpen(false);
    if (section === 'home') {
      router.push('/');
    } else {
      router.push(`/${section}`);
    }
  };

  const isActive = (section) => {
    if (section === 'home') {
      return pathname === '/';
    }
    return pathname === `/${section}`;
  };

  const handleMouseMove = (e, buttonName) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const maxOffset = 8; // Maximum pixels to move
    const offsetX = Math.max(-maxOffset, Math.min(maxOffset, (mouseX - centerX) * 0.3));
    const offsetY = Math.max(-maxOffset, Math.min(maxOffset, (mouseY - centerY) * 0.3));
    
    setButtonPositions(prev => ({
      ...prev,
      [buttonName]: { x: offsetX, y: offsetY }
    }));
  };

  const handleMouseLeave = (buttonName) => {
    setButtonPositions(prev => ({
      ...prev,
      [buttonName]: { x: 0, y: 0 }
    }));
  };

  return (
    <nav className="bg-transparent shadow-md px-6 py-8 relative z-50" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div 
          className="relative overflow-hidden cursor-pointer group w-64"
          onMouseEnter={() => setNameHovered(true)}
          onMouseLeave={() => setNameHovered(false)}
          onClick={() => handleNavClick('home')}
        >
          <div className="relative h-8 flex items-center">
            <span 
              className={`font-bold transition-transform duration-500 ease-in-out absolute whitespace-nowrap ${
                nameHovered ? '-translate-x-full' : 'translate-x-0'
              }`}
              style={{ fontSize: '29.7px', color: '#04081c' }}
            >
              Andrea Lorraine
            </span>
            <span 
              className={`font-bold transition-transform duration-500 ease-in-out absolute whitespace-nowrap ${
                nameHovered ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{ fontSize: '29.7px', color: nameHovered ? '#d55555' : '#04081c' }}
            >
              Manalo Cabochan
            </span>
          </div>
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <ul
          className={`absolute md:relative top-full md:top-auto left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none md:flex items-center text-gray-700 font-medium transition-all duration-300 ${
            isOpen ? "block opacity-100 translate-y-0" : "hidden md:block opacity-100"
          }`}
          style={{ gap: '85px' }}
        >
          {['work', 'about', 'resume'].map((item) => (
            <li key={item} className="border-b md:border-none">
              <button 
                onClick={() => handleNavClick(item)}
                onMouseMove={(e) => handleMouseMove(e, item)}
                onMouseLeave={() => handleMouseLeave(item)}
                className="group relative block w-full text-left px-6 py-3 md:p-2 hover:bg-gray-50 md:hover:bg-transparent transition-all duration-200"
                style={{
                  transform: `translate(${buttonPositions[item].x}px, ${buttonPositions[item].y}px)`,
                  transition: buttonPositions[item].x === 0 && buttonPositions[item].y === 0 ? 'transform 0.3s ease-out' : 'none'
                }}
              >
                <style jsx>{`
                  .group:hover .nav-text {
                    color: #d55555 !important;
                  }
                `}</style>
                <div className="flex items-center gap-2 relative">
                  <span 
                    className="nav-text capitalize font-medium transition-colors duration-200 relative z-10"
                    style={{ 
                      fontSize: '17px', 
                      color: isActive(item) ? '#d55555' : '#04081c'
                    }}
                  >
                    {item}
                  </span>
                  
                  {/* Arrow that disappears on hover or when active */}
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <svg 
                      className={`w-4 h-4 group-hover:opacity-0 transition-all duration-300 ${
                        isActive(item) ? 'opacity-0' : 'opacity-100'
                      }`}
                      fill="none" 
                      stroke="#04081c"
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 12h14m-7-7l7 7-7 7"
                      />
                    </svg>
                  </div>
                  
                  {/* Strike-through line that shows on hover or when active */}
                  <div className="absolute inset-0 flex items-center pointer-events-none">
                    <div 
                      className={`h-0.5 transform transition-transform duration-300 origin-right ${
                        isActive(item) 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      style={{ 
                        width: `${item.length * 0.6}em`,
                        backgroundColor: '#d55555'
                      }}
                    ></div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}