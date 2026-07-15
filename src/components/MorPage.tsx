import React, { useEffect, useRef, useState } from 'react';



const FASES_VUELO = [
  'Arranque de motores','Rodaje','Despegue','Ascenso inicial','En ruta (crucero)',
  'Descenso','Aproximación','Aterrizaje','Parada de motores','Estacionamiento',
];

const MATRICULAS_OPTIONS = [
  { value: 'HK-5271-G', label: 'HK-5271-G', image: '/imgpag5/mor/HK-5271-G.png' },
  { value: 'HK-5272-G', label: 'HK-5272-G', image: '/imgpag5/mor/HK-5272-G.png' }
];

export const MorPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const now = new Date();

  const [f, setF] = useState({
    nombre: '', cargo: '', tel: '',
    repDate: now.toISOString().split('T')[0],
    matricula: '',
    fechaOcurrencia: '',
    horaLocal: '', amPm: 'a.m.',
    faseVuelo: '',
    condicionVuelo: '',
    condicionMet: '',
    siglaOaci: '', lugarAerodromo: '',
    puntoNotificacion: '', coordenadas: '',
    rutaRadioayuda: '', nivelVuelo: '',
    descripcion: '',
  });

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fechaRep = f.repDate;
    const body = `REPORTE MOR - USO INTERNO\nFECHA: ${fechaRep}\n\nFUNCIONARIO\nNombre: ${f.nombre}\nCargo: ${f.cargo}\nTel: ${f.tel}\n\nAERONAVE\nMatrícula: ${f.matricula}\n\nLOCALIZACIÓN\nFecha: ${f.fechaOcurrencia}\nHora: ${f.horaLocal} ${f.amPm}\nFase vuelo: ${f.faseVuelo}\nCondición vuelo: ${f.condicionVuelo}\nCondición MET: ${f.condicionMet}\n\nAERÓDROMO\nOACI: ${f.siglaOaci}\nLugar: ${f.lugarAerodromo}\n\nEN RUTA\nPunto: ${f.puntoNotificacion}\nCoordenadas: ${f.coordenadas}\nRuta: ${f.rutaRadioayuda}\nNivel: ${f.nivelVuelo}\n\nDESCRIPCIÓN\n${f.descripcion}`;
    window.location.href = `mailto:sms.airtraining@gmail.com?subject=REPORTE MOR&body=${encodeURIComponent(body)}`;
  };

  /* ═══ STYLES ═══ */
  const inp: React.CSSProperties = {
    width: '100%', padding: '0.8rem 1rem',
    border: 'none', borderRadius: '6px',
    backgroundColor: '#fff', color: '#000',
    fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  const lbl: React.CSSProperties = {
    display: 'block', color: '#fff',
    fontSize: '0.9rem', marginBottom: '8px', fontWeight: 500,
    fontFamily: 'inherit',
  };

  const sectionHeader: React.CSSProperties = {
    backgroundColor: '#9e1014', 
    color: '#fff',
    padding: '0.8rem 1.5rem', fontWeight: 800,
    fontSize: '0.85rem', textTransform: 'uppercase',
    letterSpacing: '0.5px', borderRadius: '6px 6px 0 0',
  };

  const sectionBody: React.CSSProperties = {
    backgroundColor: 'rgba(40, 42, 47, 0.85)',
    padding: '2rem 1.5rem',
    borderRadius: '0 0 6px 6px',
    border: '1px solid rgba(255,255,255,0.1)',
    borderTop: 'none',
  };

  return (
    <div ref={pageRef} style={{ minHeight: '100vh', position: 'relative' }}>
      
      {/* BACKGROUND IMAGE - SHARP AND COMPLETE (Scrolls with page) */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url("/imgpag5/correcionestatico1920x1080.webp")',
        backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat',
        zIndex: -2,
      }} />
      {/* DARK OVERLAY */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex: -1,
      }} />

      {/* HEADER SPACER */}
      <div style={{ height: '100px' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '2rem 3% 5rem' }}>

        {/* ═══ TITLE ═══ */}
        <div style={{ textAlign: 'center', padding: '1rem 1.5rem 2rem', marginBottom: '1rem' }}>
          <h1 style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', 
            margin: '0 0 0.5rem', lineHeight: 1.3, textTransform: 'uppercase', 
            textShadow: '0 4px 15px rgba(0,0,0,0.8)',
            wordBreak: 'keep-all',
            overflowWrap: 'normal',
            WebkitHyphens: 'none',
            hyphens: 'none'
          }}>
            <span style={{ display: 'inline-block', maxWidth: '100%' }}>Reporte Obligatorio de Eventos</span>
            <br />
            <span style={{ display: 'inline-block', maxWidth: '100%' }}>de Seguridad Operacional</span>
          </h1>
          {/* Red Separator Line */}
          <div style={{ width: '40%', maxWidth: '350px', height: '2px', background: '#d3121b', margin: '1rem auto' }} />
          <h2 style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 900, color: '#fff', 
            margin: 0, letterSpacing: '3px', textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            wordBreak: 'keep-all',
            overflowWrap: 'normal',
            WebkitHyphens: 'none',
            hyphens: 'none'
          }}>
            MOR - USO INTERNO
          </h2>

          <style>{`
            .sms-badges-container {
              display: flex;
              flex-direction: column;
              justify-content: center;
              background: #d3121b;
              border-radius: 20px 20px 0 0;
              margin-top: 1.5rem;
              box-shadow: 0 4px 15px rgba(0,0,0,0.3);
              width: 100%;
              max-width: 800px;
              margin-left: auto;
              margin-right: auto;
            }
            .sms-badge {
              color: #fff;
              padding: 0.8rem 1rem;
              font-size: clamp(0.7rem, 1.5vw, 0.8rem);
              font-weight: 700;
              letter-spacing: 1px;
              text-transform: uppercase;
              text-align: center;
              flex: 1;
            }
            .sms-badge-divider {
              border-bottom: 1px solid rgba(255,255,255,0.4);
            }
            @media (min-width: 768px) {
              .sms-badges-container {
                flex-direction: row;
                width: auto;
                display: inline-flex;
              }
              .sms-badge {
                padding: 0.6rem 2rem;
              }
              .sms-badge-divider {
                border-bottom: none;
                border-right: 1px solid rgba(255,255,255,0.4);
              }
            }
          `}</style>

          {/* Badges SMS */}
          <div className="sms-badges-container">
            <div className="sms-badge sms-badge-divider">
              NOTAM – NOTIFICATION TO AIRMEN
            </div>
            <div className="sms-badge">
              FAL – FLIGHT AUTHORISATION LIMITATION
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* ═══ S1: FUNCIONARIO ═══ */}
          <div style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.4)', borderRadius: '6px' }}>
            <div style={sectionHeader}>
              Información del Funcionario que Realiza el Reporte
            </div>
            <div style={sectionBody}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
                
                {/* Inputs left side */}
                <div style={{ flex: '1 1 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={lbl}>Nombre</label>
                    <input style={inp} type="text" name="nombre" placeholder="Nombre Completo" value={f.nombre} onChange={ch} required />
                  </div>
                  <div>
                    <label style={lbl}>Cargo</label>
                    <input style={inp} type="text" name="cargo" placeholder="Cargo" value={f.cargo} onChange={ch} required />
                  </div>
                  <div>
                    <label style={lbl}>Tel</label>
                    <input style={inp} type="tel" name="tel" placeholder="Teléfono" value={f.tel} onChange={ch} />
                  </div>
                </div>

                {/* Date right side */}
                <div style={{ 
                  borderRadius: '6px', padding: '1rem 1.5rem', 
                  border: '1px solid rgba(255,255,255,0.2)', flex: '0 0 auto', display: 'flex', flexDirection: 'column', minWidth: '180px'
                }}>
                  <label style={lbl}>Fecha del Reporte</label>
                  <input style={{...inp, padding: '0.6rem 1rem'}} type="date" name="repDate" value={f.repDate} onChange={ch} required />
                </div>

              </div>
            </div>
          </div>

          {/* ═══ S2: AERONAVE ═══ */}
          <div style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.4)', borderRadius: '4px' }}>
            <div style={sectionHeader}>
              Aeronave(S) Involucrada(S) en el Evento que motiva el reporte
            </div>
            <div style={{ ...sectionBody, padding: '1rem 1.5rem 1.5rem' }}>
              <div style={{ textAlign: 'center', color: '#fff', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '1rem' }}>
                MATRÍCULA(S)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ flex: '1 1 300px', maxWidth: '300px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <label style={{ ...lbl, marginBottom: 0, color: '#fff', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>AERONAVE</label>
                  <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
                    {/* Custom Dropdown Trigger Button */}
                    <div 
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                      style={{ 
                        ...inp, 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        paddingRight: '1rem',
                        backgroundColor: '#fff',
                        color: '#000',
                        fontWeight: 600,
                        userSelect: 'none'
                      }}
                    >
                      <span>{f.matricula || 'Seleccione una aeronave'}</span>
                      <span style={{ fontSize: '0.8rem', transform: isSelectOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        ▼
                      </span>
                    </div>

                    {/* Custom Dropdown Menu List */}
                    {isSelectOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '6px',
                        backgroundColor: '#1e2124',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '6px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                        zIndex: 100,
                        overflow: 'hidden'
                      }}>
                        <div 
                          onClick={() => {
                            setF(p => ({ ...p, matricula: '' }));
                            setIsSelectOpen(false);
                          }}
                          style={{
                            padding: '10px 15px',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          Seleccione una aeronave
                        </div>
                        {MATRICULAS_OPTIONS.map((opt) => (
                          <div 
                            key={opt.value}
                            onClick={() => {
                              setF(p => ({ ...p, matricula: opt.value }));
                              setIsSelectOpen(false);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 15px',
                              color: '#fff',
                              fontWeight: 700,
                              cursor: 'pointer',
                              backgroundColor: f.matricula === opt.value ? 'rgba(255,255,255,0.1)' : 'transparent',
                              transition: 'background-color 0.2s',
                              borderTop: '1px solid rgba(255,255,255,0.05)'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                            onMouseLeave={e => {
                              if (f.matricula !== opt.value) e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <span>{opt.label}</span>
                            <img loading="lazy" 
                              src={opt.image} 
                              alt={opt.label} 
                              style={{ width: '60px', height: '34px', objectFit: 'contain', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }} 
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {f.matricula && (
                  <div style={{
                    flex: '0 1 320px',
                    width: '100%',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '8px',
                    transition: 'all 0.3s ease-in-out'
                  }}>
                    <img loading="lazy" 
                      src={`/imgpag5/mor/${f.matricula}.png`} 
                      alt={`Aeronave ${f.matricula}`} 
                      style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px', objectFit: 'contain' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ═══ S3: LOCALIZACIÓN ═══ */}
          <div style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.4)', borderRadius: '4px' }}>
            <div style={sectionHeader}>
              Localización, Fecha, Hora y Detalles
            </div>
            <div style={sectionBody}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={lbl}>Fecha de la ocurrencia</label>
                  <input style={inp} type="date" name="fechaOcurrencia" value={f.fechaOcurrencia} onChange={ch} />
                </div>
                <div>
                  <label style={lbl}>Hora local (HH:MM)</label>
                  <input style={inp} type="time" name="horaLocal" value={f.horaLocal} onChange={ch} />
                </div>
                <div>
                  <label style={lbl}>Formato (a.m./p.m.)</label>
                  <select name="amPm" value={f.amPm} onChange={ch} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
                    <option value="a.m.">a.m.</option>
                    <option value="p.m.">p.m.</option>
                  </select>
                </div>
                <div>
                  <label style={lbl}>Fase de vuelo</label>
                  <select name="faseVuelo" value={f.faseVuelo} onChange={ch} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
                    <option value="">Seleccione...</option>
                    {FASES_VUELO.map(x => <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={lbl}>Condición de vuelo</label>
                  <input style={inp} type="text" name="condicionVuelo" placeholder="VMC / IMC / Mixtas" value={f.condicionVuelo} onChange={ch} />
                </div>
                <div>
                  <label style={lbl}>Condición MET</label>
                  <input style={inp} type="text" name="condicionMet" placeholder="Condición Meteorológica" value={f.condicionMet} onChange={ch} />
                </div>
              </div>
            </div>
          </div>

          {/* ═══ S4: AERÓDROMO ═══ */}
          <div style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.4)', borderRadius: '4px' }}>
            <div style={sectionHeader}>
              Si fue en Aeródromo (Obligatorio)
            </div>
            <div style={sectionBody}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={lbl}>Sigla OACI</label>
                  <input style={inp} type="text" name="siglaOaci" placeholder="Ej: SKBO" value={f.siglaOaci} onChange={ch} />
                </div>
                <div>
                  <label style={lbl}>Lugar del aeródromo</label>
                  <input style={inp} type="text" name="lugarAerodromo" placeholder="Ej: Pista 13L" value={f.lugarAerodromo} onChange={ch} />
                </div>
              </div>
            </div>
          </div>

          {/* ═══ S5: EN RUTA ═══ */}
          <div style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.4)', borderRadius: '4px' }}>
            <div style={sectionHeader}>
              Si fue en Ruta (Obligatorio)
            </div>
            <div style={sectionBody}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={lbl}>Punto de notificación</label>
                  <input style={inp} type="text" name="puntoNotificacion" placeholder="Ej: AMBAL" value={f.puntoNotificacion} onChange={ch} />
                </div>
                <div>
                  <label style={lbl}>Coordenadas</label>
                  <input style={inp} type="text" name="coordenadas" placeholder="Coordenadas exactas" value={f.coordenadas} onChange={ch} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={lbl}>Ruta(s) o Radioayuda</label>
                  <input style={inp} type="text" name="rutaRadioayuda" placeholder="Ej: W33 / VOR BOG" value={f.rutaRadioayuda} onChange={ch} />
                </div>
                <div>
                  <label style={lbl}>Nivel de Vuelo o altitud</label>
                  <input style={inp} type="text" name="nivelVuelo" placeholder="Ej: FL240" value={f.nivelVuelo} onChange={ch} />
                </div>
              </div>
            </div>
          </div>

          {/* ═══ S6: DESCRIPCIÓN ═══ */}
          <div style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.4)', borderRadius: '4px' }}>
            <div style={sectionHeader}>
              Descripción del Evento (Narrativa)
            </div>
            <div style={sectionBody}>
              <textarea
                name="descripcion"
                placeholder="Describa de manera detallada el evento..."
                value={f.descripcion}
                onChange={ch}
                style={{ ...inp, minHeight: '150px', resize: 'vertical', lineHeight: 1.6 }}
              />
            </div>
          </div>

          {/* ═══ SUBMIT ═══ */}
          <button type="submit" style={{
            width: '100%', backgroundColor: '#d3121b',
            color: '#fff', border: 'none', padding: '1.2rem',
            fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
            textTransform: 'uppercase', letterSpacing: '2px',
            borderRadius: '4px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            transition: 'background-color 0.3s',
            marginTop: '1rem',
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a30b12'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d3121b'}
          >
            Enviar Reporte MOR
          </button>
          
          <p style={{ display: 'block', textAlign: 'center', width: '100%', color: '#ccc', fontSize: '0.8rem', marginTop: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            El reporte será enviado a: <span style={{ color: '#fff', fontWeight: 800 }}>sms.airtraining@gmail.com</span>
          </p>
        </form>
      </div>
      
    </div>
  );
};

