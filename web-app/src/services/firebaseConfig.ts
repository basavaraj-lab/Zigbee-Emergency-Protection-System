import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAulYUP8qEe0VO7D7rFCIoGOb9GowOwNQ0",
  authDomain: "zigbee-eps.firebaseapp.com",
  projectId: "zigbee-eps",
  storageBucket: "zigbee-eps.firebasestorage.app",
  messagingSenderId: "464172423866",
  appId: "1:464172423866:web:4983a537c9eac350e48083",
  measurementId: "G-1VSYZ7G4PF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);