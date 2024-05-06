import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZqrJ71MQ57hVFRVmyIPCi-kLw6XEuT9k",
  authDomain: "openai-102f8.firebaseapp.com",
  projectId: "openai-102f8",
  storageBucket: "openai-102f8.appspot.com",
  messagingSenderId: "717305697893",
  appId: "1:717305697893:web:74341bb9184d3c0e14588c",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
