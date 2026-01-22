'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { getClientFirestore } from '@/lib/firebase/client'
import { useAuth } from './useAuth'

interface UseVoteReturn {
  voteCount: number
  hasVoted: boolean
  loading: boolean
  vote: () => Promise<void>
  error: string | null
}

export function useVote(topic: string): UseVoteReturn {
  const { user, loading: authLoading } = useAuth()
  const [voteCount, setVoteCount] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Escuchar cambios en el conteo de votos en tiempo real
  useEffect(() => {
    const db = getClientFirestore()
    const usersRef = collection(db, 'votes', topic, 'users')

    const unsubscribe = onSnapshot(
      usersRef,
      (snapshot) => {
        setVoteCount(snapshot.size)
      },
      (err) => {
        console.error('Error al escuchar votos:', err)
        setError('Error al cargar votos')
      }
    )

    return () => unsubscribe()
  }, [topic])

  // Verificar si el usuario ya votó
  useEffect(() => {
    async function checkVoteStatus() {
      if (!user) {
        setLoading(authLoading)
        return
      }

      try {
        const db = getClientFirestore()
        const voteRef = doc(db, 'votes', topic, 'users', user.uid)
        const voteDoc = await getDoc(voteRef)
        setHasVoted(voteDoc.exists())
      } catch (err) {
        console.error('Error al verificar voto:', err)
      } finally {
        setLoading(false)
      }
    }

    checkVoteStatus()
  }, [user, topic, authLoading])

  // Función para votar
  const vote = useCallback(async () => {
    if (!user) {
      setError('Debes estar autenticado para votar')
      return
    }

    if (hasVoted) {
      setError('Ya has votado por este tema')
      return
    }

    try {
      setError(null)
      const db = getClientFirestore()
      const voteRef = doc(db, 'votes', topic, 'users', user.uid)

      await setDoc(voteRef, {
        votedAt: serverTimestamp(),
      })

      setHasVoted(true)
    } catch (err) {
      console.error('Error al votar:', err)
      setError('Error al registrar el voto')
    }
  }, [user, topic, hasVoted])

  return {
    voteCount,
    hasVoted,
    loading,
    vote,
    error,
  }
}
