import React, { useState } from 'react';
import { RiCloseLine, RiSendPlaneLine, RiCheckboxCircleLine, RiArrowRightSLine } from 'react-icons/ri';
import { wpService, MOCK_PROGRAMS, MOCK_SEDES } from '../services/wordpressMock';

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    programa: '',
    sede: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.programa || !formData.sede) {
      setStatus('error');
      setFeedbackMessage('Por favor completa todos los campos del plan de vuelo.');
      return;
    }

    setStatus('loading');
    try {
      const response = await wpService.submitEnrollment(formData);
      if (response.success) {
        setStatus('success');
        setFeedbackMessage(response.message);
        // Reset form
        setFormData({ nombre: '', email: '', telefono: '', programa: '', sede: '' });
      } else {
        setStatus('error');
        setFeedbackMessage(response.message);
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('Ocurrió un error de telemetría. Inténtalo de nuevo.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 12, 23, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'var(--transition-smooth)'
      }}
      onClick={onClose}
    >
      {/* Sliding Glass Container */}
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          borderRadius: '0px',
          borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          backgroundColor: 'var(--color-bg-secondary)',
          color: 'var(--color-text-primary)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Drawer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <span style={{
              color: 'var(--color-accent-blue)',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'block'
            }}>Plan de Vuelo</span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '2px' }}>Formulario de Inscripción</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--color-bg-tertiary)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-text-primary)',
              transition: 'var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0)'}
          >
            <RiCloseLine size={20} />
          </button>
        </div>

        {status === 'success' ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            textAlign: 'center',
            gap: '1.5rem'
          }}>
            <RiCheckboxCircleLine size={72} style={{ color: 'var(--color-accent-green)' }} className="float-animation" />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>¡Despegue Exitoso!</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
              {feedbackMessage}
            </p>
            <button
              className="btn-primary"
              onClick={() => { setStatus('idle'); onClose(); }}
              style={{ marginTop: '1rem' }}
            >
              Cerrar Ventana <RiArrowRightSLine size={18} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flexGrow: 1 }}>
            {/* Input Nombre */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre completo"
                required
                style={inputStyle}
                className="input-focus-effect"
              />
            </div>

            {/* Input Correo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                Correo Electrónico *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                required
                style={inputStyle}
                className="input-focus-effect"
              />
            </div>

            {/* Input Teléfono */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                Teléfono / WhatsApp *
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{
                  padding: '0.8rem 1rem',
                  background: 'var(--color-bg-tertiary)',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  🇨🇴 +57
                </span>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="300 123 4567"
                  required
                  style={{ ...inputStyle, flexGrow: 1 }}
                  className="input-focus-effect"
                />
              </div>
            </div>

            {/* Select Programa */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                Programa de Interés *
              </label>
              <select
                name="programa"
                value={formData.programa}
                onChange={handleChange}
                required
                style={selectStyle}
                className="input-focus-effect"
              >
                <option value="" disabled>Selecciona un programa</option>
                {MOCK_PROGRAMS.map(prog => (
                  <option key={prog} value={prog}>{prog}</option>
                ))}
              </select>
            </div>

            {/* Select Sede */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                Sede más Cercana *
              </label>
              <select
                name="sede"
                value={formData.sede}
                onChange={handleChange}
                required
                style={selectStyle}
                className="input-focus-effect"
              >
                <option value="" disabled>Selecciona una sede</option>
                {MOCK_SEDES.map(sede => (
                  <option key={sede.id} value={sede.title}>{sede.title}</option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <div style={{
                backgroundColor: 'rgba(211, 18, 27, 0.1)',
                border: '1px solid var(--color-accent-red)',
                color: 'var(--color-accent-red)',
                borderRadius: '8px',
                padding: '0.8rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                {feedbackMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'loading'}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '1rem',
                marginTop: '1rem',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.75 : 1
              }}
            >
              {status === 'loading' ? (
                <span>Preparando Despegue...</span>
              ) : (
                <>
                  Enviar Solicitud <RiSendPlaneLine size={18} />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Estilos locales para efectos de foco */}
      <style>{`
        .input-focus-effect {
          transition: var(--transition-fast) !important;
        }
        .input-focus-effect:focus {
          border-color: var(--color-accent-blue) !important;
          background-color: var(--color-bg-secondary) !important;
          box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.2) !important;
        }
      `}</style>
    </div>
  );
};

// Estilos Compartidos para Controles
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem 1rem',
  background: 'var(--color-bg-tertiary)',
  border: '1px solid var(--glass-border)',
  borderRadius: '12px',
  fontSize: '0.95rem',
  color: 'var(--color-text-primary)'
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='none' stroke='rgba(130, 149, 176, 0.8)' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' d='M19 9l-7 7-7-7'></path></svg>")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 1rem center',
  backgroundSize: '1.25rem',
  cursor: 'pointer'
};
