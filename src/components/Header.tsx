import React, { useState, useEffect, useRef } from 'react';
import { RiMenuLine, RiCloseLine, RiSunLine, RiMoonLine } from 'react-icons/ri';

interface HeaderProps {
  onOpenEnrollment: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setCurrentPage: (page: 'home' | 'programas' | 'simuladores' | 'educacion' | 'sms' | 'mor' | 'biblioteca' | 'practicas-laborales' | 'alianzas-educativas' | 'blog' | 'trabaja-con-nosotros' | 'certificados' | 'certificados-constancias' | 'admision-dpa' | 'admision-tcp' | 'admision-pca' | 'admision-ppa' | 'admision-complementarios' | 'operaciones') => void;
  currentPage: 'home' | 'programas' | 'simuladores' | 'educacion' | 'sms' | 'mor' | 'biblioteca' | 'practicas-laborales' | 'alianzas-educativas' | 'blog' | 'trabaja-con-nosotros' | 'certificados' | 'certificados-constancias' | 'admision-dpa' | 'admision-tcp' | 'admision-pca' | 'admision-ppa' | 'admision-complementarios' | 'operaciones';
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnrollment, theme, toggleTheme, setCurrentPage, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Handle responsive state reliably via JS + UserAgent
    const checkViewport = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      // Force desktop nav if on a PC, otherwise use width breakpoint
      setIsDesktop(!isMobileDevice || window.innerWidth > 768);
    };
    
    // Initial check
    checkViewport();
    
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Programas', href: '#programas', pageId: 'programas' },
    { name: 'Simuladores y Aeronaves', href: '#simuladores', pageId: 'simuladores' },
    { name: 'Educación Continua', href: '#educacion', pageId: 'educacion' },
    { name: 'SMS', href: '#sms', pageId: 'sms', isDropdown: true, subLinks: [
      { name: 'SMS', href: '#sms', pageId: 'sms' },
      { name: 'MOR', href: '#mor', pageId: 'mor' }
    ] },
    { name: 'Biblioteca', href: '#biblioteca', pageId: 'biblioteca' },
    { name: 'Alianzas', href: '#practicas-laborales', pageId: 'practicas-laborales', isDropdown: true, subLinks: [
      { name: 'Prácticas Laborales', href: '#practicas-laborales', pageId: 'practicas-laborales' },
      { name: 'Alianzas Educativas', href: '#alianzas-educativas', pageId: 'alianzas-educativas' }
    ] },
    { name: 'Blog', href: '#blog', pageId: 'blog', isDropdown: true, subLinks: [
      { name: 'Blog', href: '#blog', pageId: 'blog' },
      { name: 'Trabaja con Nosotros', href: '#trabaja-con-nosotros', pageId: 'trabaja-con-nosotros' },
      { name: 'Certificaciones', href: '#certificados-constancias', pageId: 'certificados-constancias' }
    ] }
  ];
  const headerBgScrolled = theme === 'dark' ? 'rgba(7, 12, 23, 0.65)' : 'rgba(255, 255, 255, 0.85)';
  const headerBgTop = theme === 'dark' ? 'rgba(7, 12, 23, 0.2)' : 'rgba(255, 255, 255, 0.25)';
  const textColor = theme === 'dark' ? '#ffffff' : '#1a1a1a';
  const borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';

  return (
    <header
      ref={headerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
        backgroundColor: (isScrolled || currentPage !== 'home') ? headerBgScrolled : headerBgTop,
        backdropFilter: (isScrolled || currentPage !== 'home') ? 'blur(12px)' : 'blur(4px)',
        WebkitBackdropFilter: (isScrolled || currentPage !== 'home') ? 'blur(12px)' : 'blur(4px)',
        borderBottom: `1px solid ${(isScrolled || currentPage !== 'home') ? borderColor : 'transparent'}`,
        boxShadow: (isScrolled || currentPage !== 'home') ? '0 2px 10px rgba(0, 0, 0, 0.05)' : 'none',
        padding: (isScrolled || currentPage !== 'home') ? '0.4rem 0' : '0.8rem 0',
        color: textColor,
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        {/* Logo / Home Routing */}
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault(); 
            window.location.hash = '';
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', zIndex: 2, textDecoration: 'none' }}
        >
          <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <img
              src="/icon.png?v=2"
              alt="Air Training Logo"
              style={{
                height: '35px',
                width: 'auto',
                objectFit: 'contain',
                filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 0.3s ease'
              }}
            />
          </span>
        </a>

        {/* Center Inline Navigation */}
        {isDesktop && (
          <nav style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(0.6rem, 1.2vw, 1.2rem)',
            alignItems: 'center',
            zIndex: 10,
            padding: '0 15px',
            marginLeft: 'clamp(1rem, 2.5vw, 4rem)'
          }}>
            {navLinks.map(link => (
              <div 
                key={link.name} 
                style={{ position: 'relative' }}
                onMouseEnter={() => link.isDropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => link.isDropdown && setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="magnetic"
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(0.7rem, 0.8vw, 0.8rem)',
                    color: (link.pageId === currentPage || (link.isDropdown && link.subLinks?.some(s => s.pageId === currentPage))) ? 'var(--color-accent-red)' : textColor,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transition: 'color 0.3s',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-red)'; }}
                  onMouseLeave={(e) => { 
                    if (link.pageId !== currentPage && !(link.isDropdown && link.subLinks?.some(s => s.pageId === currentPage))) {
                      e.currentTarget.style.color = textColor; 
                    }
                  }}
                  onClick={(e) => {
                    const isPageState = ['programas', 'simuladores', 'educacion', 'sms', 'mor', 'biblioteca', 'blog', 'alianzas-educativas', 'practicas-laborales', 'trabaja-con-nosotros'].includes(link.pageId || '');
                    
                    if (isPageState) {
                      window.location.hash = link.href;
                      setCurrentPage(link.pageId as any);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      e.preventDefault();
                      window.location.hash = link.href;
                      if (link.href.startsWith('#') && link.href !== '#') {
                        setCurrentPage('home');
                        setTimeout(() => {
                          const el = document.querySelector(link.href);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 200);
                      } else {
                        setCurrentPage('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }

                    if (link.isDropdown) {
                       setActiveDropdown(activeDropdown === link.name ? null : link.name);
                    }
                  }}
                >
                  {link.name}
                  {link.isDropdown && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: activeDropdown === link.name ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  )}
                </a>

                {link.isDropdown && activeDropdown === link.name && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: '10px'
                  }}>
                    <div style={{
                      backgroundColor: theme === 'dark' ? 'rgba(15, 20, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                      borderRadius: '12px',
                      padding: '0.8rem 0',
                      minWidth: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      boxShadow: theme === 'dark' ? '0 12px 35px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.06)',
                      transition: 'all 0.3s ease'
                    }}>
                      {link.subLinks?.map(sub => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          style={{
                            padding: '0.5rem 1.5rem',
                            color: sub.pageId === currentPage ? 'var(--color-accent-red)' : textColor,
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            transition: 'background 0.2s, color 0.2s',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => { 
                            e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'; 
                            e.currentTarget.style.color = 'var(--color-accent-red)';
                          }}
                          onMouseLeave={(e) => { 
                            e.currentTarget.style.backgroundColor = 'transparent'; 
                            if (sub.pageId !== currentPage) e.currentTarget.style.color = textColor; 
                          }}
                          onClick={() => {
                            setActiveDropdown(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Operaciones Portal */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              marginLeft: 'clamp(0.2rem, 0.5vw, 1rem)'
            }}>
              <a
                href="#operaciones"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '#operaciones';
                  setCurrentPage('operaciones');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="magnetic"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transform: 'translate(-1px, -1px)',
                  padding: '10px' // Increased hit area
                }}
              >
                <div 
                  aria-label="Operaciones" 
                  style={{ 
                    height: '24px', // Increased size from 16
                    width: '60px', // Increased size from 48
                    backgroundColor: theme === 'dark' ? '#ffffff' : 'var(--color-accent-red)',
                    WebkitMaskImage: 'url(/Logooperaciones.png)',
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskImage: 'url(/Logooperaciones.png)',
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    transition: 'background-color 0.3s ease'
                  }} 
                />
              </a>
            </div>
          </nav>
        )}

        {/* Right Side Navigation Controls (Unified for all devices) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.8rem, 1vw, 15px)' }}>
          
          {/* Q10 Portal Login */}
          {isDesktop && (
            <a
              href="https://airtraining.q10.com"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic"
              style={{
                fontWeight: 800,
                fontSize: 'clamp(0.7rem, 0.8vw, 0.8rem)',
                color: textColor,
                textDecoration: 'none',
                letterSpacing: '0.5px',
                transition: 'color 0.3s',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-red)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = textColor; }}
            >
              Q10
            </a>
          )}

          {/* Theme Switcher */}
          <button
            className="magnetic"
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: textColor,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {theme === 'dark' ? <RiSunLine size={18} style={{ color: 'var(--color-accent-blue)' }} /> : <RiMoonLine size={18} />}
          </button>
          
          {/* Main CTA */}
          {isDesktop && (
            <div style={{
              opacity: 1,
              transform: 'translateY(0)',
              pointerEvents: 'auto',
              transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)'
            }}>
              <button
                className="btn-primary magnetic"
                onClick={onOpenEnrollment}
                style={{ 
                  padding: '0.4rem 1.2rem', 
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderRadius: '50px',
                  whiteSpace: 'nowrap',
                  border: 'none',
                  color: '#ffffff'
                }}
              >
                Inscríbete
              </button>
            </div>
          )}

          {/* Menu Hamburger Toggle - Only on Mobile */}
          {!isDesktop && (
            <button
              className="magnetic"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: textColor,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '0.4rem'
              }}
            >
              {isMobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Full-Screen Overlay Menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100vh',
          background: theme === 'dark' ? 'rgba(2, 5, 12, 0.95)' : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: -1, // Sits behind the header container
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          opacity: isMobileMenuOpen ? 1 : 0,
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          transition: 'transform 0.7s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s ease'
        }}
      >
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0, margin: 0, textAlign: 'center', listStyle: 'none' }}>
          {navLinks.map((link, index) => (
            <li 
              key={link.name} 
              style={{
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) ${0.1 * index}s`
              }}
            >
              <a
                href={link.href}
                onClick={(e) => {
                  if (link.isDropdown) {
                    setActiveDropdown(activeDropdown === link.name ? null : link.name);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                  
                  const isPageState = ['programas', 'simuladores', 'educacion', 'sms', 'mor', 'biblioteca', 'blog', 'alianzas-educativas', 'practicas-laborales', 'trabaja-con-nosotros'].includes(link.pageId || '');
                  
                  if (isPageState) {
                    window.location.hash = link.href;
                    setCurrentPage(link.pageId as any);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    e.preventDefault();
                    window.location.hash = link.href;
                    if (link.href.startsWith('#')) {
                      if (link.href !== '#') {
                        setCurrentPage('home');
                        setTimeout(() => {
                          const el = document.querySelector(link.href);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 200);
                      } else {
                        setCurrentPage('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }
                  }
                }}
                className="magnetic"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                  fontWeight: 700,
                  color: link.pageId === currentPage ? 'var(--color-accent-red)' : (theme === 'dark' ? '#ffffff' : '#000000'),
                  textDecoration: 'none',
                  letterSpacing: '-0.5px',
                  transition: 'color 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-red)'}
                onMouseLeave={(e) => {
                  if (link.pageId !== currentPage) {
                    e.currentTarget.style.color = theme === 'dark' ? '#ffffff' : '#000000';
                  }
                }}
              >
                {link.name}
              </a>
              {link.isDropdown && activeDropdown === link.name && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem', alignItems: 'center' }}>
                  {link.subLinks?.map(sub => (
                    <a key={sub.name} href={sub.href} style={{ color: sub.pageId === currentPage ? 'var(--color-accent-red)' : 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600 }} onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveDropdown(null);
                      window.scrollTo({top:0, behavior:'smooth'});
                    }}>
                      - {sub.name} -
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}

          {/* Operaciones Mobile Link */}
          <li 
            style={{
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) ${0.1 * navLinks.length}s`
            }}
          >
            <a
              href="#operaciones"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                window.location.hash = '#operaciones';
                setCurrentPage('operaciones');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="magnetic"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '10px'
              }}
            >
              <div 
                aria-label="Operaciones" 
                style={{ 
                  height: '24px', 
                  width: '60px',
                  backgroundColor: theme === 'dark' ? '#ffffff' : 'var(--color-accent-red)',
                  WebkitMaskImage: 'url(/Logooperaciones.png)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskImage: 'url(/Logooperaciones.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  transition: 'background-color 0.3s ease'
                }} 
              />
            </a>
          </li>

          {/* Q10 Mobile Link */}
          <li 
            style={{
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) ${0.1 * navLinks.length}s`
            }}
          >
            <a
              href="https://airtraining.q10.com"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                fontWeight: 800,
                color: theme === 'dark' ? '#ffffff' : '#000000',
                textDecoration: 'none',
                letterSpacing: '-0.5px',
                transition: 'color 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-red)'}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme === 'dark' ? '#ffffff' : '#000000';
              }}
            >
              Q10
            </a>
          </li>
        </ul>
        
        {!isDesktop && (
          <button
            className="btn-primary"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenEnrollment();
            }}
            style={{ 
              marginTop: '2rem',
              padding: '1rem 3rem',
              fontSize: '1.2rem',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) ${0.1 * navLinks.length}s`
            }}
          >
            Inscríbete Ahora
          </button>
        )}
      </div>

    </header>
  );
};
