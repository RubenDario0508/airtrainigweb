import React, { useState } from 'react';
import { 
  RiMoneyDollarCircleLine, 
  RiBankLine,
  RiSendPlaneLine,
  RiTimeLine,
  RiLoader4Line,
  RiCheckLine,
  RiMailSendLine,
  RiArticleLine,
  RiFileCopyLine,
  RiShieldCheckLine,
  RiPriceTag3Line,
  RiCheckboxCircleFill
} from 'react-icons/ri';
import { wpService } from '../services/wordpressMock';
import './BlogPage.css'; 

interface CertificadosYConstanciasPageProps {
  theme: 'light' | 'dark';
}

export const CertificadosYConstanciasPage: React.FC<CertificadosYConstanciasPageProps> = ({ theme }) => {
  const step1Ref = React.useRef<HTMLDivElement>(null);
  const step2Ref = React.useRef<HTMLDivElement>(null);
  const step3Ref = React.useRef<HTMLDivElement>(null);
  const step4Ref = React.useRef<HTMLDivElement>(null);

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
  const [copiedAccount, setCopiedAccount] = useState(false);

  const scrollToStep = (stepNumber: number) => {
    const refs = [step1Ref, step2Ref, step3Ref, step4Ref];
    const targetRef = refs[stepNumber - 1];
    if (targetRef && targetRef.current) {
      const yOffset = -100;
      const element = targetRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('241-005348');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (val: string) => {
    setFormData(prev => ({ ...prev, vinculacion: val }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => {
      if (prev.tiposCertificado.includes(value)) {
        return { ...prev, tiposCertificado: prev.tiposCertificado.filter(item => item !== value) };
      } else {
        return { ...prev, tiposCertificado: [...prev.tiposCertificado, value] };
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

  // Responsive Theme Tokens & Compact Spacing
  const isDark = theme === 'dark';
  const cardBg = isDark ? '#0c1424' : '#ffffff';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
  const textColor = isDark ? '#ffffff' : '#151e2e';
  const textMuted = isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569';
  const inputBg = isDark ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc';
  const inputBorder = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';
  const brandRed = '#d3121b';

  const cardStyle = {
    background: cardBg,
    padding: 'clamp(1rem, 3vw, 2.2rem)',
    borderRadius: '16px',
    border: `1px solid ${cardBorder}`,
    boxSizing: 'border-box' as const,
    marginBottom: '1.8rem',
    width: '100%',
    maxWidth: '100%'
  };

  const blockStyle = {
    background: inputBg,
    padding: 'clamp(0.9rem, 2.5vw, 1.6rem)',
    borderRadius: '14px',
    border: `1px solid ${inputBorder}`,
    boxSizing: 'border-box' as const,
    width: '100%',
    maxWidth: '100%'
  };

  const inputStyle = {
    width: '100%',
    maxWidth: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '10px',
    border: `1px solid ${inputBorder}`,
    background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
    color: textColor,
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s ease',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.82rem',
    fontWeight: 800,
    letterSpacing: '0.4px',
    textTransform: 'uppercase' as const,
    color: textColor,
    wordBreak: 'break-word' as const
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-secondary)', color: textColor, minHeight: '100vh', paddingBottom: '4rem', overflowX: 'hidden' }}>
      
      {/* 1. Hero Section */}
      <section 
        className="blog-header works-hero"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/imgpag8/certificados/Estudiantes.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundColor: '#0a0f18',
          padding: 'clamp(5rem, 10vw, 8rem) 1.2rem 4.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="blog-header-content" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', textAlign: 'center', boxSizing: 'border-box' }}>
          <h1 style={{ textTransform: 'none', fontSize: 'clamp(1.8rem, 6vw, 3.5rem)', margin: 0, color: '#ffffff', fontWeight: 800, wordWrap: 'break-word' }}>
            Certificaciones
          </h1>
          <p style={{ textTransform: 'none', color: '#ffffff', fontSize: 'clamp(0.95rem, 3vw, 1.25rem)', marginTop: '0.8rem', lineHeight: '1.5', maxWidth: '800px', margin: '0.8rem auto 0', wordWrap: 'break-word' }}>
            Solicita tus certificaciones de forma fácil, segura y rápida.
          </p>
        </div>
      </section>

      {/* 2. Stepper Horizontal Interactivo */}
      <section style={{ maxWidth: '1280px', margin: '-2.2rem auto 2.5rem', padding: '0 1rem', position: 'relative', zIndex: 10, boxSizing: 'border-box' }}>
        <div style={{
          background: cardBg,
          borderRadius: '16px',
          padding: '1.2rem 1.4rem',
          border: `1px solid ${cardBorder}`,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '1.2rem',
          boxSizing: 'border-box'
        }}>
          {[
            { step: 1, title: '1. Tarifas', desc: 'Conoce los costos según tu documento', icon: <RiPriceTag3Line size={20} /> },
            { step: 2, title: '2. Pago Bancario', desc: 'Cta. Corriente Banco de Occidente', icon: <RiBankLine size={20} /> },
            { step: 3, title: '3. Solicitud', desc: 'Diligencia tus datos en el formulario', icon: <RiArticleLine size={20} /> },
            { step: 4, title: '4. Recepción', desc: 'Recibe en tu e-mail en 2 a 4 días hábiles', icon: <RiMailSendLine size={20} /> }
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => scrollToStep(item.step)}
              title={`Ir al ${item.title}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRight: idx < 3 ? `1px solid ${cardBorder}` : 'none',
                paddingRight: idx < 3 ? '0.8rem' : 0,
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                boxSizing: 'border-box'
              }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: brandRed,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1rem',
                flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: 800, color: textColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: textMuted, lineHeight: 1.35 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Contenedor Principal */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', boxSizing: 'border-box' }}>
        
        {/* Pasos 1 y 2: Tarjetas Pre-Formulario */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          
          {/* Paso 1: Tarifas Oficiales */}
          <div ref={step1Ref} style={{ ...cardStyle, marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem', borderBottom: `1px solid ${cardBorder}`, paddingBottom: '0.7rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'rgba(211, 18, 27, 0.1)',
                color: brandRed,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <RiMoneyDollarCircleLine size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: textColor }}>PASO 1: TARIFAS OFICIALES</h3>
                <span style={{ fontSize: '0.75rem', color: textMuted }}>Precios vigentes para estudiantes y egresados</span>
              </div>
            </div>

            {/* Generales */}
            <div style={{ marginBottom: '1rem', background: inputBg, padding: '1rem', borderRadius: '12px', border: `1px solid ${inputBorder}`, boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: textColor }}>Certificados Generales</h4>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: brandRed, background: 'rgba(211, 18, 27, 0.1)', padding: '3px 8px', borderRadius: '6px' }}>$30.000 / $35.000</span>
              </div>
              <p style={{ margin: '0 0 0.6rem 0', fontSize: '0.78rem', color: textMuted, fontStyle: 'italic', lineHeight: 1.4 }}>
                Estudio, Notas, Costos Educativos, Convivencia, Matrícula, Cursó y Aprobó, Paz y Salvo, Autenticidad.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', fontWeight: 700, color: textColor, paddingTop: '0.4rem', borderTop: `1px solid ${cardBorder}` }}>
                <span>Activo/Egresado: <strong style={{ color: brandRed }}>$30.000</strong></span>
                <span>Inactivo: <strong style={{ color: brandRed }}>$35.000</strong></span>
              </div>
            </div>

            {/* Especiales */}
            <div style={{ background: inputBg, padding: '1rem', borderRadius: '12px', border: `1px solid ${inputBorder}`, boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: textColor }}>Certificados Especiales</h4>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: brandRed, background: 'rgba(211, 18, 27, 0.1)', padding: '3px 8px', borderRadius: '6px' }}>$80.000 / $96.000</span>
              </div>
              <p style={{ margin: '0 0 0.6rem 0', fontSize: '0.78rem', color: textMuted, fontStyle: 'italic', lineHeight: 1.4 }}>
                Contenidos Programáticos, Copia de Acta de Grado, Copia de Diploma.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', fontWeight: 700, color: textColor, paddingTop: '0.4rem', borderTop: `1px solid ${cardBorder}` }}>
                <span>Activo/Egresado: <strong style={{ color: brandRed }}>$80.000</strong></span>
                <span>Inactivo: <strong style={{ color: brandRed }}>$96.000</strong></span>
              </div>
            </div>
          </div>

          {/* Paso 2: Datos Bancarios */}
          <div ref={step2Ref} style={{ ...cardStyle, marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem', borderBottom: `1px solid ${cardBorder}`, paddingBottom: '0.7rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'rgba(211, 18, 27, 0.1)',
                color: brandRed,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <RiBankLine size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: textColor }}>PASO 2: DATOS BANCARIOS</h3>
                <span style={{ fontSize: '0.75rem', color: textMuted }}>Cuenta institucional autorizada</span>
              </div>
            </div>

            <p style={{ margin: '0 0 1rem 0', fontSize: '0.84rem', color: textMuted, lineHeight: 1.5 }}>
              Realiza la consignación o transferencia bancaria en la siguiente cuenta antes de diligenciar el formulario:
            </p>

            <div style={{ background: inputBg, padding: '1rem', borderRadius: '12px', border: `1px solid ${inputBorder}`, marginTop: 'auto', boxSizing: 'border-box' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '0.5rem', fontSize: '0.84rem', color: textColor, lineHeight: 1.45 }}>
                <strong style={{ fontWeight: 800 }}>Banco:</strong> <span>BANCO DE OCCIDENTE</span>
                <strong style={{ fontWeight: 800 }}>Tipo Cuenta:</strong> <span>CUENTA CORRIENTE</span>
                <strong style={{ fontWeight: 800 }}>Nro. Cuenta:</strong> 
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: brandRed, letterSpacing: '0.5px' }}>
                  241-005348
                </span>
                <strong style={{ fontWeight: 800 }}>Titular:</strong> <span style={{ wordBreak: 'break-word' }}>AIR TRAINING INDUSTRY SAS</span>
              </div>

              {/* Botón Copiar Cuenta */}
              <button 
                type="button"
                onClick={handleCopyAccount}
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  padding: '0.75rem 0.8rem',
                  borderRadius: '10px',
                  background: copiedAccount ? '#22c55e' : brandRed,
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background 0.2s ease',
                  boxSizing: 'border-box'
                }}
              >
                {copiedAccount ? (
                  <><RiCheckLine size={16} /> ¡Número de cuenta copiado!</>
                ) : (
                  <><RiFileCopyLine size={16} /> Copiar Número de Cuenta Bancaria</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Paso 3: Formulario Digital de Solicitud (Responsive Perfecto) */}
        <div ref={step3Ref} style={cardStyle}>
          
          {/* Header del Formulario (Con Ícono a Juego con los demás Pasos) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', borderBottom: `1px solid ${cardBorder}`, paddingBottom: '0.7rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'rgba(211, 18, 27, 0.1)',
              color: brandRed,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <RiArticleLine size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: textColor }}>PASO 3: FORMULARIO DIGITAL DE SOLICITUD</h3>
              <span style={{ fontSize: '0.75rem', color: textMuted }}>Ingresa tus datos personales, marca los certificados solicitados e incluye la información del comprobante</span>
            </div>
          </div>

          {submitSuccess ? (
            <div style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid #22c55e', color: '#16a34a', padding: '2.5rem 1.5rem', borderRadius: '14px', textAlign: 'center' }}>
              <RiCheckboxCircleFill size={56} style={{ marginBottom: '0.8rem', color: '#22c55e' }} />
              <h3 style={{ margin: '0 0 0.6rem 0', fontWeight: 900, fontSize: '1.4rem' }}>¡Solicitud Enviada con Éxito!</h3>
              <p style={{ margin: '0 auto', maxWidth: '650px', lineHeight: 1.5, fontSize: '0.95rem', color: textColor }}>{submitSuccess}</p>
              <button 
                type="button"
                onClick={() => setSubmitSuccess(null)}
                style={{ marginTop: '1.8rem', padding: '0.75rem 2rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 800, fontSize: '0.9rem' }}
              >
                Diligenciar una nueva solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              
              {/* Bloque A: Datos del Solicitante */}
              <div style={blockStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                  <div style={{ width: '4px', height: '18px', background: brandRed, borderRadius: '2px', flexShrink: 0 }} />
                  <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 900, color: textColor }}>
                    A. DATOS DEL SOLICITANTE
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.4rem', alignItems: 'start' }}>
                  <div style={{ width: '100%', boxSizing: 'border-box' }}>
                    <label style={labelStyle}>CORREO ELECTRÓNICO INSTITUCIONAL / PERSONAL <span style={{ color: brandRed }}>*</span></label>
                    <input 
                      type="email" 
                      name="correo" 
                      value={formData.correo} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="ejemplo@correo.com" 
                      style={inputStyle} 
                    />
                  </div>

                  <div style={{ width: '100%', boxSizing: 'border-box' }}>
                    <label style={labelStyle}>VINCULACIÓN CON AIR TRAINING <span style={{ color: brandRed }}>*</span></label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                      {[
                        { label: 'ESTUDIANTE MATRICULADO (ACTIVO) O ADMITIDO', value: 'ESTUDIANTE MATRICULADO (ACTIVO) O ADMITIDO' },
                        { label: 'ESTUDIANTE RETIRADO (INACTIVO)', value: 'ESTUDIANTE RETIRADO (INACTIVO)' },
                        { label: 'EGRESADO', value: 'EGRESADO' }
                      ].map((item) => {
                        const isSelected = formData.vinculacion === item.value;
                        return (
                          <div 
                            key={item.value} 
                            onClick={() => handleRadioChange(item.value)}
                            style={{
                              padding: '0.7rem 0.9rem',
                              borderRadius: '10px',
                              background: isSelected ? 'rgba(211, 18, 27, 0.08)' : cardBg,
                              border: `1px solid ${isSelected ? brandRed : inputBorder}`,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              boxSizing: 'border-box',
                              width: '100%',
                              transition: 'border-color 0.2s ease'
                            }}
                          >
                            <input 
                              type="radio" 
                              name="vinculacion" 
                              value={item.value} 
                              checked={isSelected} 
                              onChange={() => {}} 
                              style={{ accentColor: brandRed, flexShrink: 0 }} 
                            />
                            <span style={{ fontSize: '0.8rem', fontWeight: isSelected ? 800 : 700, color: textColor, wordBreak: 'break-word', lineHeight: 1.35 }}>{item.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloque B: Tipo de Certificado */}
              <div style={blockStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                  <div style={{ width: '4px', height: '18px', background: brandRed, borderRadius: '2px', flexShrink: 0 }} />
                  <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 900, color: textColor }}>
                    B. TIPO DE CERTIFICADO REQUERIDO <span style={{ color: brandRed }}>*</span>
                  </h4>
                </div>
                
                <p style={{ fontSize: '0.78rem', color: textMuted, marginBottom: '1rem', lineHeight: 1.45 }}>
                  Selecciona el certificado o documento que requieres. (Si necesitas enviar solicitudes a correos distintos, diligencia un formulario por cada certificado).
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '0.7rem' }}>
                  {certificadosOptions.map(option => {
                    const isSelected = formData.tiposCertificado.includes(option);
                    return (
                      <div
                        key={option}
                        onClick={() => handleCheckboxChange(option)}
                        style={{
                          padding: '0.7rem 0.85rem',
                          borderRadius: '10px',
                          background: isSelected ? 'rgba(211, 18, 27, 0.08)' : cardBg,
                          border: `1px solid ${isSelected ? brandRed : inputBorder}`,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          boxSizing: 'border-box',
                          width: '100%',
                          transition: 'border-color 0.2s ease'
                        }}
                      >
                        <input 
                          type="checkbox" 
                          value={option} 
                          checked={isSelected} 
                          onChange={() => {}} 
                          style={{ accentColor: brandRed, flexShrink: 0 }} 
                        />
                        <span style={{ fontSize: '0.8rem', fontWeight: isSelected ? 800 : 700, color: textColor, wordBreak: 'break-word', lineHeight: 1.35 }}>{option}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bloque C: Especificación y Observaciones */}
              <div style={blockStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                  <div style={{ width: '4px', height: '18px', background: brandRed, borderRadius: '2px', flexShrink: 0 }} />
                  <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 900, color: textColor }}>
                    C. ESPECIFICACIÓN DE LA SOLICITUD Y COMPROBANTE
                  </h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                  <div>
                    <label style={labelStyle}>
                      ESPECIFIQUE SU SOLICITUD <span style={{ color: brandRed }}>*</span>
                    </label>
                    <span style={{ display: 'block', fontSize: '0.76rem', color: textMuted, marginBottom: '0.4rem', lineHeight: 1.35 }}>
                      Indica el programa académico (Ej. TCP / PPA / PCA), año cursado, intensidad horaria o si requiere desglose de costos.
                    </span>
                    <textarea 
                      name="especifiqueSolicitud" 
                      value={formData.especifiqueSolicitud} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="Escribe aquí los detalles específicos de tu solicitud..." 
                      rows={3} 
                      style={{ ...inputStyle, resize: 'vertical' }}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label style={labelStyle}>SOLICITUD DE COSTOS EDUCATIVOS DIRIGIDO A:</label>
                    <span style={{ display: 'block', fontSize: '0.76rem', color: textMuted, marginBottom: '0.4rem', lineHeight: 1.35 }}>
                      (Solo si el certificado de costos es para retiro de cesantías o entidad financiera especifica el nombre)
                    </span>
                    <textarea 
                      name="costosEducativosDirigido" 
                      value={formData.costosEducativosDirigido} 
                      onChange={handleInputChange} 
                      placeholder="Escribe el nombre de la entidad de destino (opcional)..." 
                      rows={2} 
                      style={{ ...inputStyle, resize: 'vertical' }}
                    ></textarea>
                  </div>

                  <div>
                    <label style={labelStyle}>OBSERVACIONES ADICIONALES Y COMPROBANTE <span style={{ color: brandRed }}>*</span></label>
                    <span style={{ display: 'block', fontSize: '0.76rem', color: textMuted, marginBottom: '0.4rem', lineHeight: 1.35 }}>
                      Indica la fecha de pago o número de comprobante de la transferencia realizada a la cuenta del Banco de Occidente.
                    </span>
                    <textarea 
                      name="observaciones" 
                      value={formData.observaciones} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="Ej: Pago realizado el día 28 de Julio con Nro. de comprobante 9841203..." 
                      rows={3} 
                      style={{ ...inputStyle, resize: 'vertical' }}
                    ></textarea>
                  </div>
                </div>
              </div>

              {error && (
                <div style={{ padding: '0.9rem 1.1rem', background: 'rgba(211, 18, 27, 0.1)', border: `1px solid ${brandRed}`, color: brandRed, borderRadius: '12px', fontSize: '0.85rem', fontWeight: 800 }}>
                  {error}
                </div>
              )}

              {/* Barra Inferior de Privacidad y Acción */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.4rem', borderTop: `1px solid ${cardBorder}`, paddingTop: '1.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: textColor, fontSize: '0.84rem', fontWeight: 600 }}>
                  <RiShieldCheckLine size={22} style={{ color: brandRed, flexShrink: 0 }} />
                  <span>Al enviar el formulario, aceptas nuestra <a href="#" style={{ color: textColor, textDecoration: 'underline', fontWeight: 800 }}>Política de Privacidad</a>.</span>
                </div>
                
                <button 
                  type="submit" 
                  disabled={submitting}
                  style={{
                    width: '100%',
                    maxWidth: '380px',
                    padding: '0.9rem 2rem',
                    background: brandRed,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: 900,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    opacity: submitting ? 0.7 : 1,
                    transition: 'background 0.2s ease',
                    boxSizing: 'border-box',
                    margin: '0 auto'
                  }}
                >
                  {submitting ? (
                    <><RiLoader4Line className="spin" size={20} /> PROCESANDO SOLICITUD...</>
                  ) : (
                    <><RiSendPlaneLine size={20} /> ENVIAR SOLICITUD DE CERTIFICADO</>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Paso 4: Tarjeta Informativa de Tiempos de Entrega */}
        <div ref={step4Ref} style={{ ...cardStyle, background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', border: `1px solid ${cardBorder}`, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(211, 18, 27, 0.1)', color: brandRed, marginBottom: '0.8rem' }}>
            <RiTimeLine size={26} />
          </div>
          <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.2rem', fontWeight: 900, color: textColor }}>
            PASO 4: TIEMPOS DE ENTREGA Y SEGUIMIENTO
          </h3>
          <p style={{ margin: '0 auto 1.5rem auto', maxWidth: '750px', fontSize: '0.86rem', color: textMuted, lineHeight: 1.55 }}>
            Una vez enviado tu formulario con la información del pago verificada, el área de Coordinación Académica expedirá tu certificado oficial en los siguientes plazos:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1rem', textAlign: 'left' }}>
            <div style={{ background: cardBg, padding: '1rem', borderRadius: '12px', border: `1px solid ${cardBorder}`, display: 'flex', gap: '10px', alignItems: 'flex-start', boxSizing: 'border-box' }}>
              <RiCheckLine size={18} style={{ color: brandRed, flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', color: textColor, display: 'block', marginBottom: '2px' }}>Certificados Generales & Paz y Salvo</strong>
                <span style={{ fontSize: '0.8rem', color: brandRed, fontWeight: 900 }}>De 2 a 4 días hábiles posteriores al pago.</span>
              </div>
            </div>

            <div style={{ background: cardBg, padding: '1rem', borderRadius: '12px', border: `1px solid ${cardBorder}`, display: 'flex', gap: '10px', alignItems: 'flex-start', boxSizing: 'border-box' }}>
              <RiCheckLine size={18} style={{ color: brandRed, flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', color: textColor, display: 'block', marginBottom: '2px' }}>Certificados de Notas & Especiales</strong>
                <span style={{ fontSize: '0.8rem', color: brandRed, fontWeight: 900 }}>De 4 a 5 días hábiles posteriores al pago.</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '0.9rem', borderTop: `1px solid ${cardBorder}`, fontSize: '0.8rem', color: textMuted }}>
            ¿Necesitas consultar el estado de tu trámite? Escribe a <strong style={{ color: textColor }}>coordinacionacademica@airtrainingacademia.com</strong>
          </div>
        </div>

      </div>
    </div>
  );
};
