'use client'

import {
  collection,
  query,
  orderBy,
  getDocs,
  where,
  limit,
} from 'firebase/firestore'
import { getClientFirestore } from './client'
import type { Post } from '@/lib/types/post'

// Fetch all posts from client-side
export async function fetchPostsClient(): Promise<Post[]> {
  const db = getClientFirestore()

  try {
    const q = query(collection(db, 'posts'), orderBy('publishedAt', 'desc'))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title ?? '',
        slug: data.slug ?? '',
        body: data.body ?? '',
        publishedAt: data.publishedAt?.toDate() ?? new Date(),
        imageUrl: data.imageUrl ?? null,
        isTest: data.isTest ?? false,
      }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Fetch a single post by slug from client-side
export async function fetchPostBySlugClient(
  slug: string
): Promise<Post | null> {
  const db = getClientFirestore()

  try {
    const q = query(
      collection(db, 'posts'),
      where('slug', '==', slug),
      limit(1)
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return null
    }

    const doc = snapshot.docs[0]
    const data = doc.data()

    return {
      id: doc.id,
      title: data.title ?? '',
      slug: data.slug ?? '',
      body: data.body ?? '',
      publishedAt: data.publishedAt?.toDate() ?? new Date(),
      imageUrl: data.imageUrl ?? null,
      isTest: data.isTest ?? false,
    }
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}
