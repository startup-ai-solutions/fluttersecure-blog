# FlutterSecure Blog - Next.js

Blog de seguridad en aplicaciones móviles migrado de Flutter Web a Next.js 14.

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS (tema oscuro con verde)
- **Firebase**: Admin SDK (servidor) + Client SDK (cliente)
- **Markdown**: react-markdown + remark-gfm + rehype-highlight

## Estructura del Proyecto

```
fluttersecure-blog/
├── app/
│   ├── layout.tsx              # Layout raíz (tema oscuro, fonts)
│   ├── page.tsx                # Home (/) - Server Component
│   ├── globals.css             # Estilos globales + Tailwind
│   ├── loading.tsx             # Loading state
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts              # Sitemap automático
│   ├── robots.ts               # robots.txt
│   └── post/[slug]/page.tsx    # Detalle post (SSG)
├── components/
│   ├── PostCard.tsx            # Tarjeta de post
│   ├── VoteCard.tsx            # Tarjeta de votación
│   ├── MarkdownRenderer.tsx    # Renderizado markdown
│   ├── Header.tsx              # Cabecera del sitio
│   └── Footer.tsx              # Footer con LinkedIn
├── lib/
│   ├── firebase/
│   │   ├── admin.ts            # Firebase Admin SDK (servidor)
│   │   ├── client.ts           # Firebase Client SDK (browser)
│   │   └── config.ts           # Configuración Firebase
│   ├── services/
│   │   └── posts.ts            # Funciones fetch posts
│   ├── types/
│   │   └── post.ts             # Interface Post
│   └── utils.ts                # Utilidades (cn)
├── hooks/
│   ├── useVote.ts              # Hook votación + real-time
│   └── useAuth.ts              # Hook auth anónima
└── .env.local                  # Credenciales Firebase
```

## Instalación

```bash
npm install
```

## Configuración de Firebase

### 1. Variables de entorno del cliente

Copia `.env.local.example` a `.env.local` y configura las variables:

```bash
cp .env.local.example .env.local
```

Las credenciales del cliente ya están incluidas (son públicas).

### 2. Firebase Admin SDK (para SSG/SSR)

Para generar páginas estáticas con datos de Firestore, necesitas configurar el Admin SDK:

1. Ve a Firebase Console > Project Settings > Service Accounts
2. Haz clic en "Generate New Private Key"
3. Guarda el archivo JSON descargado
4. Añade la clave a `.env.local`:

```bash
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"flutter-d6447",...}'
```

**Nota**: En desarrollo sin Admin SDK, las páginas se generarán vacías pero la aplicación funcionará correctamente en el cliente.

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build de Producción

```bash
npm run build
npm run start
```

## Deploy

### Vercel (Recomendado)

1. Conecta el repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Deploy automático en cada push

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

## Características

- **SSG con ISR**: Páginas pre-renderizadas con revalidación cada 60 segundos
- **SEO Optimizado**: Metadata dinámica, OpenGraph, sitemap automático
- **Sistema de Votación**: Auth anónima + votación en tiempo real
- **Tema Oscuro**: Branding de seguridad con acentos verdes (#69F0AE)
- **Markdown Avanzado**: Syntax highlighting, GFM, tablas, etc.
- **Responsive**: Diseño adaptable para móvil y desktop
