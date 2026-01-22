import { Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-dark-card border-t border-white/10 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <a
          href="https://www.linkedin.com/in/felipe-rincon-93a629192/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-green-accent hover:text-green-accent-light transition-colors"
        >
          <Linkedin className="w-5 h-5" />
          <span className="underline">Desarrollado por Felipe Rincón</span>
        </a>
      </div>
    </footer>
  )
}
