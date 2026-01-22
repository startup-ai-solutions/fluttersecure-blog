'use client'

import { Lock, ThumbsUp, Check, Loader2 } from 'lucide-react'
import { useVote } from '@/hooks/useVote'
import { clsx } from 'clsx'

interface VoteCardProps {
  topic: string
  title: string
}

export function VoteCard({ topic, title }: VoteCardProps) {
  const { voteCount, hasVoted, loading, vote, error } = useVote(topic)

  const handleVote = async () => {
    await vote()
  }

  return (
    <div className="w-[280px] bg-[#1E1E1E] rounded-xl p-6 flex flex-col items-center">
      <Lock className="w-12 h-12 text-green-accent mb-4" />

      <h3 className="text-white text-center font-medium mb-6 min-h-[48px] flex items-center">
        {title}
      </h3>

      <button
        onClick={handleVote}
        disabled={loading || hasVoted}
        className={clsx(
          'flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all',
          hasVoted
            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
            : 'bg-green-accent text-black hover:bg-green-accent-light active:scale-95'
        )}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : hasVoted ? (
          <Check className="w-5 h-5" />
        ) : (
          <ThumbsUp className="w-5 h-5" />
        )}
        <span>
          {hasVoted ? 'Votado' : 'Votar'} ({voteCount})
        </span>
      </button>

      {error && (
        <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
      )}
    </div>
  )
}
