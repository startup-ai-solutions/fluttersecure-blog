import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-green-accent animate-spin" />
        <p className="text-white/60">Cargando...</p>
      </div>
    </div>
  )
}
