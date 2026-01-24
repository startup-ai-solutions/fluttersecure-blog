'use client'

import Link from 'next/link'
import { Shield, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { ComingSoonModal } from './ComingSoonModal'

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <header className="bg-dark-card border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 w-fit">
          <Shield className="w-8 h-8 text-green-accent" />
          <div>
            <h1 className="text-xl font-bold text-green-accent">
              FlutterSecure Blog
            </h1>
            <p className="text-xs text-white/50">
              Seguridad en aplicaciones móviles
            </p>
          </div>
        </Link>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-accent text-dark-bg px-4 py-2 rounded-lg font-semibold hover:bg-green-accent/90 transition-colors cursor-pointer"
        >
          Analizar APK
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  )
}
