import React from 'react';
import { 
  RiExternalLinkLine,
  RiFacebookFill,
  RiInstagramLine,
  RiTiktokFill,
  RiYoutubeFill,
  RiWhatsappLine,
  RiMailLine,
  RiPlaneLine,
  RiFlightTakeoffLine,
  RiRadarLine,
  RiMapPinLine
} from 'react-icons/ri';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" style={{ 
      backgroundColor: '#02050c', // Dark background matching the site
      paddingTop: '0', // Adjust padding since we have the rounded top
    }}>
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
      }}>

      {/* ============================================================
          CAPA 1: Imagen de fondo
          ============================================================ */}
      <div className="footer-bg" style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/footer/FooterPiedepagina.jpg)',
        backgroundRepeat: 'no-repeat',
        zIndex: 0
      }} />

      {/* Overlay oscuro para legibilidad (más oscuro en la parte inferior) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(7, 12, 23, 0.1) 0%, rgba(7, 12, 23, 0.4) 80%, #070c17 100%)',
        zIndex: 1,
      }} />

      {/* ============================================================
          CAPA 2: Contenido principal del footer
          ============================================================ */}
      <div className="container footer-container" style={{ position: 'relative', zIndex: 5, padding: '2rem 4rem 0 4rem', maxWidth: '100%' }}>

        {/* ROW PRINCIPAL: Logo + 3 columnas de información */}
        <div className="footer-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr 1fr 1fr',
          gap: '2.5rem',
          paddingBottom: '1.5rem',
        }}>

          {/* ---- COLUMNA 1: Logo, descripción y redes ---- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', maxWidth: '420px' }}>
            {/* Logo y Divisor */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
              <a href="#" className="footer-logo-link" style={{ textDecoration: 'none', marginBottom: '1.8rem', display: 'block', width: '100%', textAlign: 'center' }}>
                <img
                  src="/icon_white.png"
                  alt="Air Training Industry"
                  style={{ width: '280px', height: 'auto', objectFit: 'contain', marginBottom: '10px' }}
                />
                <img loading="lazy" src="/footer/AboveThBest.png" alt="Above the best" style={{ height: '35px', objectFit: 'contain', alignSelf: 'center', margin: '0 auto' }} />
              </a>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                gap: '15px',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '4px',
                whiteSpace: 'nowrap',
                textShadow: '0 2px 5px rgba(0,0,0,0.5)'
              }}>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 100%)' }} />
                ESCUELA DE AVIACIÓN
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 100%)' }} />
              </div>
            </div>

            {/* Descripción */}
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              color: '#ffffff',
              lineHeight: 1.6,
              textAlign: 'left',
              width: '100%'
            }}>
              <p style={{ marginBottom: '1.2rem' }}>Centro de instrucción aeronáutica certificado<br/>por la aerocivil.</p>
              <p>Elevamos el <strong style={{ color: '#ff0000', fontWeight: 800 }}>talento aeronáutico</strong><br/>que transforma el <strong style={{ color: '#00ccff', fontWeight: 800 }}>futuro de la aviación.</strong></p>
            </div>

            {/* Redes Sociales Clean & Minimalist */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '0.2rem', alignItems: 'center' }}>
              {[
                { label: 'Facebook', url: 'https://www.facebook.com/AirTrainingOficial/', icon: <RiFacebookFill size={24} /> },
                { label: 'Instagram', url: 'https://www.instagram.com/airtrainingoficial/', icon: <RiInstagramLine size={24} /> },
                { label: 'TikTok', url: 'https://www.tiktok.com/@airtrainingindustry', icon: <RiTiktokFill size={24} /> },
                { label: 'YouTube', url: 'https://www.youtube.com/@Airtraining', icon: <RiYoutubeFill size={24} /> },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn hover-scale-glow"
                  aria-label={`Visitar nuestro perfil de ${social.label}`}
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-accent-blue)';
                    e.currentTarget.style.borderColor = 'var(--color-accent-blue)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingTop: '2.5rem' }}>
            <h4 style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '0.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{ width: '3px', height: '16px', background: 'var(--color-accent-red)' }} />
              CONTÁCTANOS
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <a href="https://wa.me/573214002431" target="_blank" rel="noopener noreferrer" className="footer-contact-pill whatsapp-pill" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'transparent', border: '1px solid transparent', padding: '0.6rem 0.8rem', marginLeft: '-0.8rem', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                <RiWhatsappLine size={26} style={{ color: '#25D366' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: '0.5px' }}>Chat admisiones</span>
                  <span style={{ fontSize: '1rem', color: '#fff', fontWeight: 800 }}>+57 321 400 2431</span>
                </div>
              </a>
              <a href="mailto:info@airtraining.com.co" className="footer-contact-pill email-pill" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'transparent', border: '1px solid transparent', padding: '0.6rem 0.8rem', marginLeft: '-0.8rem', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                <RiMailLine size={26} style={{ color: 'var(--color-accent-blue)' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: '0.5px' }}>Línea anticorrupción</span>
                  <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 800 }}>info@airtraining.com.co</span>
                </div>
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingTop: '2.5rem' }}>
            <h4 style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '0.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{ width: '3px', height: '16px', background: 'var(--color-accent-blue)' }} />
              ADMISIONES
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <FooterInfoItem icon={<RiFlightTakeoffLine size={20} />} label="Tripulante de Cabina (TCP)" />
              <FooterInfoItem icon={<RiPlaneLine size={20} style={{ transform: 'rotate(45deg)' }} />} label="Piloto Privado (PPA)" />
              <FooterInfoItem icon={<RiPlaneLine size={20} />} label="Piloto Comercial (PCA)" />
              <FooterInfoItem icon={<RiRadarLine size={20} />} label="Despachador de Aeronaves (DPA)" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingTop: '2.5rem' }}>
            <h4 style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '0.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{ width: '3px', height: '16px', background: 'var(--color-blue-deep)' }} />
              VISÍTANOS
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <a href="https://maps.app.goo.gl/SiHT1cDnNTfQfUpt7" target="_blank" rel="noopener noreferrer" className="footer-sede-card-clean" style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'transparent', border: '1px solid transparent', padding: '0.6rem 0.8rem', marginLeft: '-0.8rem', borderRadius: '8px', transition: 'all 0.3s ease', textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent-blue)', fontSize: '0.85rem', fontWeight: 800 }}>
                  <RiMapPinLine size={18} /> Sede Chía <RiExternalLinkLine size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.5, paddingLeft: '26px' }}>Cra. 6 # 01a-47, Barrio Los Cedros</span>
              </a>
              <a href="https://maps.app.goo.gl/BD7v5jR4npZhStkw7" target="_blank" rel="noopener noreferrer" className="footer-sede-card-clean" style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'transparent', border: '1px solid transparent', padding: '0.6rem 0.8rem', marginLeft: '-0.8rem', borderRadius: '8px', transition: 'all 0.3s ease', textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent-blue)', fontSize: '0.85rem', fontWeight: 800 }}>
                  <RiMapPinLine size={18} /> Sede Ibagué <RiExternalLinkLine size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.5, paddingLeft: '26px' }}>Aeropuerto Perales, Locales 104 y 105</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ width: '100%', position: 'relative', zIndex: 6 }}>
        <img loading="lazy" src="/footer/Franjaroja.png" alt="Línea decorativa roja" style={{ width: '100%', height: '4px', display: 'block', objectFit: 'cover' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', padding: '2rem 4rem', backgroundColor: '#070c17' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.65rem', color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>
            <a href="#" className="footer-bottom-link" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.3s' }}>POLÍTICA DE PRIVACIDAD</a>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
            <a href="#pqrs" className="footer-bottom-link" style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.3s' }}>PQRS</a>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
            <span>AIR TRAINING INDUSTRY S.A.S. © 2024</span>
          </div>
          <div style={{ fontSize: '0.65rem', color: '#ffffff', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>CERTIFICADO POR LA AEROCIVIL DE COLOMBIA</div>
        </div>
      </div>

      <style>{`
        .footer-logo-link:hover { opacity: 0.85; }
        .footer-bottom-link:hover { color: var(--color-accent-red) !important; }
        .whatsapp-pill:hover,
        .email-pill:hover {
          background: rgba(255, 255, 255, 0.04) !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
          transform: translateX(5px);
        }
        .footer-info-row { cursor: pointer; transition: all 0.3s ease; }
        .footer-info-row:hover { background: rgba(255,255,255,0.04) !important; border-color: rgba(255, 255, 255, 0.1) !important; transform: translateX(5px); }
        .footer-info-row:hover .footer-info-value { color: #ffffff !important; }
        .footer-sede-card-clean { transition: all 0.3s ease; }
        .footer-sede-card-clean:hover { background: rgba(255,255,255,0.04) !important; border-color: rgba(255, 255, 255, 0.1) !important; transform: translateX(5px); }
        @media (max-width: 992px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-container {
            padding: 4rem 2rem 0 2rem !important;
          }
        }

        @media (max-width: 768px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .footer-container {
            padding: 3rem 1.5rem 0 1.5rem !important;
          }
        }
      `}</style>
      </div>
    </footer>
  );
};

/* ============================================================
   SUBCOMPONENTE: Fila de información de contacto
   ============================================================ */
interface FooterInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  href?: string;
}

const FooterInfoItem: React.FC<FooterInfoItemProps> = ({ icon, label, value, href }) => {
  const content = (
    <div
      className="footer-info-row"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        background: 'transparent',
        border: '1px solid transparent',
        padding: '0.6rem 0.8rem',
        marginLeft: '-0.8rem',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-accent-blue)',
        flexShrink: 0,
        marginTop: '2px',
        marginRight: '5px'
      }}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', justifyContent: 'center' }}>
        <span style={{
          fontSize: '0.72rem',
          color: 'rgba(255, 255, 255, 0.65)',
          fontWeight: 600,
          letterSpacing: '0.5px',
        }}>
          {label}
        </span>
        {value && (
          <span
            className="footer-info-value"
            style={{
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 700,
              transition: 'color 0.3s',
            }}
          >
            {value}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        {content}
      </a>
    );
  }
  return content;
};

export default Footer;
