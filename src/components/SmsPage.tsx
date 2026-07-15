import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const OBLIGATIONS = [
  {
    id: 1,
    title: 'Reconocer',
    desc: 'la gestión de la Seguridad Operacional como una responsabilidad compartida por todo el personal de la organización, desde la alta gerencia hasta el personal de línea.',
    icon: '/imgpag5/icon/reconocimiento.png'
  },
  {
    id: 2,
    title: 'Promover',
    desc: 'una cultura de seguridad no punitiva, justa, abierta que motive al reporte de sucesos de seguridad y las fuentes de eventos y/o peligros.',
    icon: '/imgpag5/icon/promocion.png'
  },
  {
    id: 3,
    title: 'Identificar',
    desc: 'evaluar, mitigar y gestionar los riesgos operacionales derivados de todas las actividades académicas y operativas, manteniéndolos en el nivel más razonablemente bajo posible (ALARP).',
    icon: '/imgpag5/icon/identificar.png'
  },
  {
    id: 4,
    title: 'Asegurar',
    desc: 'la asignación de recursos humanos, técnicos y financieros suficientes para la implementación, mantenimiento y mejora continua del Sistema de Gestión de la Seguridad Operacional (SMS).',
    icon: '/imgpag5/icon/asegurar.png'
  },
  {
    id: 5,
    title: 'Cumplir',
    desc: 'con la normativa nacional e internacional aplicable, especialmente la dispuesta por la Aeronáutica Civil de Colombia y los Reglamentos de la OACI.',
    icon: '/imgpag5/icon/mision-cumplida.png'
  },
  {
    id: 6,
    title: 'Garantizar',
    desc: 'que todo el personal esté debidamente capacitado y sea responsable y consciente de las medidas de seguridad operacional aplicables a sus funciones.',
    icon: '/imgpag5/icon/la-satisfaccion-del-cliente.png'
  },
  {
    id: 7,
    title: 'Verificar',
    desc: 'que los lineamientos de seguridad y la mejora continua se apliquen sistemáticamente para prevenir accidentes e incidentes en todas las fases del servicio educacional.',
    icon: '/imgpag5/icon/verificar.png'
  },
  {
    id: 8,
    title: 'Establecer y monitorear',
    desc: 'indicadores de desempeño de seguridad operacional, que permitan medir la eficacia del SMS y tomar decisiones basadas en datos.',
    icon: '/imgpag5/icon/investigacion.png'
  },
  {
    id: 9,
    title: 'Fomentar la mejora',
    desc: 'continua a través de auditorías internas, análisis de datos y retroalimentación del sistema.',
    icon: '/imgpag5/icon/continuo.png'
  },
  {
    id: 10,
    title: 'Supervisar',
    desc: 'que los servicios contratados o tercerizados cumplan con los estándares requeridos de seguridad operacional y se integren al SMS institucional.',
    icon: '/imgpag5/icon/supervisar.png'
  }
];

export const SmsPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [currentSmsImage, setCurrentSmsImage] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSmsImage(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      // Fade up animations for sections
      gsap.fromTo('.anim-fade-up', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.anim-fade-up',
            start: 'top 85%'
          }
        }
      );

      // Grid items stagger animation
      gsap.fromTo('.sms-grid-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.sms-grid',
            start: 'top 80%'
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
      
      {/* 1. HERO BANNER */}
      <section style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100vh', 
        minHeight: '650px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/imgpag5/ImagenSMS_COrregida.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          zIndex: 1
        }} />
        
        {/* Banner Text */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem' }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 800, 
            color: '#ffffff', 
            margin: 0,
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            wordBreak: 'keep-all',
            overflowWrap: 'normal',
            WebkitHyphens: 'none',
            hyphens: 'none'
          }}>
            Sistema de Seguridad Operacional
          </h1>
          <h2 style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            fontWeight: 900, 
            color: '#ffffff', 
            margin: 0,
            lineHeight: 1,
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            wordBreak: 'keep-all',
            overflowWrap: 'normal',
            WebkitHyphens: 'none',
            hyphens: 'none'
          }}>
            SMS
          </h2>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="anim-fade-up" style={{ padding: '5rem 5%', width: '100%' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Text Content */}
          <div>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', textAlign: 'justify' }}>
              En <strong>AIRTRAINING INDUSTRY S.A.S.</strong>, la Seguridad Operacional constituye un pilar fundamental en la prestación de nuestros servicios como Centro de Instrucción Aeronáutica. Desde la alta gerencia, manifestamos nuestro compromiso de implementar, mantener y mejorar continuamente un Sistema de Gestión de Seguridad Operacional (SMS) eficaz, conforme con la normatividad vigente expedida por la Aeronáutica Civil de Colombia y los estándares internacionales. Para ello, se garantiza la asignación adecuada de recursos humanos, técnicos y financieros, en proporción al nivel de riesgo identificado en nuestras operaciones de instrucción en tierra y vuelo. Nuestro objetivo es alcanzar el más alto nivel de seguridad y eficiencia operativa, promoviendo una cultura justa, abierta y proactiva frente a la identificación de peligros, reporte de sucesos y gestión del riesgo.
            </p>
          </div>

          {/* Mechanic Image Carousel */}
          <div style={{ justifySelf: 'center', position: 'relative' }} className="mechanic-img-container">
            <style>{`
              @keyframes slowFloat {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-12px); }
                100% { transform: translateY(0px); }
              }
              .mechanic-img-container {
                animation: slowFloat 6s ease-in-out infinite;
                perspective: 1000px;
                width: 100%;
                max-width: 380px;
                aspect-ratio: 4/5;
                position: relative;
              }
              .mechanic-img-wrapper {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                border-radius: 30px;
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35), 0 15px 25px rgba(0, 0, 0, 0.2);
                background-color: #0a0f1a;
                border: 1px solid rgba(255,255,255,0.2);
                overflow: hidden;
                z-index: 1;
                transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.6s ease;
              }
              .mechanic-img-container:hover .mechanic-img-wrapper {
                transform: scale(1.04) rotateX(2deg) rotateY(-2deg);
                box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45), 0 20px 40px rgba(0, 0, 0, 0.3) !important;
              }
              .mechanic-img-container::after {
                content: '';
                position: absolute;
                inset: -20px;
                background: radial-gradient(circle, rgba(74, 144, 217, 0.4) 0%, transparent 60%);
                z-index: -1;
                opacity: 0;
                transition: opacity 0.5s ease;
              }
              .mechanic-img-container:hover::after {
                opacity: 1;
              }
            `}</style>
            
            <div className="mechanic-img-wrapper">
              {['/imgpag5/carrusel/dpa mantenimiento.webp', '/imgpag5/carrusel/IMG_4553.webp', '/imgpag5/carrusel/IMG_4565.webp'].map((src, index) => (
                <img loading="lazy" 
                  key={index}
                  src={src} 
                  alt="Mantenimiento Aeronáutico" 
                  style={{ 
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover',
                    opacity: currentSmsImage === index ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                  }} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. GRID SECTION */}
      <section style={{ padding: '2rem 5% 5rem 5%', width: '100%', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <h3 className="anim-fade-up" style={{ 
            textAlign: 'center', 
            fontSize: '1.3rem', 
            fontWeight: 800, 
            color: 'var(--color-text-primary)', 
            marginBottom: '3rem' 
          }}>
            Como parte de este compromiso, la organización se obliga a:
          </h3>

          <style>{`
            .sms-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }
            @media (max-width: 900px) {
              .sms-grid {
                grid-template-columns: 1fr;
              }
            }
            @media (max-width: 480px) {
              .sms-card {
                flex-direction: column;
                text-align: center;
                gap: 1rem;
              }
            }
            .sms-card {
              display: flex;
              align-items: center;
              gap: 1.5rem;
              /* Custom Gray Glassmorphism to keep icons visible in Dark Mode */
              background: rgba(225, 225, 225, 0.75);
              backdrop-filter: blur(15px);
              -webkit-backdrop-filter: blur(15px);
              border: 1px solid rgba(255, 255, 255, 0.4);
              
              padding: 1.5rem;
              border-radius: 20px;
              transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
              position: relative;
              overflow: hidden;
            }
            
            /* Glossy Shine overlay */
            .sms-card::before {
              content: '';
              position: absolute;
              top: 0; left: -100%; width: 50%; height: 100%;
              background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
              transform: skewX(-20deg);
              transition: all 0.7s ease;
              pointer-events: none;
            }

            .sms-card:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 40px var(--glass-shadow), 0 8px 15px rgba(0, 0, 0, 0.06);
              background: rgba(245, 245, 245, 0.85);
              border-color: var(--color-accent-blue);
            }
            
            .sms-card:hover::before {
              left: 200%;
            }

            .sms-card img {
              transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .sms-card:hover img {
              transform: scale(1.15) rotate(-5deg);
            }
          `}</style>

          <div className="sms-grid">
            {OBLIGATIONS.map((item) => (
              <div key={item.id} className="sms-grid-item sms-card">
                {/* Icon */}
                <div style={{ flexShrink: 0, width: '60px', height: '60px' }}>
                  <img loading="lazy" 
                    src={item.icon} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-primary)', textAlign: 'justify' }}>
                    <strong>{item.title}</strong> {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Text */}
          <div className="anim-fade-up" style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '2rem' }}>
            <p style={{ 
              fontSize: '1rem', 
              fontWeight: 800, 
              color: 'var(--color-text-primary)', 
              margin: 0,
              lineHeight: 1.5,
              textAlign: 'center',
              maxWidth: '1000px',
              padding: '0 2rem'
            }}>
              Esta política será revisada y actualizada periódicamente, asegurando su adecuación y efectividad para el logro de nuestros objetivos de seguridad operacional.
            </p>

          </div>

        </div>
      </section>

      
    </div>
  );
};
