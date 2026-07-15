import React, { useEffect, useState } from 'react';
import { RiArrowRightLine, RiMessage2Line, RiArrowDownSLine } from 'react-icons/ri';

interface HeroProps {
  onOpenEnrollment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnrollment }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations (speed ratio: 0.4)
  const parallaxOffset = scrollY * 0.4;

  return (
    <section className="parallax-container" style={{ minHeight: '95vh' }}>
      {/* Background with Parallax transformation */}
      <div
        className="parallax-bg"
        style={{
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
          backgroundImage: `url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1920&q=80')`, // Impresionante avión comercial / pista
          filter: 'brightness(0.85)'
        }}
      />
      
      {/* Dark gradient cockpit overlay */}
      <div className="parallax-overlay" />

      {/* Hero Content */}
      <div className="parallax-content container" style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          
          {/* Animated Flight Badge */}
          <div
            className="glass-panel"
            style={{
              padding: '6px 16px',
              borderRadius: '50px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--color-accent-blue)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              border: '1px solid rgba(0, 51, 170, 0.35)',
              backgroundColor: 'rgba(7, 12, 23, 0.6)'
            }}
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent-green)',
              boxShadow: '0 0 10px var(--color-accent-green)'
            }} />
            Matrículas Abiertas 2026
          </div>

          {/* Main Titles */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              color: '#ffffff',
              margin: '0.5rem 0 1rem 0'
            }}
          >
            Excelencia en <br />
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 30%, var(--color-accent-blue) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 900
            }}>
              el Aire
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              fontWeight: 500,
              color: '#f0f4f8',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              maxWidth: '600px',
              margin: '0 auto 2rem auto',
              lineHeight: 1.5
            }}
          >
            Haz realidad tu sueño de volar. Fórmate con instructores de élite y simuladores de última generación.
          </p>

          {/* Buttons Group */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <a href="#programas" className="btn-primary">
              Conoce Nuestros Programas <RiArrowRightLine size={18} />
            </a>
            
            <button className="btn-secondary" onClick={onOpenEnrollment}>
              Solicitar Información <RiMessage2Line size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Down Chevron Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          color: '#ffffff',
          opacity: scrollY > 100 ? 0 : 0.8,
          transition: 'var(--transition-fast)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          pointerEvents: 'none'
        }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Explorar</span>
        <RiArrowDownSLine size={20} className="float-animation" />
      </div>
    </section>
  );
};
