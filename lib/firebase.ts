import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEzfUlzJO74TcaY7SjB4cS-RyhB--2blE",
  authDomain: "my-app-8b95a.firebaseapp.com",
  projectId: "my-app-8b95a",
  storageBucket: "my-app-8b95a.firebasestorage.app",
  messagingSenderId: "1055359355650",
  appId: "1:1055359355650:web:288c8899d28a40046a101b",
  measurementId: "G-VVDL1GZ6QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics only on client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
