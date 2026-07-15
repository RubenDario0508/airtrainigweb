import React, { useEffect, useRef, useState } from 'react';
import { RiCompassLine, RiShieldLine, RiAwardLine, RiTeamLine } from 'react-icons/ri';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Vision: React.FC = () => {
  const [statsTrigger, setStatsTrigger] = useState(0);
  const [years, setYears] = useState(0);
  const [pilots, setPilots] = useState(0);
  const [sedes, setSedes] = useState(0);
  const [pasion, setPasion] = useState(0);
  
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.stagger-item');
    items.forEach(item => item.classList.remove('stagger-item'));

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        onEnter: () => setStatsTrigger(Date.now()),
        onEnterBack: () => setStatsTrigger(Date.now()),
      });

      gsap.fromTo(items, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'restart none restart none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (statsTrigger > 0) {
      // Reset stats explicitly on trigger in a setTimeout to avoid synchronous setState inside the effect body
      const resetTimeout = setTimeout(() => {
        setYears(0);
        setPilots(0);
        setSedes(0);
        setPasion(0);
      }, 0);

      // Animate Years
      let y = 0;
      const yInterval = setInterval(() => {
        y += 1;
        setYears(y);
        if (y >= 16) clearInterval(yInterval);
      }, 75);

      // Animate Pilots
      let p = 0;
      const pInterval = setInterval(() => {
        p += 25;
        setPilots(p);
        if (p >= 500) clearInterval(pInterval);
      }, 60);

      // Animate Sedes
      let s = 0;
      const sInterval = setInterval(() => {
        s += 1;
        setSedes(s);
        if (s >= 2) clearInterval(sInterval);
      }, 600);

      // Animate Pasion
      let pa = 0;
      const paInterval = setInterval(() => {
        pa += 5;
        setPasion(pa);
        if (pa >= 100) clearInterval(paInterval);
      }, 60);

      return () => {
        clearTimeout(resetTimeout);
        clearInterval(yInterval);
        clearInterval(pInterval);
        clearInterval(sInterval);
        clearInterval(paInterval);
      };
    }
  }, [statsTrigger]);

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{
        position: 'relative',
        minHeight: 'auto',
        zIndex: 5,
        backgroundColor: 'transparent', 
        padding: '6rem 0 8rem 0',
        transition: 'background-color 0.4s ease'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* CSS Injected for card hover and responsive design */}
        <style>{`
          .vision-card {
            background: linear-gradient(95deg, #00032a 0%, #000ebd 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 28px;
            padding: 3rem 2.5rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.1);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            flex-direction: column;
          }
          .vision-card:hover {
            transform: translateY(-6px);
            background: linear-gradient(95deg, #00053d 0%, #0012db 100%);
            border-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 35px 60px rgba(0, 14, 189, 0.3), 0 15px 30px rgba(0, 0, 0, 0.3);
          }
          .vision-card-icon {
            width: 72px;
            height: 72px;
            object-fit: contain;
          }
          .vision-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
            margin-bottom: 5rem;
          }
          @media (max-width: 768px) {
            .vision-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
            }
            .vision-card {
              padding: 2rem 1.5rem;
            }
          }
        `}</style>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="stagger-item" style={{ 
            color: '#e71a24', 
            fontWeight: 700, 
            letterSpacing: '2px', 
            textTransform: 'uppercase', 
            fontSize: '0.9rem',
            display: 'inline-block',
            marginBottom: '0.8rem'
          }}>
            Horizonte Académico
          </span>
          <h2 className="stagger-item" style={{ 
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', 
            fontWeight: 800, 
            color: 'var(--color-text-primary)', 
            lineHeight: 1.1,
            margin: 0,
            transition: 'color 0.4s ease'
          }}>
            Misión y Visión
          </h2>
        </div>

        {/* 2 Cards side by side */}
        <div className="vision-grid">
          {/* Card 1: Misión */}
          <div className="vision-card stagger-item">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <img loading="lazy" src="/iconhero/Mision.png" alt="Misión Icon" className="vision-card-icon" />
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginLeft: '1.2rem', margin: 0 }}>Misión</h3>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Contribuir a la seguridad y operaciones aéreas del país mediante entrenamiento especializado de alta calidad y excelencia académica.
            </p>
          </div>

          {/* Card 2: Visión */}
          <div className="vision-card stagger-item">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <img loading="lazy" src="/iconhero/Vision.png" alt="Visión Icon" className="vision-card-icon" />
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginLeft: '1.2rem', margin: 0 }}>Visión</h3>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Ser una escuela de aviación sostenible, líder en entrenamiento aeronáutico y desarrollo tecnológico, innovando procesos con personal altamente calificado y certificado.
            </p>
          </div>
        </div>

        {/* Horizontal Statistics Row */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {/* Stat 1 */}
          <div className="glass-panel stagger-item stat-card" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ color: '#e71a24', marginBottom: '0.6rem', display: 'flex', justifyContent: 'center' }}>
              <RiAwardLine size={28} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-text-primary)', lineHeight: 1, marginBottom: '0.3rem', transition: 'color 0.4s ease' }}>
              <span style={{ color: '#e71a24' }}>+</span>{years}
            </div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.4s ease' }}>
              Años de Experiencia
            </div>
          </div>

          {/* Stat 2 */}
          <div className="glass-panel stagger-item stat-card" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--color-text-primary)', marginBottom: '0.6rem', display: 'flex', justifyContent: 'center', transition: 'color 0.4s ease' }}>
              <RiTeamLine size={28} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-text-primary)', lineHeight: 1, marginBottom: '0.3rem', transition: 'color 0.4s ease' }}>
              <span style={{ color: 'var(--color-text-primary)', transition: 'color 0.4s ease' }}>+</span>{pilots}
            </div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.4s ease' }}>
              Pilotos Graduados
            </div>
          </div>

          {/* Stat 3 */}
          <div className="glass-panel stagger-item stat-card" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ color: '#4a90d9', marginBottom: '0.6rem', display: 'flex', justifyContent: 'center' }}>
              <RiCompassLine size={28} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-text-primary)', lineHeight: 1, marginBottom: '0.3rem', transition: 'color 0.4s ease' }}>
              {sedes}
            </div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.4s ease' }}>
              Sedes (Chía / Ibagué)
            </div>
          </div>

          {/* Stat 4 */}
          <div className="glass-panel stagger-item stat-card" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--color-text-secondary)', marginBottom: '0.6rem', display: 'flex', justifyContent: 'center', transition: 'color 0.4s ease' }}>
              <RiShieldLine size={28} />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-text-primary)', lineHeight: 1, marginBottom: '0.3rem', transition: 'color 0.4s ease' }}>
              {pasion}<span style={{ color: '#e71a24' }}>%</span>
            </div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.4s ease' }}>
              Pasión por Volar
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Vision;
