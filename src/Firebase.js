// File: src/Firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJsuqiD5x5P4iCmran_T1XLrvwGNYrOqY",
  authDomain: "invest-e2d40.firebaseapp.com",
  projectId: "invest-e2d40",
  storageBucket: "invest-e2d40.appspot.com", 
  messagingSenderId: "510720998891",
  appId: "1:510720998891:web:0eef9da64d19f100036dae",
  measurementId: "G-BEDEKQLDJQ",
  databaseURL: "https://invest-e2d40-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app); 
export { ref, onValue, push };
