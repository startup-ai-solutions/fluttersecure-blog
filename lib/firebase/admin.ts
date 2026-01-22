import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import path from 'path'
import fs from 'fs'

let app: App | undefined
let db: Firestore | undefined

function getAdminApp(): App | null {
  if (app) return app

  const apps = getApps()
  if (apps.length > 0) {
    app = apps[0]
    return app
  }

  // Opción 1: Variable de entorno (GitHub Actions / Vercel)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      app = initializeApp({
        credential: cert(serviceAccount),
      })
      return app
    } catch (error) {
      console.warn('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', error)
      return null
    }
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

  // No hay credenciales disponibles - retornar null en lugar de error
  // Esto permite que el build continúe sin SSG
  console.warn(
    'Firebase Admin credentials not found. Build will continue without SSG. ' +
    'Pages will be rendered client-side. ' +
    'To enable SSG, set FIREBASE_SERVICE_ACCOUNT_KEY env var or provide firebase-service-account.json'
  )
  return null
}

export function getAdminFirestore(): Firestore | null {
  if (db) return db

  const adminApp = getAdminApp()
  if (!adminApp) return null

  db = getFirestore()
  return db
}
