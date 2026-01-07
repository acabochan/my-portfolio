"use client";
import React, { useRef, useState } from "react";

function HoverWord({
  text,
  onHoverChange,
  style,
  bubbleItems = [],
  bubbleSide = "right", // "right" | "left"
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isWordHover, setIsWordHover] = useState(false);
  const hoverTimeoutRef = useRef(null);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        pointerEvents: "auto",
        zIndex: 9999,
        overflow: "visible",
      }}
      onMouseEnter={() => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        setIsWordHover(true);
        onHoverChange?.(true);
      }}
      onMouseLeave={() => {
        setIsWordHover(false);
        onHoverChange?.(false);

        hoverTimeoutRef.current = setTimeout(() => {
          setHoveredIdx(null);
        }, 200);
      }}
    >
      <span style={{ ...style, display: "inline-block", position: "relative", zIndex: 2 }}>
        {text.split("").map((ch, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <span
              key={`${ch}-${i}`}
              onMouseEnter={() => setHoveredIdx(i)}
              style={{
                display: "inline-block",
                fontStyle: isHovered ? "italic" : "normal",
                transition: "transform 140ms ease, font-style 140ms ease",
                transform: isHovered ? "translateY(-2px)" : "translateY(0px)",
                cursor: "default",
                pointerEvents: "auto",
                userSelect: "none",
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          );
        })}
      </span>

      {/* Pop-out bubbles - arranged in an oval scatter around the word */}
      <div
        style={{
          position: "absolute",
          left: "85%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 0,
          height: 0,
          pointerEvents: "none",
          overflow: "visible",
          zIndex: 99998,
        }}
      >
        {bubbleItems.map((item, idx) => {
          const angle = (idx / bubbleItems.length) * Math.PI * 2;
          const radiusX = 180 + (idx % 2) * 150;
          const radiusY = 90 + (idx % 2) * 5;
          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY;
          const delay = idx * 60;

          return (
            <span
              key={item}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                display: "inline-block",
                padding: "10px 16px",
                borderRadius: 999,
                background: "#d55555",
                border: "1px solid rgba(0,0,0,0.12)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
                fontFamily:
                  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
                fontSize: 14,
                fontWeight: 500,
                color: "#ffffff",
                transform: isWordHover
                  ? `translate(-50%, -50%) scale(1) rotate(${(idx % 2 === 0 ? 1 : -1) * 2}deg)`
                  : `translate(-50%, -50%) scale(0.3) rotate(0deg)`,
                opacity: isWordHover ? 1 : 0,
                transition: `all 350ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
                whiteSpace: "nowrap",
                backdropFilter: "blur(8px)",
                zIndex: 99998,
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default HoverWord;