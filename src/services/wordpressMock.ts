export interface SocialPreview {
  platform: 'instagram' | 'facebook';
  imageUrl: string;
  postUrl: string;
  label: string;
}

export interface WordPressPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featured_media: string;
  slug: string;
  category: 'Orgullo ATI' | 'Vida estudiantil' | 'Cultura Aeronáutica' | 'Noticias ATI';
  socialPreviews?: SocialPreview[];
  contentBlocks?: { type: 'heading' | 'paragraph'; text: string }[];
}

export interface WordPressAPIPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
  slug: string;
  categories_names?: string[];
}

export interface WordPressSede {
  id: number;
  title: string;
  address: string;
  description: string;
  mapsUrl: string;
  imageUrl: string;
}

export interface EnrollmentSubmission {
  nombre: string;
  email: string;
  telefono: string;
  programa: string;
  sede: string;
}

// Datos Mock del Sitio Web "Air Training"
export const MOCK_POSTS: WordPressPost[] = [
  {
    id: 1,
    title: "Día del Tripulante de Cabina ✈️💙",
    excerpt: "Hoy celebramos a quienes hacen del cielo su pasión y del servicio su vocación. Ser Tripulante de Cabina no es solo viajar… es inspirar confianza y brindar seguridad.",
    content: "Hoy celebramos a quienes hacen del cielo su pasión y del servicio su vocación. ✈️💙\n\nSer Tripulante de Cabina no es solo viajar… es inspirar confianza, brindar seguridad, representar disciplina y transformar cada vuelo en una experiencia inolvidable. 🌍✨\n\nEn este Día del TCP queremos rendir homenaje a todos aquellos que decidieron perseguir sus sueños a miles de pies de altura, demostrando que con esfuerzo, actitud y preparación, todo es posible. 🛫\n\nFeliz Día del Tripulante de Cabina de Pasajeros.\nQue nunca dejen de volar tan alto como sus sueños. 💺☁️",
    date: "31 Mayo 2026",
    featured_media: "/imgpag8/instagram_1.jpg",
    slug: "dia-del-tcp-2026",
    category: "Orgullo ATI",
    socialPreviews: [
      {
        platform: "instagram",
        imageUrl: "/imgpag8/instagram_1.jpg",
        postUrl: "https://www.instagram.com/reel/DZAd6yiAdY8/?igsh=MWlvbDlxdTdra2g5Yw==",
        label: "Ir a publicación en Instagram"
      }
    ]
  },
  {
    id: 2,
    title: "Piper PA-28 Warrior: Leyenda de Entrenamiento ✈️",
    excerpt: "Conoce uno de los aviones más icónicos en la formación de pilotos: el PIPER PA-28 Warrior. Te mostramos su ficha técnica y por qué es ideal para el entrenamiento.",
    content: "✈️ Conoce uno de los aviones más icónicos en la formación de pilotos: el PIPER PA-28 Warrior.\n\nEn este video te mostramos su ficha técnica, historia y las características que lo han convertido en una aeronave ideal para entrenamiento y vuelos de instrucción alrededor del mundo. 🌍\n\nDesde su estabilidad en vuelo hasta su diseño confiable, el PA-28 Warrior ha sido parte de la formación de miles de pilotos que hoy surcan los cielos. 👨‍✈️👩‍✈️\n\n¿Ya conocías este legendario avión de entrenamiento? ✈️🔥",
    date: "25 Mayo 2026",
    featured_media: "/imgpag8/instagram_2.jpg",
    slug: "piper-pa28-warrior-entrenamiento",
    category: "Vida estudiantil",
    socialPreviews: [
      {
        platform: "instagram",
        imageUrl: "/imgpag8/instagram_2.jpg",
        postUrl: "https://www.instagram.com/reel/DYx4IwJgSqa/?igsh=MmtoZWp0aHVjdmZr",
        label: "Ir a publicación en Instagram"
      }
    ]
  },
  {
    id: 3,
    title: "El Alfabeto Fonético Aeronáutico 🎙️",
    excerpt: "¿Sabías que en aviación cada letra tiene una pronunciación oficial? Conoce cómo funciona el alfabeto fonético y cómo evita errores durante las transmisiones de radio.",
    content: "✈️ ¿Sabías que en aviación cada letra tiene una pronunciación oficial?\n\nEl alfabeto fonético aeronáutico permite que pilotos, controladores y tripulaciones se comuniquen de forma clara y precisa, evitando errores durante las transmisiones de radio. 🎧📡\n\nPor eso, una matrícula como HK-5271-G no se lee letra por letra comúnmente, sino:\n🛫 Hotel Kilo – Five Two Seven One – Golf\n\nEn aviación, una buena comunicación puede marcar la diferencia. ✅\n\n¿Cuántas palabras del alfabeto fonético ya conocías? 👀✈️",
    date: "21 Mayo 2026",
    featured_media: "/imgpag8/instagram_3.jpg",
    slug: "alfabeto-fonetico-aeronautico",
    category: "Cultura Aeronáutica",
    socialPreviews: [
      {
        platform: "instagram",
        imageUrl: "/imgpag8/instagram_3.jpg",
        postUrl: "https://www.instagram.com/p/DYnJb-0Do4h/?igsh=MTBzMTc1dmU3ZThndw==",
        label: "Ir a publicación en Instagram"
      }
    ]
  },
  {
    id: 4,
    title: "Conoce el Aeropuerto Guaymaral (SKGY) 🛫",
    excerpt: "Descubre los datos más importantes de uno de los aeropuertos clave para la formación aeronáutica y la aviación general en Colombia. Aprende aviación real.",
    content: "✈️ ¿Conoces el Aeropuerto Guaymaral SKGY?\n\nEn este video educativo te contamos los datos más importantes de uno de los aeropuertos clave para la formación aeronáutica y la aviación general en Colombia. 🇨🇴\n\nDescubre por qué Guaymaral es fundamental para escuelas de aviación, entrenamiento de pilotos, helicópteros y aviación ejecutiva.\n\n🎓 Aprende aviación real con Air Training\n💾 Guarda este video y compártelo con otros apasionados por la aviación.",
    date: "19 Mayo 2026",
    featured_media: "/imgpag8/instagram_4.jpg",
    slug: "conoce-aeropuerto-guaymaral-skgy",
    category: "Vida estudiantil",
    socialPreviews: [
      {
        platform: "instagram",
        imageUrl: "/imgpag8/instagram_4.jpg",
        postUrl: "https://www.instagram.com/reel/DYh_z4mAnT2/?igsh=MW1tanN4eHgxMDJldg==",
        label: "Ir a publicación en Instagram"
      }
    ]
  },
  {
    id: 5,
    title: "Orgullo TCP ATI en AeroSky Regional ✈️✨",
    excerpt: "Nos llena de orgullo ver a nuestras egresadas del programa TCP vivir experiencias reales dentro de la industria aeronáutica, demostrando su compromiso y preparación.",
    content: "✨✈️ ORGULLO ATI ✈️✨\n\nNos llena de orgullo ver a nuestras egresadas del programa TCP vivir experiencias reales dentro de la industria aeronáutica, demostrando su compromiso, preparación y pasión por la aviación. 💙❤️\n\nEstas talentosas Tripulantes de Cabina estuvieron presentes en una importante actividad operacional junto a AeroSkyRegional, fortaleciendo sus conocimientos y dando un paso más hacia sus sueños profesionales. 🛫👩‍✈️\n\nCada experiencia suma, cada vuelo enseña y cada oportunidad las acerca más a convertirse en grandes profesionales del aire. 🙌\n\n👏👏 Felicitamos a nuestras egresadas TCP por representar con excelencia el sello Air Training.",
    date: "11 Mayo 2026",
    featured_media: "/imgpag8/instagram_5.jpg",
    slug: "orgullo-tcp-ati-aerosky-regional",
    category: "Orgullo ATI",
    socialPreviews: [
      {
        platform: "instagram",
        imageUrl: "/imgpag8/instagram_5.jpg",
        postUrl: "https://www.instagram.com/p/DYNnKGVDHQv/?igsh=Ym96dHdmNHA3cTdl",
        label: "Ir a publicación en Instagram"
      }
    ]
  }
];

export const MOCK_SEDES: WordPressSede[] = [
  {
    id: 1,
    title: "Chía Cundinamarca",
    address: "Cra. 6 # 01a-47, Barrio Los Cedros",
    description: "Nuestro Campus principal enfocado en la teoría académica, ingeniería y simulación de vuelo básica. Instalaciones diseñadas para el estudio intensivo.",
    mapsUrl: "https://maps.app.goo.gl/SiHT1cDnNTfQfUpt7",
    imageUrl: "/FachadaAcorregir.png"
  },
  {
    id: 2,
    title: "Ibagué Tolima",
    address: "Aeropuerto Perales Locales 104 y 105",
    description: "Nuestra Sede de vuelo principal enfocada en la práctica aérea real. Hangares propios, simuladores certificados y flota activa para el despegue de tu carrera.",
    mapsUrl: "https://maps.app.goo.gl/BD7v5jR4npZhStkw7",
    imageUrl: "/FachadaIbague.webp"
  }
];

export const MOCK_PROGRAMS = [
  "Tripulante de Cabina de Pasajeros (TCP)",
  "Piloto Privado (PPA)",
  "Piloto Comercial (PCA)",
  "Oficial de Operaciones Aéreas (OOA)",
  "Especialización en Vuelo por Instrumentos"
];

// Cliente simulado de WordPress
class WordPressService {
  private useRealApi: boolean = false;
  private apiUrl: string = "";

  constructor() {
    this.apiUrl = import.meta.env.VITE_WP_API_URL || "";
    this.useRealApi = !!this.apiUrl;
  }

  // Obtener Posts del Blog
  async getPosts(): Promise<WordPressPost[]> {
    if (this.useRealApi) {
      try {
        const response = await fetch(`${this.apiUrl}/wp-json/wp/v2/posts?_embed`);
        const data = await response.json();
        return data.map((post: WordPressAPIPost) => ({
          id: post.id,
          title: post.title.rendered,
          excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
          content: post.content.rendered,
          date: new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
          featured_media: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
          slug: post.slug,
          category: (post.categories_names && post.categories_names[0]) || "Noticias ATI"
        }));
      } catch (error) {
        console.error("Error al conectar con la API de WordPress, cargando Mock Data:", error);
        return MOCK_POSTS;
      }
    }
    // Retardo simulado para simular red real y ver animaciones de esqueleto
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_POSTS;
  }

  // Obtener Sedes (WordPress Custom Post Type o Páginas)
  async getSedes(): Promise<WordPressSede[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_SEDES;
  }

  // Enviar inscripción a WordPress (ej. Contact Form 7, WP Forms o endpoint custom REST)
  async submitEnrollment(data: EnrollmentSubmission): Promise<{ success: boolean; message: string }> {
    console.log("Enviando solicitud a WordPress Backend...", data);
    
    if (this.useRealApi) {
      try {
        const response = await fetch(`${this.apiUrl}/contact-form-7/v1/contact-forms/YOUR_FORM_ID/feedback`, {
          method: 'POST',
          body: new URLSearchParams({
            'your-name': data.nombre,
            'your-email': data.email,
            'your-tel': data.telefono,
            'your-program': data.programa,
            'your-location': data.sede,
          })
        });
        const result = await response.json();
        return { success: result.status === 'mail_sent', message: result.message };
      } catch (error) {
        console.error("Error al enviar formulario a WordPress:", error);
        return { success: false, message: "Error de conexión con el servidor. Se guardó localmente." };
      }
    }
    
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      success: true,
      message: `¡Gracias ${data.nombre}! Tu solicitud para el programa ${data.programa} ha sido registrada con éxito.`
    };
  }

  // Simular envío de currículum
  async submitCV(formData: FormData): Promise<{ success: boolean; message: string }> {
    console.log("Subiendo archivo de C.V. y enviando postulación a WordPress...", formData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      message: "¡Postulación enviada con éxito! Nos pondremos en contacto contigo pronto."
    };
  }

  // Simular solicitud de certificado
  async submitCertificado(formData: FormData): Promise<{ success: boolean; message: string }> {
    console.log("Enviando solicitud de certificado a WordPress...", formData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      message: "Tu solicitud ha sido enviada con éxito. El área encargada revisará la información y te responderemos a tu correo."
    };
  }

  // Simular solicitud de certificados y constancias
  async submitCertificadosYConstancias(formData: FormData): Promise<{ success: boolean; message: string }> {
    console.log("Enviando solicitud de certificados y constancias a WordPress...", formData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      message: "Tu solicitud ha sido enviada con éxito. Por favor recuerda enviar tu comprobante de pago al correo indicado."
    };
  }
}

export const wpService = new WordPressService();
