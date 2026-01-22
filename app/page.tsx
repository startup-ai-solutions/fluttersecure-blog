import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PostCard } from '@/components/PostCard'
import { VoteCard } from '@/components/VoteCard'
import { fetchPosts } from '@/lib/services/posts'

export default async function HomePage() {
  const posts = await fetchPosts()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-accent mb-2">
            FlutterSecure Blog
          </h1>
          <p className="text-white/70 text-lg">
            Seguridad en aplicaciones móviles
          </p>
        </section>

        {/* Posts Grid */}
        <section className="mb-16">
          <div className="flex flex-wrap justify-center gap-6">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p className="text-white/50 text-center">
                No hay publicaciones disponibles.
              </p>
            )}
          </div>
        </section>

        {/* Voting Section */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              🗳️ Decide la próxima publicación del blog
            </h2>
            <p className="text-white/60">
              Vota por el tema que más te motive y ayúdanos a darle forma a
              nuestro siguiente post.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <VoteCard topic="appcheck" title="Firebase App Check" />
            <VoteCard
              topic="safe-credentials-2"
              title="Transmisión segura de credenciales"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
