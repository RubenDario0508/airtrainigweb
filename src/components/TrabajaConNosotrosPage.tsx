import React, { useState, useRef } from 'react';
import { 
  RiArrowRightSLine, 
  RiCloseLine, 
  RiCheckLine,
  RiLoader4Line
} from 'react-icons/ri';
import { wpService } from '../services/wordpressMock';
import './BlogPage.css'; // Reuse CSS styling for the form and general styles


interface TrabajaConNosotrosPageProps {
  theme: 'light' | 'dark';
}

export const TrabajaConNosotrosPage: React.FC<TrabajaConNosotrosPageProps> = () => {
  // Form states
  const [cvName, setCvName] = useState<string>('');
  const [cvEmail, setCvEmail] = useState<string>('');
  const [cvArea, setCvArea] = useState<string>('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [cvSubmitting, setCvSubmitting] = useState<boolean>(false);
  const [cvSubmitSuccess, setCvSubmitSuccess] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const vacanciesSectionRef = useRef<HTMLDivElement>(null);

  // Smooth scroll using native scroll or Lenis if present globally
  const scrollToForm = (areaName: string) => {
    setCvArea(areaName);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToVacancies = () => {
    if (vacanciesSectionRef.current) {
      vacanciesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setCvFile(file);
        setCvError(null);
      } else {
        setCvError('Por favor, selecciona un archivo en formato PDF.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setCvFile(file);
        setCvError(null);
      } else {
        setCvError('Por favor, selecciona un archivo en formato PDF.');
      }
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCvFile(null);
  };

  // Form submission
  const handleSubmitCV = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvName || !cvEmail || !cvArea || !cvFile) {
      setCvError('Por favor, completa todos los campos del formulario y adjunta tu C.V.');
      return;
    }

    try {
      setCvSubmitting(true);
      setCvError(null);
      
      const formData = new FormData();
      formData.append('name', cvName);
      formData.append('email', cvEmail);
      formData.append('area', cvArea);
      formData.append('cv', cvFile);

      const result = await wpService.submitCV(formData);
      if (result.success) {
        setCvSubmitSuccess(result.message);
        // Reset form
        setCvName('');
        setCvEmail('');
        setCvArea('');
        setCvFile(null);
      } else {
        setCvError(result.message);
      }
    } catch (err) {
      setCvError('Hubo un problema al enviar tu postulación. Intenta nuevamente.');
      console.error(err);
    } finally {
      setCvSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
      {/* 1. Hero Section */}
      <section 
        className="blog-header works-hero"
        style={{ 
          backgroundImage: `url('/imgpag8/trabajaconnosotros/Trabajacon Nosotros.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="blog-header-content">
          <h1 style={{ textTransform: 'none' }}>Únete a la Excelencia Aeronáutica</h1>
          <p style={{ textTransform: 'none', color: '#ffffff', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.6', letterSpacing: '0' }}>
            Forma parte del equipo académico líder en la formación de la próxima generación de personal aeronáutico. En Air Training, tu experiencia eleva el futuro de la aviación.
          </p>
          <button 
            onClick={scrollToVacancies}
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
            Ver Vacantes Disponibles
          </button>
        </div>
      </section>

      {/* 2. Vacantes Disponibles Section */}
      <section 
        ref={vacanciesSectionRef} 
        style={{ padding: '5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}
      >
        <div style={{ borderLeft: '4px solid var(--color-accent-red)', paddingLeft: '1rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Vacantes Disponibles</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: '0.5rem 0 0 0', fontSize: '1rem' }}>
            Buscamos profesionales apasionados por la enseñanza y la industria aeroespacial.
          </p>
        </div>

        {/* Grid de Flyers de Vacantes */}
        <div className="blog-grid" style={{ marginTop: '2rem' }}>
          {/* Card 1: Coordinador Académico */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', height: '100%' }}>
            <img loading="lazy" 
              src="/imgpag8/trabajaconnosotros/Vacante Coordinador Académico.jpeg" 
              alt="Vacante Coordinador Académico" 
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'fill', display: 'block', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} 
            />
            <div style={{ padding: '1.5rem', textAlign: 'center', width: '100%', marginTop: 'auto' }}>
              <button 
                onClick={() => scrollToForm('Coordinación Académica')}
                className="btn-submit-cv"
                style={{ padding: '0.8rem 2rem', fontSize: '1rem', width: '100%' }}
              >
                Postularse Ahora <RiArrowRightSLine />
              </button>
            </div>
          </div>

          {/* Card 2: Diseñador Gráfico */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', height: '100%' }}>
            <img loading="lazy" 
              src="/imgpag8/trabajaconnosotros/Diseñador grafico-CHIA.jpeg" 
              alt="Vacante Diseñador Gráfico" 
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'fill', display: 'block', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} 
            />
            <div style={{ padding: '1.5rem', textAlign: 'center', width: '100%', marginTop: 'auto' }}>
              <button 
                onClick={() => scrollToForm('Diseño Gráfico')}
                className="btn-submit-cv"
                style={{ padding: '0.8rem 2rem', fontSize: '1rem', width: '100%' }}
              >
                Postularse Ahora <RiArrowRightSLine />
              </button>
            </div>
          </div>

          {/* Card 3: Auxiliar de Servicios Generales */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', height: '100%' }}>
            <img loading="lazy" 
              src="/imgpag8/trabajaconnosotros/Vacante Auxiliar de Servicios Generales.jpg" 
              alt="Vacante Auxiliar de Servicios Generales" 
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'fill', display: 'block', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} 
            />
            <div style={{ padding: '1.5rem', textAlign: 'center', width: '100%', marginTop: 'auto' }}>
              <button 
                onClick={() => scrollToForm('Auxiliar de Servicios Generales')}
                className="btn-submit-cv"
                style={{ padding: '0.8rem 2rem', fontSize: '1rem', width: '100%' }}
              >
                Postularse Ahora <RiArrowRightSLine />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Formulario Spontaneous Application (Adjunta tu C.V.) */}
      <section 
        ref={formSectionRef}
        className="trabaja-section"
        style={{ backgroundImage: `url('/imgpag8/trabajaconnosotros/Fondo Trabaja con Nosotros.webp')` }}
      >
        <div className="trabaja-container">
          {/* Columna Izquierda: Información */}
          <div className="trabaja-info">
            <h2>¿No encuentras la Vacante Ideal?</h2>
            <p>
              Envíanos tu currículum de forma espontánea. Mantenemos una base de datos activa para futuras aperturas de vacantes y proyectos especiales en nuestra academia.
            </p>

            <div className="trabaja-contact-list">
              <div className="trabaja-contact-item">
                <div className="trabaja-contact-icon">
                  <img loading="lazy" src="/imgpag8/trabajaconnosotros/icon/Correo.png" alt="Email Icon" />
                </div>
                <div className="trabaja-contact-text">
                  <h4>Correo Electrónico</h4>
                  <a href="mailto:factoreshumanos@airtrainingacademia.com" style={{ color: '#ffffff', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent-red)'} onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}>
                    factoreshumanos@airtrainingacademia.com
                  </a>
                </div>
              </div>

              <div className="trabaja-contact-item">
                <div className="trabaja-contact-icon">
                  <img loading="lazy" src="/imgpag8/trabajaconnosotros/icon/Ubicacioon.png" alt="Location Icon" />
                </div>
                <div className="trabaja-contact-text">
                  <h4>Sede Principal</h4>
                  <a href="https://www.google.com/maps/search/?api=1&query=Cra.+6+%2301a-47,+Barrio+Los+Cedros" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent-red)'} onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}>
                    Cra. 6 #01a-47, Barrio Los Cedros
                  </a>
                </div>
              </div>
            </div>

            <div className="trabaja-bottom-note">
              Hacer llegar los documentos y datos al correo electrónico de: <br />
              <a href="mailto:factoreshumanos@airtrainingacademia.com" style={{ color: '#ffffff', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent-red)'} onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}>
                factoreshumanos@airtrainingacademia.com
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="cv-card">
            <h3>Adjunta tu C.V.</h3>
            
            {cvSubmitSuccess ? (
              <div className="cv-success-message">
                <RiCheckLine size={32} style={{ display: 'block', margin: '0 auto 10px', color: '#27ae60' }} />
                <p>{cvSubmitSuccess}</p>
                <button 
                  onClick={() => setCvSubmitSuccess(null)}
                  style={{
                    marginTop: '1rem',
                    background: 'var(--color-accent-blue)',
                    border: 'none',
                    color: '#000000',
                    padding: '0.4rem 1rem',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Enviar otra postulación
                </button>
              </div>
            ) : (
              <form className="cv-form" onSubmit={handleSubmitCV}>
                {cvError && (
                  <div style={{ color: 'var(--color-accent-red)', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', backgroundColor: 'rgba(231,26,36,0.08)', padding: '0.6rem', borderRadius: '6px' }}>
                    {cvError}
                  </div>
                )}

                <div className="cv-form-group">
                  <label className="cv-label">Nombre Completo</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. Juan Pérez"
                    value={cvName}
                    onChange={(e) => setCvName(e.target.value)}
                    className="cv-input"
                  />
                </div>

                <div className="cv-form-group">
                  <label className="cv-label">Correo Electrónico</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Ej. juan.perez@email.com"
                    value={cvEmail}
                    onChange={(e) => setCvEmail(e.target.value)}
                    className="cv-input"
                  />
                </div>

                <div className="cv-form-group">
                  <label className="cv-label">Área de Interés</label>
                  <select 
                    required
                    value={cvArea}
                    onChange={(e) => setCvArea(e.target.value)}
                    className="cv-select"
                  >
                    <option value="">Selecciona el área</option>
                    <option value="Instructores">Instructores</option>
                    <option value="Diseño Gráfico">Diseño Gráfico</option>
                    <option value="Coordinación Académica">Coordinación Académica</option>
                    <option value="Auxiliar de Servicios Generales">Auxiliar de Servicios Generales</option>
                    <option value="Otro">Otro / Selección Libre</option>
                  </select>
                </div>

                {/* Zona de Arrastre de C.V. */}
                <div className="cv-form-group">
                  <label className="cv-label">Cargar C.V. (PDF)</label>
                  <div 
                    className={`drag-drop-zone ${dragOver ? 'dragover' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileSelect}
                  >
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf"
                      style={{ display: 'none' }}
                    />
                    {cvFile ? (
                      <div className="drag-drop-file-info">
                        <span>{cvFile.name}</span>
                        <button 
                          type="button"
                          onClick={handleRemoveFile}
                          className="drag-drop-file-remove"
                          title="Quitar archivo"
                        >
                          <RiCloseLine size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <img loading="lazy" 
                          src="/imgpag8/trabajaconnosotros/icon/Subirarchivo.png" 
                          alt="Upload Icon" 
                          className="drag-drop-icon"
                        />
                        <p className="drag-drop-text">
                          Haz clic o arrastra el archivo aquí
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={cvSubmitting}
                  className="btn-submit-cv"
                >
                  {cvSubmitting ? (
                    <>
                      <RiLoader4Line className="spinner" /> Procesando...
                    </>
                  ) : (
                    <>
                      Enviar Postulación <RiArrowRightSLine />
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
