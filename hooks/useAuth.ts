'use client'

import { useState, useEffect } from 'react'
import { User, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { getClientAuth } from '@/lib/firebase/client'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getClientAuth()

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setLoading(false)
      } else {
        // Inicia sesión anónima si no hay usuario
        try {
          const result = await signInAnonymously(auth)
          setUser(result.user)
        } catch (error) {
          console.error('Error al iniciar sesión anónima:', error)
        } finally {
          setLoading(false)
        }
      }
    })

    return () => unsubscribe()
  }, [])

  return { user, loading }
}
