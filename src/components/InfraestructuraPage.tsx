import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RiDashboard3Line, RiToolsLine, RiShieldCheckLine } from 'react-icons/ri';


gsap.registerPlugin(ScrollTrigger);

const SIMULADORES = [
  {
    id: 'piper',
    title: 'Piper PA-28 Warrior II',
    image: '/imgpag3/Piper HD.webp',
    description: 'Experimenta las mismas sensaciones y distribución de cabina de nuestro avión de entrenamiento principal. Equipado con G5 y radios analógicos y digitales, ideal para tu transición de VFR a IFR avanzado.',
    pdf: 'https://wa.me/573214002431?text=Hola!%20Quisiera%20recibir%20más%20información%20sobre%20el%20Simulador%20de%20Piper%20PA-28%20Warrior%20II'
  },
  {
    id: 'cessna',
    title: 'Cessna 172',
    image: '/imgpag3/Cessna HD.webp',
    description: 'Entrénate en uno de los aviones de entrenamiento más populares del mundo, configuración tradicional y Glass Cockpit (G1000). Perfecto para perfeccionar procedimientos IFR y navegación instrumental.',
    pdf: 'https://wa.me/573214002431?text=Hola!%20Quisiera%20recibir%20más%20información%20sobre%20el%20Simulador%20de%20Cessna%20172'
  },
  {
    id: 'boeing',
    title: 'Boeing 737 NG-800',
    image: '/imgpag3/Boeing HD.webp',
    description: 'Simulador avanzado orientado al entrenamiento de aerolínea (MCC). Aprende gestión de recursos de cabina (CRM), operación de sistemas complejos y preparate para los procesos de selección de aerolíneas.',
    pdf: 'https://wa.me/573214002431?text=Hola!%20Quisiera%20recibir%20más%20información%20sobre%20el%20Simulador%20de%20Boeing%20737%20NG-800'
  },
  {
    id: 'maqueta',
    title: 'Maqueta TCP',
    image: '/imgpag3/Simulador A320 HD.webp',
    description: 'Nuestra aeronave Airbus A320, diseñada a escala real, te permite realizar prácticas de emergencia, manejo de equipos (toboganes, chalecos, extintores), servicio a bordo y resolución de conflictos. Vive la experiencia real.',
    pdf: 'https://wa.me/573214002431?text=Hola!%20Quisiera%20recibir%20más%20información%20sobre%20la%20Maqueta%20de%20TCP%20Airbus%20A320'
  }
];

export const InfraestructuraPage: React.FC = () => {
  const [zoomArea, setZoomArea] = React.useState<string | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [currentSimSlide, setCurrentSimSlide] = React.useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentSimSlide(prev => (prev + 1) % SIMULADORES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    // Scroll to top when mounting
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Initial animations
      gsap.fromTo('.infra-hero-text', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      gsap.fromTo('.anim-fade-up',
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
          scrollTrigger: {
            trigger: '.aeronaves-section',
            start: 'top 80%'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="infraestructura-page" style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '650px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '80px 5% 0 5%', /* 80px top padding offsets the fixed header without creating a gap */
        background: 'linear-gradient(to right, rgba(2, 5, 12, 0.95) 0%, rgba(2, 5, 12, 0.4) 60%, transparent 100%), url("/imgpag3/Piper HD.webp") center/cover',
        color: 'white',
        overflow: 'hidden',
      }}>
        <div className="infra-hero-text" style={{ maxWidth: '800px', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 5.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Infraestructura <br/> Tecnológica
          </h1>
          <p className="infra-hero-text" style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem', opacity: 0.9 }}>
            Nuestros escenarios cuentan con simuladores de alta tecnología desarrollados para optimizar tu aprendizaje y entrenamiento. Experimenta la sinergia perfecta entre instrucción humana y precisión técnica en busca de prepararte para superar <br/> tus desafíos en el ámbito aeronáutico.
          </p>
          <div className="infra-hero-text" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('simuladores-section');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }} 
              className="btn-primary" 
              style={{ padding: '0.8rem 2rem', borderRadius: '30px', textDecoration: 'none', background: 'transparent', border: '2px solid white', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
              Ver Simuladores
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('aeronaves');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }} 
              className="btn-primary" 
              style={{ padding: '0.8rem 2rem', borderRadius: '30px', textDecoration: 'none', background: 'var(--color-accent-red)', border: '2px solid var(--color-accent-red)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
              Ver Aeronaves
            </button>
          </div>
        </div>
      </section>

      {/* 2. AERONAVES SECTION */}
      <section id="aeronaves" className="aeronaves-section" style={{ padding: '3rem 0', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', transition: 'background-color 0.4s ease, color 0.4s ease' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="anim-fade-up" style={{ fontSize: '3rem', color: 'var(--color-text-primary)', fontWeight: 800, margin: 0 }}>Aeronaves</h2>
            <p className="anim-fade-up" style={{ color: 'var(--color-accent-red)', fontWeight: 700, fontSize: '1.2rem', marginTop: '0.5rem' }}>Piper PA 28 Warrior</p>
          </div>
        </div>

        {/* Interactive Aircraft Map - FULL WIDTH */}
        <div className="container anim-fade-up plane-hotspot-container" style={{ position: 'relative', width: '100%', maxWidth: '1100px', margin: isMobile ? '0 auto 1rem auto' : '0 auto 4rem auto', padding: isMobile ? '1rem 0' : '2rem 0' }}>
          
          <div style={{ position: 'relative', width: '100%' }}>
            <img loading="lazy" 
              src="/imgpag3/imgcoregidas/AvionPiperFichaeecnica.webp" 
              alt="Piper PA-28" 
              style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', zIndex: 1, aspectRatio: '1012 / 409' }} 
            />

            <div className="hotspots-wrapper">
              {/* Hélice */}
              <div 
                className={`hotspot-group ${zoomArea === 'helice' ? 'active' : ''}`}
                style={{ position: 'absolute', top: '50%', left: '22%', zIndex: 10 }}
                onMouseEnter={() => setZoomArea('helice')}
                onMouseLeave={() => setZoomArea(null)}
                onClick={() => setZoomArea(zoomArea === 'helice' ? null : 'helice')}
              >
                <div className="hotspot-dot">+</div>
                <div className="hotspot-reveal">
                  <div className="hotspot-line" style={{ bottom: '50%', left: '50%', width: '2px', height: '80px', background: '#00b4d8' }} />
                  <div className="hotspot-line" style={{ top: 'calc(-80px + 50%)', right: '50%', height: '2px', width: '160px', background: '#00b4d8' }} />
                  <div className="plane-tooltip" style={{ top: 'calc(-80px + 50%)', right: 'calc(50% + 170px)', transform: 'translateY(-50%)', textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>Hélice Sensenich</div>
                    <div style={{ fontWeight: 500 }}>de paso fijo</div>
                    <img loading="lazy" src="/imgpag3/imgcoregidas/logo-plantcity.png_1.webp" alt="Sensenich" style={{ width: '90px', marginTop: '14px' }} />
                  </div>
                </div>
              </div>

              {/* Dimensiones */}
              <div 
                className={`hotspot-group ${zoomArea === 'dimensiones' ? 'active' : ''}`}
                style={{ position: 'absolute', top: '40%', left: '48%', zIndex: 10 }}
                onMouseEnter={() => setZoomArea('dimensiones')}
                onMouseLeave={() => setZoomArea(null)}
                onClick={() => setZoomArea(zoomArea === 'dimensiones' ? null : 'dimensiones')}
              >
                <div className="hotspot-dot">+</div>
                <div className="hotspot-reveal">
                  <div className="hotspot-line" style={{ bottom: '50%', left: '50%', width: '2px', height: '140px', background: '#00b4d8' }} />
                  <div className="plane-tooltip" style={{ bottom: 'calc(50% + 150px)', left: '50%', transform: 'translateX(-50%)', textAlign: 'left' }}>
                    <div style={{ fontWeight: 800, marginBottom: '6px' }}>Dimensiones</div>
                    <div style={{ fontWeight: 700 }}>Envergadura: <span style={{fontWeight:400}}>35 ft 6 in | 10.8 m</span></div>
                    <div style={{ fontWeight: 700 }}>Altura: <span style={{fontWeight:400}}>7 ft 3 in | 2.2 m</span></div>
                    <div style={{ fontWeight: 700 }}>Longitud: <span style={{fontWeight:400}}>24 ft | 7.3 m</span></div>
                  </div>
                </div>
              </div>

              {/* Combustible */}
              <div 
                className={`hotspot-group ${zoomArea === 'combustible' ? 'active' : ''}`}
                style={{ position: 'absolute', top: '56%', left: '62%', zIndex: 10 }}
                onMouseEnter={() => setZoomArea('combustible')}
                onMouseLeave={() => setZoomArea(null)}
                onClick={() => setZoomArea(zoomArea === 'combustible' ? null : 'combustible')}
              >
                <div className="hotspot-dot">+</div>
                <div className="hotspot-reveal">
                  <div className="hotspot-line" style={{ bottom: '50%', left: '50%', width: '2px', height: '70px', background: '#00b4d8' }} />
                  <div className="hotspot-line" style={{ top: 'calc(-70px + 50%)', left: '50%', height: '2px', width: '180px', background: '#00b4d8' }} />
                  <div className="plane-tooltip" style={{ top: 'calc(-70px + 50%)', left: 'calc(50% + 190px)', transform: 'translateY(-50%)', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 800 }}>Combustible</span>
                      <img loading="lazy" src="/imgpag3/imgcoregidas/AVGAS 100-130.webp" alt="AVGAS" style={{ height: '22px' }} />
                    </div>
                    <div style={{ fontWeight: 500 }}>50Gal | 25Gal/x plano | 48Gal US | 2Gal IN</div>
                  </div>
                </div>
              </div>

              {/* Motor */}
              <div 
                className={`hotspot-group ${zoomArea === 'motor' ? 'active' : ''}`}
                style={{ position: 'absolute', top: '64%', left: '28%', zIndex: 10 }}
                onMouseEnter={() => setZoomArea('motor')}
                onMouseLeave={() => setZoomArea(null)}
                onClick={() => setZoomArea(zoomArea === 'motor' ? null : 'motor')}
              >
                <div className="hotspot-dot">+</div>
                <div className="hotspot-reveal">
                  <div className="hotspot-line" style={{ top: '50%', left: '50%', width: '2px', height: '110px', background: '#00b4d8' }} />
                  <div className="hotspot-line" style={{ top: 'calc(110px + 50%)', left: '50%', height: '2px', width: '80px', background: '#00b4d8' }} />
                  <div className="plane-tooltip" style={{ top: 'calc(110px + 50%)', left: 'calc(50% + 90px)', transform: 'translateY(-50%)', textAlign: 'left' }}>
                    <div style={{ fontWeight: 800 }}>Motor Lycoming</div>
                    <div style={{ fontWeight: 500 }}>160HP | O320D2A | 2700 RPM</div>
                    <img loading="lazy" src="/imgpag3/imgcoregidas/Lycoming.webp" alt="Lycoming" className="icon-light-mode" style={{ height: '26px', marginTop: '14px' }} />
                    <img loading="lazy" src="/imgpag3/imgcoregidas/Lycomingnegativo.webp" alt="Lycoming" className="icon-dark-mode" style={{ height: '26px', marginTop: '14px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Info Display - Responsive fallback */}
          <div className="mobile-hotspot-info">
            {zoomArea === 'helice' && (
              <div className="mobile-info-card anim-fade-up">
                <div style={{ fontWeight: 800 }}>Hélice Sensenich</div>
                <div style={{ fontWeight: 500 }}>de paso fijo</div>
                <img loading="lazy" src="/imgpag3/imgcoregidas/logo-plantcity.png_1.webp" alt="Sensenich" style={{ width: '90px', marginTop: '14px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
              </div>
            )}
            {zoomArea === 'dimensiones' && (
              <div className="mobile-info-card anim-fade-up">
                <div style={{ fontWeight: 800, marginBottom: '6px' }}>Dimensiones</div>
                <div style={{ fontWeight: 700 }}>Envergadura: <span style={{fontWeight:400}}>35 ft 6 in | 10.8 m</span></div>
                <div style={{ fontWeight: 700 }}>Altura: <span style={{fontWeight:400}}>7 ft 3 in | 2.2 m</span></div>
                <div style={{ fontWeight: 700 }}>Longitud: <span style={{fontWeight:400}}>24 ft | 7.3 m</span></div>
              </div>
            )}
            {zoomArea === 'combustible' && (
              <div className="mobile-info-card anim-fade-up">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 800 }}>Combustible</span>
                  <img loading="lazy" src="/imgpag3/imgcoregidas/AVGAS 100-130.webp" alt="AVGAS" style={{ height: '22px' }} />
                </div>
                <div style={{ fontWeight: 500 }}>50Gal | 25Gal/x plano | 48Gal US | 2Gal IN</div>
              </div>
            )}
            {zoomArea === 'motor' && (
              <div className="mobile-info-card anim-fade-up">
                <div style={{ fontWeight: 800 }}>Motor Lycoming</div>
                <div style={{ fontWeight: 500 }}>160HP | O320D2A | 2700 RPM</div>
                <img loading="lazy" src="/imgpag3/imgcoregidas/Lycoming.webp" alt="Lycoming" className="icon-light-mode" style={{ height: '26px', marginTop: '14px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
                <img loading="lazy" src="/imgpag3/imgcoregidas/Lycomingnegativo.webp" alt="Lycoming" className="icon-dark-mode" style={{ height: '26px', marginTop: '14px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
              </div>
            )}
          </div>
        </div>

        <div className="container">

          {/* Description Text */}
          <p className="anim-fade-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '2rem auto 3rem auto', fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            El PA 28 Warrior es una aeronave monomotor de ala baja, diseñada específicamente para entrenamiento de vuelo. Su estabilidad, fácil manejo y excelente visibilidad la convierten en la elección perfecta para estudiantes piloto.
          </p>

          {/* Specifications Grid */}
          <div className="anim-fade-up specs-grid-3" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '1.5rem', 
            marginBottom: '3rem',
            maxWidth: '1200px',
            margin: '0 auto 3rem auto'
          }}>
            {[
              { label: 'Modelo', value: 'Piper PA-28 Warrior II', iconLight: '/imgpag3/Ficha técnia Avión - Iconos negativo/despegue-del-avion copia.png', iconDark: '/imgpag3/Ficha técnia Avión - Iconos negativo/despegue-del-avion.png' },
              { label: 'Motor', value: 'Lycoming O-320, 160 HP', iconLight: '/imgpag3/Ficha técnia Avión - Iconos negativo/motor-del-coche copia.png', iconDark: '/imgpag3/Ficha técnia Avión - Iconos negativo/motor-del-coche.png' },
              { label: 'Capacidad', value: '4 personas', iconLight: '/imgpag3/Ficha técnia Avión - Iconos negativo/asiento-de-coche copia.png', iconDark: '/imgpag3/Ficha técnia Avión - Iconos negativo/asiento-de-coche.png' },
              { label: 'Autonomía', value: '4-5 horas de vuelo', iconLight: '/imgpag3/Ficha técnia Avión - Iconos negativo/ajustes-de-engranajes copia 2.png', iconDark: '/imgpag3/Ficha técnia Avión - Iconos negativo/ajustes-de-engranajes copia.png' },
              { label: 'Velocidad de crucero', value: '115 nudos', iconLight: '/imgpag3/Ficha técnia Avión - Iconos negativo/crucero copia.png', iconDark: '/imgpag3/Ficha técnia Avión - Iconos negativo/crucero.png' },
              { label: 'Altitud máxima', value: '14,000 pies', iconLight: '/imgpag3/Ficha técnia Avión - Iconos negativo/Altura Máxima copia.png', iconDark: '/imgpag3/Ficha técnia Avión - Iconos negativo/Altura Máxima.png' }
            ].map((spec, i) => (
              <div key={i} className="glass-3d-card hover-zoom-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                <>
                  <img loading="lazy" src={spec.iconLight} alt={spec.label} className="icon-light-mode" style={{ width: '45px', height: '45px', objectFit: 'contain', opacity: 0.8 }} />
                  <img loading="lazy" src={spec.iconDark} alt={spec.label} className="icon-dark-mode" style={{ width: '45px', height: '45px', objectFit: 'contain', opacity: 0.9 }} />
                </>
                <div style={{ minWidth: 0 }}>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, whiteSpace: 'nowrap' }}>{spec.label}</p>
                  <p style={{ color: 'var(--color-text-primary)', fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)', fontWeight: 800, whiteSpace: 'nowrap', letterSpacing: '-0.3px' }}>{spec.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Features Icons */}
          <div className="anim-fade-up feat-grid-3" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { label: 'Cabina', value: 'Instrumentación Completa', icon: <RiDashboard3Line size={42} style={{ color: 'var(--color-text-primary)', opacity: 0.8 }} /> },
              { label: 'Operación', value: 'Mantenimiento Riguroso', icon: <RiToolsLine size={42} style={{ color: 'var(--color-text-primary)', opacity: 0.8 }} /> },
              { label: 'Estándar', value: 'Seguridad Certificada', icon: <RiShieldCheckLine size={42} style={{ color: 'var(--color-text-primary)', opacity: 0.8 }} /> }
            ].map((feat, i) => (
              <div key={i} className="glass-3d-card hover-zoom-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px' }}>
                  {feat.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, whiteSpace: 'nowrap' }}>{feat.label}</p>
                  <p style={{ color: 'var(--color-text-primary)', fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)', fontWeight: 800, whiteSpace: 'nowrap', letterSpacing: '-0.3px' }}>{feat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SIMULADORES SECTION */}
      <section id="simuladores-section" style={{ padding: '6rem 0', backgroundColor: 'var(--color-bg-primary)', transition: 'background-color 0.4s ease' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="anim-fade-up" style={{ fontSize: '3rem', color: 'var(--color-text-primary)', fontWeight: 800, margin: 0 }}>Tecnología de Entrenamiento</h2>
            <p className="anim-fade-up" style={{ color: 'var(--color-accent-red)', fontWeight: 700, fontSize: '1.2rem', marginTop: '0.5rem' }}>Simuladores de Última Generación</p>
          </div>

          {/* CAROUSEL WRAPPER */}
          <div className="anim-fade-up" style={{ position: 'relative', overflow: 'hidden', width: '100%', paddingBottom: '2rem' }}>
            
            {/* Mobile Arrows */}
            {isMobile && (
              <>
                <button 
                  onClick={() => setCurrentSimSlide(prev => (prev === 0 ? SIMULADORES.length - 1 : prev - 1))}
                  style={{
                    position: 'absolute', top: '45%', left: '10px', transform: 'translateY(-50%)',
                    zIndex: 10, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '45px', height: '45px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '1.5rem', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}>
                  &#10094;
                </button>
                <button 
                  onClick={() => setCurrentSimSlide(prev => (prev + 1) % SIMULADORES.length)}
                  style={{
                    position: 'absolute', top: '45%', right: '10px', transform: 'translateY(-50%)',
                    zIndex: 10, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '45px', height: '45px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '1.5rem', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}>
                  &#10095;
                </button>
              </>
            )}

            <div className="simuladores-grid" style={{
              display: isMobile ? 'flex' : 'grid',
              gridTemplateColumns: isMobile ? 'none' : 'repeat(4, 1fr)',
              gap: isMobile ? '0' : '1.5rem',
              width: '100%',
              transform: isMobile ? `translateX(-${currentSimSlide * 100}%)` : 'none',
              transition: isMobile ? 'transform 0.5s ease-in-out' : 'none',
            }}>
              {SIMULADORES.map((sim, i) => (
                <div key={i} style={{ 
                  flex: isMobile ? '0 0 100%' : 'unset',
                  padding: isMobile ? '0 5%' : '0',
                  boxSizing: 'border-box'
                }}>
                  <div className="simulador-card" style={{
                    background: 'var(--color-bg-secondary)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    height: '100%',
                    border: '1px solid var(--glass-border)'
                  }}>
                <div style={{ width: '100%', height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img loading="lazy" className="sim-img" src={sim.image} alt={sim.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', zIndex: 2, background: 'var(--color-bg-secondary)' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '1rem', lineHeight: 1.3 }}>{sim.title}</h3>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '1.2rem' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--color-accent-red)', borderRadius: '50%' }}></div>
                    <div style={{ width: '8px', height: '8px', background: 'var(--color-accent-red)', borderRadius: '50%' }}></div>
                    <div style={{ width: '8px', height: '8px', background: 'var(--color-accent-red)', borderRadius: '50%' }}></div>
                  </div>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '2rem', textAlign: 'justify' }}>
                    {sim.description}
                  </p>
                  <a 
                    href={sim.pdf} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="sim-btn"
                    style={{ 
                      display: 'block', 
                      width: '100%', 
                      textAlign: 'center', 
                      padding: '1rem', 
                      border: '2px solid var(--color-text-primary)', 
                      borderRadius: '12px', 
                      color: 'var(--color-text-primary)', 
                      fontWeight: 700, 
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 2 }}>Más información</span>
                  </a>
                </div>
              </div>
              </div>
            ))}
          </div>

          </div>
        </div>
      </section>

      {/* Internal Styles for Hotspots and Animations */}
      <style>{`
        .hotspot-reveal {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          pointer-events: none;
        }
        
        @media (hover: hover) {
          .hotspot-group:hover .hotspot-reveal {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }
        }
        .hotspot-group.active .hotspot-reveal {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .hotspot-dot {
          width: 20px;
          height: 20px;
          background: #00b4d8;
          border-radius: 50%;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          line-height: 1;
          z-index: 2;
          box-shadow: 0 0 0 4px rgba(0, 180, 216, 0.3);
          transform: translate(-50%, -50%);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        @media (hover: hover) {
          .hotspot-group:hover .hotspot-dot {
            transform: translate(-50%, -50%) scale(1.1);
            box-shadow: 0 0 0 6px rgba(0, 180, 216, 0.5);
          }
        }
        .hotspot-group.active .hotspot-dot {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 0 0 6px rgba(0, 180, 216, 0.5);
        }

        .hotspot-line {
          position: absolute;
          z-index: 1;
        }

        .plane-tooltip {
          position: absolute;
          font-size: 0.95rem;
          line-height: 1.4;
          white-space: nowrap;
          z-index: 3;
          transition: all 0.3s ease;
          
          /* Modo Claro default */
          background: rgba(255, 255, 255, 0.85);
          color: #1a2a3a;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }

        /* Modo Oscuro styling */
        html[data-theme='dark'] .plane-tooltip,
        .app-container.dark .plane-tooltip {
          background: rgba(130, 145, 160, 0.25);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        /* Automatically adjust icon display based on light/dark mode */
        html[data-theme='dark'] .icon-light-mode,
        .app-container.dark .icon-light-mode { display: none !important; }
        
        html[data-theme='dark'] .icon-dark-mode,
        .app-container.dark .icon-dark-mode { display: block !important; }

        html[data-theme='light'] .icon-dark-mode,
        .app-container.light .icon-dark-mode { display: none !important; }
        
        html[data-theme='light'] .icon-light-mode,
        .app-container.light .icon-light-mode { display: block !important; }

        /* Default fallback if no theme class is applied */
        .icon-dark-mode { display: none; }

        /* Premium Hover Animations */
        .glass-3d-card {
          padding: 2rem;
          border-radius: 20px;
          background: rgba(130, 145, 160, 0.18); /* Gris intermedio para el efecto glass */
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid var(--glass-border);
          border-left: 1px solid var(--glass-border);
          border-right: 1px solid rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.05), 
            0 5px 15px rgba(0, 0, 0, 0.03),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .hover-zoom-card:hover {
          transform: scale(1.05) translateY(-8px);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.15), 
            0 10px 20px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          border-top: 1px solid var(--color-text-secondary) !important;
          border-left: 1px solid var(--color-text-secondary) !important;
          z-index: 10;
          position: relative;
        }
        
        .simulador-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
        
        .simulador-card:hover .sim-img {
          transform: scale(1.1);
        }
        
        .sim-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--color-text-primary);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          z-index: 1;
        }
        
        .sim-btn:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .sim-btn:hover span {
          color: var(--color-bg-primary);
        }
        
        .beacon-pulse {
          position: relative;
        }
        .beacon-pulse::before, .beacon-pulse::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: var(--color-accent-red);
          z-index: -1;
        }
        .beacon-pulse::before {
          width: 100%;
          height: 100%;
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .beacon-pulse::after {
          width: 100%;
          height: 100%;
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          animation-delay: 1s;
        }
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }

        /* Mobile overrides for grids to prevent squishing */
        @media (max-width: 1100px) {
          .simuladores-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .specs-grid-3, .feat-grid-3 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        .mobile-hotspot-info {
          display: none;
        }

        @media (max-width: 900px) {
          /* Hide desktop tooltips entirely on mobile to prevent overflow and overlap */
          .plane-tooltip, .hotspot-line {
            display: none !important;
          }
          
          /* Display the dedicated mobile info box below the plane */
          .mobile-hotspot-info {
            display: block;
            margin-top: 1rem;
            min-height: 120px; /* prevent layout shift */
          }
          
          .mobile-info-card {
            background: rgba(130, 145, 160, 0.25);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            color: #fff;
          }
          
          html[data-theme='light'] .mobile-info-card,
          .app-container.light .mobile-info-card {
            background: rgba(255,255,255,0.85);
            border: 1px solid rgba(255,255,255,0.6);
            color: #1a2a3a;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          }
        }
        @media (max-width: 768px) {
          .specs-grid-3, .feat-grid-3 {
            grid-template-columns: 1fr !important;
          }
          .aeronaves-section {
            padding: 1rem 0 !important;
          }
        }
        @media (max-width: 600px) {
          .simuladores-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      
      
    </div>
  );
};
