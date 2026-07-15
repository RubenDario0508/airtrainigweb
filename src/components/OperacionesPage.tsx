import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

import { 
  RiFileAddLine, RiFolderOpenLine, RiSearchLine, RiBookOpenLine,
  RiStarLine, RiMap2Line, RiCalendarEventLine, RiTimeLine,
  RiCheckboxCircleLine, RiUserLine, RiShieldCheckLine, RiFileList3Line,
  RiInformationLine, RiExternalLinkLine
} from 'react-icons/ri';

const VUELOS_MOCK = [
  {
    hora: "06:00\n07:00",
    tipo: "VUELO",
    tipoIcon: "Avion trazo negro.png",
    alumno: "Jackson\nDaniel",
    alumnoAvatar: "/operaciones/iconos_user/EstuJackson.png",
    instructor: "Cap. Andrés\nSerrano",
    instructorAvatar: "/operaciones/iconos_user/CapSerrano.png",
    aeronave: "HK-5271-G\nPiper PA28",
    ruta: "GYM-Local-GYM\nPre-solo",
    estado: "Confirmado",
    estadoColor: "#00c853" // Green
  },
  {
    hora: "08:00\n09:00",
    tipo: "SIMULADOR",
    tipoIcon: "simulador.png",
    alumno: "Jackson\nDaniel",
    alumnoAvatar: "/operaciones/iconos_user/EstuJackson.png",
    instructor: "Cap. Yonatan\nVanegas",
    instructorAvatar: "/operaciones/iconos_user/CapYonatan.png",
    aeronave: "SIM - 01\nPiper AATD",
    ruta: "GYM-Local-GYM\nPre-solo",
    estado: "Pendiente",
    estadoColor: "#ff9800" // Orange
  },
  {
    hora: "10:00\n11:00",
    tipo: "SIMULADOR",
    tipoIcon: "simulador.png",
    alumno: "Jackson\nDaniel",
    alumnoAvatar: "/operaciones/iconos_user/EstuJackson.png",
    instructor: "Cap. Andrés\nSerrano",
    instructorAvatar: "/operaciones/iconos_user/CapSerrano.png",
    aeronave: "SIM - 01\nPiper AATD",
    ruta: "GYM-Local-GYM\nPre-solo",
    estado: "Cancelado",
    estadoColor: "#d32f2f" // Red
  }
];

export const OperacionesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todo');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const cambiarFecha = (dias: number) => {
    setSelectedDate(prev => {
      const nuevaFecha = new Date(prev);
      nuevaFecha.setDate(nuevaFecha.getDate() + dias);
      return nuevaFecha;
    });
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} de ${month}, ${year}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo('.anim-fade-up',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: 'var(--color-bg-primary)',
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      
      {/* 1. HERO SECTION WITH CARDS */}
      <section style={{
        position: 'relative',
        width: '100%',
        padding: '120px 5% 40px 5%',
        background: 'linear-gradient(to bottom, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.7) 100%), url("/operaciones/Imágenes/Imagen FOndo.jpg") center/cover no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <style>{`
          .operaciones-col {
            display: flex;
            flex-direction: column;
            padding: 0 1rem 2rem 1rem;
            margin-bottom: 2rem;
            color: #1e293b;
            border-bottom: 1px solid rgba(148, 163, 184, 0.4);
          }
          .operaciones-col:last-child {
            border-bottom: none;
            padding-bottom: 0;
            margin-bottom: 0;
          }
          @media (min-width: 768px) {
            .operaciones-col {
              padding: 0 1rem;
              margin-bottom: 0;
              border-bottom: none;
              border-right: 1px solid rgba(148, 163, 184, 0.4);
            }
            .operaciones-col:last-child {
              border-right: none;
            }
          }
        `}</style>
        {/* Title */}
        <div className="anim-fade-up" style={{ textAlign: 'center', color: 'white', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>
            Programación de Vuelo
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 500, margin: '10px 0 0 0', opacity: 0.9 }}>
            Accesos Rápidos para Planificación y Operaciones
          </p>
        </div>

        {/* 3 Columns Unified Glass Panel */}
        <div className="anim-fade-up" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          width: '100%',
          maxWidth: '1200px',
          zIndex: 2,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          borderRadius: '30px',
          padding: '2.5rem 1rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
        }}>
          
          {/* Column 1: PLAN DE VUELO */}
          <div className="operaciones-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1c1b2e', padding: '0.6rem 1.5rem', borderRadius: '50px', alignSelf: 'center', marginBottom: '1.5rem', color: 'white' }}>
              <img loading="lazy" src="/operaciones/Íconos/Plan de vuelo.png" alt="Plan de Vuelo" style={{ height: '24px', filter: 'brightness(0) invert(1)' }} />
              <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.5px' }}>PLAN DE VUELO</span>
            </div>
            <p style={{ textAlign: 'left', fontWeight: 500, marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.4 }}>
              Crea, presenta y gestiona tus planes de vuelo de forma fácil y rápida.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiFileAddLine size={24} color="#1e293b" /> Crear plan de vuelo</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiFolderOpenLine size={24} color="#1e293b" /> Mis planes de vuelo</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiSearchLine size={24} color="#1e293b" /> Buscar plan de vuelo</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiBookOpenLine size={24} color="#1e293b" /> Guía rápida</li>
            </ul>
            <a 
              href="https://e-fpl.aerocivil.gov.co/PVA/faces/principal.jspx;jsessionid=FBmuRsXVfEspAX8nMQ8NnYEOcH3724d_WU3-XLjB_FUOMuVVBZew!-279356981?_afrLoop=79739053709077002&_afrWindowMode=0&_afrWindowId=null&_adf.ctrl-state=xbextxyd2_1" 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', background: '#1c1b2e', color: 'white', textDecoration: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.95rem', transition: 'background 0.3s', margin: '0 auto', width: '90%' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d2b4a'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1c1b2e'}
            >
              IR A PLAN DE VUELO <RiExternalLinkLine size={20} />
            </a>
          </div>

          {/* Column 2: METAR */}
          <div className="operaciones-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1c1b2e', padding: '0.6rem 1.5rem', borderRadius: '50px', alignSelf: 'center', marginBottom: '1.5rem', color: 'white' }}>
              <img loading="lazy" src="/operaciones/Íconos/METAR icono.png" alt="METAR" style={{ height: '24px', filter: 'brightness(0) invert(1)' }} />
              <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.5px' }}>METAR</span>
            </div>
            <p style={{ textAlign: 'left', fontWeight: 500, marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.4 }}>
              Consulta la información meteorológica actualizada de los aeropuertos.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiSearchLine size={24} color="#1e293b" /> Buscar METAR</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiStarLine size={24} color="#1e293b" /> METAR favoritos</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiMap2Line size={24} color="#1e293b" /> Mapa meteorológico</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiBookOpenLine size={24} color="#1e293b" /> Guía METAR</li>
            </ul>
            <a 
              href="https://meteorologia.aerocivil.gov.co/wxwatch/table?list_id=1" 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', background: '#1c1b2e', color: 'white', textDecoration: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.95rem', transition: 'background 0.3s', margin: '0 auto', width: '90%' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d2b4a'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1c1b2e'}
            >
              IR A METAR <RiExternalLinkLine size={20} />
            </a>
          </div>

          {/* Column 3: PROGRAMACIÓN */}
          <div className="operaciones-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1c1b2e', padding: '0.6rem 1.5rem', borderRadius: '50px', alignSelf: 'center', marginBottom: '1.5rem', color: 'white' }}>
              <img loading="lazy" src="/operaciones/Íconos/plantilla-de-blog (2).png" alt="Programación" style={{ height: '24px', filter: 'brightness(0) invert(1)' }} />
              <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Programación</span>
            </div>
            <p style={{ textAlign: 'left', fontWeight: 500, marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.4 }}>
              Consulta y gestiona la programación de vuelos y actividades.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiCalendarEventLine size={24} color="#1e293b" /> Calendario de vuelos</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiTimeLine size={24} color="#1e293b" /> Mis reservas</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiCheckboxCircleLine size={24} color="#1e293b" /> Disponibilidad</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600, fontSize: '0.95rem' }}><RiUserLine size={24} color="#1e293b" /> Mis asignaciones</li>
            </ul>
            <button 
              onClick={() => {
                document.getElementById('tabla-programacion')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', background: '#1c1b2e', color: 'white', textDecoration: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.95rem', transition: 'background 0.3s', cursor: 'pointer', border: 'none', margin: '0 auto', width: '90%' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d2b4a'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1c1b2e'}
            >
              VER PROGRAMACIÓN <RiExternalLinkLine size={20} />
            </button>
          </div>

        </div>
      </section>

      {/* 2. TABLA DE PROGRAMACIÓN SECTION */}
      <section id="tabla-programacion" style={{ 
        padding: '4rem 5%', 
        flexGrow: 1, 
        background: 'linear-gradient(to bottom, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%), url("/operaciones/Imágenes/GALERIA1.jpg") center/cover no-repeat fixed',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <div className="anim-fade-up" style={{ width: '100%', maxWidth: '1200px' }}>
          
          {/* Filters Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', gap: '1.5rem' }}>
            
            {/* Left Toggles */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Todo', 'Vuelos', 'Simulador'].map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: '0.6rem 1.5rem',
                    borderRadius: '50px',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: '#ffffff',
                    color: '#1e293b',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    opacity: activeFilter === f ? 1 : 0.9
                  }}
                >
                  {f === 'Vuelos' && <img loading="lazy" src="/operaciones/Íconos/Avion trazo negro.png" style={{ height: '16px' }} alt=""/>}
                  {f === 'Simulador' && <img loading="lazy" src="/operaciones/Íconos/simulador.png" style={{ height: '16px' }} alt=""/>}
                  {f}
                </button>
              ))}
            </div>

            {/* Right Tools */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                onClick={() => setSelectedDate(new Date())}
                style={{ padding: '0.6rem 1.5rem', borderRadius: '50px', border: '1px solid #ffffff', background: 'transparent', color: '#ffffff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <RiCalendarEventLine /> HOY
              </button>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0.6rem 1.5rem', borderRadius: '50px', border: '1px solid #ffffff', background: 'transparent', color: '#ffffff', fontWeight: 600, gap: '15px' }}>
                <span 
                  style={{ cursor: 'pointer', opacity: 0.7, padding: '10px 15px', margin: '-10px -10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', userSelect: 'none' }} 
                  onClick={() => cambiarFecha(-1)}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                >&lt;</span>
                
                <label style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', minWidth: '150px', justifyContent: 'center' }}>
                  {formatDate(selectedDate)}
                  <input 
                    type="date" 
                    value={
                      `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
                    }
                    onChange={(e) => { 
                      if (e.target.value) {
                        const [year, month, day] = e.target.value.split('-').map(Number);
                        setSelectedDate(new Date(year, month - 1, day));
                      }
                    }}
                    style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', top: 0, left: 0 }}
                  />
                </label>

                <span 
                  style={{ cursor: 'pointer', opacity: 0.7, padding: '10px 15px', margin: '-10px -10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', userSelect: 'none' }} 
                  onClick={() => cambiarFecha(1)}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                >&gt;</span>
              </div>
              <div style={{ position: 'relative' }}>
                <RiSearchLine style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#1e293b' }} />
                <input 
                  type="text" 
                  placeholder="Buscar" 
                  style={{
                    padding: '0.6rem 1.5rem 0.6rem 2.5rem',
                    borderRadius: '50px',
                    border: 'none',
                    background: '#ffffff',
                    color: '#1e293b',
                    fontWeight: 500,
                    outline: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    width: '200px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #94a3b8' }}>
                  {['HORA', 'TIPO', 'ALUMNO', 'INSTRUCTOR/CAPITÁN', 'AERONAVE/SIMULADOR', 'RUTA/ACTIVIDAD', 'ESTADO'].map((h, i) => (
                    <th key={i} style={{ padding: '1.5rem 1rem', textAlign: 'center', fontWeight: 800, color: '#1e293b', fontSize: '0.9rem', letterSpacing: '0.5px', borderRight: i < 6 ? '1px solid #94a3b8' : 'none' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VUELOS_MOCK.map((v, i) => (
                  <tr key={i} style={{ borderBottom: i === VUELOS_MOCK.length - 1 ? 'none' : '1px solid #94a3b8', transition: 'background 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    {/* HORA */}
                    <td style={{ padding: '1.5rem 1rem', textAlign: 'center', fontWeight: 800, color: '#1e293b', whiteSpace: 'pre-line', lineHeight: 1.4, borderRight: '1px solid #94a3b8' }}>
                      {v.hora}
                    </td>
                    {/* TIPO */}
                    <td style={{ padding: '1.5rem 1rem', textAlign: 'center', borderRight: '1px solid #94a3b8' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                        <img loading="lazy" src={`/operaciones/Íconos/${v.tipoIcon}`} alt={v.tipo} style={{ height: '35px' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{v.tipo}</span>
                      </div>
                    </td>
                    {/* ALUMNO */}
                    <td style={{ padding: '1.5rem 1rem', borderRight: '1px solid #94a3b8' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                          {v.alumnoAvatar ? <img loading="lazy" src={v.alumnoAvatar} alt="Alumno Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <RiUserLine size={24} color="#64748b" />}
                        </div>
                        <span style={{ fontWeight: 700, color: '#1e293b', whiteSpace: 'pre-line', lineHeight: 1.3, textAlign: 'left' }}>{v.alumno}</span>
                      </div>
                    </td>
                    {/* INSTRUCTOR */}
                    <td style={{ padding: '1.5rem 1rem', borderRight: '1px solid #94a3b8' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                          {v.instructorAvatar ? <img loading="lazy" src={v.instructorAvatar} alt="Instructor Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <RiUserLine size={24} color="#64748b" />}
                        </div>
                        <span style={{ fontWeight: 700, color: '#1e293b', whiteSpace: 'pre-line', lineHeight: 1.3, textAlign: 'left' }}>{v.instructor}</span>
                      </div>
                    </td>
                    {/* AERONAVE */}
                    <td style={{ padding: '1.5rem 1rem', textAlign: 'center', color: '#1e293b', fontWeight: 700, whiteSpace: 'pre-line', lineHeight: 1.3, borderRight: '1px solid #94a3b8' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <img loading="lazy" src={`/operaciones/Íconos/${v.tipoIcon}`} alt="Icon" style={{ height: '24px', opacity: 0.7 }} />
                        <div style={{ textAlign: 'left' }}>{v.aeronave}</div>
                      </div>
                    </td>
                    {/* RUTA */}
                    <td style={{ padding: '1.5rem 1rem', textAlign: 'center', color: '#1e293b', fontWeight: 700, whiteSpace: 'pre-line', lineHeight: 1.3, borderRight: '1px solid #94a3b8' }}>
                      {v.ruta}
                    </td>
                    {/* ESTADO */}
                    <td style={{ padding: '1.5rem 1rem', textAlign: 'center' }}>
                      <span style={{ 
                        display: 'inline-block', 
                        padding: '0.5rem 1.2rem', 
                        background: v.estadoColor, 
                        color: 'white', 
                        borderRadius: '50px', 
                        fontWeight: 700,
                        fontSize: '0.85rem'
                      }}>
                        {v.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* INFO BANNER */}
        <div className="anim-fade-up" style={{
          width: '100%',
          maxWidth: '1200px',
          marginTop: '3rem',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem 3rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: '1 1 400px' }}>
            <div style={{ width: '60px', height: '60px', background: '#1c1b2e', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <RiInformationLine size={35} color="#ffffff" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>IMPORTANTE</h4>
              <p style={{ margin: 0, color: '#475569', fontWeight: 500, lineHeight: 1.4 }}>
                Revisa siempre la información meteorológica y presenta tu plan de vuelo antes de cada operación.
              </p>
            </div>
          </div>
          
          <div className="info-banner-right">
            <div className="info-banner-col">
              <RiShieldCheckLine size={32} color="#1e293b" style={{ opacity: 0.9 }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>Vuelos más seguros</span>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', fontWeight: 500, lineHeight: 1.3 }}>
                Toma decisiones informadas con base en datos confiables.
              </p>
            </div>
            <div className="info-banner-col info-banner-col-middle">
              <RiTimeLine size={32} color="#1e293b" style={{ opacity: 0.9 }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>Mejor planificación</span>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', fontWeight: 500, lineHeight: 1.3 }}>
                Anticipa condiciones y optimiza tu ruta.
              </p>
            </div>
            <div className="info-banner-col">
              <RiFileList3Line size={32} color="#1e293b" style={{ opacity: 0.9 }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>Información actualizada</span>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', fontWeight: 500, lineHeight: 1.3 }}>
                Accede a reportes recientes para cada fase del vuelo.
              </p>
            </div>
          </div>
        </div>

      </section>

      
      <style>{`
        /* Dynamic filter for icons based on theme */
        :root {
          --theme-icon-filter: none;
        }
        html[data-theme='dark'], .app-container.dark {
          --theme-icon-filter: brightness(0) invert(1);
        }
        
        .info-banner-right {
          display: flex;
          flex: 1 1 650px;
          justify-content: space-between;
          border-left: 1px solid #94a3b8;
          padding-left: 2rem;
          gap: 1rem;
        }
        .info-banner-col {
          flex: 1 1 0%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
          min-width: 140px;
        }
        .info-banner-col-middle {
          border-left: 1px solid #cbd5e1;
          border-right: 1px solid #cbd5e1;
          padding: 0 1.5rem;
        }
        @media (max-width: 900px) {
          .info-banner-right {
            border-left: none;
            padding-left: 0;
            flex-direction: column;
            gap: 2rem;
            width: 100%;
          }
          .info-banner-col-middle {
            border-left: none;
            border-right: none;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};
