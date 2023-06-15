import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeAnalytics } from 'firebase/analytics';





//const serviceAccount = require("../serviceAccountKey.json")

const firebaseConfig = {
  apiKey: "AIzaSyD3k7K7kiXAAW4lq5KKiiXeW0ZiV9FHn1o",
  authDomain: "connectarts-4ce5e.firebaseapp.com",
  projectId: "connectarts-4ce5e",
  storageBucket: "connectarts-4ce5e.appspot.com",
  messagingSenderId: "992637748222",
  appId: "1:992637748222:web:26c4e58e65f3af502c76af",
  measurementId: "G-94MZZV67W4"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const analytics = initializeAnalytics(firebaseApp);


export { auth, analytics, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };