import React, { useState } from 'react';
import { 
  RiInformationLine, 
  RiMoneyDollarCircleLine, 
  RiBankLine,
  RiSendPlaneLine,
  RiTimeLine,
  RiLockPasswordLine,
  RiLoader4Line,
  RiCheckLine,
  RiMailSendLine,
  RiArticleLine
} from 'react-icons/ri';
import { wpService } from '../services/wordpressMock';
import './BlogPage.css'; 

interface CertificadosYConstanciasPageProps {
  theme: 'light' | 'dark';
}

export const CertificadosYConstanciasPage: React.FC<CertificadosYConstanciasPageProps> = ({ theme }) => {
  const [formData, setFormData] = useState({
    correo: '',
    vinculacion: '',
    tiposCertificado: [] as string[],
    especifiqueSolicitud: '',
    costosEducativosDirigido: '',
    observaciones: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const certificadosOptions = [
    'CERTIFICADO DE ESTUDIO',
    'CERTIFICADO DE NOTAS',
    'CERTIFICADO DE COSTOS EDUCATIVOS',
    'CERTIFICADO DE CONVIVENCIA',
    'CERTIFICADO DE MATRÍCULA',
    'CERTIFICADO CURSÓ Y APROBÓ',
    'AUTENTICIDAD',
    'COPIA DEL ACTA DE GRADO',
    'COPIA DEL DIPLOMA',
    'PAZ Y SALVO'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, vinculacion: e.target.value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, tiposCertificado: [...prev.tiposCertificado, value] };
      } else {
        return { ...prev, tiposCertificado: prev.tiposCertificado.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitSuccess(null);

    if (!formData.correo || !formData.vinculacion || formData.tiposCertificado.length === 0 || !formData.especifiqueSolicitud || !formData.observaciones) {
      setError('Por favor, diligencia todos los campos obligatorios marcados con asterisco (*).');
      return;
    }

    try {
      setSubmitting(true);
      
      const submitData = new FormData();
      submitData.append('correo', formData.correo);
      submitData.append('vinculacion', formData.vinculacion);
      submitData.append('tiposCertificado', formData.tiposCertificado.join(', '));
      submitData.append('especifiqueSolicitud', formData.especifiqueSolicitud);
      submitData.append('costosEducativosDirigido', formData.costosEducativosDirigido);
      submitData.append('observaciones', formData.observaciones);

      const result = await wpService.submitCertificadosYConstancias(submitData);
      
      if (result.success) {
        setSubmitSuccess(result.message);
        setFormData({
          correo: '',
          vinculacion: '',
          tiposCertificado: [],
          especifiqueSolicitud: '',
          costosEducativosDirigido: '',
          observaciones: ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Hubo un problema al enviar tu solicitud. Intenta nuevamente.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const cardStyle = {
    background: theme === 'dark' ? '#0c1424' : '#ffffff',
    padding: '1.5rem',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    marginBottom: '1.5rem',
    border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
    boxSizing: 'border-box' as const,
    overflow: 'hidden' as const,
    maxWidth: '100%'
  };

  const iconStyle = {
    color: 'var(--color-accent-blue)',
    fontSize: '1.8rem',
    marginRight: '1rem',
    marginTop: '0.2rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    borderRadius: '8px',
    border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)'}`,
    background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb',
    color: 'var(--color-text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.8rem',
    fontSize: '0.9rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    color: 'var(--color-text-primary)'
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', minHeight: '100vh', paddingBottom: '4rem', overflowX: 'hidden' }}>
      {/* 1. Hero Section */}
      <section 
        className="blog-header works-hero"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/imgpag8/certificados/Estudiantes.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundColor: '#0a0f18',
          padding: '8rem 2rem 6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="blog-header-content" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', textAlign: 'center', boxSizing: 'border-box' }}>
          <h1 style={{ textTransform: 'none', fontSize: 'clamp(2rem, 8vw, 3.5rem)', margin: 0, color: '#ffffff', fontWeight: 800, wordWrap: 'break-word' }}>Certificaciones</h1>
          <p style={{ textTransform: 'none', color: '#ffffff', fontSize: 'clamp(1rem, 4vw, 1.3rem)', marginTop: '1rem', lineHeight: '1.6', maxWidth: '800px', margin: '1rem auto 0', wordWrap: 'break-word' }}>
            Solicita tus certificaciones de forma fácil, segura y rápida.
          </p>
        </div>
      </section>

      {/* 2. Main Content Section */}
      <section style={{ maxWidth: '1400px', margin: '-2rem auto 0', padding: '0 1rem', position: 'relative', zIndex: 10, boxSizing: 'border-box', width: '100%' }}>
        <div className="certificados-grid">
          
          {/* Left Column: Info Blocks */}
          <div className="certificados-info">
            
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <RiInformationLine style={iconStyle} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.3rem 0 0 0', color: 'var(--color-accent-red)' }}>INFORMACIÓN IMPORTANTE</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <RiMailSendLine style={{ color: 'var(--color-accent-blue)', fontSize: '1.2rem', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.85rem', lineHeight: 1.5, overflowWrap: 'break-word', wordBreak: 'break-word', textAlign: 'justify' }}>Tu solicitud será enviada al correo <strong style={{ color: theme === 'dark' ? '#ffffff' : 'var(--color-accent-blue)', fontSize: '0.78rem', letterSpacing: '-0.3px', overflowWrap: 'break-word', wordBreak: 'break-word' }}>coordinacionacademica@airtrainingacademia.com</strong>, quien se encargará de validarla y procesarla.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <RiTimeLine style={{ color: 'var(--color-accent-blue)', fontSize: '1.2rem', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.9rem', lineHeight: 1.5, textAlign: 'justify' }}>El tiempo de respuesta puede variar entre <strong>2 a 4 días hábiles.</strong></span>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <RiCheckLine style={{ color: 'var(--color-accent-blue)', fontSize: '1.2rem', flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ fontSize: '0.9rem', lineHeight: 1.5, textAlign: 'justify' }}>Una vez validada la información, el certificado será enviado al correo registrado.</span>
                </li>
              </ul>
            </div>

            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <RiMoneyDollarCircleLine style={iconStyle} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.3rem 0 0 0', color: 'var(--color-accent-red)' }}>1. COSTOS</h3>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-accent-blue)', marginBottom: '0.5rem' }}>Certificados generales</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.8rem', fontStyle: 'italic' }}>
                  (Certificado de Estudio, Certificado de Notas, Certificado de Costos Educativos, Certificado de Convivencia, Certificado de Matrícula, Paz y Salvo, Validación Puesto Ocupado, Autenticidad)
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <li>Estudiante matriculado (Activo): <strong>$30.000</strong></li>
                  <li>Estudiante retirado (Inactivo): <strong>$35.000</strong></li>
                  <li>Egresado: <strong>$30.000</strong></li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-accent-blue)', marginBottom: '0.5rem' }}>Certificados especiales</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.8rem', fontStyle: 'italic' }}>
                  (Contenidos Programáticos, Copia del Acta de Grado, Copia del Diploma)
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <li>Estudiante matriculado (Activo): <strong>$80.000</strong></li>
                  <li>Estudiante retirado (Inactivo): <strong>$96.000</strong></li>
                  <li>Egresado: <strong>$80.000</strong></li>
                </ul>
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <RiBankLine style={iconStyle} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.3rem 0 0 0', color: 'var(--color-accent-red)' }}>2. MEDIO DE PAGO</h3>
              </div>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Todos los pagos deben realizarse a la siguiente cuenta:</p>
              <div style={{ background: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-accent-blue)' }}>
                <div className="bank-grid" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <strong>Banco:</strong> <span>BANCO DE OCCIDENTE</span>
                  <strong>Tipo de cuenta:</strong> <span>CUENTA CORRIENTE</span>
                  <strong>Nro. cuenta:</strong> <span>241-005348</span>
                  <strong>A nombre de:</strong> <span>AIR TRAINING INDUSTRY SAS</span>
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <RiSendPlaneLine style={iconStyle} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.3rem 0 0 0', color: 'var(--color-accent-red)' }}>3. ENVÍO DE COMPROBANTE</h3>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.5, textAlign: 'justify' }}>
                Después de realizar el pago, debe enviar el comprobante al correo electrónico: <br/>
                <strong style={{ color: theme === 'dark' ? '#ffffff' : 'var(--color-accent-blue)', display: 'inline-block', fontSize: '0.8rem', letterSpacing: '-0.3px' }}>coordinacionacademica@airtrainingacademia.com</strong><br/><br/>
                Una vez validada la información, el certificado será enviado al correo registrado en un plazo de 2 a 4 días hábiles.
              </p>
            </div>

            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <RiTimeLine style={iconStyle} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.3rem 0 0 0', color: 'var(--color-accent-red)' }}>4. TIEMPO DE ENTREGA</h3>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>Por favor tenga en cuenta que el tiempo de entrega puede variar dependiendo del tipo de solicitud:</p>
              <div style={{ fontSize: '0.85rem', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <RiCheckLine style={{ color: 'var(--color-accent-blue)', fontSize: '1.2rem', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>CONSTANCIA DE ESTUDIO, CERTIFICADO DE COSTOS, CERTIFICADO DE CONVIVENCIA Y PAZ Y SALVO:</strong><br/>
                    <span style={{ color: 'var(--color-accent-red)', fontWeight: 600 }}>De 2 a 4 días hábiles posteriores al pago.</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <RiCheckLine style={{ color: 'var(--color-accent-blue)', fontSize: '1.2rem', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>CERTIFICADO DE NOTAS:</strong><br/>
                    <span style={{ color: 'var(--color-accent-red)', fontWeight: 600 }}>De 4 a 5 días hábiles posteriores al pago.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ ...cardStyle, background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <RiLockPasswordLine style={{ color: 'var(--color-accent-blue)', fontSize: '2rem', marginRight: '1rem' }} />
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-accent-blue)' }}>Tus datos están protegidos y serán utilizados únicamente para gestionar tu solicitud.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="certificados-form" style={{ background: theme === 'dark' ? '#0c1424' : '#ffffff', border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`, padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '1rem' }}>
              <RiArticleLine style={{ color: 'var(--color-accent-red)', fontSize: '2rem', marginRight: '1rem' }} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>FORMULARIO DE SOLICITUD</h2>
            </div>
            
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              Por favor diligencia todos los campos del formulario.
            </p>

            {submitSuccess ? (
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#16a34a', padding: '3rem 2rem', borderRadius: '12px', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
                <RiCheckLine size={64} style={{ marginBottom: '1.5rem', color: '#22c55e' }} />
                <h3 style={{ margin: '0 0 1rem 0', fontWeight: 800, fontSize: '1.5rem' }}>¡Solicitud Enviada Exitosamente!</h3>
                <p style={{ margin: 0, lineHeight: 1.6, fontSize: '1.1rem' }}>{submitSuccess}</p>
                <button 
                  onClick={() => setSubmitSuccess(null)}
                  style={{ marginTop: '2rem', padding: '0.8rem 2rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}
                >
                  Diligenciar nuevo formulario
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  <div className="input-group">
                    <label style={labelStyle}>CORREO ELECTRÓNICO <span style={{color:'red'}}>*</span></label>
                    <input type="email" name="correo" value={formData.correo} onChange={handleInputChange} required placeholder="Tu respuesta" style={inputStyle} />
                  </div>
                  <div className="input-group" style={{ border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)'}`, background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb', padding: '1.5rem', borderRadius: '8px' }}>
                    <label style={{...labelStyle, marginBottom: '1.5rem'}}>VINCULACIÓN CON EL CENTRO DE INSTRUCCIÓN <span style={{color:'red'}}>*</span></label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                        <input type="radio" name="vinculacion" value="ESTUDIANTE MATRICULADO (ACTIVO) O ADMITIDO" checked={formData.vinculacion === 'ESTUDIANTE MATRICULADO (ACTIVO) O ADMITIDO'} onChange={handleRadioChange} required style={{ transform: 'scale(1.2)' }} />
                        ESTUDIANTE MATRICULADO (ACTIVO) O ADMITIDO
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                        <input type="radio" name="vinculacion" value="ESTUDIANTE RETIRADO (INACTIVO)" checked={formData.vinculacion === 'ESTUDIANTE RETIRADO (INACTIVO)'} onChange={handleRadioChange} style={{ transform: 'scale(1.2)' }} />
                        ESTUDIANTE RETIRADO (INACTIVO)
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                        <input type="radio" name="vinculacion" value="EGRESADO" checked={formData.vinculacion === 'EGRESADO'} onChange={handleRadioChange} style={{ transform: 'scale(1.2)' }} />
                        EGRESADO
                      </label>
                    </div>
                  </div>
                </div>

                <div className="input-group" style={{ border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)'}`, background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb', padding: '2rem', borderRadius: '8px' }}>
                  <label style={labelStyle}>TIPO DE CERTIFICADO REQUERIDO <span style={{color:'red'}}>*</span></label>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>En caso de solicitar más de un certificado por favor diligenciar el formulario por cada uno</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    {certificadosOptions.map(option => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          value={option} 
                          checked={formData.tiposCertificado.includes(option)} 
                          onChange={handleCheckboxChange} 
                          style={{ transform: 'scale(1.2)' }} 
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="input-group">
                  <label style={{...labelStyle, lineHeight: 1.4}}>ESPECIFIQUE SU SOLICITUD: (Ejemplo: programa TCP, Año Académico: 2023, año que requiere, costo mensual o anualidad, etc.) <span style={{color:'red'}}>*</span></label>
                  <textarea name="especifiqueSolicitud" value={formData.especifiqueSolicitud} onChange={handleInputChange} required placeholder="Tu respuesta" rows={4} style={{...inputStyle, resize: 'vertical'}}></textarea>
                </div>
                
                <div className="input-group">
                  <label style={{...labelStyle, lineHeight: 1.4}}>SOLICITUD CERTIFICADO DE COSTOS EDUCATIVOS DIRIGIDO A: (POR FAVOR SOLO DILIGENCIAR ESTE ESPACIO SOLO SI SE SOLICITA PARA RETIRO CESANTÍAS) <span style={{color:'red'}}>*</span></label>
                  <textarea name="costosEducativosDirigido" value={formData.costosEducativosDirigido} onChange={handleInputChange} placeholder="Tu respuesta" rows={4} style={{...inputStyle, resize: 'vertical'}}></textarea>
                </div>

                <div className="input-group">
                  <label style={labelStyle}>OBSERVACIONES DE SU SOLICITUD <span style={{color:'red'}}>*</span></label>
                  <textarea name="observaciones" value={formData.observaciones} onChange={handleInputChange} required placeholder="Tu respuesta" rows={3} style={{...inputStyle, resize: 'vertical'}}></textarea>
                </div>

                {error && (
                  <div style={{ padding: '1rem', background: 'rgba(231, 26, 36, 0.1)', border: '1px solid var(--color-accent-red)', color: 'var(--color-accent-red)', borderRadius: '8px', fontSize: '0.95rem' }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-accent-blue)', fontSize: '0.9rem' }}>
                    <RiInformationLine size={24} />
                    <span>Al enviar el formulario, aceptas nuestra <a href="#" style={{ color: 'var(--color-accent-blue)', textDecoration: 'underline' }}>Política de Privacidad</a>.</span>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={submitting}
                    style={{
                      padding: '1rem 3rem',
                      background: 'var(--color-accent-red)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 800,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      opacity: submitting ? 0.7 : 1,
                      transition: 'background 0.3s'
                    }}
                  >
                    {submitting ? (
                      <><RiLoader4Line className="spin" size={20} /> PROCESANDO</>
                    ) : (
                      <><RiSendPlaneLine size={20} /> Enviar solicitud</>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
