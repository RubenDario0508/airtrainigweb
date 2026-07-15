import React, { useState, useEffect } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';

export const MobileBackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const toggleVisibility = () => {
      // Show button when scrolled down 800px
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Only render on mobile screens
  if (!isMobile) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '5.5rem',
        right: '1.5rem',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-accent-red)',
        color: '#ffffff',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 25px rgba(230, 0, 0, 0.4)',
        cursor: 'pointer',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      aria-label="Volver al inicio"
    >
      <RiArrowUpSLine size={30} />
    </button>
  );
};
