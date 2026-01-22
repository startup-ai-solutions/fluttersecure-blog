'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Calendar, ArrowLeft, Loader2, AlertTriangle } from 'lucide-react'
import { MarkdownRenderer } from './MarkdownRenderer'
import { fetchPostBySlugClient } from '@/lib/firebase/client-posts'
import type { Post } from '@/lib/types/post'

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function PostDetail() {
  const params = useParams()
  const slug = params.slug as string

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function loadPost() {
      if (!slug) return

      try {
        const data = await fetchPostBySlugClient(slug)
        if (data) {
          setPost(data)
        } else {
          setNotFound(true)
        }
      } catch (err) {
        console.error('Error loading post:', err)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-green-accent animate-spin" />
          <p className="text-white/60">Cargando publicación...</p>
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">
          Publicación no encontrada
        </h1>
        <p className="text-white/60 mb-8 max-w-md">
          Lo sentimos, la publicación que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-accent text-black px-6 py-3 rounded-lg font-medium hover:bg-green-accent-light transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-green-accent hover:text-green-accent-light transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al inicio
      </Link>

      <article>
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-accent mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-5 h-5" />
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="relative aspect-video mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Divider */}
        <hr className="border-gray-700 mb-8" />

        {/* Post Body */}
        <MarkdownRenderer content={post.body} />
      </article>
    </div>
  )
}
