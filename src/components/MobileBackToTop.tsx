import React, { useState, useEffect } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';

export const MobileBackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
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
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        boxShadow: isHovered 
          ? '0 10px 30px rgba(230, 0, 0, 0.6)' 
          : '0 8px 25px rgba(230, 0, 0, 0.4)',
        cursor: 'pointer',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? (isHovered ? 'translateY(-5px) scale(1.1)' : 'translateY(0) scale(1)') 
          : 'translateY(20px) scale(1)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      aria-label="Volver al inicio"
    >
      <RiArrowUpSLine size={30} />
    </button>
  );
};
