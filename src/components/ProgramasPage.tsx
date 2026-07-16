import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import colombiaData from '../data/colombia.json';

gsap.registerPlugin(ScrollTrigger);

const ACADEMIC_PROGRAMS = [
  {
    id: 'dpa',
    title: 'Despachador de Aeronaves',
    subtitle: 'DPA',
    image: '/imgpag2/DPA.webp',
    pdf: '/documentospag2/brochure DPA 2026-1-comprimido.pdf',
    bullets: [
      'Especialízate en la planificación, control y supervisión de operaciones aéreas.',
      'Aprende a coordinar vuelos, analizar condiciones meteorológicas, gestionar el peso y balance de las aeronaves y contribuir a la seguridad operacional desde tierra.'
    ]
  },
  {
    id: 'tcp',
    title: 'Tripulante de Cabina de Pasajeros',
    subtitle: 'TCP',
    image: '/imgpag2/TCP.webp',
    pdf: '/documentospag2/brochure TCP 2026-comprimido.pdf',
    bullets: [
      'Prepárate para brindar seguridad, servicio y atención de excelencia a bordo.',
      'Nuestro programa forma profesionales capaces de responder ante emergencias, asistir pasajeros y representar a las aerolíneas con altos estándares de calidad y profesionalismo.'
    ]
  },
  {
    id: 'pca',
    title: 'Piloto Comercial de Avión',
    subtitle: 'PCA',
    image: '/imgpag2/PCA.webp',
    pdf: '/documentospag2/Brochure PCA 148M 1-comprimido.pdf',
    bullets: [
      'Conviértete en piloto comercial con una formación integral que combina entrenamiento en tierra, simuladores avanzados y vuelo real.',
      'Desarrolla las competencias técnicas, operacionales y humanas necesarias para desempeñarte profesionalmente en la aviación bajo los más altos estándares de seguridad.'
    ]
  },
  {
    id: 'ppa',
    title: 'Piloto Privado de Avión',
    subtitle: 'PPA',
    image: '/imgpag2/PPA.webp',
    pdf: '/documentospag2/PPA.pdf',
    bullets: [
      'Da el primer paso hacia tu carrera aeronáutica.',
      'Este programa te brinda los conocimientos teóricos y prácticos para obtener tu Licencia de Piloto Privado de Avión, permitiéndote operar aeronaves de manera segura y responsable en el ámbito de la aviación general.'
    ]
  }
];

const COMPLEMENTARY_PROGRAMS = [
  {
    id: 'convalidaciones',
    title: 'Convalidaciones',
    image: '/imgpag2/Convalidaciones.webp',
    pdf: '/documentospag2/convalidaciones 2026.pdf',
    bullets: [
      'Programa diseñado para pilotos formados en el exterior que desean obtener la licencia colombiana y homologar sus competencias ante la Aeronáutica Civil.',
      'Incluye actualización académica, nivelación operacional y acompañamiento durante todo el proceso de convalidación.'
    ]
  },
  {
    id: 'nivelacion',
    title: 'Nivelación Operacional',
    image: '/imgpag2/Nivelación Operacional.webp',
    pdf: '/documentospag2/NIVELACION OPERACIONAL.pdf',
    bullets: [
      'Fortalece tus conocimientos y habilidades operacionales mediante entrenamiento especializado en aula y simulador.',
      'Este programa permite perfeccionar procedimientos IFR, navegación instrumental y gestión segura de operaciones aéreas, alineados con los requerimientos de la autoridad aeronáutica.'
    ]
  }
];

export const ProgramasPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [pais, setPais] = useState<string>('Colombia');
  const [departamento, setDepartamento] = useState<string>('');
  const [ciudad, setCiudad] = useState<string>('');

  useEffect(() => {
    // Scroll to top automatically when the page mounts
    window.scrollTo(0, 0);

    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      // Stagger entrance for headers
      gsap.fromTo('.prog-header', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );

      // Stagger entrance for academic cards - animate the WRAPPER, not the flipper
      gsap.fromTo('.flip-container',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.academics-grid',
            start: 'top 80%'
          }
        }
      );

      gsap.fromTo('.flip-container',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.complementary-grid',
            start: 'top 80%'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
      
      {/* SECTION 1: Programas Académicos */}
      <section style={{ paddingBottom: '4rem', width: '100%', padding: '0 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 className="prog-header" style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '3rem' }}>
            Programas Académicos
          </h1>
          
          <div className="academics-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '5px', 
            width: '100%',
          }}>
            {ACADEMIC_PROGRAMS.map(prog => (
              <div key={prog.id} className="flip-container" style={{ width: '100%' }}>
                <div className="flipper prog-card" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)' }}>
                  
                  {/* FRONT FACE */}
                  <div className="front face">
                    {/* Background Image */}
                    <img 
                      src={prog.image} 
                      alt={prog.title} 
                      loading="lazy"
                      style={{
                        position: 'absolute', inset: 0, 
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'center', backgroundColor: '#0a0f1a'
                      }} 
                      className="card-bg" 
                    />
                    
                    {/* Gradient Overlay for readability at top and bottom */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)',
                      zIndex: 1
                    }} />

                    {/* Content Front */}
                    <div style={{
                      position: 'relative', zIndex: 3, height: '100%', 
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                      padding: '2.5rem 1.5rem',
                      alignItems: 'center'
                    }}>
                      {/* Bottom Buttons Front */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center', width: '100%' }}>
                        <a className="ghost-btn" href={prog.id === 'dpa' ? "#admision-dpa" : prog.id === 'tcp' ? "#admision-tcp" : prog.id === 'pca' ? "#admision-pca" : prog.id === 'ppa' ? "#admision-ppa" : "#admisiones-section"} style={{ width: '100%', maxWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>Conoce más</a>
                        <a className="ghost-btn" href={prog.pdf} target="_blank" rel="noreferrer" style={{ width: '100%', maxWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>Ver Brochure</a>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="back face" style={{
                    backgroundColor: 'var(--color-accent-red)',
                    padding: '2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'white',
                    overflowY: 'auto'
                  }}>
                    <div style={{ width: '100%' }}>
                      <h2 style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '1rem', fontStyle: 'normal', textShadow: 'none' }}>
                        {prog.subtitle}
                      </h2>
                      <ul style={{ fontSize: '0.85rem', lineHeight: '1.4', listStyleType: 'disc', paddingLeft: '1.2rem', textAlign: 'left' }}>
                        {prog.bullets?.map((bullet, i) => (
                          <li key={i} style={{ marginBottom: '0.8rem', fontWeight: 500 }}>{bullet}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center', width: '100%', marginTop: '1rem' }}>
                      <a className="ghost-btn" href={prog.id === 'dpa' ? "#admision-dpa" : prog.id === 'tcp' ? "#admision-tcp" : prog.id === 'pca' ? "#admision-pca" : prog.id === 'ppa' ? "#admision-ppa" : "#admisiones-section"} style={{ width: '100%', maxWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>Conoce más</a>
                      <a className="ghost-btn" href={prog.pdf} target="_blank" rel="noreferrer" style={{ width: '100%', maxWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>Ver Brochure</a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local CSS for Flip Effects */}
      <style>{`
        .flip-container {
          perspective: 1200px;
          aspect-ratio: 4 / 7;
          width: 100%;
          border-radius: 16px;
        }
        .flip-container:hover {
          z-index: 10;
        }
        .flipper {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 0.9s ease;
          transform-style: preserve-3d;
          border-radius: 16px;
        }
        .flip-container:hover .flipper {
          transform: rotateY(180deg);
        }
        .face {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          border-radius: 16px;
        }
        .back {
          transform: rotateY(180deg);
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .back::-webkit-scrollbar {
          display: none;
        }
        .ghost-btn {
          background: transparent;
          color: white;
          border: 1px solid #ffffff;
          padding: 0.6rem 1rem;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          text-transform: none;
        }
        .ghost-btn:hover {
          background: linear-gradient(135deg, #00c2ff 0%, #0044cc 100%);
          border-color: transparent;
          transform: scale(1.05);
          color: white;
        }
      `}</style>

      {/* SECTION 2: Programas Complementarios */}
      <section className="section" style={{ paddingBottom: '4rem' }}>
        <div className="container">
          <h2 className="prog-header" style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '3rem' }}>
            Programas Complementarios
          </h2>
          
          <div className="complementary-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 320px))', 
            justifyContent: 'center',
            gap: '4rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {COMPLEMENTARY_PROGRAMS.map(prog => (
              <div key={prog.id} className="flip-container" style={{ width: '100%' }}>
                <div className="flipper comp-card prog-card" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)' }}>
                  
                  {/* FRONT FACE */}
                  <div className="front face">
                    {/* Background Image */}
                    <img 
                      src={prog.image} 
                      alt={prog.title} 
                      loading="lazy"
                      style={{
                        position: 'absolute', inset: 0, 
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'center', backgroundColor: '#0a0f1a'
                      }} 
                      className="card-bg" 
                    />
                    
                    {/* Gradient Overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)',
                      zIndex: 1
                    }} />

                    {/* Content Front */}
                    <div style={{
                      position: 'relative', zIndex: 3, height: '100%', 
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                      padding: '3rem 2rem',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center', width: '100%' }}>
                        <a className="ghost-btn" href="#admision-complementarios" style={{ width: '100%', maxWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>Conoce más</a>
                        <a className="ghost-btn" href={prog.pdf} target="_blank" rel="noreferrer" style={{ width: '100%', maxWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>Ver Brochure</a>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="back face" style={{
                    backgroundColor: 'var(--color-accent-red)',
                    padding: '2rem 1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'white',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ width: '100%', overflowX: 'hidden' }}>
                      <h2 style={{ 
                        fontSize: 'clamp(1.4rem, 4vw, 2rem)', 
                        fontWeight: 800, 
                        textAlign: 'center', 
                        marginBottom: '1.2rem', 
                        textShadow: 'none',
                        wordBreak: 'keep-all',
                        overflowWrap: 'normal',
                        hyphens: 'none',
                        lineHeight: 1.2
                      }}>
                        {prog.title}
                      </h2>
                      <ul style={{ fontSize: '0.82rem', lineHeight: '1.5', listStyleType: 'disc', paddingLeft: '1.2rem', textAlign: 'left' }}>
                        {prog.bullets?.map((bullet, i) => (
                          <li key={i} style={{ marginBottom: '0.8rem', fontWeight: 500 }}>{bullet}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center', width: '100%', marginTop: '1rem' }}>
                      <a className="ghost-btn" href="#admision-complementarios" style={{ width: '100%', maxWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>Conoce más</a>
                      <a className="ghost-btn" href={prog.pdf} target="_blank" rel="noreferrer" style={{ width: '100%', maxWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>Ver Brochure</a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Proceso de Admisión */}
      <section id="admisiones-section" className="section" style={{ paddingBottom: '6rem', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="prog-header" style={{ fontSize: '2.8rem', color: 'var(--color-text-primary)', margin: 0 }}>
              Proceso de Admisión
            </h2>
            <p className="prog-header" style={{ color: 'var(--color-accent-red)', fontWeight: 600, fontSize: '1.2rem', marginTop: '0.5rem' }}>
              Camino al Aire
            </p>
          </div>

          <div className="grid-2 prog-header" style={{ alignItems: 'stretch' }}>
            {/* Left Column: Info & Accordions */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                El proceso de admisión <strong style={{ color: 'var(--color-text-primary)' }}>varía según el programa</strong>, en cuanto a la documentación a adjuntar y orden del protocolo. Llena el formulario para más información.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[
                  { name: 'Proceso de Admisión - Prog. TCP', url: '#admision-tcp' },
                  { name: 'Proceso de Admisión - Prog. PCA', url: '#admision-pca' },
                  { name: 'Proceso de Admisión - Prog. DPA', url: '#admision-dpa' },
                  { name: 'Proceso de Admisión - Prog. PPA', url: '#admision-ppa' },
                  { name: 'Proceso de Admisión - Convalidación y Nivelación operacional', url: '#admision-complementarios' }
                ].map((item, idx) => (
                  <a key={idx} 
                  href={item.url} 
                  style={{
                    backgroundColor: 'var(--color-accent-red)',
                    color: 'white',
                    border: 'none',
                    padding: '1.2rem 1.5rem',
                    borderRadius: '8px',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'transform 0.2s, background-color 0.2s',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-accent-red-hover)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-accent-red)'}
                  >
                    <span style={{ fontSize: '1.2rem' }}>▶</span> {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="glass-panel" style={{
              padding: '3rem 2.5rem',
              borderRadius: '16px',
              border: '2px solid var(--color-bg-tertiary)',
              backgroundColor: 'var(--color-bg-secondary)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--color-text-primary)', marginBottom: '2rem' }}>
                Hablar con un Asesor
              </h3>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flexGrow: 1, justifyContent: 'space-between' }} onSubmit={e => e.preventDefault()}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Nombre Completo</label>
                  <input type="text" placeholder="Ej: Juan Pérez" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid var(--color-bg-tertiary)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Correo Electrónico</label>
                  <input type="email" placeholder="Ej: correo@ejemplo.com" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid var(--color-bg-tertiary)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Programa de Interés</label>
                  <select style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid var(--color-bg-tertiary)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', appearance: 'none', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                    <option value="">Selecciona un programa</option>
                    <option value="dpa">Despachador de Aeronaves (DPA)</option>
                    <option value="tcp">Tripulante de Cabina (TCP)</option>
                    <option value="pca">Piloto Comercial (PCA)</option>
                    <option value="ppa">Piloto Privado (PPA)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>País</label>
                  <select value={pais} onChange={(e) => setPais(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid var(--color-bg-tertiary)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', appearance: 'none', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                    <option value="Colombia">Colombia</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Departamento</label>
                  <select value={departamento} onChange={(e) => { setDepartamento(e.target.value); setCiudad(''); }} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid var(--color-bg-tertiary)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', appearance: 'none', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                    <option value="">Selecciona un departamento</option>
                    {colombiaData.map((d: any) => (
                      <option key={d.id} value={d.departamento}>{d.departamento}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Ciudad / Municipio</label>
                  <select value={ciudad} onChange={(e) => setCiudad(e.target.value)} disabled={!departamento} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid var(--color-bg-tertiary)', backgroundColor: !departamento ? 'var(--color-bg-tertiary)' : 'var(--color-bg-primary)', color: 'var(--color-text-primary)', appearance: 'none', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)', cursor: !departamento ? 'not-allowed' : 'pointer' }}>
                    <option value="">Selecciona una ciudad</option>
                    {departamento && colombiaData.find((d: any) => d.departamento === departamento)?.ciudades.map((c: string) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                
                <button type="submit" style={{
                  backgroundColor: 'var(--color-accent-red)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  marginTop: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-accent-red-hover)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-accent-red)'}
                >
                  ▶ Solicitar Información
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                  Un asesor se pondrá en contacto contigo a la brevedad.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};
