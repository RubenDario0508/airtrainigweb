import React, { useEffect, useState } from 'react';


interface LibraryItem {
  id: number;
  title: string;
  type: string;
  desc?: string;
  date?: string;
}

const MANUALES: LibraryItem[] = [
  { id: 1, title: 'POH Piper PA28 Warrior', desc: 'Para operaciones de entrenamiento.', type: 'Manuales' },
  { id: 2, title: 'POH Piper PA28 Warrior', desc: 'Para operaciones de entrenamiento.', type: 'Manuales' },
  { id: 3, title: 'POH Piper PA28 Warrior', desc: 'Para operaciones de entrenamiento.', type: 'Manuales' }
];

const BIBLIOGRAFICO: LibraryItem[] = [
  { id: 4, title: 'Aerodinámica para Pilotos', desc: 'Para operaciones de entrenamiento.', type: 'Libros' },
  { id: 5, title: 'Meteorología para Pilotos', desc: 'Para operaciones de entrenamiento.', type: 'Libros' },
  { id: 6, title: 'Navegación Aérea', desc: 'Para operaciones de entrenamiento.', type: 'Libros' }
];

const REGULACIONES: LibraryItem[] = [
  { id: 7, title: 'RAC 2 - Personal Aeronáutico', date: 'Oct 2023', type: 'Regulaciones' },
  { id: 8, title: 'RAC 91 - Reglas de Vuelo y Operación', date: 'Sep 2023', type: 'Regulaciones' }
];

const PlaneIcon = () => <img loading="lazy" src="/impgpag6/icon/AVIO%CC%81N.png" alt="Avión" style={{ height: '20px', width: 'auto', objectFit: 'contain' }} />;
const DownloadIcon = () => <img loading="lazy" src="/impgpag6/icon/DESCARGA.png" alt="Descarga" style={{ height: '16px', width: 'auto', objectFit: 'contain' }} />;
const DocIconList = () => <img loading="lazy" src="/impgpag6/icon/DOCUMENTO.png" alt="Doc" style={{ height: '18px', width: 'auto', objectFit: 'contain' }} />;
const PdfBadge = () => <img loading="lazy" src="/impgpag6/icon/PDF.png" alt="PDF" style={{ height: '22px', width: 'auto', objectFit: 'contain' }} />;

const ManualesHeadingIcon = () => <img loading="lazy" src="/impgpag6/icon/MANUALES.png" alt="Manuales" style={{ height: '26px', width: 'auto', objectFit: 'contain' }} />;
const MaterialHeadingIcon = () => <img loading="lazy" src="/impgpag6/icon/MATERIAL.png" alt="Material" style={{ height: '26px', width: 'auto', objectFit: 'contain' }} />;
const RegulacionesHeadingIcon = () => <img loading="lazy" src="/impgpag6/icon/REGULACIONES.png" alt="Regulaciones" style={{ height: '26px', width: 'auto', objectFit: 'contain' }} />;

export const BibliotecaPage: React.FC = () => {
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterItems = (items: LibraryItem[]) => {
    return items.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'Todos' || item.type === filter;
      return matchSearch && matchFilter;
    });
  };

  const filteredManuales = filterItems(MANUALES);
  const filteredLibros = filterItems(BIBLIOGRAFICO);
  const filteredRegulaciones = filterItems(REGULACIONES);

  const showManuales = filteredManuales.length > 0 && (filter === 'Todos' || filter === 'Manuales');
  const showLibros = filteredLibros.length > 0 && (filter === 'Todos' || filter === 'Libros');
  const showRegulaciones = filteredRegulaciones.length > 0 && (filter === 'Todos' || filter === 'Regulaciones');

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.6rem 1.2rem',
    borderRadius: '30px',
    border: active ? '1px solid var(--color-text-primary)' : '1px solid var(--color-text-muted)',
    backgroundColor: active ? 'var(--color-text-primary)' : 'var(--color-bg-secondary)',
    color: active ? 'var(--color-bg-primary)' : 'var(--color-text-primary)',
    fontWeight: 700,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', paddingTop: '75px' }}>
      
      {/* HEADER SECTION */}
      <div style={{ background: 'var(--sky-gradient)', color: '#fff', padding: '3.5rem 1rem 4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0 0 0.5rem' }}>Biblioteca Digital Aeronáutica</h1>
        <p style={{ fontSize: '1rem', color: '#d1d1e0', margin: '0 auto', maxWidth: '800px', textAlign: 'center' }}>
          Acceso a manuales, libros y material de estudio para nuestra comunidad académica.
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '0 1.5rem', marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        {/* SEARCH & FILTERS */}
        <div style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 8px 32px 0 var(--glass-shadow)' }}>
          <input 
            type="text" 
            placeholder="Buscar por título, autor, palabra clave..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: '1 1 300px', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', fontSize: '0.95rem', outline: 'none' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Todos', 'Libros', 'Manuales', 'Regulaciones'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={pillStyle(filter === f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div style={{ padding: '3rem 0 5rem' }}>
          
          {/* MANUALES */}
          {showManuales && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <ManualesHeadingIcon /> Manuales de Vuelo y Operaciones
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {filteredManuales.map(doc => (
                  <div key={doc.id} style={{ border: '1px solid var(--color-bg-tertiary)', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <PdfBadge />
                      <PlaneIcon />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 0.5rem' }}>{doc.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0 0 1.5rem', flex: 1 }}>{doc.desc}</p>
                    <button style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--color-text-primary)', borderRadius: '8px', backgroundColor: 'transparent', color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-text-primary)'; e.currentTarget.style.color = 'var(--color-bg-primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                    >
                      <DownloadIcon /> Descargar PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LIBROS */}
          {showLibros && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <MaterialHeadingIcon /> Material Bibliográfico
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {filteredLibros.map(doc => (
                  <div key={doc.id} style={{ border: '1px solid var(--color-bg-tertiary)', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <PdfBadge />
                      <PlaneIcon />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 0.5rem' }}>{doc.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0 0 1.5rem', flex: 1 }}>{doc.desc}</p>
                    <button style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--color-text-primary)', borderRadius: '8px', backgroundColor: 'transparent', color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-text-primary)'; e.currentTarget.style.color = 'var(--color-bg-primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                    >
                      <DownloadIcon /> Descargar PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REGULACIONES */}
          {showRegulaciones && (
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <RegulacionesHeadingIcon /> Regulaciones y Normativa
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)' }}>
                      <th style={{ padding: '1rem', fontWeight: 700, borderRadius: '8px 0 0 0' }}>Documento</th>
                      <th style={{ padding: '1rem', fontWeight: 700 }}>Fecha</th>
                      <th style={{ padding: '1rem', fontWeight: 700, textAlign: 'right', borderRadius: '0 8px 0 0' }}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegulaciones.map((doc, i) => (
                      <tr key={doc.id} style={{ borderBottom: '1px solid var(--color-bg-tertiary)', backgroundColor: i % 2 === 0 ? 'var(--color-bg-primary)' : 'var(--color-bg-secondary)' }}>
                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.7rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          <DocIconList /> {doc.title}
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{doc.date}</td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <a href="#" style={{ color: 'var(--color-accent-red)', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Visualizar</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredManuales.length === 0 && filteredLibros.length === 0 && filteredRegulaciones.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
              <p>No se encontraron documentos con esa búsqueda o filtro.</p>
            </div>
          )}

        </div>
      </div>

      
    </div>
  );
};
