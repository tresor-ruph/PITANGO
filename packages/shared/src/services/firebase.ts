import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getDatabase, type Database } from "firebase/database";
import { getStorage, type FirebaseStorage } from "firebase/storage";

let app: FirebaseApp;
let auth: Auth;
let database: Database;
let storage: FirebaseStorage;

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export function initFirebase(config: FirebaseConfig) {
  if (getApps().length === 0) {
    app = initializeApp(config);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  database = getDatabase(app);
  storage = getStorage(app);
}

export function getFirebaseAuth(): Auth {
  if (!auth) throw new Error("Firebase not initialized. Call initFirebase() first.");
  return auth;
}

export function getFirebaseDatabase(): Database {
  if (!database) throw new Error("Firebase not initialized. Call initFirebase() first.");
  return database;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storage) throw new Error("Firebase not initialized. Call initFirebase() first.");
  return storage;
}
