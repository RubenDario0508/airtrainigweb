import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    const updateTouchDevice = () => {
      setIsTouchDevice(mediaQuery.matches);
    };
    const timer = setTimeout(updateTouchDevice, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    if (!cursorRef.current) return;
    
    // GSAP quickTo for highly performant tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Magnetic exclusion hover effect on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.magnetic')) {
        gsap.to(cursorRef.current, {
          scale: 3, // Expands the cursor
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.magnetic')) {
        gsap.to(cursorRef.current, {
          scale: 1, // Returns to normal size
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (cursorRef.current) {
        gsap.killTweensOf(cursorRef.current);
      }
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div 
      className="custom-cursor"
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '10px',
        height: '10px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999, // Absolute top layer
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)' // Clean visibility without color inversion bugs
      }}
    />
  );
};
