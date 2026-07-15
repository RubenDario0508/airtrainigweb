import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface DynamicOverlayProps {
  onOpenEnrollment: () => void;
}

export const DynamicOverlay: React.FC<DynamicOverlayProps> = ({ onOpenEnrollment }) => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const magneticInscribeRef = useRef<HTMLButtonElement>(null);
  const magneticProgramasRef = useRef<HTMLButtonElement>(null);

  // GSAP Intro Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2
      });
    }, textContainerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // 1. Text Reveal Stagger Animation
    if (textContainerRef.current) {
      gsap.fromTo('.reveal-line', 
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.3 }
      );
    }

    // 2. Magnetic Button Physics helper
    const setupMagnetic = (btn: HTMLButtonElement | null) => {
      if (!btn) return;

      const xTo = gsap.quickTo(btn, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
      const yTo = gsap.quickTo(btn, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

      const mouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = btn.getBoundingClientRect();
        const x = clientX - (left + width/2);
        const y = clientY - (top + height/2);
        // Pull strength is 0.4 for smooth, elegant movement
        xTo(x * 0.4);
        yTo(y * 0.4);
      };
      
      const mouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      btn.addEventListener("mousemove", mouseMove);
      btn.addEventListener("mouseleave", mouseLeave);
      
      return () => {
        btn.removeEventListener("mousemove", mouseMove);
        btn.removeEventListener("mouseleave", mouseLeave);
      };
    };

    const cleanupInscribe = setupMagnetic(magneticInscribeRef.current);
    const cleanupProgramas = setupMagnetic(magneticProgramasRef.current);

    return () => {
      if (cleanupInscribe) cleanupInscribe();
      if (cleanupProgramas) cleanupProgramas();
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      {/* 50/50 Grid container */}
      <div 
        className="overlay-grid"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          height: '100%',
          width: '100%' 
        }}
      >
        {/* Lado Izquierdo: Textos y Botón */}
        <div 
          className="left-column"
          ref={textContainerRef}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start',
            paddingTop: 'clamp(100px, 15vh, 150px)', /* pushes text up near the header */
            paddingBottom: '20px',
            paddingLeft: 'max(1.5rem, 6vw)',
            width: '100%',
            height: '100%',
            maxWidth: '700px', /* Increased to fit side-by-side buttons perfectly */
            pointerEvents: 'auto',
            willChange: 'opacity, transform'
          }}
        >
          {/* Staggered Lines with Overflow Hidden for clipping effect */}
          <div style={{ overflow: 'hidden', padding: '0.2em 0' }}>
            <h1 className="hero-title reveal-line" style={{ 
                color: '#ffffff', 
                fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                fontWeight: 900, 
                lineHeight: 1.1,
                textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                letterSpacing: '-1.5px',
                margin: 0
            }}>
              Tu carrera hacia
            </h1>
          </div>
          <div style={{ overflow: 'hidden', padding: '0.2em 0', marginBottom: '0.5rem' }}>
            <h1 className="hero-title reveal-line" style={{ 
                color: '#ffffff', 
                fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                fontWeight: 900, 
                lineHeight: 1.1,
                textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                letterSpacing: '-1.5px',
                margin: 0
            }}>
              las nubes comienza aquí
            </h1>
          </div>
          
          <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
            <p className="hero-desc reveal-line" style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              lineHeight: 1.5,
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              fontWeight: 400,
              letterSpacing: '0.5px'
            }}>
              Formación aeronáutica de élite con estándares internacionales.
            </p>
          </div>
          
          <div style={{ overflow: 'hidden', marginTop: '1.2rem', marginLeft: '-4px' }}>
            <div className="reveal-line" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', pointerEvents: 'auto' }}>
              {/* Primary Action: Inscríbete */}
              <button 
                ref={magneticInscribeRef}
                onClick={onOpenEnrollment}
                className="btn-primary"
                style={{
                  padding: '0.85rem 2.2rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '50px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #e71a24 0%, #b00f16 100%)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 15px rgba(231, 26, 36, 0.35)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  willChange: 'transform',
                  margin: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ff2a34 0%, #d3121b 100%)';
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(231, 26, 36, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #e71a24 0%, #b00f16 100%)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(231, 26, 36, 0.35)';
                }}
              >
                Inscríbete
              </button>

              {/* Secondary Action: Conoce nuestros programas */}
              <button 
                ref={magneticProgramasRef}
                className="btn-outline-magnetic hero-btn magnetic"
                onClick={() => {
                  window.location.hash = '#programas';
                }}
                style={{
                  padding: '0.85rem 2.2rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  willChange: 'transform',
                  margin: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 'auto'
                }}
              >
                <span>Conoce nuestros programas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lado Derecho */}
        <div 
          className="right-column" 
          style={{ 
            position: 'relative',
            opacity: 0,
            willChange: 'opacity, transform'
          }}
        >
        </div>
      </div>
    </div>
  );
};
