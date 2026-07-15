import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { RiArrowDropDownLine, RiArrowDropUpLine, RiCheckLine, RiShoppingCartLine, RiDeleteBinLine } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

interface TableRow {
  label: string;
  price: string;
  desc?: string;
  wpId?: string; // WordPress WooCommerce Product ID
}

interface Course {
  id: string;
  title: string;
  image: string;
  hasDropdown: boolean;
  dropdownText?: string;
  table?: TableRow[];
  priceLabel?: string;
  wpId?: string; // WordPress WooCommerce Product ID for single products
}

const COURSES: Course[] = [
  {
    id: 'sms',
    title: 'Sistema de Seguridad Operacional - SMS',
    image: '/imgpag4/sms-pw.jpg',
    hasDropdown: true,
    dropdownText: 'Inversión',
    table: [
      { label: 'Curso Completo', price: '$600.000', wpId: 'wp-id-sms' }
    ]
  },
  {
    id: 'recobro',
    title: 'Recobro de Autonomía',
    image: '/imgpag4/recobro-autonomia-pw.webp',
    hasDropdown: true,
    dropdownText: 'Inversión',
    table: [
      { label: '80-90 días', price: "$818.000", wpId: 'wp-id-recobro-1' },
      { label: '90-180 días', price: "$1'368.000", wpId: 'wp-id-recobro-2' },
      { label: 'Igual o mayor a 360 días', price: "$5'235.000", wpId: 'wp-id-recobro-3' }
    ]
  },
  {
    id: 'ifr',
    title: 'Habilitación IFR',
    image: '/imgpag4/ifr-pw.webp',
    hasDropdown: true,
    dropdownText: 'Inversión',
    table: [
      { label: '20 hrs', desc: 'Curso teórico y navegación', price: "$1'600.000", wpId: 'wp-id-ifr-1' },
      { label: '40 hrs', desc: 'Entrenamiento simulador', price: "$6'240.000", wpId: 'wp-id-ifr-2' },
      { label: '48 hrs', desc: 'Entrenamiento vuelo', price: "$28'683.500", wpId: 'wp-id-ifr-3' }
    ]
  },
  {
    id: 'uas',
    title: 'UAS Continuada',
    image: '/imgpag4/UASCOntinuada.webp',
    hasDropdown: true,
    dropdownText: 'Inversión',
    table: [
      { label: 'Inscripción por persona', price: "$1'000.000", wpId: 'wp-id-uas-1' }
    ]
  }
];

interface CartItem {
  courseId: string;
  wpId: string;
  title: string;
  label: string;
  price: string;
  quantity: number;
}

const CourseCard: React.FC<{ 
  course: Course; 
  onAddToCart: (item: CartItem) => void;
  onRemoveFromCart: (wpId: string) => void;
  cartItems: CartItem[];
}> = ({ course, onAddToCart, onRemoveFromCart, cartItems }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Find if any option from this course is in the cart
  const itemInCart = cartItems.find(item => item.courseId === course.id);
  const selectedWpId = itemInCart?.wpId || null;
  const quantity = itemInCart?.quantity || 1;

  // Determine selected index
  const selectedOption = course.hasDropdown && course.table 
    ? course.table.findIndex(row => row.wpId === selectedWpId)
    : (selectedWpId === course.wpId ? 0 : -1);

  const selectedIdx = selectedOption >= 0 ? selectedOption : null;

  const handleSelectOption = (idx: number) => {
    if (!course.table) return;
    const row = course.table[idx];
    
    // If clicking the already selected option, remove it
    if (selectedIdx === idx) {
      onRemoveFromCart(row.wpId!);
    } else {
      // If there's a different option selected, remove it first
      if (selectedIdx !== null) {
        onRemoveFromCart(course.table[selectedIdx].wpId!);
      }
      // Add new option
      onAddToCart({
        courseId: course.id,
        wpId: row.wpId!,
        title: course.title,
        label: row.label,
        price: row.price,
        quantity: quantity
      });
    }
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 1) return;
    // If an item is already selected, update its quantity in the cart
    if (selectedIdx !== null && course.table) {
      const row = course.table[selectedIdx];
      onAddToCart({
        courseId: course.id,
        wpId: row.wpId!,
        title: course.title,
        label: row.label,
        price: row.price,
        quantity: newQty
      });
    }
  };

  const scrollToCheckout = () => {
    const summaryEl = document.getElementById('resumen-compra');
    if (summaryEl) {
      summaryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="anim-fade-up edu-card" style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--color-bg-secondary)',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      border: '1px solid rgba(0,0,0,0.05)',
      height: '100%'
    }}>
      {/* Top Image */}
      <div className="edu-img-wrapper">
        <img loading="lazy" src={course.image} alt={course.title} />
      </div>

      {/* Bottom Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1.5rem', lineHeight: 1.3 }}>
          {course.title}
        </h3>

        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          {course.hasDropdown && course.table ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
              
              {/* Accordion Toggle */}
              <div 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.6rem', border: '1px solid var(--glass-border)', borderRadius: '50px', backgroundColor: 'var(--color-bg-primary)',
                  fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                  userSelect: 'none'
                }}>
                {course.dropdownText} {isExpanded ? <RiArrowDropUpLine size={24} /> : <RiArrowDropDownLine size={24} />}
              </div>
              
              {/* Accordion Content */}
              <div style={{ 
                maxHeight: isExpanded ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease-in-out',
                opacity: isExpanded ? 1 : 0,
              }}>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', backgroundColor: 'var(--color-bg-primary)', marginBottom: '0.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <tbody>
                      {course.table.map((row: TableRow, idx) => (
                        <tr 
                          key={idx} 
                          onClick={() => handleSelectOption(idx)}
                          style={{ 
                            borderBottom: idx !== (course.table?.length || 0) - 1 ? '1px solid var(--glass-border)' : 'none',
                            cursor: 'pointer',
                            backgroundColor: selectedIdx === idx ? 'rgba(74, 144, 217, 0.08)' : 'transparent',
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <td style={{ padding: '0.8rem 0.5rem', width: '40px', textAlign: 'center' }}>
                            <div style={{ 
                              width: '20px', height: '20px', borderRadius: '50%', 
                              border: `2px solid ${selectedIdx === idx ? 'var(--color-accent-blue)' : 'var(--glass-border)'}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              backgroundColor: selectedIdx === idx ? 'var(--color-accent-blue)' : 'transparent'
                            }}>
                              {selectedIdx === idx && <RiCheckLine color="white" size={14} />}
                            </div>
                          </td>
                          <td style={{ padding: '0.8rem 0.5rem', fontWeight: 700, color: 'var(--color-text-primary)', borderRight: '1px solid var(--glass-border)', width: row.desc ? '25%' : '45%' }}>
                            {row.label}
                          </td>
                          {row.desc && (
                            <td style={{ padding: '0.8rem 0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.75rem', lineHeight: 1.2, borderRight: '1px solid var(--glass-border)', width: '30%' }}>
                              {row.desc}
                            </td>
                          )}
                          <td style={{ padding: '0.8rem 0.5rem', fontWeight: 800, color: 'var(--color-accent-red)', textAlign: 'right' }}>
                            {row.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Selected Status / Quantity Menu */}
        {(course.hasDropdown || course.wpId) && (
          <>
            <div style={{ 
              marginTop: '1.5rem', 
          padding: '0.8rem', 
          backgroundColor: 'var(--color-bg-primary)', 
          borderRadius: '12px',
          border: '1px dashed var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: selectedIdx !== null ? 1 : 0.5,
          transition: 'opacity 0.3s'
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600, textAlign: 'center' }}>
            {selectedIdx !== null && course.hasDropdown && course.table 
              ? `Seleccionado ${quantity} de ${course.table[selectedIdx].label}`
              : 'Ningún ítem seleccionado'}
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.2rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Cantidad:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '2px' }}>
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={selectedIdx === null}
                style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', background: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)', cursor: selectedIdx !== null ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
              >-</button>
              <span style={{ width: '24px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 700 }}>{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={selectedIdx === null}
                style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', background: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)', cursor: selectedIdx !== null ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
              >+</button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', paddingBottom: '0.5rem' }}>
          <button 
            onClick={scrollToCheckout}
            disabled={selectedIdx === null}
            style={{
              backgroundColor: selectedIdx !== null ? 'var(--color-accent-blue)' : 'var(--color-bg-primary)',
              border: `1px solid ${selectedIdx !== null ? 'var(--color-accent-blue)' : 'var(--glass-border)'}`,
              padding: '0.8rem 2rem',
              borderRadius: '50px',
              fontWeight: 700,
              color: selectedIdx !== null ? '#ffffff' : 'var(--color-text-primary)',
              fontSize: '0.9rem',
              cursor: selectedIdx !== null ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              width: '100%',
              opacity: selectedIdx !== null ? 1 : 0.6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {selectedIdx !== null ? (
              <>
                <RiCheckLine size={18} /> Ver en resumen
              </>
            ) : (
              'Elige una opción arriba'
            )}
          </button>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export const EducacionContinuaPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      // If already in cart, update quantity
      const existing = prev.find(i => i.wpId === item.wpId);
      if (existing) {
        return prev.map(i => i.wpId === item.wpId ? { ...i, quantity: item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const handleRemoveFromCart = (wpId: string) => {
    setCartItems(prev => prev.filter(item => item.wpId !== wpId));
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Selecciona al menos un curso.');
      return;
    }
    
    // Create WooCommerce add-to-cart URL. 
    // For multiple items, WooCommerce natively requires plugins or custom code.
    // Assuming a standard or customized redirect logic here:
    const params = new URLSearchParams();
    cartItems.forEach((item, index) => {
      params.append(`product_id[${index}]`, item.wpId);
      params.append(`quantity[${index}]`, item.quantity.toString());
    });
    
    const checkoutUrl = `/?checkout=true&${params.toString()}`;
    alert(`Redirigiendo a pasarela de pagos / checkout...\n\nItems en carrito:\n${cartItems.map(i => `- ${i.quantity}x ${i.title} (${i.label})`).join('\n')}\n\nURL Generada:\n${checkoutUrl}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.anim-fade-up', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} style={{ paddingTop: '140px', minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
      
      <style>{`
        .edu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          align-items: stretch;
        }
        @media (max-width: 1200px) {
          .edu-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .edu-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Card Animations & Shadows */
        .edu-card {
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .edu-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0,10,40,0.15), 0 10px 20px rgba(0,10,40,0.1) !important;
          border-color: rgba(74, 144, 217, 0.3) !important;
        }
        .edu-img-wrapper {
          overflow: hidden;
          width: 100%;
          background-color: #0a0f1a;
          position: relative;
        }
        .edu-img-wrapper img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          transition: transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .edu-card:hover .edu-img-wrapper img {
          transform: scale(1.06);
        }
      `}</style>

      {/* Header Section */}
      <section style={{ width: '100%', padding: '0 5%', marginBottom: '3rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 className="anim-fade-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
            Educación Continua
          </h1>
          <p className="anim-fade-up" style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            Especialízate y avanza en tu carrera aeronáutica con nuestros cursos de extensión.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section style={{ width: '100%', padding: '0 2%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="edu-grid">
            {COURSES.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onAddToCart={handleAddToCart} 
                onRemoveFromCart={handleRemoveFromCart}
                cartItems={cartItems} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Global Checkout Footer Section */}
      <section id="resumen-compra" style={{ width: '100%', padding: '4rem 5% 6rem 5%' }}>
        <div className="anim-fade-up" style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-accent-blue)',
          boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
          borderRadius: '24px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
            <RiShoppingCartLine size={32} color="var(--color-accent-blue)" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
              Resumen de Compra
            </h2>
          </div>
          
          {cartItems.length === 0 ? (
            <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', textAlign: 'center', margin: 0 }}>
              Aún no has seleccionado ningún curso.
            </p>
          ) : (
            <div style={{ border: '1px solid var(--glass-border)', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--color-bg-primary)' }}>
              {cartItems.map((item, idx) => (
                <div key={item.wpId} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '1.2rem', 
                  borderBottom: idx < cartItems.length - 1 ? '1px solid var(--glass-border)' : 'none'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{item.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>Opción: {item.label}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginRight: '0.5rem' }}>Cant: {item.quantity}</span>
                      <span style={{ fontWeight: 800, color: 'var(--color-accent-red)' }}>{item.price}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveFromCart(item.wpId)}
                      style={{ 
                        background: 'rgba(231, 26, 36, 0.1)', 
                        border: 'none', 
                        borderRadius: '8px',
                        padding: '0.5rem',
                        cursor: 'pointer', 
                        color: 'var(--color-accent-red)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(231, 26, 36, 0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(231, 26, 36, 0.1)'}
                    >
                      <RiDeleteBinLine size={20} />
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ padding: '1.2rem', backgroundColor: 'var(--color-bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--glass-border)' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', textTransform: 'uppercase' }}>Subtotal a Pagar:</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-accent-red)' }}>
                  {(() => {
                    let total = 0;
                    cartItems.forEach(item => {
                      const priceVal = parseInt(item.price.replace(/[\$\s'\.]/g, ''), 10) || 0;
                      total += priceVal * item.quantity;
                    });
                    let s = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    if (total >= 1000000) {
                      s = s.replace(/\.(\d{3}\.\d{3})$/, "'$1");
                    }
                    return '$' + s;
                  })()}
                </span>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <button 
              onClick={handleProceedToCheckout}
              disabled={cartItems.length === 0}
              style={{
                backgroundColor: cartItems.length > 0 ? 'var(--color-accent-red)' : 'var(--color-bg-tertiary)',
                color: cartItems.length > 0 ? '#ffffff' : 'var(--color-text-muted)',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '50px',
                fontWeight: 800,
                fontSize: '1.1rem',
                cursor: cartItems.length > 0 ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: cartItems.length > 0 ? '0 4px 15px rgba(231, 26, 36, 0.4)' : 'none',
                width: '100%',
                maxWidth: '400px'
              }}
              onMouseEnter={(e) => {
                if (cartItems.length > 0) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(231, 26, 36, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (cartItems.length > 0) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(231, 26, 36, 0.4)';
                }
              }}
            >
              Proceder con el pago
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
};
