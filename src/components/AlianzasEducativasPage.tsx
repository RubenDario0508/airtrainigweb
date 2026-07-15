import React, { useEffect } from 'react';


// Icons
const PlaneSolidIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#d3121b"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>;
const WhatsAppIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;

const ContactBar = () => (
  <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '4rem 1.5rem', borderBottom: '1px solid var(--color-bg-tertiary)' }}>
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
      
      {/* Left Side */}
      <div>
        <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem', display: 'flex', gap: '8px' }}>
          <span style={{ color: 'var(--color-text-primary)' }}>Ready</span> 
          <span style={{ color: 'var(--color-text-secondary)' }}>to start</span> 
          <span style={{ color: '#d3121b' }}>?</span>
        </h3>
        <p style={{ fontSize: '0.9rem', fontWeight: 800, margin: '0 0 1.5rem', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>Enrollment</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li style={{ display: 'flex', gap: '10px' }}><span style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>01.</span> Fill in the online form.</li>
          <li style={{ display: 'flex', gap: '10px' }}><span style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>02.</span> Book your interview to show your english level.</li>
          <li style={{ display: 'flex', gap: '10px' }}><span style={{ fontWeight: 'bold', color: 'var(--color-text-primary)' }}>03.</span> Ask for a payment information.</li>
        </ul>
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1.5rem', display: 'flex', gap: '8px' }}>
          <span style={{ color: 'var(--color-text-primary)' }}>More</span> 
          <span style={{ color: 'var(--color-text-secondary)' }}>info</span> 
          <span style={{ color: '#d3121b' }}>!</span>
        </h3>
        <a href="https://wa.me/573214002431" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#d3121b', color: '#fff', padding: '1rem 2rem', borderRadius: '50px', fontWeight: 800, textDecoration: 'none', fontSize: '1.4rem', boxShadow: '0 4px 15px rgba(211, 18, 27, 0.4)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <WhatsAppIcon />
          321 400 2431
        </a>
      </div>

    </div>
  </div>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li style={{ display: 'flex', gap: '8px', marginBottom: '0.3rem', alignItems: 'flex-start' }}>
    <span style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.4' }}>•</span>
    <span style={{ lineHeight: '1.4' }}>{children}</span>
  </li>
);

export const AlianzasEducativasPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', paddingTop: '75px' }}>
      
      {/* A. HERO SECTION */}
      <div style={{
        position: 'relative', width: '100%', height: '100vh', minHeight: '100vh',
        backgroundImage: 'url("/imgpag7/FONDO 4.webp")', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        {/* Overlay oscuro */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} />
        
        {/* Centro: Logo grande circular */}
        <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg-secondary)', borderRadius: '50%', padding: '20px', boxShadow: '0 8px 30px var(--glass-shadow)', marginBottom: '20px' }}>
          <img loading="lazy" src="/imgpag7/logo-sky-hd-01-01.webp" alt="Aviation Sky Club" style={{ width: '220px', height: '220px', objectFit: 'contain' }} />
        </div>
        
        {/* Etiqueta roja abajo */}
        <a 
          href="https://skyaviationclub.com/contact-2/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            position: 'relative', zIndex: 1, backgroundColor: '#d3121b', color: '#fff', 
            padding: '0.8rem 2.5rem', borderRadius: '50px', marginTop: '15px', 
            fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', 
            letterSpacing: '1px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' 
          }}
        >
          Conoce Nuestras Sedes
        </a>
      </div>

      {/* B. CABIN CREW SECTION */}
      <div style={{ 
        width: '100%', 
        background: 'linear-gradient(to bottom, #1b2651 0%, #151d3b 100%)', 
        paddingBottom: '5rem', 
        color: '#fff' 
      }}>
        
        {/* CONTENEDOR 1 (SPLIT SCREEN): Textos a la izquierda, Imagen a la derecha */}
        <div style={{
          width: '100%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          flexWrap: 'wrap-reverse', // En móviles la imagen queda arriba, texto abajo
          minHeight: '850px',
          overflow: 'visible'
        }}>
          
          {/* LADO IZQUIERDO: Contenido y Textos (50%) */}
          <div style={{ 
            flex: '1 1 min(100%, 500px)',
            position: 'relative', 
            zIndex: 3, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            background: 'linear-gradient(135deg, #0a0f1a 0%, #1b2651 100%)',
            textAlign: 'center'
          }}>
            
            {/* Logos horizontales alineados al centro */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2rem' }}>
               <img loading="lazy" src="/icon.png" alt="Air Training" style={{ height: 'clamp(45px, 6vw, 65px)', objectFit: 'contain' }} />
               <img loading="lazy" src="/imgpag7/logo-sky-hd-01-01.webp" alt="Sky Club" style={{ height: 'clamp(55px, 8vw, 75px)', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '50%', padding: '5px' }} />
            </div>

            {/* Títulos centrales */}
            <div style={{ margin: '0 0 2.5rem 0' }}>
              <h1 style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 900, margin: '0', textShadow: '0 2px 10px rgba(0,0,0,0.6)', lineHeight: 1.1 }}>
                AVIATION ENGLISH
              </h1>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: '#d3121b', margin: '0 0 0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
                CABIN CREW
              </h2>
              <p style={{ fontSize: '1.2rem', fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase', margin: 0, color: 'rgba(255,255,255,0.8)' }}>
                INTERNATIONAL OPPORTUNITIES
              </p>
            </div>

            {/* Tarjeta blanca (ahora flotante y más elegante) */}
            <div style={{ 
              position: 'relative', 
              backgroundColor: 'var(--color-bg-secondary)', 
              color: 'var(--color-text-primary)', 
              padding: '2rem 2.5rem', 
              borderRadius: '24px', 
              textAlign: 'center', 
              fontSize: '1.1rem', 
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              lineHeight: 1.6,
              maxWidth: '90%',
              zIndex: 4,
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              Get ready for your airline selection process, train with the best. English program for flight attendants, designed for international airline selection processes.
              <strong style={{ fontWeight: 900, fontSize: '1.2rem', color: '#d3121b', display: 'block', marginTop: '1rem' }}>TOTAL DURATION: 6 MONTHS</strong>
              
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-text-primary)' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-text-primary)' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d3121b' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-text-primary)' }} />
              </div>
            </div>

          </div>

          {/* LADO DERECHO: Imagen Vertical (50%) */}
          <div style={{
            flex: '1 1 min(100%, 500px)',
            position: 'relative',
            minHeight: '600px'
          }}>
            <img loading="lazy" 
              src="/imgpag7/imagentcp.webp" 
              alt="Cabin Crew" 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                objectPosition: 'center', 
                zIndex: 1 
              }}
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.includes('aviacion-1.webp')) {
                  img.src = "/imgpag7/aviacion-1.webp";
                }
              }}
            />
            {/* Degradado lateral suave para fusionar la imagen con el color oscuro izquierdo */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to right, #0a0f1a 0%, transparent 15%, transparent 100%)', pointerEvents: 'none' }} />
          </div>

        </div>

        {/* CONTENEDOR 2 (ABAJO): Módulos y Metodología (Centrado con maxWidth) */}
        <div style={{ maxWidth: '900px', margin: '4rem auto 0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Título MODULES */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0 0 5px 0', letterSpacing: '1px' }}>MODULES</h3>
                <div style={{ display: 'flex', height: '4px' }}>
                  <div style={{ width: '40px', backgroundColor: '#d3121b' }} />
                  <div style={{ width: '120px', backgroundColor: '#fff' }} />
                </div>
              </div>
              <div>
                <PlaneSolidIcon />
              </div>
            </div>

            {/* Grid de módulos con línea roja central */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2px 1fr', gap: '3rem' }}>
              
              {/* Columna 1 */}
              <div>
                <div style={{ marginBottom: '3rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    MODULE <span style={{ fontSize: '2.5rem', lineHeight: 1, fontWeight: 900, color: 'transparent', WebkitTextStroke: '1px #fff' }}>1</span>
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#fff' }}>
                    <ListItem>Pronunciation, grammar, vocabulary.</ListItem>
                    <ListItem>Courtesy on board</ListItem>
                    <ListItem>Aerodynamics & equipment.</ListItem>
                    <ListItem>Airport & hotel</ListItem>
                    <ListItem>Airdome, hangar.</ListItem>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    MODULE <span style={{ fontSize: '2.5rem', lineHeight: 1, fontWeight: 900, color: 'transparent', WebkitTextStroke: '1px #fff' }}>2</span>
                  </h4>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#fff' }}>Fluency, comprehension:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#fff' }}>
                    <ListItem>Weather conditions.</ListItem>
                    <ListItem>Normal / abnormal situations.</ListItem>
                    <ListItem>Inspection, forms and reports.</ListItem>
                  </ul>
                </div>
              </div>

              {/* Línea Divisoria */}
              <div style={{ backgroundColor: '#d3121b', height: '100%', width: '2px', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} />

              {/* Columna 2 */}
              <div>
                <div style={{ marginBottom: '3rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    MODULE <span style={{ fontSize: '2.5rem', lineHeight: 1, fontWeight: 900, color: 'transparent', WebkitTextStroke: '1px #fff' }}>3</span>
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#fff' }}>
                    <ListItem>Interactions.</ListItem>
                    <ListItem>Human factors & legislation.</ListItem>
                    <ListItem>Interviews preparation.</ListItem>
                    <ListItem>GEP test prep.</ListItem>
                    <ListItem>ICAO DOC 9835 AN/453 COMPLIANT</ListItem>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Methodology</h4>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#fff' }}>Onsite classes:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#fff' }}>
                    <ListItem>8 hours per week. AT ATI.</ListItem>
                    <ListItem>Small group sessions.</ListItem>
                    <ListItem>study material included.</ListItem>
                    <ListItem>Interactive platform.</ListItem>
                    <ListItem>LMS 24/7 to self study.</ListItem>
                    <ListItem>Certificate of completion</ListItem>
                    <ListItem>Printable, signed form canada.</ListItem>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* C. CALL TO ACTION (Intermedio) */}
      <ContactBar />

      {/* D. PCA SECTION */}
      <div style={{ 
        width: '100%', 
        background: 'linear-gradient(to bottom, #1b2651 0%, #151d3b 100%)', 
        paddingBottom: '5rem', 
        color: '#fff' 
      }}>
        
        {/* CONTENEDOR 1 (SPLIT SCREEN): Textos a la izquierda, Imagen a la derecha */}
        <div style={{
          width: '100%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          flexWrap: 'wrap-reverse',
          minHeight: '650px',
          overflow: 'visible'
        }}>
          
          {/* LADO IZQUIERDO: Contenido y Textos (50%) */}
          <div style={{ 
            flex: '1 1 min(100%, 400px)',
            position: 'relative', 
            zIndex: 3, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            background: 'linear-gradient(135deg, #0a0f1a 0%, #1b2651 100%)',
            textAlign: 'center'
          }}>
            
            {/* Logos horizontales alineados al centro */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2rem' }}>
               <img loading="lazy" src="/icon.png" alt="Air Training" style={{ height: 'clamp(45px, 6vw, 65px)', objectFit: 'contain' }} />
               <img loading="lazy" src="/imgpag7/logo-sky-hd-01-01.webp" alt="Sky Club" style={{ height: 'clamp(55px, 8vw, 75px)', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '50%', padding: '5px' }} />
            </div>

            {/* Títulos centrales */}
            <div style={{ margin: '0 0 2.5rem 0' }}>
              <h1 style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 900, margin: '0', textShadow: '0 2px 10px rgba(0,0,0,0.6)', lineHeight: 1.1 }}>
                INGLÉS PARA PCA
              </h1>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, color: '#d3121b', margin: '0 0 0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
                PILOTO COMERCIAL
              </h2>
              <p style={{ fontSize: '1.2rem', fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase', margin: 0, color: 'rgba(255,255,255,0.8)' }}>
                INTERNATIONAL OPPORTUNITIES
              </p>
            </div>

            {/* Tarjeta blanca */}
            <div style={{ 
              position: 'relative', 
              backgroundColor: 'var(--color-bg-secondary)', 
              color: 'var(--color-text-primary)', 
              padding: '2rem 2.5rem', 
              borderRadius: '24px', 
              textAlign: 'center', 
              fontSize: '1.1rem', 
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              lineHeight: 1.6,
              maxWidth: '90%',
              zIndex: 4,
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              Speak fluent English in the aviation world. Get ready for international airline selection processes.
              <strong style={{ fontWeight: 900, fontSize: '1.2rem', color: '#d3121b', display: 'block', marginTop: '1rem' }}>TOTAL DURATION: 3 - 6 MONTHS</strong>
              
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-text-primary)' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-text-primary)' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d3121b' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-text-primary)' }} />
              </div>
            </div>

          </div>

          {/* LADO DERECHO: Imagen Vertical (50%) */}
          <div style={{
            flex: '1.5 1 min(100%, 500px)',
            position: 'relative',
            minHeight: '600px',
            backgroundColor: '#0f1520',
            overflow: 'hidden'
          }}>
            <img loading="lazy" 
              src="/imgpag8/carrusel/Carrusel/Avianca pilotos.webp" 
              alt="PCA Pilots" 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                objectPosition: 'center top', 
                zIndex: 1 
              }}
              onError={(e) => {
                const img = e.currentTarget;
                img.src = "/imgpag7/FONDO 2.webp";
              }}
            />
            {/* Degradado lateral suave para fusionar la imagen con el color oscuro izquierdo */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to right, #0a0f1a 0%, transparent 15%, transparent 100%)', pointerEvents: 'none' }} />
          </div>

        </div>

        {/* CONTENEDOR 2 (ABAJO): Módulos y Metodología (Centrado con maxWidth, diseño asimétrico de la guía) */}
        <div style={{ maxWidth: '1000px', margin: '5rem auto 0 auto', padding: '0 1.5rem' }}>
          
          <div className="pca-container-grid">
            
            {/* PARTE IZQUIERDA: Módulo 1 y 2 (Línea en medio) + Pie (ICAO Compliant & 100 Horas) */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              {/* Grid interno para Módulo 1 y 2 con separador rojo */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2px 1fr', gap: '2rem', marginBottom: '3rem' }}>
                
                {/* Módulo 1 */}
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                    MODULE <span style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1 }}>1</span>
                    <span style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1, color: 'transparent', WebkitTextStroke: '1.5px #fff', marginLeft: '2px' }}>— 30hrs</span>
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#fff', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <ListItem>Aerodynamics & Systems.</ListItem>
                    <ListItem>Airport and Hangar.</ListItem>
                    <ListItem>Safety and Security.</ListItem>
                    <ListItem>Picture Descriptions.</ListItem>
                  </ul>
                </div>

                {/* Línea Divisoria Roja Interna */}
                <div style={{ backgroundColor: '#d3121b', width: '2px', height: '100%' }} />

                {/* Módulo 2 */}
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                    MODULE <span style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1 }}>2</span>
                    <span style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1, color: 'transparent', WebkitTextStroke: '1.5px #fff', marginLeft: '2px' }}>— 30hrs</span>
                  </h4>
                  <p style={{ margin: '0 0 0.6rem 0', fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>Fluency, Comprehension</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#fff', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <ListItem>Weather conditions.</ListItem>
                    <ListItem>Human factors.</ListItem>
                    <ListItem>Routine / Non-routine Operations.</ListItem>
                    <ListItem>Pilot-ATC roleplays.</ListItem>
                  </ul>
                </div>

              </div>

              {/* Pie de sección alineado a la izquierda (bajo módulo 1 y 2) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem' }}>
                 <div style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', borderRadius: '50px', padding: '0.6rem 2.2rem', fontWeight: 900, fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', boxShadow: '0 4px 15px var(--glass-shadow)' }}>
                   ICAO DOC 9835 AN/453 COMPLIANT
                 </div>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: 'clamp(5rem, 8vw, 7.5rem)', fontWeight: 900, lineHeight: 1, color: 'transparent', WebkitTextStroke: '2.5px #fff', letterSpacing: '-2px' }}>100</span>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 900, letterSpacing: '2px', lineHeight: 1.1 }}>TOTAL HOURS</span>
                    </div>
                 </div>
              </div>

            </div>

            {/* Separador Rojo Principal */}
            <div className="pca-main-separator" />

            {/* PARTE DERECHA: Módulo 3 + Metodología */}
            <div>
              
              {/* Módulo 3 */}
              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                  MODULE <span style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1 }}>3</span>
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1, color: 'transparent', WebkitTextStroke: '1.5px #fff', marginLeft: '2px' }}>— 40hrs</span>
                </h4>
                <p style={{ margin: '0 0 0.6rem 0', fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>Interview Preparation.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#fff', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <ListItem>TEA/ELPAC breakdown.</ListItem>
                  <ListItem>TEA/ELPAC simulations & feedback.</ListItem>
                </ul>
              </div>

              {/* Metodología */}
              <div>
                <h4 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>Methodology</h4>
                
                {/* ONSITE CLASSES */}
                <div style={{ marginBottom: '1.8rem' }}>
                  <p style={{ margin: '0 0 0.6rem 0', fontSize: '0.9rem', fontWeight: 800, color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>ONSITE CLASSES</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#fff', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <ListItem>10 hours per week.</ListItem>
                    <ListItem>Small group sessions.</ListItem>
                    <ListItem>Study materials included.</ListItem>
                  </ul>
                </div>

                {/* INTERACTIVE PLATFORM */}
                <div>
                  <p style={{ margin: '0 0 0.6rem 0', fontSize: '0.9rem', fontWeight: 800, color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase' }}>INTERACTIVE PLATFORM</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#fff', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <ListItem>LMS 24/7 to self-study.</ListItem>
                  </ul>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* E. CALL TO ACTION (Final) */}
      <ContactBar />
      
    </div>
  );
};
