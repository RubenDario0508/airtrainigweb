import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { RiFileList3Line, RiListCheck2, RiGraduationCapLine, RiHealthBookLine } from 'react-icons/ri';
import colombiaData from '../data/colombia.json';

interface AdmisionPageProps {
  programTitle: string;
}

export const AdmisionPage: React.FC<AdmisionPageProps> = ({ programTitle }) => {
  const pageRef = useRef<HTMLDivElement>(null);

  const getInitialProgram = (title: string) => {
    if (title === 'Despachador de Aeronaves') return 'dpa';
    if (title === 'Tripulante de Cabina de Pasajeros') return 'tcp';
    if (title === 'Piloto Comercial de Avión') return 'pca';
    if (title === 'Piloto Privado de Avión') return 'ppa';
    return '';
  };

  const [programa, setPrograma] = useState(getInitialProgram(programTitle));
  const [pais, setPais] = useState('Colombia');
  const [departamento, setDepartamento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const showMedicalExam = programTitle === 'Piloto Comercial de Avión' || programTitle === 'Piloto Privado de Avión' || programTitle === 'Convalidaciones - Nivelación Operacional';

  useEffect(() => {
    window.scrollTo(0, 0);
    setPrograma(getInitialProgram(programTitle));

    const ctx = gsap.context(() => {
      gsap.fromTo('.admision-header', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo('.step-item',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo('.req-box',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [programTitle]);

  return (
    <div ref={pageRef} style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)', display: 'flex', flexDirection: 'column' }}>
      
      <main style={{ flexGrow: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="admision-header" style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 800, 
            color: 'var(--color-text-primary)', 
            margin: 0,
            lineHeight: 1.2
          }}>
            Proceso de Admisión
          </h1>
          <h2 className="admision-header" style={{ 
            color: '#ff0000', 
            fontWeight: 600, 
            fontSize: 'clamp(1.5rem, 3vw, 2rem)', 
            marginTop: '0.5rem',
            margin: 0
          }}>
            {programTitle}
          </h2>
        </div>

        {/* Content Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '4rem',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Timeline Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
            
            {/* Connecting Line */}
            <div style={{
              position: 'absolute',
              left: '25px', // Center of the 50px icon box
              top: '25px',
              bottom: '25px',
              width: '4px',
              backgroundColor: '#ff0000',
              zIndex: 0
            }} />

            {/* Step 1 */}
            <div className="step-item" style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '50px', height: '50px', 
                backgroundColor: '#ff0000', 
                borderRadius: '12px', 
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                flexShrink: 0,
                color: 'white',
                boxShadow: '0 4px 10px rgba(255,0,0,0.3)'
              }}>
                <RiFileList3Line size={24} />
              </div>
              <div style={{ 
                flexGrow: 1, 
                backgroundColor: 'var(--color-bg-secondary)', 
                border: '1px solid var(--color-bg-tertiary)',
                borderRadius: '16px', 
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}>
                <span style={{ fontSize: '4rem', fontWeight: 900, color: '#ff0000', lineHeight: 1 }}>1</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '1.1rem' }}>Examen psicotécnico de admisión</p>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>ante un profesional de psicología aeroespacial.</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-item" style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '50px', height: '50px', 
                backgroundColor: '#ff0000', 
                borderRadius: '12px', 
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                flexShrink: 0,
                color: 'white',
                boxShadow: '0 4px 10px rgba(255,0,0,0.3)'
              }}>
                <RiListCheck2 size={24} />
              </div>
              <div style={{ 
                flexGrow: 1, 
                backgroundColor: 'var(--color-bg-secondary)', 
                border: '1px solid var(--color-bg-tertiary)',
                borderRadius: '16px', 
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}>
                <span style={{ fontSize: '4rem', fontWeight: 900, color: '#ff0000', lineHeight: 1 }}>2</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '1.1rem' }}>Prueba de Tamizaje</p>
                </div>
              </div>
            </div>

            {/* Conditional Step 3 for PCA and PPA */}
            {showMedicalExam && (
            <div className="step-item" style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '50px', height: '50px', 
                backgroundColor: '#ff0000', 
                borderRadius: '12px', 
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                flexShrink: 0,
                color: 'white',
                boxShadow: '0 4px 10px rgba(255,0,0,0.3)'
              }}>
                <RiHealthBookLine size={24} />
              </div>
              <div style={{ 
                flexGrow: 1, 
                backgroundColor: 'var(--color-bg-secondary)', 
                border: '1px solid var(--color-bg-tertiary)',
                borderRadius: '16px', 
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}>
                <span style={{ fontSize: '4rem', fontWeight: 900, color: '#ff0000', lineHeight: 1 }}>3</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '1.1rem' }}>Examen clase 1</p>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>ante médicos aeroespaciales.</p>
                </div>
              </div>
            </div>
            )}

            {/* Last Step (3 or 4) */}
            <div className="step-item" style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '50px', height: '50px', 
                backgroundColor: '#ff0000', 
                borderRadius: '12px', 
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                flexShrink: 0,
                color: 'white',
                boxShadow: '0 4px 10px rgba(255,0,0,0.3)'
              }}>
                <RiGraduationCapLine size={24} />
              </div>
              <div style={{ 
                flexGrow: 1, 
                backgroundColor: 'var(--color-bg-secondary)', 
                border: '1px solid var(--color-bg-tertiary)',
                borderRadius: '16px', 
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}>
                <span style={{ fontSize: '4rem', fontWeight: 900, color: '#ff0000', lineHeight: 1 }}>{showMedicalExam ? '4' : '3'}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '1.1rem' }}>Proceso de matrícula</p>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Y firma de contrato.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Requisitos Box */}
          <div className="req-box" style={{
            backgroundColor: '#e60000', // A strong red color matching the image
            borderRadius: '24px',
            padding: '3rem 2rem',
            color: 'white',
            display: 'flex',
            gap: '2rem',
            boxShadow: '0 20px 40px rgba(230,0,0,0.2)',
            height: '100%',
            alignItems: 'center'
          }}>
            
            {/* Rotated Text */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)' // to make it read bottom to top
            }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
                fontWeight: 800, 
                letterSpacing: '5px',
                color: 'rgba(255,255,255,0.95)'
              }}>
                REQUISITOS
              </h3>
            </div>

            {/* List of requirements */}
            <ul style={{ 
              listStyleType: 'disc', 
              paddingLeft: '1.5rem', 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              fontSize: '1.05rem',
              fontWeight: 500,
              lineHeight: 1.4
            }}>
              <li>Edad mínima 16 años.</li>
              <li>Copia de documento de identidad.</li>
              <li>Diploma y acta de bachiller.</li>
              <li>Certificado examen icfes.</li>
              <li>Certificado Afiliación eps.</li>
              <li>Libreta militar / opcional.</li>
              <li>Formulario de Inscripción.</li>
              <li>Formulario de Matrícula.</li>
              <li>Contrato de matrícula / Pagaré y carta de instrucciones.</li>
              <li>En caso de ser menor de edad, se solicita autorización por escrito por parte de los padres de familia.</li>
            </ul>

          </div>

        </div>

        {/* Sección Dividida: Formulario y Gráfica */}
        <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'stretch', position: 'relative' }}>
          
          {/* Decorative Background Blobs for Glassmorphism */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(231,26,36,0.15) 0%, rgba(10,15,26,0) 70%)',
            transform: 'translateY(-50%)',
            filter: 'blur(40px)',
            zIndex: 0,
            pointerEvents: 'none'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-10%',
            right: '25%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(0,100,255,0.1) 0%, rgba(10,15,26,0) 70%)',
            filter: 'blur(50px)',
            zIndex: 0,
            pointerEvents: 'none'
          }}></div>

          {/* Columna Izquierda: Información e Imagen (Ahora en Glassmorphism) */}
          <div className="glass-panel" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center', 
            zIndex: 1,
            padding: '3rem 2.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--color-text-primary)', marginBottom: '1rem', fontWeight: 800, zIndex: 1 }}>
                ¿Listo para despegar?
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '400px', zIndex: 1, margin: '0 auto 2rem auto' }}>
                Déjanos tus datos y un asesor se comunicará contigo para guiarte en tu proceso de admisión.
              </p>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', zIndex: 1, position: 'relative' }}>
              <img loading="lazy" 
                src={
                  programa === 'dpa' ? '/procesoadmisione/DPA sujeto.png' :
                  programa === 'tcp' ? '/procesoadmisione/Foto TCP sin fondo.png' :
                  programa === 'pca' ? '/procesoadmisione/Piloto sujeto.png' :
                  programa === 'ppa' ? '/procesoadmisione/PPA sujeto.png' :
                  '/imgpag3/AvionPiperFicha técnica.png'
                }
                alt={programa ? `Estudiante ${programa.toUpperCase()}` : "Avión Piper"} 
                style={{ width: '100%', maxWidth: '400px', maxHeight: '400px', objectFit: 'contain', display: 'block', margin: '0 auto' }} 
              />
            </div>
          </div>

          {/* Formulario de Asesor (Diseño Glassmorphism y 2 Columnas) */}
          <div className="glass-panel" style={{
            padding: '3rem 2.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1
          }}>
            <h3 style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--color-text-primary)', marginBottom: '2rem' }}>
              Hablar con un Asesor
            </h3>
              
              <form style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }} onSubmit={e => e.preventDefault()}>
                {/* Nombre y Correo en una fila */}
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Nombre Completo</label>
                  <input type="text" placeholder="Ej: Juan Pérez" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(7, 12, 23, 0.4)', color: 'var(--color-text-primary)', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)' }} />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Correo Electrónico</label>
                  <input type="email" placeholder="Ej: correo@ejemplo.com" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(7, 12, 23, 0.4)', color: 'var(--color-text-primary)', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)' }} />
                </div>

                {/* Programa ocupa toda la fila */}
                <div style={{ flex: '1 1 100%' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Programa de Interés</label>
                  <select value={programa} onChange={(e) => setPrograma(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(7, 12, 23, 0.4)', color: 'var(--color-text-primary)', appearance: 'none', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                    <option value="" style={{ color: 'black' }}>Selecciona un programa</option>
                    <option value="dpa" style={{ color: 'black' }}>Despachador de Aeronaves (DPA)</option>
                    <option value="tcp" style={{ color: 'black' }}>Tripulante de Cabina (TCP)</option>
                    <option value="pca" style={{ color: 'black' }}>Piloto Comercial (PCA)</option>
                    <option value="ppa" style={{ color: 'black' }}>Piloto Privado (PPA)</option>
                  </select>
                </div>

                {/* País y Departamento en una fila */}
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>País</label>
                  <select value={pais} onChange={(e) => setPais(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(7, 12, 23, 0.4)', color: 'var(--color-text-primary)', appearance: 'none', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                    <option value="Colombia" style={{ color: 'black' }}>Colombia</option>
                  </select>
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Departamento</label>
                  <select value={departamento} onChange={(e) => { setDepartamento(e.target.value); setCiudad(''); }} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(7, 12, 23, 0.4)', color: 'var(--color-text-primary)', appearance: 'none', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                    <option value="" style={{ color: 'black' }}>Selecciona un departamento</option>
                    {colombiaData.map((d: any) => (
                      <option key={d.id} value={d.departamento} style={{ color: 'black' }}>{d.departamento}</option>
                    ))}
                  </select>
                </div>

                {/* Ciudad ocupa toda la fila */}
                <div style={{ flex: '1 1 100%' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Ciudad / Municipio</label>
                  <select value={ciudad} onChange={(e) => setCiudad(e.target.value)} disabled={!departamento} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.1)', backgroundColor: !departamento ? 'rgba(7, 12, 23, 0.2)' : 'rgba(7, 12, 23, 0.4)', color: 'var(--color-text-primary)', appearance: 'none', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15)', cursor: !departamento ? 'not-allowed' : 'pointer' }}>
                    <option value="" style={{ color: 'black' }}>Selecciona una ciudad</option>
                    {departamento && colombiaData.find((d: any) => d.departamento === departamento)?.ciudades.map((c: string) => (
                      <option key={c} value={c} style={{ color: 'black' }}>{c}</option>
                    ))}
                  </select>
                </div>
                
                <div style={{ flex: '1 1 100%', display: 'flex', flexDirection: 'column' }}>
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
                </div>
              </form>
            </div>
        </div>
      </main>

      
    </div>
  );
};
