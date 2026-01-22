import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export const metadata: Metadata = {
  title: {
    default: 'FlutterSecure Blog',
    template: '%s | FlutterSecure Blog',
  },
  description: 'Blog de seguridad en aplicaciones móviles y pentesting',
  keywords: ['seguridad', 'mobile', 'flutter', 'pentesting', 'android', 'ios'],
  authors: [{ name: 'Felipe Rincón' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'FlutterSecure Blog',
    title: 'FlutterSecure Blog',
    description: 'Blog de seguridad en aplicaciones móviles y pentesting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlutterSecure Blog',
    description: 'Blog de seguridad en aplicaciones móviles y pentesting',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${firaCode.variable} dark`}>
      <body className="min-h-screen bg-black font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
