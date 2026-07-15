import React, { useEffect, useState, useRef } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { wpService } from '../services/wordpressMock';
import type { WordPressPost } from '../services/wordpressMock';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BlogPage.css';

gsap.registerPlugin(ScrollTrigger);

export const VidaAcademica: React.FC = () => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(1); // Empezar con la tarjeta del centro activa (índice 1 de 3)
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await wpService.getPosts();
        // Solo las 5 más recientes
        setPosts(data.slice(0, 5));
      } catch (error) {
        console.error("Error al obtener noticias:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Stagger Animation Observer
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.stagger-item');

    const ctx = gsap.context(() => {
      gsap.fromTo(items, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
      // Ensure ScrollTrigger gets accurate positions after elements load
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading]); // Re-run when posts are loaded

  // Control del Carrusel Automático
  useEffect(() => {
    if (isLoading || posts.length === 0 || isPaused) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % posts.length);
    }, 3000); // Rotación fluida cada 3.0s (3000ms)

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isLoading, posts.length, isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % posts.length);
  };

  // Dimensiones dinámicas según el viewport para el centrado exacto de la pista (track)
  const cardWidth = isMobile ? 290 : 380;
  const gap = isMobile ? 20 : 40;

  // Fórmula matemática exacta de alineación del carrusel:
  // Desplaza la pista para que la tarjeta activa quede exactamente en el centro horizontal de la pantalla
  const trackTranslate = isLoading || posts.length === 0 
    ? 0 
    : `calc(50vw - ${activeIndex * (cardWidth + gap) + cardWidth / 2}px)`;

  return (
    <section
      id="blog"
      className="section"
      style={{
        backgroundColor: 'var(--section-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        overflow: 'hidden',
        position: 'relative',
        padding: '2rem 0 6rem 0'
      }}
    >
      {/* Background ambient lighting glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 51, 170, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 51, 170, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <section id="noticias" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', zIndex: 3 }}>
        
        {/* Section Header */}
        <div className="container">
          <div className="section-title-wrapper stagger-item" style={{ textAlign: 'center', marginBottom: '4rem', zIndex: 2, position: 'relative' }}>
            <span className="section-subtitle stagger-item">#AirTrainingLife</span>
          <h2 className="section-title stagger-item" style={{ fontWeight: 900, letterSpacing: '-1px' }}>Vida Académica</h2>
          <p className="section-description">
            Sigue al día con nuestros estudiantes en el aire y en tierra.<br/>Noticias directas e integración institucional.
          </p>
          </div>
        </div>

        {/* Loading / Skeleton State */}
        {isLoading ? (
          <div className="grid-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="glass-panel skeleton-card"
                style={{
                  height: '420px',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--border-radius-md)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--section-bg-secondary)',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <div className="skeleton-thumb" style={{ height: '240px', width: '100%', background: 'linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--glass-border) 50%, var(--color-bg-tertiary) 75%)', backgroundSize: '200% 100%' }} />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                  <div className="skeleton-bar" style={{ width: '40%', height: '14px', borderRadius: '4px', background: 'var(--color-bg-tertiary)' }} />
                  <div className="skeleton-bar" style={{ width: '85%', height: '20px', borderRadius: '4px', background: 'var(--color-bg-tertiary)' }} />
                  <div className="skeleton-bar" style={{ width: '60%', height: '14px', borderRadius: '4px', background: 'var(--color-bg-tertiary)', marginTop: 'auto' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Cinematic Sliding Carousel Viewport */
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              left: '50%', 
              right: '50%', 
              marginLeft: '-50vw', 
              marginRight: '-50vw',
              height: '520px',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Automatic Carousel Track */}
            <div
              style={{
                display: 'flex',
                gap: `${gap}px`,
                transform: `translateX(${trackTranslate})`,
                transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                paddingLeft: '0px',
                alignItems: 'center',
                willChange: 'transform'
              }}
            >
              {posts.map((post, idx) => {
                const isActive = idx === activeIndex;
                const postUrl = post.socialPreviews?.[0]?.postUrl || '#';
                return (
                  <div key={post.id} className="stagger-item" style={{ flexShrink: 0, width: `${cardWidth}px` }}>
                    <article
                      onClick={() => {
                        if (isActive && postUrl !== '#') {
                          window.open(postUrl, '_blank');
                        } else {
                          setActiveIndex(idx);
                        }
                      }}
                      className={`glass-panel post-card-carrusel ${isActive ? 'post-card-carrusel--active' : ''}`}
                      style={{
                        width: '100%',
                        height: '420px',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 'var(--border-radius-md)',
                      overflow: 'hidden',
                      backgroundColor: isActive ? 'var(--color-bg-secondary)' : 'var(--color-bg-tertiary)',
                      backdropFilter: isActive ? 'blur(16px)' : 'blur(4px)',
                      WebkitBackdropFilter: isActive ? 'blur(16px)' : 'blur(4px)',
                      border: isActive 
                        ? '1px solid var(--color-accent-blue)' 
                        : '1px solid var(--glass-border)',
                      boxShadow: isActive 
                        ? '0 25px 50px var(--glass-shadow)' 
                        : '0 8px 30px var(--glass-shadow)',
                      opacity: isActive ? 1 : 0.50,
                      filter: isActive ? 'none' : 'blur(2.5px)',
                      transform: isActive ? 'scale(1.18)' : 'scale(0.88)',
                      transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s, filter 0.85s, background-color 0.5s, border-color 0.5s',
                      cursor: 'pointer',
                      zIndex: isActive ? 10 : 5,
                      pointerEvents: 'auto'
                    }}
                  >
                    {/* Image block styled like BlogPage */}
                    <div className="blog-card-media" style={{ padding: 0, height: '50%', width: '100%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                      <img
                        src={post.featured_media}
                        alt={post.title}
                        className="blog-card-img"
                        style={{
                          transform: isActive ? 'scale(1.05)' : 'scale(1.0)',
                          transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </div>
 
                    {/* Post Info styled like BlogPage */}
                    <div className="blog-card-body" style={{ padding: '1.5rem', height: '50%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <span className="blog-card-category">{post.category}</span>
                      <h3 className="blog-card-title" style={{
                        color: isActive ? 'var(--color-accent-blue)' : 'var(--color-text-primary)',
                        transition: 'color 0.4s'
                      }}>
                        {post.title}
                      </h3>
                      <p className="blog-card-excerpt" style={{
                        color: isActive ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                        transition: 'color 0.4s'
                      }}>
                        {post.excerpt}
                      </p>
                      <div className="blog-card-footer">
                        <span className="blog-card-date" style={{
                          color: isActive ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                          transition: 'color 0.4s'
                        }}>
                          {post.date}
                        </span>
                        <span className="blog-card-link" style={{
                          color: isActive ? 'var(--color-accent-blue)' : 'var(--color-text-muted)',
                          transition: 'all 0.4s'
                        }}>
                          Leer más <RiArrowRightSLine />
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
            </div>

            {/* Left and Right Manual Control Arrows */}
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                top: '50%',
                marginTop: '-25px',
                left: '2vw',
                backgroundColor: 'rgba(7, 12, 23, 0.85)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#ffffff',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                transition: 'all 0.3s'
              }}
              className="carousel-control-arrow"
            >
              <RiArrowLeftSLine size={24} />
            </button>

            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                top: '50%',
                marginTop: '-25px',
                right: '2vw',
                backgroundColor: 'rgba(7, 12, 23, 0.85)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#ffffff',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                transition: 'all 0.3s'
              }}
              className="carousel-control-arrow"
            >
              <RiArrowRightSLine size={24} />
            </button>
          </div>
        )}
      </section>

      {/* Estilos adicionales de interacción premium */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-thumb {
          animation: shimmer 1.5s infinite linear;
        }
        .carousel-control-arrow:hover {
          background-color: var(--color-accent-blue) !important;
          color: #070c17 !important;
          border-color: var(--color-accent-blue) !important;
          transform: scale(1.1);
        }
        .post-card-carrusel:hover {
          border-color: rgba(0, 51, 170, 0.9) !important;
          box-shadow: 0 25px 65px rgba(0, 0, 0, 0.8) !important;
        }
        .post-card-carrusel:hover .read-more-wrapper {
          color: var(--color-accent-blue) !important;
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
};

export default VidaAcademica;
