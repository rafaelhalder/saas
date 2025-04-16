import { initializeApp } from "firebase-admin";
import { cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import "server-only";

const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
})

if(!getApps().length){
  initializeApp({
    credential: firebaseCert,
    // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  })

}

export const db = getFirestore()
