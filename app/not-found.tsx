import Link from 'next/link'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">
          Página no encontrada
        </h1>
        <p className="text-white/60 mb-8 max-w-md">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-accent text-black px-6 py-3 rounded-lg font-medium hover:bg-green-accent-light transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>
      </main>

      <Footer />
    </div>
  )
}
