import React, { useEffect, useState } from 'react';

import { 
  RiBriefcase4Line, RiMegaphoneLine, RiProfileLine, RiTeamLine, 
  RiMailSendLine, RiErrorWarningLine, RiUploadCloud2Line, 
  RiMapPinLine, RiMailLine 
} from 'react-icons/ri';

const SectionTitle = ({ title, desc }: { title: string, desc: string }) => (
  <div style={{ marginBottom: '1rem', borderLeft: '4px solid #d3121b', paddingLeft: '1rem' }}>
    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 0.3rem' }}>{title}</h2>
    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>{desc}</p>
  </div>
);

const CarouselArrow = ({ direction }: { direction: 'left' | 'right' }) => (
  <div style={{
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    [direction]: '10px', width: '45px', height: '45px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', zIndex: 10,
    background: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    borderRadius: '50%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transition: 'all 0.3s ease'
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {direction === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  </div>
);

const PRACTICAS_LABORALES = [
  {
    id: 1,
    bg: '/imgpag7/FONDO3.webp',
    filter: 'brightness(0.6)',
    logo: '/imgpag7/LOGO MARCA PASOS.png',
    name: 'Marcapasos Ground Handling',
    logoWidth: '250px',
    isWhiteLogo: true,
    isDynamicLogo: false,
    bgSize: 'cover',
    bgRepeat: 'no-repeat',
    bgColor: 'transparent'
  },
  {
    id: 'dulima',
    bg: '/imgpag7/Dulima_VIP_Lounge.webp',
    filter: 'brightness(0.6)',
    logo: '/imgpag7/Recurso19.png',
    name: 'Dulima',
    logoWidth: '220px',
    isWhiteLogo: true,
    isDynamicLogo: false,
    bgSize: 'cover',
    bgRepeat: 'no-repeat',
    bgColor: 'transparent'
  },
  {
    id: 3,
    bg: '/imgpag7/FONDO1.webp',
    filter: 'brightness(0.5)',
    logo: '/imgpag7/logo sky airlines.png',
    name: 'Aeroregional Sky Airlines',
    logoWidth: '280px',
    isWhiteLogo: false,
    isDynamicLogo: false,
    bgSize: 'cover',
    bgRepeat: 'no-repeat',
    bgColor: 'transparent'
  }
];

const DetallePractica = ({ practica, onBack }: { practica: any, onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="anim-fade-up" style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh', paddingTop: '75px', color: 'var(--color-text-primary)' }}>
      {/* HERO */}
      <div style={{
        position: 'relative', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        backgroundImage: `url("${practica.bg}")`, 
        backgroundSize: practica.bgSize || 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: practica.bgRepeat || 'no-repeat',
        backgroundColor: practica.bgColor || 'transparent'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', filter: practica.filter }} />
        <button 
          onClick={onBack} 
          style={{ position: 'absolute', top: '30px', left: '5%', zIndex: 10, background: 'rgba(255,255,255,0.2)', border: '1px solid #fff', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(5px)' }}
        >
          &larr; Volver
        </button>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <img loading="lazy" 
            src={practica.logo} 
            alt={practica.name} 
            className={practica.isDynamicLogo ? 'logo-dia-noche' : ''} 
            style={{ 
              width: practica.logoWidth, 
              maxWidth: '80%', 
              height: 'auto', 
              marginBottom: '2rem', 
              filter: practica.isWhiteLogo 
                ? 'brightness(0) invert(1) drop-shadow(0 4px 6px rgba(0,0,0,0.5))' 
                : 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' 
            }} 
          />
          <div>
            <span style={{ backgroundColor: '#d3121b', color: '#fff', padding: '0.6rem 2rem', borderRadius: '50px', fontWeight: 700, fontSize: '0.95rem' }}>Prácticas Laborales</span>
          </div>
        </div>
      </div>
      
      {/* CONTENT */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
        
        {/* Objetivo */}
        <div style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-bg-tertiary)', borderRadius: '15px', padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div style={{ backgroundColor: 'var(--color-bg-tertiary)', width: '70px', height: '70px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
             <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="9" y1="15" x2="15" y2="15"></line>
                <line x1="9" y1="11" x2="11" y2="11"></line>
             </svg>
          </div>
          <div>
             <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--color-text-primary)' }}>Objetivo del Procedimiento</h3>
             <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
               Establecer el procedimiento para la gestión y divulgación de convocatorias o prácticas dirigidas a estudiantes y egresados, garantizando la adecuada articulación entre la institución y las empresas aliadas.
             </p>
          </div>
        </div>

        {/* Flujo */}
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, textAlign: 'center', color: 'var(--color-text-primary)', marginBottom: '3rem' }}>Flujo del Proceso</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
          {/* Timeline line */}
          <div style={{ position: 'absolute', left: '35px', top: '20px', bottom: '20px', width: '2px', backgroundColor: 'var(--color-bg-tertiary)', zIndex: 0 }} />
          
          {/* Steps */}
          {[
            { step: '01', title: 'Solicitud de la Empresa', desc: 'La empresa o la farmacia se vincula para sus funciones a través de "Solicitud formal de la autoridad de área de su necesidad, indica sus Cargo, Cantidad de vacantes, Requisitos, Ciudad, Fecha límite y Condiciones".', icon: <RiBriefcase4Line size={30} /> },
            { step: '02', title: 'Publicación de la Convocatoria', desc: 'Divulgación a través de canales institucionales, aspirantes deben enviar su hoja de vida al correo de recursos humanos dentro del plazo establecido.', icon: <RiMegaphoneLine size={30} /> },
            { step: '03', title: 'Publicación de la Convocatoria', desc: 'Postular de manera activa y proactiva las hojas de vida recibidas que cumplan con el perfil y los requisitos solicitados por la empresa aliada.', icon: <RiProfileLine size={30} /> },
            { step: '04', title: 'Proceso de Selección', desc: 'La empresa es responsable de la ejecución del proceso de selección, incluyendo entrevistas, pruebas técnicas y evaluaciones psicotécnicas.', alert: 'Nota de Independencia: La Institución educativa no interviene en la decisión final de contratación.', icon: <RiTeamLine size={30} /> },
            { step: '05', title: 'Comunicación de Resultados', desc: 'La empresa informa directamente a los candidatos seleccionados sobre su vinculación y los siguientes pasos para la formalización de la práctica.', icon: <RiMailSendLine size={30} /> }
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '70px', height: '70px', backgroundColor: 'var(--color-bg-secondary)', border: '2px solid var(--color-bg-tertiary)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--color-text-primary)' }}>
                {s.icon}
              </div>
              <div>
                <span style={{ display: 'inline-block', backgroundColor: 'var(--color-bg-tertiary)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.8rem' }}>Paso {s.step}</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 0.5rem' }}>{s.title}</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '0 0 1rem' }}>{s.desc}</p>
                {s.alert && (
                  <div style={{ backgroundColor: 'var(--color-bg-tertiary)', borderLeft: '4px solid #d3121b', padding: '0.8rem 1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                    {s.alert}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Consideraciones */}
        <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderRadius: '15px', padding: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '5rem' }}>
          <RiErrorWarningLine size={70} color="var(--color-accent-red)" style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 1rem' }}>Consideraciones Importantes</h3>
            <ul style={{ margin: 0, padding: 0, paddingLeft: '1.2rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <li style={{ marginBottom: '0.5rem' }}>El envío de la hoja de vida no garantiza la selección final ni su contratación.</li>
              <li style={{ marginBottom: '0.5rem' }}>La institución actúa exclusivamente como un canal difusor y puente entre el estudiante/egresado y la empresa.</li>
              <li style={{ marginBottom: '0.5rem' }}>El proceso de selección, evaluación y contratación es potestad exclusiva de la empresa aliada.</li>
              <li>Toda la información proporcionada por el aspirante en su hoja de vida debe ser veraz y comprobable.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* FOOTER FORM */}
      <div style={{ backgroundColor: '#1e1b4b', padding: '5rem 2rem', color: '#fff', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1000px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between' }}>
          
          {/* Left info */}
          <div style={{ flex: '1 1 350px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 1rem' }}>¡Postúlate aquí!</h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.5, opacity: 0.8, marginBottom: '3rem' }}>
              Mantendremos un acuse de datos activo para futuras aperturas y proyectos especiales.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <RiMailLine size={24} color="#d3121b" />
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>factoreshumanos@airtrainingacademia.com</span>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <RiMapPinLine size={24} color="#d3121b" style={{ flexShrink: 0, marginTop: '5px' }} />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Sede Principal</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Cra. 6#01a-47, Barrio los Cedros</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div style={{ flex: '1 1 400px', backgroundColor: '#ffffff', borderRadius: '15px', padding: '2.5rem', color: '#0f172a' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, textAlign: 'center', margin: '0 0 2rem' }}>Adjunta tu C.V.</h3>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 150px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>NOMBRE COMPLETO</label>
                <input type="text" style={{ width: '100%', border: 'none', borderBottom: '1px solid #cbd5e1', padding: '0.5rem 0', outline: 'none', fontSize: '0.9rem' }} />
              </div>
              <div style={{ flex: '1 1 150px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>CORREO ELECTRÓNICO</label>
                <input type="email" style={{ width: '100%', border: 'none', borderBottom: '1px solid #cbd5e1', padding: '0.5rem 0', outline: 'none', fontSize: '0.9rem' }} />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b' }}>CARGAR C.V. (PDF)</label>
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#94a3b8'} onMouseLeave={e => e.currentTarget.style.borderColor = '#cbd5e1'}>
                <RiUploadCloud2Line size={40} color="#94a3b8" style={{ marginBottom: '1rem' }} />
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Cargar archivo desde el equipo</span>
              </div>
            </div>

            <button style={{ width: '100%', backgroundColor: '#d3121b', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '1rem', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', transition: 'background 0.3s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b00e16'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d3121b'}>
              Enviar Postulación
            </button>
          </div>

        </div>
      </div>
      
      
    </div>
  )
};

export const PracticasLaboralesPage: React.FC = () => {
  const [currentPracticaSlide, setCurrentPracticaSlide] = useState(0);
  const [selectedPractica, setSelectedPractica] = useState<any>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedPractica) return; // Pausar carrusel si hay una vista de detalle
    const interval = setInterval(() => {
      setCurrentPracticaSlide(prev => (prev + 1) % PRACTICAS_LABORALES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedPractica]);

  if (selectedPractica) {
    return <DetallePractica practica={selectedPractica} onBack={() => setSelectedPractica(null)} />;
  }

  return (
    <div className="anim-fade-up" style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', paddingTop: '75px' }}>
      
      {/* HERO SECTION */}
      <div style={{
        position: 'relative', width: '100%', height: '100vh', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundImage: 'url("/imgpag7/FONDO1.webp")', backgroundSize: 'cover', backgroundPosition: 'center top'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '2rem', maxWidth: '800px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, margin: '0 0 1rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Alianzas Estratégicas
          </h1>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
            Forjamos vínculos para garantizar a nuestros estudiantes la mejor experiencia de aprendizaje, conectándolos directamente con el ecosistema aeronáutico real desde el primer momento.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <button 
              onClick={() => {
                const el = document.getElementById('practicas-laborales-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(211, 18, 27, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              style={{ backgroundColor: '#d3121b', color: '#fff', padding: '0.8rem 2rem', borderRadius: '30px', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
            >
              Prácticas Laborales
            </button>
            <button 
              onClick={() => {
                window.location.hash = '#alianzas-educativas';
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
              }}
              style={{ backgroundColor: 'transparent', color: '#fff', padding: '0.8rem 2rem', borderRadius: '30px', fontWeight: 700, border: '1px solid #fff', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
            >
              Alianzas Educativas
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        
        {/* PRACTICAS LABORALES - CAROUSEL */}
        <div id="practicas-laborales-section" style={{ marginBottom: '4rem' }}>
          <SectionTitle title="Prácticas Laborales" desc="Nuestros estudiantes acceden a escenarios reales gracias a nuestros convenios." />
          <div style={{ position: 'relative', width: '100%', height: '350px', overflow: 'hidden', borderRadius: '4px', marginTop: '1.5rem' }}>
            
            <div style={{
              display: 'flex',
              width: `${PRACTICAS_LABORALES.length * 100}%`,
              height: '100%',
              transform: `translateX(-${(currentPracticaSlide * 100) / PRACTICAS_LABORALES.length}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}>
              {PRACTICAS_LABORALES.map((item) => (
                <div key={item.id} style={{ position: 'relative', width: `${100 / PRACTICAS_LABORALES.length}%`, height: '100%' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${item.bg}")`, backgroundSize: 'cover', backgroundPosition: 'center', filter: item.filter }} />
                  <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img loading="lazy" 
                      src={item.logo} 
                      alt={item.name} 
                      className={item.isDynamicLogo ? 'logo-dia-noche' : ''} 
                      style={{ 
                        width: item.logoWidth, 
                        maxWidth: '80%', 
                        height: 'auto', 
                        marginBottom: '1.5rem', 
                        filter: item.isWhiteLogo 
                          ? 'brightness(0) invert(1) drop-shadow(0 4px 6px rgba(0,0,0,0.5))' 
                          : 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' 
                      }} 
                    />
                    <button 
                      onClick={() => setSelectedPractica(item)}
                      style={{ backgroundColor: '#d3121b', color: '#fff', padding: '0.6rem 1.5rem', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s ease' }}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div onClick={() => setCurrentPracticaSlide(prev => prev === 0 ? PRACTICAS_LABORALES.length - 1 : prev - 1)}>
              <CarouselArrow direction="left" />
            </div>
            <div onClick={() => setCurrentPracticaSlide(prev => (prev + 1) % PRACTICAS_LABORALES.length)}>
              <CarouselArrow direction="right" />
            </div>

          </div>
        </div>

        {/* ALIANZAS EDUCATIVAS - SKY CLUB */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ position: 'relative', width: '100%', height: '350px', overflow: 'hidden', borderRadius: '4px', marginTop: '1.5rem' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/imgpag7/FONDO 4.webp")', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.7)' }} />
            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderRadius: '50%', padding: '10px', marginBottom: '1.5rem', boxShadow: '0 4px 15px var(--glass-shadow)' }}>
                <img loading="lazy" src="/imgpag7/logo-sky-hd-01-01.webp" alt="Aviation Sky Club" style={{ width: '180px', height: '180px', objectFit: 'contain' }} />
              </div>
              <button 
                onClick={() => window.open('https://skyaviationclub.com/', '_blank')}
                style={{ backgroundColor: '#d3121b', color: '#fff', padding: '0.6rem 1.5rem', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }} 
              >
                Ver Detalles
              </button>
            </div>
          </div>
        </div>

        {/* BENEFICIOS EXCLUSIVOS */}
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>Beneficios Exclusivos</h2>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            El ecosistema de Air Training está diseñado para impulsar tu carrera desde el primer día de clases.
          </p>
        </div>

      </div>

      {/* CTA FOOTER */}
      <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-bg-tertiary)', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'var(--color-blue-gradient)', borderRadius: '12px', padding: '3rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', boxShadow: '0 8px 32px var(--glass-shadow)' }}>
          <div style={{ flex: '1 1 min(100%, 400px)', color: '#fff' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 1rem' }}>¿Deseas ser un Aliado Estratégico?</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, opacity: 0.9 }}>
              Únete a la red que está formando a los líderes de la aviación del mañana. Buscamos empresas comprometidas con la excelencia y la innovación en el sector aeronáutico.
            </p>
          </div>
          <div>
            <button style={{ backgroundColor: '#d3121b', color: '#fff', padding: '1rem 2rem', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Contactar Relaciones Corporativas
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};
