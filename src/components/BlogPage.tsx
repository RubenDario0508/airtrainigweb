import React, { useState, useEffect } from 'react';
import { 
  RiSearchLine, 
  RiArrowLeftLine, 
  RiInstagramLine, 
  RiFacebookBoxLine, 
  RiArrowRightSLine, 
  RiArrowDownSLine, 
  RiLoader4Line
} from 'react-icons/ri';
import { wpService } from '../services/wordpressMock';
import type { WordPressPost } from '../services/wordpressMock';
import './BlogPage.css';


interface BlogPageProps {
  theme: 'light' | 'dark';
}

export const BlogPage: React.FC<BlogPageProps> = ({ theme }) => {
  // Blog states
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activePostSlug, setActivePostSlug] = useState<string | null>(null);
  const [showNoticiasDropdown, setShowNoticiasDropdown] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(true);
  const [currentBlogImage, setCurrentBlogImage] = useState(0);

  const BLOG_HERO_IMAGES = [
    '/imgpag8/carrusel/Carrusel/Blog TCP_1.webp',
    '/imgpag8/carrusel/Carrusel/Avianca pilotos.webp',
    '/imgpag8/carrusel/Carrusel/TCPs Perales.webp',
    '/imgpag8/carrusel/Carrusel/TCPs Supervivencia.webp'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBlogImage(prev => (prev + 1) % BLOG_HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await wpService.getPosts();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Intelligent Search Bar Hiding/Showing
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down past hero, show if scrolling up
      if (currentScrollY > 300) {
        if (currentScrollY > lastScrollY + 15) {
          setIsSearchVisible(false); // Down
        } else if (currentScrollY < lastScrollY - 15) {
          setIsSearchVisible(true);  // Up
        }
      } else {
        setIsSearchVisible(true);    // Near top
      }
      lastScrollY = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 150) {
        setIsSearchVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Filter posts based on Category and Search Query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activePost = posts.find(p => p.slug === activePostSlug);

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
      {/* Dynamic Header */}
      <section 
        className="blog-header"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* Background Images Carousel */}
        {activePost ? (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url("${activePost.featured_media}")`,
            backgroundSize: 'cover', backgroundPosition: 'center top'
          }} />
        ) : (
          BLOG_HERO_IMAGES.map((src, idx) => (
            <div key={idx} style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: `url("${src}")`,
              backgroundSize: 'cover', backgroundPosition: 'center top',
              opacity: (currentBlogImage % BLOG_HERO_IMAGES.length) === idx ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out'
            }} />
          ))
        )}

        <div className="blog-header-content" style={{ position: 'relative', zIndex: 2 }}>
          {activePost ? (
            <>
              <h1>{activePost.title}</h1>
              <p>{activePost.category}</p>
            </>
          ) : (
            <>
              <h1>Blog / {selectedCategory}</h1>
              <p>Conéctate con la experiencia Air Training</p>
            </>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="blog-container">
        {activePost ? (
          /* ==========================================
             ARTICLE DETAIL VIEW
             ========================================== */
          <div>
            {/* Breadcrumbs */}
            <div className="article-breadcrumbs">
              <span className="breadcrumb-link" onClick={() => setActivePostSlug(null)}>Blog</span>
              <span className="breadcrumb-separator"><RiArrowRightSLine /></span>
              <span className="breadcrumb-link" onClick={() => { setSelectedCategory(activePost.category); setActivePostSlug(null); }}>
                {activePost.category}
              </span>
              <span className="breadcrumb-separator"><RiArrowRightSLine /></span>
              <span className="breadcrumb-current">{activePost.title}</span>
            </div>

            {/* Layout Columnas */}
            <div className="article-layout">
              {/* Columna Izquierda: Cuerpo del Artículo */}
              <article className="article-main">
                <div className="article-content">
                  {activePost.contentBlocks && activePost.contentBlocks.length > 0 ? (
                    activePost.contentBlocks.map((block, idx) => {
                      if (block.type === 'heading') {
                        return <h2 key={idx}>{block.text}</h2>;
                      } else {
                        return <p key={idx}>{block.text}</p>;
                      }
                    })
                  ) : (
                    <p>{activePost.content}</p>
                  )}
                </div>

                <button 
                  onClick={() => setActivePostSlug(null)}
                  style={{
                    marginTop: '2rem',
                    background: 'transparent',
                    border: '1px solid var(--color-accent-blue)',
                    color: 'var(--color-accent-blue)',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-blue)';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-accent-blue)';
                  }}
                >
                  <RiArrowLeftLine /> Regresar al blog
                </button>
              </article>

              {/* Columna Derecha: Sidebar de Previsualización Redes */}
              <aside className="article-sidebar">
                {activePost.socialPreviews && activePost.socialPreviews.length > 0 ? (
                  activePost.socialPreviews.map((preview, index) => (
                    <div className="sidebar-card" key={index}>
                      <div className="sidebar-card-header">
                        {preview.platform === 'instagram' ? (
                          <RiInstagramLine size={18} style={{ color: '#e1306c' }} />
                        ) : (
                          <RiFacebookBoxLine size={18} style={{ color: '#1877f2' }} />
                        )}
                      </div>
                      <div className="sidebar-card-media">
                        <img loading="lazy" 
                          src={preview.imageUrl} 
                          alt={`Flyer ${preview.platform}`} 
                          className="sidebar-card-img" 
                        />
                      </div>
                      <div className="sidebar-card-body">
                        {preview.platform === 'instagram' ? (
                          <a 
                            href={preview.postUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="sidebar-card-link-instagram"
                          >
                            {preview.label}
                          </a>
                        ) : (
                          <a 
                            href={preview.postUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="sidebar-card-link-facebook"
                          >
                            {preview.label}
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1.5rem', background: 'var(--color-bg-secondary)', borderRadius: '12px' }}>
                    No hay publicaciones en redes vinculadas a este artículo.
                  </div>
                )}
              </aside>
            </div>
          </div>
        ) : (
          /* ==========================================
             BLOG INDEX / GRID LIST VIEW
             ========================================== */
          <div>
            {/* Buscador y Filtros */}
            <div className={`blog-controls-wrapper ${!isSearchVisible ? 'blog-controls-hidden' : ''}`}>
              {/* Buscador */}
              <div className="blog-search-box">
                <input 
                  type="text" 
                  placeholder="Buscar en el blog, palabras clave..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="blog-search-input"
                />
                <RiSearchLine className="blog-search-icon" size={16} />
              </div>

              {/* Filtros Categorías */}
              <div className="blog-filter-tabs">
                {['Todos', 'Orgullo ATI', 'Vida estudiantil', 'Cultura Aeronáutica'].map(cat => (
                  <button
                    key={cat}
                    className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowNoticiasDropdown(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}

                {/* Dropdown de Noticias ATI / Filtro Opcional */}
                <div style={{ position: 'relative' }}>
                  <button
                    className={`filter-tab ${selectedCategory === 'Noticias ATI' ? 'active' : ''}`}
                    onClick={() => setShowNoticiasDropdown(!showNoticiasDropdown)}
                    style={{ gap: '4px' }}
                  >
                    Más {selectedCategory === 'Noticias ATI' ? '(Noticias ATI)' : ''}
                    <RiArrowDownSLine style={{ transform: showNoticiasDropdown ? 'rotate(180deg)' : 'rotate(0)' }} />
                  </button>
                  {showNoticiasDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '110%',
                      right: 0,
                      backgroundColor: theme === 'dark' ? 'rgba(20, 31, 54, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '8px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                      padding: '0.5rem',
                      zIndex: 10,
                      minWidth: '150px'
                    }}>
                      <button
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.5rem 1rem',
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--color-text-primary)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          borderRadius: '4px'
                        }}
                        onClick={() => {
                          setSelectedCategory('Noticias ATI');
                          setShowNoticiasDropdown(false);
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(74, 144, 217, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        Noticias ATI
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Listado de Artículos */}
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 0' }}>
                <RiLoader4Line size={48} className="spinner" style={{ color: 'var(--color-accent-blue)', animation: 'spin 1s linear infinite' }} />
                <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>Cargando artículos...</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="blog-grid animate-fade-in">
                {filteredPosts.map(post => (
                  <div 
                    className="blog-card" 
                    key={post.id}
                    onClick={() => setActivePostSlug(post.slug)}
                  >
                    <div className="blog-card-media">
                      <img loading="lazy" 
                        src={post.featured_media} 
                        alt={post.title} 
                        className="blog-card-img" 
                      />
                    </div>
                    <div className="blog-card-body">
                      <span className="blog-card-category">{post.category}</span>
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      <div className="blog-card-footer">
                        <span className="blog-card-date">{post.date}</span>
                        <span className="blog-card-link">
                          Leer más <RiArrowRightSLine />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-text-muted)' }}>
                <h3>No se encontraron artículos</h3>
                <p>Intenta con otras palabras clave o cambia de categoría.</p>
              </div>
            )}
          </div>
        )}
      </div>

      
    </div>
  );
};
