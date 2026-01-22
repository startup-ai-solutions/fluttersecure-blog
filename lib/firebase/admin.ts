import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import path from 'path'
import fs from 'fs'

let app: App | undefined
let db: Firestore | undefined

function getAdminApp(): App {
  if (app) return app

  const apps = getApps()
  if (apps.length > 0) {
    app = apps[0]
    return app
  }

  // Opción 1: Variable de entorno (GitHub Actions / Vercel)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    app = initializeApp({
      credential: cert(serviceAccount),
    })
    return app
  }

  // Opción 2: Archivo local (desarrollo)
  const serviceAccountPath = path.join(
    process.cwd(),
    'firebase-service-account.json'
  )

  if (fs.existsSync(serviceAccountPath)) {
    app = initializeApp({
      credential: cert(serviceAccountPath),
    })
    return app
  }

  throw new Error(
    'Firebase credentials not found. Set FIREBASE_SERVICE_ACCOUNT_KEY env var or provide firebase-service-account.json'
  )
}

export function getAdminFirestore(): Firestore {
  if (db) return db
  getAdminApp()
  db = getFirestore()
  return db
}
