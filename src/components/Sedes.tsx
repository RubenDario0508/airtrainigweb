import React, { useEffect, useRef } from 'react';
import { RiMapPinLine, RiNavigationLine, RiCompassLine } from 'react-icons/ri';
import { MOCK_SEDES } from '../services/wordpressMock';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Sedes: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sedes"
      className="section"
      style={{
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 5,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '6rem 0 3rem 0'
      }}
    >
      {/* El Fundido Perfecto (The Seamless Blend) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '25vh',
        background: 'linear-gradient(to bottom, var(--color-bg-primary) 0%, transparent 100%)',
        zIndex: 10,
        pointerEvents: 'none'
      }} />

      {/* Capa de Silueta Opaca Estructural de Cabina - Para legibilidad extrema */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--sedes-cabin-overlay)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Forma Geométrica Aeronáutica Opaca en Diagonal (Corte de Pista) */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '55%',
        height: '130%',
        background: 'var(--sedes-runway-overlay)',
        transform: 'skewX(15deg)',
        borderRight: '2px solid rgba(0, 51, 170, 0.06)',
        pointerEvents: 'none',
        zIndex: 2
      }} />
      
      {/* Decorative runway dashed line in background */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '2px',
        height: '80px',
        backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 50%, transparent 50%)',
        backgroundSize: '2px 20px',
        pointerEvents: 'none',
        zIndex: 3
      }} />

      {/* El Fundido Perfecto (The Seamless Blend - Bottom) para suavizar la transición en Modo Día */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '25vh',
        background: 'linear-gradient(to top, var(--section-bg) 0%, transparent 100%)',
        zIndex: 10,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 11 }}>
        
        {/* Section Header */}
        <div className="section-title-wrapper stagger-item">
          <span className="section-subtitle stagger-item">Ubicación Estratégica</span>
          <h2 className="section-title stagger-item" style={{ color: 'var(--sedes-title-color)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '0.5rem' }}>Bases de Operación</h2>
          <p className="section-description stagger-item" style={{ color: 'var(--color-accent-blue)', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Nuestras Sedes
          </p>
        </div>

        {/* Sedes Cards Container with staggered entrances */}
        <div className="grid-2" style={{ gap: '2.5rem' }}>
          {MOCK_SEDES.map((sede) => (
            <div
              key={sede.id}
              className="glass-panel horizontal-sede-card stagger-item"
              style={{
                display: 'flex',
                overflow: 'hidden',
                border: '1px solid var(--sedes-card-border)',
                boxShadow: 'var(--sedes-card-shadow)',
                borderRadius: '24px',
                backgroundColor: 'var(--sedes-card-bg)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                willChange: 'transform, opacity'
              }}
            >
              {/* Card Image Link to Google Maps */}
              <a
                href={sede.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '40%',
                  minWidth: '150px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'block'
                }}
                className="sede-img-wrapper"
              >
                <img
                  src={sede.imageUrl}
                  alt={sede.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="sede-img"
                />
                {/* Embedded compass decor */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'var(--sedes-badge-bg)',
                  border: '1px solid var(--sedes-badge-border)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '50%',
                  padding: '8px',
                  color: 'var(--color-accent-blue)',
                  display: 'flex',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                }}>
                  <RiCompassLine size={16} />
                </div>
              </a>

              {/* Card Info */}
              <div style={{
                width: '60%',
                padding: '1.3rem 1.5rem', /* Compact padding */
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.8rem' /* Reduced gap */
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <h3 style={{
                    fontSize: '1.15rem', /* Compact title size */
                    fontWeight: 800,
                    color: 'var(--sedes-card-text-primary)'
                  }}>
                    {sede.title}
                  </h3>
                  
                  {/* Address Badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    color: 'var(--color-accent-red)',
                    fontSize: '0.78rem', /* Compact address badge */
                    fontWeight: 700
                  }}>
                    <RiMapPinLine size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{sede.address}</span>
                  </div>

                  <p style={{
                    fontSize: '0.82rem', /* Compact description size */
                    color: 'var(--sedes-card-text-secondary)',
                    lineHeight: '1.5',
                    margin: '2px 0 0 0' /* Sleek and valid shorthand */
                  }}>
                    {sede.description}
                  </p>
                </div>

                {/* Google Maps Button (Upgraded with Emil Kowalski Micro-Interactions) */}
                <a
                  href={sede.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary maps-btn"
                  style={{
                    alignSelf: 'flex-start',
                    padding: '0.6rem 1.4rem',
                    fontSize: '0.85rem',
                    color: 'var(--sedes-card-btn-color)',
                    border: '1.5px solid var(--sedes-card-btn-border)',
                    borderRadius: '50px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    width: 'auto'
                  }}
                >
                  <RiNavigationLine size={14} /> Ver en Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Block - Premium Corporate Upgrade */}
        <div className="certifications-block stagger-item" style={{
          marginTop: '6rem',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          background: 'var(--sedes-card-bg)',
          border: '1px solid var(--sedes-card-border)',
          padding: '4rem',
          borderRadius: '24px',
          boxShadow: 'var(--sedes-card-shadow)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          willChange: 'transform, opacity'
        }}>
          {/* Text Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <span style={{ color: 'var(--color-accent-red)', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
              Respaldo y Calidad
            </span>
            <h3 style={{ fontSize: '2.4rem', color: 'var(--sedes-title-color)', fontWeight: 800, lineHeight: 1.2 }}>
              Avalados por la<br /><span style={{ color: 'var(--color-accent-red)' }}>Excelencia Aeronáutica</span>
            </h3>
            <div style={{ width: '60px', height: '4px', background: 'var(--color-accent-red)', borderRadius: '2px', marginTop: '0.5rem', marginBottom: '0.5rem' }} />
            <p style={{ color: 'var(--sedes-card-text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, textAlign: 'justify' }}>
              Contamos con certificaciones oficiales y auditorías continuas que garantizan los más altos estándares de seguridad y rigor en nuestro entrenamiento aeronáutico. Somos un centro de instrucción formalmente certificado por la <strong>Aeronáutica Civil de Colombia</strong>.
            </p>
          </div>

          {/* Logos Panel */}
          <div className="cert-logos-panel" style={{
            background: 'var(--sedes-badge-bg)',
            padding: '3rem 2rem',
            borderRadius: '20px',
            border: '1px solid var(--sedes-card-border)',
            overflow: 'hidden'
          }}>
            <div className="cert-carousel-viewport">
              <div className="cert-carousel-container">
                {/* Logo 1 */}
                <div className="cert-carousel-item">
                  <div className="logo-aerocivil"></div>
                  <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                    <span style={{ display: 'block', color: 'var(--sedes-card-text-secondary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>ENTIDAD REGULADORA</span>
                    <span style={{ display: 'block', color: 'var(--sedes-card-text-primary)', fontSize: '0.85rem', fontWeight: 800, marginTop: '4px' }}>CERTIFICACIÓN OFICIAL</span>
                  </div>
                </div>

                <div className="cert-carousel-divider"></div>

                {/* Logo 2 */}
                <div className="cert-carousel-item">
                  <div className="logo-ati"></div>
                  <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                    <span style={{ display: 'block', color: 'var(--sedes-card-text-secondary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>CÓDIGO DE OPERACIÓN</span>
                    <span style={{ display: 'block', color: 'var(--sedes-card-text-primary)', fontSize: '0.85rem', fontWeight: 800, marginTop: '4px' }}>UAEAC - CCI 098</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Estilos locales para hover e interactividad de las sedes */}
      <style>{`
        .sede-img {
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .horizontal-sede-card:hover {
          transform: translateY(-8px) scale(1.02) !important;
          box-shadow: 0 30px 75px rgba(0, 0, 0, 0.8) !important;
          border-color: rgba(255, 255, 255, 0.35) !important;
        }
        .horizontal-sede-card:hover .sede-img {
          transform: scale(1.12);
        }
        .maps-btn {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .maps-btn:hover {
          background-color: var(--color-accent-blue);
          border-color: var(--color-accent-blue);
          color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(74, 144, 217, 0.3);
        }

        .cert-carousel-viewport {
          width: 100%;
          overflow: hidden;
        }
        .cert-carousel-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
        }
        .cert-carousel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 0 10px;
        }
        .cert-carousel-divider {
          width: 1px;
          height: 100px;
          background: var(--sedes-card-border);
        }

        @media (max-width: 992px) {
          .certifications-block {
            grid-template-columns: 1fr !important;
            padding: 3rem !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 768px) {
          .certifications-block {
            padding: 2rem 1.5rem !important;
            margin-top: 2.5rem !important;
          }
          .cert-logos-panel {
            padding: 2.5rem 1rem !important;
          }
          .cert-carousel-container {
            width: 200%;
            justify-content: flex-start;
            animation: mobileCarousel 8s infinite cubic-bezier(0.65, 0, 0.35, 1);
          }
          .cert-carousel-item {
            width: 50%;
            flex-shrink: 0;
          }
          .cert-carousel-divider {
            display: none;
          }
        }

        @keyframes mobileCarousel {
           0%, 45% { transform: translateX(0%); }
           50%, 95% { transform: translateX(-50%); }
           100% { transform: translateX(0%); }
        }

        .logo-aerocivil {
          height: 85px;
          width: 100%;
          max-width: 240px;
          background-image: url('/certificaciones/Certificaciones/aerocivil-azul.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          transition: background-image 0.3s ease;
        }
        .logo-ati {
          height: 85px;
          width: 100%;
          max-width: 240px;
          background-image: url('/certificaciones/Certificaciones/ati-azul.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          transition: background-image 0.3s ease;
        }
        [data-theme='dark'] .logo-aerocivil, .app-container.dark .logo-aerocivil {
          background-image: url('/certificaciones/Certificaciones/aerocivil-blanco.png');
        }
        [data-theme='dark'] .logo-ati, .app-container.dark .logo-ati {
          background-image: url('/certificaciones/Certificaciones/ati-blanco.png');
        }

        @media (max-width: 992px) {
          .horizontal-sede-card {
            flex-direction: column !important;
          }
          .sede-img-wrapper {
            width: 100% !important;
            height: 200px !important;
          }
          .horizontal-sede-card > div:nth-child(2) {
            width: 100% !important;
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Sedes;
