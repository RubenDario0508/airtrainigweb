import React, { useState, useEffect, useRef, Suspense, lazy, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSequence } from './components/HeroSequence';
const Sedes = lazy(() => import('./components/Sedes').then(m => ({ default: m.Sedes })));
const VidaAcademica = lazy(() => import('./components/VidaAcademica').then(m => ({ default: m.VidaAcademica })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { EnrollmentForm } from './components/EnrollmentForm';
import { MobileBackToTop } from './components/MobileBackToTop';
const ProgramasPage = lazy(() => import('./components/ProgramasPage').then(m => ({ default: m.ProgramasPage })));
const InfraestructuraPage = lazy(() => import('./components/InfraestructuraPage').then(m => ({ default: m.InfraestructuraPage })));
const EducacionContinuaPage = lazy(() => import('./components/EducacionContinuaPage').then(m => ({ default: m.EducacionContinuaPage })));
const SmsPage = lazy(() => import('./components/SmsPage').then(m => ({ default: m.SmsPage })));
const MorPage = lazy(() => import('./components/MorPage').then(m => ({ default: m.MorPage })));
const BibliotecaPage = lazy(() => import('./components/BibliotecaPage').then(m => ({ default: m.BibliotecaPage })));
const PracticasLaboralesPage = lazy(() => import('./components/PracticasLaboralesPage').then(m => ({ default: m.PracticasLaboralesPage })));
const AlianzasEducativasPage = lazy(() => import('./components/AlianzasEducativasPage').then(m => ({ default: m.AlianzasEducativasPage })));
const BlogPage = lazy(() => import('./components/BlogPage').then(m => ({ default: m.BlogPage })));
const TrabajaConNosotrosPage = lazy(() => import('./components/TrabajaConNosotrosPage').then(m => ({ default: m.TrabajaConNosotrosPage })));
const AdmisionPage = lazy(() => import('./components/AdmisionPage').then(m => ({ default: m.AdmisionPage })));
const OperacionesPage = lazy(() => import('./components/OperacionesPage').then(m => ({ default: m.OperacionesPage })));
const CertificadosYConstanciasPage = lazy(() => import('./components/CertificadosYConstanciasPage').then(m => ({ default: m.CertificadosYConstanciasPage })));

const App: React.FC = () => {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'programas' | 'simuladores' | 'educacion' | 'sms' | 'mor' | 'biblioteca' | 'practicas-laborales' | 'alianzas-educativas' | 'blog' | 'trabaja-con-nosotros' | 'certificados' | 'certificados-constancias' | 'admision-dpa' | 'admision-tcp' | 'admision-pca' | 'admision-ppa' | 'admision-complementarios' | 'operaciones'>(() => {
    // Detect page from URL hash on initial load
    const hash = window.location.hash;
    if (hash === '#programas') return 'programas';
    if (hash === '#simuladores') return 'simuladores';
    if (hash === '#educacion') return 'educacion';
    if (hash === '#sms') return 'sms';
    if (hash === '#mor') return 'mor';
    if (hash === '#biblioteca') return 'biblioteca';
    if (hash === '#practicas-laborales') return 'practicas-laborales';
    if (hash === '#alianzas-educativas') return 'alianzas-educativas';
    if (hash === '#blog') return 'blog';
    if (hash === '#trabaja-con-nosotros') return 'trabaja-con-nosotros';
    if (hash === '#certificados-constancias') return 'certificados-constancias';
    if (hash === '#admision-dpa') return 'admision-dpa';
    if (hash === '#admision-tcp') return 'admision-tcp';
    if (hash === '#admision-pca') return 'admision-pca';
    if (hash.startsWith('#admision-ppa')) return 'admision-ppa';
    if (hash.startsWith('#admision-complementarios')) return 'admision-complementarios';
    if (hash.startsWith('#operaciones')) return 'operaciones';
    return 'home';
  });

  // Global Hash Change Listener for robust routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#programas') setCurrentPage('programas');
      else if (hash === '#simuladores') setCurrentPage('simuladores');
      else if (hash === '#educacion') setCurrentPage('educacion');
      else if (hash === '#sms') setCurrentPage('sms');
      else if (hash === '#mor') setCurrentPage('mor');
      else if (hash === '#biblioteca') setCurrentPage('biblioteca');
      else if (hash === '#practicas-laborales') setCurrentPage('practicas-laborales');
      else if (hash === '#alianzas-educativas') setCurrentPage('alianzas-educativas');
      else if (hash === '#blog') setCurrentPage('blog');
      else if (hash === '#trabaja-con-nosotros') setCurrentPage('trabaja-con-nosotros');
      else if (hash === '#certificados-constancias') setCurrentPage('certificados-constancias');
      else if (hash === '#admision-dpa') setCurrentPage('admision-dpa');
      else if (hash === '#admision-tcp') setCurrentPage('admision-tcp');
      else if (hash === '#admision-pca') setCurrentPage('admision-pca');
      else if (hash.startsWith('#admision-ppa')) setCurrentPage('admision-ppa');
      else if (hash.startsWith('#admision-complementarios')) setCurrentPage('admision-complementarios');
      else if (hash.startsWith('#operaciones')) setCurrentPage('operaciones');
      else {
        // Any other hashes (like #sedes, #pqrs, #home, or empty) belong to the 'home' page view
        setCurrentPage('home');
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Smooth Scroll (Lenis) and Sync with GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Awwwards standard easing
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // GSAP ScrollTrigger automatically handles resize events cleanly with debouncing.
    // We removed the custom ResizeObserver that was causing infinite refresh loops on mobile
    // when the browser URL bar hides/shows on first scroll.
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenisRef.current = null;
    };
  }, []);

  // Handle Page Changes (Reset scroll position & resize scroll engine)
  useEffect(() => {
    // Reset browser scroll to top instantly
    window.scrollTo(0, 0);

    // Reset Lenis scroll instantly and trigger resize to adapt to new height
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
        ScrollTrigger.refresh();

        // Handle anchor scrolling via Lenis when landing on Home page
        const hash = window.location.hash;
        if (currentPage === 'home' && hash && hash.startsWith('#') && hash !== '#') {
          const el = document.querySelector(hash);
          if (el && lenisRef.current) {
            lenisRef.current.scrollTo(el as HTMLElement, { duration: 1.2 });
          }
        }
      }, 150); // Small timeout to allow DOM heights to settle
    }
  }, [currentPage]);

  const [isScrollUnlocked, setIsScrollUnlocked] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Default to 'dark' (Cockpit Night Mode) for rich aesthetics on first glance
    const savedTheme = localStorage.getItem('air-training-theme');
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('air-training-theme', theme);
  }, [theme]);

  // Set page meta title dynamically
  useEffect(() => {
    document.title = "Air Training | Excelencia en el Aire - Escuela de Aviación";
  }, []);

  // Enable native scrolling for the 3D Parallax sequence
  useEffect(() => {
    // Force scroll restoration to manual permanently to prevent browser from auto-scrolling to cached scroll positions on page load/reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (!isScrollUnlocked) {
      // Force scroll to top on mount
      window.scrollTo(0, 0);
      document.body.style.overflow = 'visible';
      document.documentElement.style.overflow = 'visible';
    } else {
      // If there is a hash in the URL (like #sedes), scroll to it after a tiny timeout to allow DOM heights to settle
      const hash = window.location.hash;
      if (hash && hash !== '#programas' && hash !== '#simuladores' && hash !== '#blog') {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 200);
      }
    }
  }, [isScrollUnlocked]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleOpenEnrollment = useCallback(() => {
    setIsEnrollmentOpen(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIsScrollUnlocked(true);
  }, []);

  return (
    <div className={`app-container ${theme}`}>
      {/* Floating Header */}
      <Header
        onOpenEnrollment={handleOpenEnrollment}
        theme={theme}
        toggleTheme={toggleTheme}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      {/* Main Sections */}
      <main>
        <Suspense fallback={<div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>Cargando...</div>}>
          {currentPage === 'home' ? (
            <>
              {/* Interactive Parallax Video & Sequence Sequence */}
              <HeroSequence 
                onOpenEnrollment={handleOpenEnrollment} 
                onIntroComplete={handleIntroComplete}
              />

              {/* Translucent Main Page Content - Slides & Fades in beautifully when scroll is unlocked */}
              <div
                className={`unlocked-content-fade-in ${isScrollUnlocked ? 'visible' : ''}`}
                style={{
                  display: 'block',
                  pointerEvents: 'auto',
                  opacity: isScrollUnlocked ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out'
                }}
              >
                <Sedes />
                <VidaAcademica />
              </div>
            </>
          ) : currentPage === 'programas' ? (
            <ProgramasPage />
          ) : currentPage === 'simuladores' ? (
            <InfraestructuraPage />
          ) : currentPage === 'educacion' ? (
            <EducacionContinuaPage />
          ) : currentPage === 'sms' ? (
            <SmsPage />
          ) : currentPage === 'mor' ? (
            <MorPage />
          ) : currentPage === 'biblioteca' ? (
            <BibliotecaPage />
          ) : currentPage === 'practicas-laborales' ? (
            <PracticasLaboralesPage />
          ) : currentPage === 'alianzas-educativas' ? (
            <AlianzasEducativasPage />
          ) : currentPage === 'trabaja-con-nosotros' ? (
            <TrabajaConNosotrosPage theme={theme} />
          ) : currentPage === 'certificados-constancias' ? (
            <CertificadosYConstanciasPage theme={theme} />
          ) : currentPage === 'admision-dpa' ? (
            <AdmisionPage programTitle="Despachador de Aeronaves" />
          ) : currentPage === 'admision-tcp' ? (
            <AdmisionPage programTitle="Tripulante de Cabina de Pasajeros" />
          ) : currentPage === 'admision-pca' ? (
            <AdmisionPage programTitle="Piloto Comercial de Avión" />
          ) : currentPage === 'admision-ppa' ? (
            <AdmisionPage programTitle="Piloto Privado de Avión" />
          ) : currentPage === 'admision-complementarios' ? (
            <AdmisionPage programTitle="Convalidaciones - Nivelación Operacional" />
          ) : currentPage === 'operaciones' ? (
            <OperacionesPage />
          ) : (
            <BlogPage theme={theme} />
          )}
        </Suspense>
      </main>

      {/* Global Footer (Visible in all pages, but in home only when scroll is unlocked) */}
      {(currentPage !== 'home' || isScrollUnlocked) && (
        <div className={currentPage === 'home' && isScrollUnlocked ? 'unlocked-content-fade-in' : ''}>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      )}

      {/* Floating Contact Widgets */}
      <WhatsAppWidget />
      <MobileBackToTop />

      {/* Sliding Glass Enrollment Drawer Overlay */}
      <EnrollmentForm
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
      />
    </div>
  );
};

export default App;
