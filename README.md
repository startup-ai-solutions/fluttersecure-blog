# FlutterSecure Blog - Next.js

Blog de seguridad en aplicaciones móviles migrado de Flutter Web a Next.js 14.

**Live Site**: [https://fluttersecure.dev](https://fluttersecure.dev)

**Repository**: [startup-ai-solutions/fluttersecure-blog](https://github.com/startup-ai-solutions/fluttersecure-blog)

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

### GitHub Actions + Firebase Hosting (Configurado)

El proyecto tiene configurado deploy automático a Firebase Hosting mediante GitHub Actions:

- **Pull Requests**: Preview deploy automático en cada PR
- **Main Branch**: Deploy a producción automático en cada merge

#### Configurar GitHub Secrets

Para que los workflows funcionen, configura estos secrets en:
`https://github.com/startup-ai-solutions/fluttersecure-blog/settings/secrets/actions`

**Secrets requeridos (8 total):**

```bash
# 1. Firebase Service Account (usado para build SSG + deploy)
FIREBASE_SERVICE_ACCOUNT_FLUTTER_D6447
Valor: Contenido JSON completo del service account
Propósito: Genera páginas estáticas Y hace deploy a Firebase Hosting

# 2-8. Variables públicas de Firebase (desde .env.local)
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

**Obtener el Service Account JSON:**

1. Ve a [Firebase Console](https://console.firebase.google.com/project/flutter-d6447/settings/serviceaccounts/adminsdk)
2. Click en "Generate New Private Key"
3. Descarga el archivo JSON
4. Copia todo el contenido JSON y pégalo como valor del secret

### Deploy Manual (Firebase CLI)

```bash
npm run build
firebase deploy --only hosting --project flutter-d6447
```

### Vercel (Alternativa)

1. Conecta el repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Deploy automático en cada push

## Características

- **SSG con ISR**: Páginas pre-renderizadas con revalidación cada 60 segundos
- **SEO Optimizado**: Metadata dinámica, OpenGraph, sitemap automático
- **Sistema de Votación**: Auth anónima + votación en tiempo real
- **Tema Oscuro**: Branding de seguridad con acentos verdes (#69F0AE)
- **Markdown Avanzado**: Syntax highlighting, GFM, tablas, etc.
- **Responsive**: Diseño adaptable para móvil y desktop
- **Dominio Custom**: Configurado en fluttersecure.dev con SSL automático
- **CI/CD**: Deploy automático con GitHub Actions

## Dominio Custom (fluttersecure.dev)

El sitio está configurado para servirse en el dominio personalizado **fluttersecure.dev**:

- **URL de producción**: https://fluttersecure.dev
- **URL de Firebase**: https://flutter-d6447.web.app (ambas sirven el mismo contenido)
- **SSL**: Certificado HTTPS automático gestionado por Firebase Hosting
- **CDN**: Servido a través de Firebase CDN con baja latencia global

El dominio ya está configurado y apuntando a Firebase Hosting. Cualquier deploy a la rama `main` actualizará automáticamente el contenido en fluttersecure.dev.

## Migración desde Flutter Web

Este proyecto reemplaza la versión anterior en Flutter Web manteniendo:

- ✅ Mismo dominio custom (fluttersecure.dev)
- ✅ Misma base de datos Firestore
- ✅ Mismo sistema de autenticación Firebase
- ✅ Mismo diseño y branding
- ✅ Funcionalidad de votación mejorada

**Mejoras respecto a Flutter Web:**

- Mejor SEO (SSG vs SPA)
- Menor tamaño de bundle (~300KB vs ~2MB)
- Mejor rendimiento en Lighthouse
- Código más mantenible (TypeScript + React)
- Hot reload más rápido en desarrollo
