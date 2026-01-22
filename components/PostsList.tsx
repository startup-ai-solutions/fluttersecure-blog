'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { PostCard } from './PostCard'
import { fetchPostsClient } from '@/lib/firebase/client-posts'
import type { Post } from '@/lib/types/post'

export function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchPostsClient()
        setPosts(data)
      } catch (err) {
        console.error('Error loading posts:', err)
        setError('Error al cargar las publicaciones')
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 text-green-accent animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-red-400 text-center py-8">{error}</p>
    )
  }

  if (posts.length === 0) {
    return (
      <p className="text-white/50 text-center py-8">
        No hay publicaciones disponibles.
      </p>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
