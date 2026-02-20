# Blog CMS

Un CMS para blog personal construido con Next.js 14, TypeScript, Tailwind CSS y Supabase.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para tipado seguro
- **Tailwind CSS + shadcn/ui** para diseño moderno
- **Supabase** para autenticación y base de datos
- **RLS (Row Level Security)** para protección de datos
- **Dashboard protegido** para gestión de posts
- **Diseño responsivo** y accesible

## 📋 Prerrequisitos

- Node.js 18+ 
- Cuenta de Supabase

## ⚙️ Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/ivolivares/blog-cms-nextjs.git
   cd blog-cms-nextjs
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Editar `.env.local` con tus credenciales de Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_tu_clave_aqui
   ```

4. **Configurar la base de datos**
   
   La aplicación requiere una tabla `posts` con RLS habilitado. El schema está definido en `src/app/db/schema.ts`.

5. **Ejecutar la aplicación**
   ```bash
   npm run dev
   ```

   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── db/
│   │   └── schema.ts          # Schema de Drizzle ORM
│   ├── dashboard/              # Rutas protegidas
│   ├── login/                  # Página de autenticación
│   └── layout.tsx              # Layout principal
├── components/
│   ├── ui/                     # Componentes shadcn/ui
│   └── Navbar.tsx              # Navegación principal
├── contexts/
│   └── AuthContext.tsx         # Contexto de autenticación
├── lib/
│   ├── supabase.ts             # Cliente Supabase
│   └── mockData.ts             # Datos de ejemplo
└── styles/
    └── globals.css             # Estilos globales
```

## 🔐 Seguridad

- **Variables de entorno**: Las credenciales de Supabase están en `.env.local` (excluido de git)
- **RLS**: La tabla `posts` tiene Row Level Security habilitado
- **Autenticación**: Solo usuarios autenticados pueden acceder al dashboard
- **Validación**: Tipado estricto con TypeScript

## 📝 Uso

### Como visitante:
- Ver posts en la página principal
- Leer posts individuales
- Navegación pública

### Como usuario autenticado:
- Acceder al dashboard protegido
- Ver tabla de posts existentes
- Crear nuevos posts (simulado)
- Gestionar contenido

### Flujo de autenticación:
1. Ir a `/login` o hacer clic en "Login"
2. Registrarse o iniciar sesión con email/contraseña
3. Acceder automático al dashboard
4. Cerrar sesión cuando sea necesario

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conectar el repositorio a Vercel
2. Configurar variables de entorno en el dashboard de Vercel
3. Despliegue automático

### Variables de entorno en producción:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🤝 Contribuir

1. Fork del proyecto
2. Crear branch (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
