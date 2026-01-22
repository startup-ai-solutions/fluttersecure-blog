'use client'

import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getAuth, Auth } from 'firebase/auth'
import { firebaseConfig } from './config'

let app: FirebaseApp | undefined
let db: Firestore | undefined
let auth: Auth | undefined

export function getClientApp(): FirebaseApp {
  if (app) return app

  const apps = getApps()
  if (apps.length > 0) {
    app = apps[0]
    return app
  }

  app = initializeApp(firebaseConfig)
  return app
}

export function getClientFirestore(): Firestore {
  if (db) return db
  const clientApp = getClientApp()
  db = getFirestore(clientApp)
  return db
}

export function getClientAuth(): Auth {
  if (auth) return auth
  const clientApp = getClientApp()
  auth = getAuth(clientApp)
  return auth
}
