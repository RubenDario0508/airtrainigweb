import React, { useState, useRef } from 'react';
import { 
  RiArrowRightSLine, 
  RiCheckLine,
  RiLoader4Line,
  RiInformationLine,
  RiMailLine
} from 'react-icons/ri';
import { wpService } from '../services/wordpressMock';
import './BlogPage.css'; // Reuse CSS styling for the form and general styles

interface PqrsPageProps {
  theme: 'light' | 'dark';
}

export const PqrsPage: React.FC<PqrsPageProps> = () => {
  // Form states
  const [pqrType, setPqrType] = useState<string>('');
  const [pqrName, setPqrName] = useState<string>('');
  const [pqrIdType, setPqrIdType] = useState<string>('');
  const [pqrIdNum, setPqrIdNum] = useState<string>('');
  const [pqrEmail, setPqrEmail] = useState<string>('');
  const [pqrPhone, setPqrPhone] = useState<string>('');
  const [pqrSubject, setPqrSubject] = useState<string>('');
  const [pqrMessage, setPqrMessage] = useState<string>('');
  
  const [pqrSubmitting, setPqrSubmitting] = useState<boolean>(false);
  const [pqrSubmitSuccess, setPqrSubmitSuccess] = useState<string | null>(null);
  const [pqrError, setPqrError] = useState<string | null>(null);

  const formSectionRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form submission
  const handleSubmitPQR = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pqrType || !pqrName || !pqrEmail || !pqrSubject || !pqrMessage || !pqrIdType || !pqrIdNum) {
      setPqrError('Por favor, completa todos los campos obligatorios del formulario.');
      return;
    }

    try {
      setPqrSubmitting(true);
      setPqrError(null);
      
      const formData = new FormData();
      formData.append('type', pqrType);
      formData.append('name', pqrName);
      formData.append('idType', pqrIdType);
      formData.append('idNum', pqrIdNum);
      formData.append('email', pqrEmail);
      formData.append('phone', pqrPhone);
      formData.append('subject', pqrSubject);
      formData.append('message', pqrMessage);

      const result = await wpService.submitPQRS(formData);
      if (result.success) {
        setPqrSubmitSuccess(result.message);
        // Reset form
        setPqrType('');
        setPqrName('');
        setPqrIdType('');
        setPqrIdNum('');
        setPqrEmail('');
        setPqrPhone('');
        setPqrSubject('');
        setPqrMessage('');
      } else {
        setPqrError(result.message);
      }
    } catch (err) {
      setPqrError('Hubo un problema al enviar tu PQRS. Intenta nuevamente.');
      console.error(err);
    } finally {
      setPqrSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
      {/* 1. Hero Section */}
      <section 
        className="blog-header works-hero"
        style={{ 
          backgroundImage: `url('/imgpag8/trabajaconnosotros/Fondo Trabaja con Nosotros.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="blog-header-content">
          <h1 style={{ textTransform: 'none' }}>PQRS</h1>
          <p style={{ textTransform: 'none', color: '#ffffff', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.6', letterSpacing: '0' }}>
            Peticiones, Quejas, Reclamos y Sugerencias. En Air Training valoramos tu opinión y estamos comprometidos con la mejora continua.
          </p>
          <button 
            onClick={scrollToForm}
            style={{
              marginTop: '2rem',
              padding: '0.8rem 2rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              borderRadius: '50px',
              border: 'none',
              background: 'var(--color-accent-red)',
              color: '#ffffff',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(231, 26, 36, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-red-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-red)'}
          >
            Radicar PQRS Nueva
          </button>
        </div>
      </section>

      {/* 2. Informative Section */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ borderLeft: '4px solid var(--color-accent-red)', paddingLeft: '1rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Canal de Atención y Calidad</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: '0.5rem 0 0 0', fontSize: '1rem' }}>
            Conoce los tiempos oficiales de respuesta y los conceptos legales de cada solicitud.
          </p>
        </div>

        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {/* Petición */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-accent-blue)' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Petición</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>
              Solicitud de información o consultas sobre nuestros programas, procesos académicos o institucionales.
            </p>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-blue)' }}>Respuesta: Máx 15 días hábiles</span>
          </div>

          {/* Queja */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-accent-red)' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Queja</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>
              Manifestación de inconformidad por la atención prestada por parte de nuestro personal académico o administrativo.
            </p>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-red)' }}>Respuesta: Máx 15 días hábiles</span>
          </div>

          {/* Reclamo */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-accent-red)' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Reclamo</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>
              Expresión de disconformidad relacionada directamente con la calidad de la instrucción o los servicios aeronáuticos prestados.
            </p>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-red)' }}>Respuesta: Máx 15 días hábiles</span>
          </div>

          {/* Sugerencia */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#2ecc71' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Sugerencia</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>
              Propuesta o idea formulada para mejorar los procesos formativos, de simulación o de infraestructura de la academia.
            </p>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2ecc71' }}>Respuesta: Máx 15 días hábiles</span>
          </div>
        </div>
      </section>

      {/* 3. Form Section */}
      <section 
        ref={formSectionRef}
        className="trabaja-section"
        style={{ backgroundImage: `url('/imgpag8/trabajaconnosotros/Fondo Trabaja con Nosotros.webp')` }}
      >
        <div className="trabaja-container">
          {/* Left Column info */}
          <div className="trabaja-info">
            <h2>Garantía de Mejora Continua</h2>
            <p>
              Tus aportes nos ayudan a optimizar el entorno de aprendizaje, nuestros simuladores de vuelo y la atención en nuestras sedes. Por favor, suministra información veraz para poder realizar una investigación formal y darte una respuesta oportuna.
            </p>

            <div className="trabaja-contact-list">
              <div className="trabaja-contact-item">
                <div className="trabaja-contact-icon">
                  <RiInformationLine size={24} style={{ color: '#fff' }} />
                </div>
                <div className="trabaja-contact-text">
                  <h4>Normativa de Calidad</h4>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: 400, lineHeight: 1.5 }}>
                    Todas las solicitudes son revisadas por el área de Calidad bajo el marco regulatorio del Ministerio de Educación y la Aeronáutica Civil de Colombia.
                  </p>
                </div>
              </div>

              <div className="trabaja-contact-item">
                <div className="trabaja-contact-icon">
                  <RiMailLine size={24} style={{ color: '#fff' }} />
                </div>
                <div className="trabaja-contact-text">
                  <h4>Canal Alternativo</h4>
                  <a href="mailto:calidad@airtraining.com.co" style={{ color: '#ffffff', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent-red)'} onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}>
                    calidad@airtraining.com.co
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column PQR Form */}
          <div className="cv-card">
            <h3>Formulario de PQRS</h3>
            
            {pqrSubmitSuccess ? (
              <div className="cv-success-message">
                <RiCheckLine size={32} style={{ display: 'block', margin: '0 auto 10px', color: '#27ae60' }} />
                <p>{pqrSubmitSuccess}</p>
                <button 
                  onClick={() => setPqrSubmitSuccess(null)}
                  style={{
                    marginTop: '1rem',
                    background: 'var(--color-accent-red)',
                    border: 'none',
                    color: '#ffffff',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(231, 26, 36, 0.3)'
                  }}
                >
                  Radicar otra PQRS
                </button>
              </div>
            ) : (
              <form className="cv-form" onSubmit={handleSubmitPQR}>
                {pqrError && (
                  <div style={{ color: 'var(--color-accent-red)', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', backgroundColor: 'rgba(231,26,36,0.08)', padding: '0.6rem', borderRadius: '6px' }}>
                    {pqrError}
                  </div>
                )}

                <div className="cv-form-group">
                  <label className="cv-label">Tipo de Solicitud *</label>
                  <select 
                    required
                    value={pqrType}
                    onChange={(e) => setPqrType(e.target.value)}
                    className="cv-select"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Petición">Petición (Consulta o Información)</option>
                    <option value="Queja">Queja (Inconformidad con personal/servicio)</option>
                    <option value="Reclamo">Reclamo (Deficiencia en la calidad)</option>
                    <option value="Sugerencia">Sugerencia (Propuesta de mejora)</option>
                    <option value="Felicitación">Felicitación</option>
                  </select>
                </div>

                <div className="cv-form-group">
                  <label className="cv-label">Nombre Completo *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. Juan Pérez"
                    value={pqrName}
                    onChange={(e) => setPqrName(e.target.value)}
                    className="cv-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="cv-form-group">
                    <label className="cv-label">Tipo Documento *</label>
                    <select 
                      required
                      value={pqrIdType}
                      onChange={(e) => setPqrIdType(e.target.value)}
                      className="cv-select"
                    >
                      <option value="">Selecciona</option>
                      <option value="CC">C.C.</option>
                      <option value="TI">T.I.</option>
                      <option value="CE">C.E.</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>

                  <div className="cv-form-group">
                    <label className="cv-label">Número Documento *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. 1024345..."
                      value={pqrIdNum}
                      onChange={(e) => setPqrIdNum(e.target.value)}
                      className="cv-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="cv-form-group">
                    <label className="cv-label">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Ej. juan@email.com"
                      value={pqrEmail}
                      onChange={(e) => setPqrEmail(e.target.value)}
                      className="cv-input"
                    />
                  </div>

                  <div className="cv-form-group">
                    <label className="cv-label">Teléfono / Celular</label>
                    <input 
                      type="tel" 
                      placeholder="Ej. 300 123 4567"
                      value={pqrPhone}
                      onChange={(e) => setPqrPhone(e.target.value)}
                      className="cv-input"
                    />
                  </div>
                </div>

                <div className="cv-form-group">
                  <label className="cv-label">Asunto *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. Dificultad de ingreso a la plataforma..."
                    value={pqrSubject}
                    onChange={(e) => setPqrSubject(e.target.value)}
                    className="cv-input"
                  />
                </div>

                <div className="cv-form-group">
                  <label className="cv-label">Descripción del Caso *</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe en detalle los hechos, fechas y nombres involucrados..."
                    value={pqrMessage}
                    onChange={(e) => setPqrMessage(e.target.value)}
                    className="cv-input"
                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={pqrSubmitting}
                  className="btn-submit-cv"
                >
                  {pqrSubmitting ? (
                    <>
                      <RiLoader4Line className="spinner" /> Enviando...
                    </>
                  ) : (
                    <>
                      Radicar PQRS <RiArrowRightSLine />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PqrsPage;
