import React, { useEffect, useRef, useState } from 'react';
import { CanvasEngine } from './CanvasEngine';
import { DynamicOverlay } from './DynamicOverlay';
import { Vision } from './Vision';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RiPlaneLine } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

interface HeroSequenceProps {
  onOpenEnrollment: () => void;
  onIntroComplete: () => void;
}

// Minimum percentage of frames needed before showing content
const READY_THRESHOLD = 15; // ~11 frames is enough for a smooth first impression

export const HeroSequence: React.FC<HeroSequenceProps> = ({ onOpenEnrollment, onIntroComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadPct, setLoadPct] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReady = loadPct >= READY_THRESHOLD;
  
  useEffect(() => {
    // Solo iniciamos GSAP si el componente está montado y los frames están listos
    if (!containerRef.current || !isReady) return;

    // Timeline Maestro atado al MainWrapper (400vh)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Inertial scrubbing
        onUpdate: (self) => {
          setProgress(self.progress);
        },
        onLeave: () => {
          onIntroComplete();
        }
      }
    });

    // Fase 1 (0% - 25%): Fade-out agresivo del Hero Text (Parallax inverso)
    tl.to('.hero-text-container', {
      opacity: 0,
      y: -150,
      ease: 'power2.inOut',
      duration: 0.25 
    }, 0);

    // Fase 4: Dolly Tridimensional del Avión (Aplica durante todo el scroll)
    tl.to('.canvas-container', {
      scale: 1.15,
      ease: 'none',
      duration: 1
    }, 0);

    // Fase 3 (75% - 100%): Oscurecimiento del Canvas (Blackout) para la entrada de InfoCards
    tl.to('.canvas-blackout', {
      opacity: 0.8,
      ease: 'power2.in',
      duration: 0.25
    }, 0.75); // Comienza en el 75% del timeline

    return () => {
      tl.kill();
    };
  }, [isReady, onIntroComplete]);

  return (
    // MainWrapper: Fluye con el contenido para evitar solapamientos en mobile
    <div ref={containerRef} style={{ position: 'relative' }}>
      
      {/* HUD DE PRECARGA */}
      {!isReady && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: '#02050c', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%', maxWidth: 460, padding: '0 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: '#4a90d9', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '2px' }}>
              AUTORIZANDO DESPEGUE...
            </div>
            
            <div style={{ width: '100%', position: 'relative', marginTop: '2rem' }}>
              {/* Airplane hopping along the bar */}
              <div style={{ 
                position: 'absolute', 
                bottom: '16px', 
                left: `calc(${loadPct}% - 15px)`,
                transition: 'left 0.1s linear',
                animation: 'plane-hop 0.4s ease-in-out infinite alternate',
                color: '#4a90d9',
                zIndex: 2
              }}>
                <RiPlaneLine size={30} style={{ transform: 'rotate(45deg)' }} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>
                <span>CARGANDO SISTEMAS</span><span style={{ color: loadPct === 100 ? '#2ecc71' : '#4a90d9', fontWeight: 800 }}>{loadPct}%</span>
              </div>
              <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${loadPct}%`, height: '100%', background: 'linear-gradient(90deg, #4a90d9, #4a90d9, #2ecc71)', transition: 'width 0.1s linear' }} />
              </div>
            </div>
          </div>
          <style>{`
            @keyframes plane-hop {
              0% { transform: translateY(0) scale(1); }
              100% { transform: translateY(-12px) scale(1.05); }
            }
          `}</style>
        </div>
      )}

      {/* CanvasLayer: FIXED permanentemente en el fondo */}
      <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <CanvasEngine progress={progress} onLoadProgress={setLoadPct} />
        {/* Filtro cinemático radial base */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, transparent 15%, rgba(2,5,12,0.72) 100%), linear-gradient(to bottom, transparent 40%, rgba(2,5,12,0.85) 100%)' }} />
        {/* Overlay Blackout (Fase 3) */}
        <div className="canvas-blackout" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundColor: 'var(--color-bg-primary)', opacity: 0 }} />
      </div>

      {/* ContentLayer: Flota sobre el canvas fijo y hace scroll natural */}
      <div style={{ position: 'relative', width: '100%', zIndex: 10 }}>
        
        {/* Fase 1: HeroText (100vh Sticky) */}
        <div className="hero-text-container" style={{ height: '100vh', position: 'sticky', top: 0 }}>
          {isReady && (
            <DynamicOverlay onOpenEnrollment={onOpenEnrollment} />
          )}
        </div>

        {/* Fase 2: Spacer (50vh libres para ver el avión sin crear un agujero negro largo) */}
        <div style={{ height: '50vh', pointerEvents: 'none' }} />

        {/* Fase 3: InfoCards (Tarjetas translúcidas que suben al final) */}
        <div className="info-cards-container">
          {isReady && <Vision />}
        </div>

      </div>
    </div>
  );
};
