import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import type { Post, PostSummary } from '@/lib/types/post'

interface PostCardProps {
  post: Post | PostSummary
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/post/${post.slug}`} className="block group">
      <article className="w-[400px] h-[280px] bg-gray-850 bg-[#1E1E1E] rounded-xl overflow-hidden hover:ring-2 hover:ring-green-accent/50 transition-all">
        {post.imageUrl && (
          <div className="relative h-[160px] overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4 flex flex-col items-center justify-center h-[120px]">
          <h2 className="text-green-accent font-semibold text-lg text-center line-clamp-2">
            {post.title}
          </h2>
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  )
}
