import * as admin from 'firebase-admin'
import { cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import "server-only";
// const decodedKey = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64 || "", "base64").toString("utf-8");
// console.log(`Decoded key: ${decodedKey}`)

export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
})
try {
  if(!getApps().length){
    admin.initializeApp({
      credential: firebaseCert,
      // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    })
  
  }
  
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error);
  throw error;
  
}

export const db = getFirestore()
