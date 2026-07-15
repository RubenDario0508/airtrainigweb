import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RiCompassLine, RiRadioLine, RiShieldLine, RiArrowRightLine, RiPulseLine } from 'react-icons/ri';
import '../styles/glass-cards.css';

interface ThreeDParallaxProps {
  onOpenEnrollment: () => void;
  onIntroComplete: () => void;
}

export const ThreeDParallax: React.FC<ThreeDParallaxProps> = ({ onOpenEnrollment, onIntroComplete }) => {
  const containerRef      = useRef<HTMLDivElement>(null);
  const videoRef          = useRef<HTMLVideoElement>(null);
  const canvasRef         = useRef<HTMLCanvasElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs          = useRef<(HTMLDivElement | null)[]>([]);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadPct, setLoadPct] = useState(0);
  
  // States to control the dynamic sequence
  const [scrollPhase, setScrollPhase] = useState<'preloader' | 'video-swipe' | 'canvas-scroll'>('preloader');
  
  // Animation state refs to avoid re-renders during 60fps drawing
  const stateRef = useRef({
    currentFrame: 1,
    targetFrame: 1,
    currentSwipePct: 0,
    targetSwipePct: 0,
    zoomScale: 1,
    zoomBlur: 0,
    zoomOpacity: 1,
    autoSequenceTriggered: false,
    onIntroCompleteTriggered: false
  });

  const TOTAL_FRAMES = 217;

  // 1. PRELOAD IMAGES
  useEffect(() => {
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];
    
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/hero-parallax/frame-${frameNum}.webp`;
      img.onload = () => {
        loaded++;
        setLoadPct(Math.floor((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          setImages(loadedImages);
          // Wait 1 second before starting to show the 100% preloader
          setTimeout(() => setScrollPhase('video-swipe'), 1000);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // 2. DRAW FRAME FUNCTION
  const drawFrame = useCallback((frameIndex: number, scale = 1, blur = 0, opacity = 1) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !images[frameIndex - 1]) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply filters and opacity
    ctx.filter = `blur(${blur}px)`;
    ctx.globalAlpha = opacity;

    const img = images[frameIndex - 1];
    
    // Calculate aspect ratio cover
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio    = img.width / img.height;
    
    let drawWidth  = canvas.width * scale;
    let drawHeight = canvas.height * scale;
    let offsetX    = (canvas.width - drawWidth) / 2;
    let offsetY    = (canvas.height - drawHeight) / 2;

    if (canvasRatio > imgRatio) {
      drawHeight = (canvas.width / imgRatio) * scale;
      offsetY    = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth  = (canvas.height * imgRatio) * scale;
      offsetX    = (canvas.width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    // Reset filters
    ctx.filter = 'none';
    ctx.globalAlpha = 1;
  }, [images]);

  // Handle Resize
  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        // High DPI canvas
        const d = window.devicePixelRatio || 1;
        canvasRef.current.width  = window.innerWidth * d;
        canvasRef.current.height = window.innerHeight * d;
        drawFrame(stateRef.current.currentFrame, stateRef.current.zoomScale, stateRef.current.zoomBlur, stateRef.current.zoomOpacity);
      }
    };
    window.addEventListener('resize', resize);
    resize();
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  const handleVideoEnded = useCallback(() => {
    // We no longer animate scroll automatically. 
    // The user has full control.
  }, []);

  // 2.5. CENTRALIZED GLASS CARDS UPDATE ENGINE (Declarative styling across renders)
  const updateCards = useCallback((frameProgress: number) => {
    const c0 = cardRefs.current[0];
    const c1 = cardRefs.current[1];
    const c2 = cardRefs.current[2];
    const c3 = cardRefs.current[3];
    const c4 = cardRefs.current[4];

    const isMobile = window.innerWidth <= 800;

    // Helper to safely set card styles
    const setCardVisible = (card: HTMLDivElement | null, visible: boolean, isCTA = false) => {
      if (!card) return;
      card.style.opacity = visible ? '1' : '0';
      card.style.transform = visible 
        ? (isCTA ? 'translateY(0) scale(1)' : 'translateY(0)') 
        : (isCTA ? 'translateY(20px) scale(0.95)' : 'translateY(20px)');
      card.style.pointerEvents = visible ? 'auto' : 'none';
      
      // On mobile, completely hide non-visible cards from layout if needed
      card.style.display = visible ? 'block' : 'none';
    };

    if (scrollPhase === 'canvas-scroll') {
      if (isMobile) {
        // Mobile sequence: Step-by-step progressive cards to prevent overlap & overflow (Snappy Milestones)
        if (frameProgress < 80) {
          setCardVisible(c0, true);
          setCardVisible(c1, true);
          setCardVisible(c2, false);
          setCardVisible(c3, false);
          setCardVisible(c4, false, true);
        } else if (frameProgress >= 80 && frameProgress < 120) {
          setCardVisible(c0, false);
          setCardVisible(c1, false);
          setCardVisible(c2, true);
          setCardVisible(c3, false);
          setCardVisible(c4, false, true);
        } else if (frameProgress >= 120 && frameProgress < 170) {
          setCardVisible(c0, false);
          setCardVisible(c1, false);
          setCardVisible(c2, false);
          setCardVisible(c3, true);
          setCardVisible(c4, false, true);
        } else {
          setCardVisible(c0, false);
          setCardVisible(c1, false);
          setCardVisible(c2, false);
          setCardVisible(c3, false);
          setCardVisible(c4, true, true);
        }
      } else {
        // Desktop sequence: Persistent layout (2 left columns, 2 right columns, 1 center overlay)
        setCardVisible(c0, true);
        setCardVisible(c1, true);
        setCardVisible(c2, frameProgress >= 80);
        setCardVisible(c3, frameProgress >= 120);
        setCardVisible(c4, frameProgress >= 195, true);
      }
    } else {
      // Hidden in other phases
      setCardVisible(c0, false);
      setCardVisible(c1, false);
      setCardVisible(c2, false);
      setCardVisible(c3, false);
      setCardVisible(c4, false, true);
    }
  }, [scrollPhase]);

  // 3. MANUAL ZOOM LOGIC IS INTEGRATED INTO UPDATE ANIMATION

  // 4. SCROLL LISTENER & ANIMATION LOOP (The master orchestrator)
  useEffect(() => {
    if (scrollPhase === 'preloader') return;

    let rafId: number;

    const updateAnimation = () => {
      const scrollY = window.scrollY;

      // 4.1. Horizontal Swipe (0 -> 1000px scroll)
      if (scrollPhase === 'video-swipe') {
        const targetPct = Math.min(1, Math.max(0, scrollY / 1000));
        
        // Smoothly interpolate currentSwipePct towards targetPct
        const diff = targetPct - stateRef.current.currentSwipePct;
        if (Math.abs(diff) > 0.0005) {
          stateRef.current.currentSwipePct += diff * 0.12; // Snappier lerp factor to remove lag
        } else {
          stateRef.current.currentSwipePct = targetPct;
        }

        const pct = stateRef.current.currentSwipePct;

        // Update DOM transforms for swipe
        const videoWrapper = document.getElementById('video-wrapper');
        const canvasWrapper = document.getElementById('canvas-wrapper');
        const heroOverlay = document.getElementById('hero-overlay');

        if (videoWrapper) videoWrapper.style.transform = `translateX(-${pct * 100}vw)`;
        if (canvasWrapper) canvasWrapper.style.transform = `translateX(${100 - (pct * 100)}vw)`;
        if (heroOverlay) {
          heroOverlay.style.opacity = `${1 - (pct * 2.5)}`; // Fade out quickly
          heroOverlay.style.transform = `translateY(${pct * 30}px)`;
        }

        // If swipe is fully complete, shift phase immediately to canvas-scroll to let user continue scrolling manually
        if (targetPct >= 1.0 && pct >= 0.99) {
          stateRef.current.currentSwipePct = 1.0;
          if (videoWrapper) videoWrapper.style.transform = 'translateX(-100vw)';
          if (canvasWrapper) canvasWrapper.style.transform = 'translateX(0vw)';
          if (!stateRef.current.autoSequenceTriggered) {
            stateRef.current.autoSequenceTriggered = true;
            setScrollPhase('canvas-scroll');
          }
        }

        // Keep cards hidden during swipe
        updateCards(1);
      }

      // 4.2. Manual Scroll Canvas (Zoom -> Cabin scrub)
      if (scrollPhase === 'canvas-scroll' && scrollY > 1000) {
        // Zoom Phase (1000px to 1400px)
        if (scrollY < 1400) {
          const zoomProgress = Math.min(1, Math.max(0, (scrollY - 1000) / 400));
          const eased = zoomProgress * zoomProgress * zoomProgress;
          
          stateRef.current.zoomScale = 1 + (eased * 19);
          stateRef.current.zoomBlur = eased * 15;
          stateRef.current.zoomOpacity = 1 - (eased * 0.5);
          
          drawFrame(1, stateRef.current.zoomScale, stateRef.current.zoomBlur, stateRef.current.zoomOpacity);
          
          // Show the first cards progressively during zoom
          updateCards(1);
          
          // Reset frame states
          stateRef.current.currentFrame = 1;
          stateRef.current.targetFrame = 1;
        } 
        // Cabin Frames Phase (1400px to 3500px)
        else {
          stateRef.current.zoomScale = 1;
          stateRef.current.zoomBlur = 0;
          stateRef.current.zoomOpacity = 1;

          const scrollRange = 2100; // 3500 - 1400
          const scrollProgress = Math.min(1, Math.max(0, (scrollY - 1400) / scrollRange));
          
          // Map progress (0 to 1) to frames (2 to 217)
          const targetFrame = 2 + scrollProgress * (217 - 2);
          stateRef.current.targetFrame = targetFrame;

          // Darken environment progressively to bridge the gap into the dark Vision section
          const blackout = document.getElementById('canvas-blackout');
          if (blackout) {
            const blackoutOpacity = Math.max(0, (scrollY - 2500) / 1000); // Fades in during the last 1000px of scroll
            blackout.style.opacity = `${Math.min(1, blackoutOpacity)}`;
          }

          // Smoothly interpolate frame towards target frame
          const diffFrame = targetFrame - stateRef.current.currentFrame;
          if (Math.abs(diffFrame) > 0.05) {
            stateRef.current.currentFrame += diffFrame * 0.18; // Snappier lerp factor to remove lag feeling
          } else {
            stateRef.current.currentFrame = targetFrame;
          }

          const frameProgress = Math.round(stateRef.current.currentFrame);

          // Deep zoom transitions (approx frames 108 and 145)
          let scale = 1;
          if (frameProgress > 108 && frameProgress < 122) {
            const z = (frameProgress - 108) / 14;
            scale = 1 + Math.sin(z * Math.PI) * 0.15; // bump scale by 15%
          } else if (frameProgress > 145 && frameProgress < 162) {
            const z = (frameProgress - 145) / 17;
            scale = 1 + Math.sin(z * Math.PI) * 0.15;
          }

          drawFrame(frameProgress, scale);

          // Sync all cards under our centralized update engine
          updateCards(frameProgress);

        // Animate telemetry airspeed
        const c3 = cardRefs.current[3];
        if (c3 && frameProgress >= 120) {
          const barEl = document.getElementById('telemetry-speed-bar');
          const speedEl = document.getElementById('telemetry-speed');
          if (barEl && speedEl) {
            const spd = Math.round(150 + Math.min(1, (frameProgress - 120) / 50) * 150);
            barEl.style.width = `${(spd / 300) * 100}%`;
            speedEl.innerText = `${spd} KM/H`;
          }
        }

        const c4 = cardRefs.current[4];
        if (c4 && frameProgress >= 200) {
          // Safe double-guard to execute only once
          if (!stateRef.current.onIntroCompleteTriggered) {
            stateRef.current.onIntroCompleteTriggered = true;
            onIntroComplete();
          }
        }
        } // End of else block
      }

      rafId = requestAnimationFrame(updateAnimation);
    };

    rafId = requestAnimationFrame(updateAnimation);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [scrollPhase, drawFrame, onIntroComplete, updateCards]);

  // 4.5. REMOVED SCROLL PREVENTION (User now has 100% control)

  // Determine dynamic body height
  let bodyHeight = '100vh';
  if (scrollPhase === 'video-swipe') bodyHeight = 'calc(100vh + 1000px)'; // Enough to swipe
  else if (scrollPhase === 'canvas-scroll') bodyHeight = 'calc(100vh + 3500px)'; // Fully unlocked for canvas (2500px total range for zoom + cabin)

  return (
    <div ref={containerRef} id="hero-parallax" style={{ position: 'relative', width: '100%', height: bodyHeight, backgroundColor: '#02050c' }}>
      
      {/* ══ STICKY VIEWPORT (Holds everything fixed to screen while scrolling) ══ */}
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
        
        {/* 1. VIDEO WRAPPER (Slides out to the left) */}
        <div id="video-wrapper" style={{ position: 'absolute', inset: 0, zIndex: 1, willChange: 'transform' }}>
           <video
            ref={videoRef}
            src="/models/Airplane.webm"
            autoPlay muted playsInline
            onEnded={handleVideoEnded}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Overlay oscuro para mejorar legibilidad */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} />
          
          {/* Hero Content Overlay (Asymmetrical Layout) */}
          <div 
            id="hero-overlay"
            style={{ 
              position: 'absolute', 
              inset: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start', // ALIGN LEFT
              justifyContent: 'center', 
              zIndex: 10,
              padding: '0 8vw', // 8vw padding from left to let the plane breathe on the right
              textAlign: 'left', // TEXT ALIGN LEFT
              willChange: 'opacity, transform'
            }}
          >
            <h1 style={{ 
              color: '#ffffff', 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', // Even larger typography
              fontWeight: 900, // HEAVIER WEIGHT as requested (matches Infraestructura)
              lineHeight: 1.05,
              marginBottom: '1.5rem',
              textShadow: '0 10px 40px rgba(0,0,0,0.8)',
              maxWidth: '850px',
              letterSpacing: '-1.5px'
            }}>
              Tu carrera hacia las nubes comienza aquí
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
              marginBottom: '3rem',
              maxWidth: '550px',
              textShadow: '0 4px 15px rgba(0,0,0,0.8)',
              fontWeight: 400,
              letterSpacing: '0.5px'
            }}>
              Formación aeronáutica de élite con estándares internacionales.
            </p>
            <button 
              className="btn-outline-magnetic" // NEW Sophisticated Button
              onClick={onOpenEnrollment}
            >
              <span>Conoce nuestros programas</span>
            </button>
          </div>
        </div>

        {/* 2. CANVAS WRAPPER (Slides in from the right) */}
        <div id="canvas-wrapper" style={{ position: 'absolute', inset: 0, zIndex: 2, transform: 'translateX(100vw)', willChange: 'transform', backgroundColor: '#02050c' }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* Vignette overlay */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, transparent 15%, rgba(2,5,12,0.72) 100%), linear-gradient(to bottom, transparent 40%, rgba(2,5,12,0.85) 100%)' }} />
          {/* Progressive blackout overlay for seamless transition to Vision section */}
          <div id="canvas-blackout" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundColor: '#050a17', opacity: 0, willChange: 'opacity' }} />
        </div>

        {/* 3. PRELOADER HUD */}
        {scrollPhase === 'preloader' && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: '#02050c', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%', maxWidth: 420, padding: '0 2rem' }}>
              <div style={{ position: 'relative', width: 80, height: 80 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#4a90d9', animation: 'spin 1.5s linear infinite' }} />
                <RiCompassLine size={30} color="#4a90d9" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4a90d9', fontSize: '0.9rem', fontWeight: 700 }}>
                {loadPct < 100 ? 'CACHING 3D ASSETS...' : 'READY FOR FLIGHT'}
              </div>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                  <span>BUFFER</span><span style={{ color: loadPct === 100 ? '#2ecc71' : '#4a90d9' }}>{loadPct}%</span>
                </div>
                <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${loadPct}%`, height: '100%', background: 'linear-gradient(90deg, #4a90d9, #2ecc71)' }} />
                </div>
              </div>
            </div>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* 4. GLASSMORPHIC CARDS (Rendered over the Canvas) */}
        {scrollPhase !== 'preloader' && (
          <div ref={cardsContainerRef} className="glass-cards-container">
            
            <div className="glass-desktop-column glass-desktop-left">
              {/* Card 0 */}
              <div ref={el => { cardRefs.current[0] = el; }} className="glass-card glass-card--top-left">
                <div className="glass-card__inner">
                  <div className="glass-card__content">
                    <span className="glass-card__label"><RiCompassLine size={15} /> Horizonte Académico</span>
                    <h3 className="glass-card__title">Visión Universitaria</h3>
                    <p className="glass-card__body">Formamos profesionales con estándares globales de seguridad y excelencia técnica.</p>
                  </div>
                </div>
              </div>
              
              {/* Card 1 */}
              <div ref={el => { cardRefs.current[1] = el; }} className="glass-card glass-card--bottom-left">
                <div className="glass-card__inner">
                  <div className="glass-card__content">
                    <span className="glass-card__label"><RiRadioLine size={15} /> Cabina Digital</span>
                    <h3 className="glass-card__title">Simuladores ILS</h3>
                    <p className="glass-card__body">Domina las maniobras instrumentales utilizando tecnología avanzada en Chía e Ibagué.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-desktop-column glass-desktop-right">
              {/* Card 2 */}
              <div ref={el => { cardRefs.current[2] = el; }} className="glass-card glass-card--top-right">
                <div className="glass-card__inner">
                  <div className="glass-card__content">
                    <span className="glass-card__label"><RiShieldLine size={15} /> Seguridad de Vuelo</span>
                    <h3 className="glass-card__title">Estándares de Élite</h3>
                    <p className="glass-card__body">Instrucción impecable que excede regulaciones de aviación civil internacional.</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div ref={el => { cardRefs.current[3] = el; }} className="glass-card glass-card--bottom-right glass-card--telemetry">
                <div className="glass-card__inner">
                  <div className="glass-card__content">
                    <span className="glass-card__label" style={{ color: 'var(--color-accent-blue)' }}><RiPulseLine size={15} /> Sistemas Activos</span>
                    <h3 className="glass-card__title" style={{ letterSpacing: '1px' }}>CABIN TELEMETRY</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', marginTop: '0.8rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>AIRSPEED:</span><span id="telemetry-speed" style={{ color: 'var(--color-accent-blue)', fontWeight: 800 }}>0 KM/H</span>
                        </div>
                        <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                          <div id="telemetry-speed-bar" style={{ width: '0%', height: '100%', background: 'var(--color-accent-blue)', transition: 'width 0.1s ease-out' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 4 }}>
                        <span>ALTITUDE:</span><span style={{ color: 'var(--color-accent-blue)', fontWeight: 800 }}>9,840 FT</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 4 }}>
                        <span>ILS STATUS:</span><span style={{ color: '#2ecc71', fontWeight: 800 }}>LOC/GP APPR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 (CTA) */}
            <div ref={el => { cardRefs.current[4] = el; }} className="glass-card glass-card--center-overlay glass-card--cta">
              <div className="glass-card__inner">
                <div className="glass-card__content">
                  <span className="glass-card__label" style={{ justifyContent: 'center', width: '100%' }}>Tu Futuro Empieza Aquí</span>
                  <h3 className="glass-card__title">¿Listo para el Despegue?</h3>
                  <p className="glass-card__body">Matrículas abiertas para TCP y Piloto Comercial. Solicita tu plan hoy.</p>
                  <div className="glass-card__actions" style={{ justifyContent: 'center' }}>
                    <button className="btn-primary" onClick={onOpenEnrollment}>Inscríbete Ahora <RiArrowRightLine size={18} /></button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};

export default ThreeDParallax;
