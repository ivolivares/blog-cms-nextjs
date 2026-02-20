export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
}

export const posts: Post[] = [
  {
    id: "1",
    title: "Introducción a Next.js 14",
    content: `Next.js 14 llega con mejoras significativas en rendimiento y experiencia de desarrollo. En este artículo exploraremos las nuevas características que hacen de Next.js una de las mejores opciones para construir aplicaciones web modernas.

Una de las características más destacadas es el App Router, que proporciona un sistema de routing más intuitivo y potente. Este nuevo enfoque permite una mejor organización del código y facilita la implementación de layouts complejos.

Otra mejora importante es el soporte mejorado para Server Components, lo que permite renderizar componentes en el servidor y enviar solo el HTML necesario al cliente, mejorando significativamente el rendimiento inicial de la aplicación.`,
    excerpt: "Explora las nuevas características de Next.js 14 y cómo pueden mejorar tu desarrollo web.",
    date: "2024-01-15",
    author: "Juan Pérez",
    slug: "introduccion-nextjs-14"
  },
  {
    id: "2",
    title: "Tailwind CSS: Diseño Moderno y Eficiente",
    content: `Tailwind CSS ha revolucionado la forma en que abordamos el diseño web. Este framework CSS utility-first permite crear diseños personalizados rápidamente sin escribir CSS personalizado.

La principal ventaja de Tailwind es su enfoque basado en clases de utilidad. En lugar de escribir CSS personalizado, aplicamos clases predefinidas directamente en nuestro HTML. Esto resulta en un desarrollo más rápido y consistente.

Además, Tailwind CSS es altamente personalizable. Podemos configurar nuestros propios temas, colores y espaciados para mantener la consistencia visual en toda nuestra aplicación.`,
    excerpt: "Descubre cómo Tailwind CSS puede agilizar tu flujo de trabajo de diseño web.",
    date: "2024-01-10",
    author: "María González",
    slug: "tailwind-css-diseno-moderno"
  },
  {
    id: "3",
    title: "TypeScript en el Frontend: Mejorando la Calidad del Código",
    content: `TypeScript se ha convertido en una herramienta indispensable para el desarrollo frontend moderno. Este superconjunto de JavaScript añade tipado estático, lo que ayuda a detectar errores antes de tiempo y mejora la mantenibilidad del código.

Los beneficios de TypeScript incluyen:
- Autocompletado mejorado en IDEs
- Detección temprana de errores
- Mejor documentación del código
- Refactoring más seguro

Además, TypeScript es compatible con todos los frameworks JavaScript modernos, incluyendo React, Vue y Angular, lo que lo hace una opción versátil para cualquier proyecto frontend.`,
    excerpt: "Aprende cómo TypeScript puede mejorar la calidad y mantenibilidad de tu código frontend.",
    date: "2024-01-05",
    author: "Carlos Rodríguez",
    slug: "typescript-frontend-calidad-codigo"
  },
  {
    id: "4",
    title: "shadcn/ui: Componentes de UI Accesibles y Personalizables",
    content: `shadcn/ui ha emergido como una de las librerías de componentes más populares para aplicaciones React. Construida sobre Radix UI y Tailwind CSS, ofrece componentes accesibles y completamente personalizables.

Lo que hace especial a shadcn/ui es su enfoque "copy-paste". En lugar de instalar una dependencia pesada, copias los componentes directamente en tu proyecto, lo que te da control total sobre el código.

Los componentes incluyen:
- Formularios accesibles
- Componentes de navegación
- Elementos de feedback
- Modales y diálogos
- Y mucho más

Todo esto con un diseño limpio y moderno que se adapta perfectamente a cualquier aplicación.`,
    excerpt: "Explora la librería de componentes que está revolucionando el desarrollo con React.",
    date: "2023-12-28",
    author: "Ana Martínez",
    slug: "shadcn-ui-componentes-accesibles"
  },
  {
    id: "5",
    title: "Optimización de Rendimiento en Aplicaciones Web",
    content: `La optimización de rendimiento es crucial para el éxito de cualquier aplicación web moderna. Los usuarios esperan tiempos de carga rápidos y una experiencia fluida, sin importar el dispositivo que utilicen.

Las principales técnicas de optimización incluyen:

1. **Lazy Loading**: Cargar recursos solo cuando son necesarios
2. **Code Splitting**: Dividir el código en chunks más pequeños
3. **Image Optimization**: Optimizar imágenes para diferentes dispositivos
4. **Caching Strategy**: Implementar estrategias de caché efectivas
5. **Bundle Analysis**: Analizar y optimizar el tamaño del bundle

Herramientas como Lighthouse y WebPageTest pueden ayudarnos a identificar áreas de mejora y medir el impacto de nuestras optimizaciones.`,
    excerpt: "Técnicas y herramientas para optimizar el rendimiento de tus aplicaciones web.",
    date: "2023-12-20",
    author: "Luis Torres",
    slug: "optimizacion-rendimiento-web"
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
