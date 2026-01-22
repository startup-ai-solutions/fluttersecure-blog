export interface Post {
  id: string
  title: string
  slug: string
  body: string
  publishedAt: Date
  imageUrl: string | null
  isTest: boolean
}

export interface PostSummary {
  id: string
  title: string
  slug: string
  publishedAt: Date
  imageUrl: string | null
}
