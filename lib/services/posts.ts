import { getAdminFirestore } from '@/lib/firebase/admin'
import type { Post, PostSummary } from '@/lib/types/post'

// Fetch all posts ordered by publishedAt (descending)
export async function fetchPosts(): Promise<Post[]> {
  const db = getAdminFirestore()

  try {
    const snapshot = await db
      .collection('posts')
      .orderBy('publishedAt', 'desc')
      .get()

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

// Fetch a single post by slug
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const db = getAdminFirestore()

  try {
    const snapshot = await db
      .collection('posts')
      .where('slug', '==', slug)
      .limit(1)
      .get()

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

// Get all slugs for static generation
export async function getAllSlugs(): Promise<string[]> {
  const db = getAdminFirestore()

  try {
    const snapshot = await db.collection('posts').select('slug').get()
    return snapshot.docs
      .map((doc) => doc.data().slug)
      .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
  } catch (error) {
    console.error('Error fetching slugs:', error)
    return []
  }
}
