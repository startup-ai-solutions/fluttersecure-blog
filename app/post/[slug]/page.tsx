import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { fetchPostBySlug, getAllSlugs } from '@/lib/services/posts'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post no encontrado',
    }
  }

  return {
    title: post.title,
    description: post.body.substring(0, 160).replace(/[#*`]/g, ''),
    openGraph: {
      title: post.title,
      description: post.body.substring(0, 160).replace(/[#*`]/g, ''),
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      images: post.imageUrl ? [post.imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.body.substring(0, 160).replace(/[#*`]/g, ''),
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  }
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
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
      </main>

      <Footer />
    </div>
  )
}
