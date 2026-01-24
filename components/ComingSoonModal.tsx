'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ComingSoonModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
    // Cerrar al presionar ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-dark-card border border-white/10 rounded-xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-accent/10 mb-2">
                        <span className="text-3xl">🚀</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white">Próximamente</h3>

                    <p className="text-gray-400">
                        Estamos trabajando duro para traerte esta funcionalidad.
                        ¡El análisis automatizado de APKs estará disponible muy pronto!
                    </p>

                    <button
                        onClick={onClose}
                        className="mt-6 w-full bg-green-accent text-dark-bg font-semibold py-2 px-4 rounded-lg hover:bg-green-accent/90 transition-colors"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    )
}
