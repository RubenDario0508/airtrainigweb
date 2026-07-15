import React, { useState } from 'react';
import { RiWhatsappLine } from 'react-icons/ri';

export const WhatsAppWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-dismiss tooltip after a few seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phone = '573214002431'; // Teléfono oficial
    const message = encodeURIComponent('Hola Air Training, estoy interesado en recibir información sobre los programas de aviación y matrículas.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem', /* Positioned back down */
        right: '1.5rem',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      {/* Tooltip Message */}
      {showTooltip && (
        <div
          className="glass-panel"
          style={{
            padding: '5px 10px',
            borderRadius: '8px',
            fontSize: '0.65rem',
            fontWeight: 700,
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-accent-green)',
            boxShadow: '0 4px 20px rgba(46, 204, 113, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            animation: 'airplaneFloat 4s ease-in-out infinite',
            color: 'var(--color-text-primary)'
          }}
        >
          <span style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-accent-green)'
          }} />
          ¿Hablamos por WhatsApp?
        </div>
      )}

      {/* Pulsing Button */}
      <button
        onClick={handleWhatsAppClick}
        className="pulse-glow"
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: isHovered 
            ? 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)' 
            : 'linear-gradient(135deg, #25D366 0%, #20ba5a 100%)',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          boxShadow: isHovered 
            ? '0 6px 20px rgba(37, 211, 102, 0.45)' 
            : '0 4px 15px rgba(37, 211, 102, 0.3)',
          transform: isHovered ? 'scale(1.1) rotate(8deg)' : 'scale(1) rotate(0deg)'
        }}
        onMouseEnter={() => {
          setShowTooltip(true);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setShowTooltip(false);
          setIsHovered(false);
        }}
      >
        <RiWhatsappLine size={22} />
      </button>

      {/* CSS Injected for pulsating loop and keyframe */}
      <style>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45); }
          70% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .pulse-glow {
          animation: pulseGlow 2.5s infinite;
        }
      `}</style>
    </div>
  );
};
