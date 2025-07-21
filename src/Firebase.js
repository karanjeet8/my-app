// File: src/Firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDJsuqiD5x5P4iCmran_T1XLrvwGNYrOqY",
  authDomain: "invest-e2d40.firebaseapp.com",
  projectId: "invest-e2d40",
  storageBucket: "invest-e2d40.firebasestorage.app",
  messagingSenderId: "510720998891",
  appId: "1:510720998891:web:0eef9da64d19f100036dae",
  measurementId: "G-BEDEKQLDJQ",
  databaseURL: "https://invest-e2d40-default-rtdb.firebaseio.com" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const database = getDatabase(app);

// ✅
export { auth, database, ref, onValue, push };
