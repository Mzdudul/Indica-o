// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCsoSLjeCkq5kI6-EcYvjkymzVDemtiSfs',
  authDomain: 'indicacao-7e4ad.firebaseapp.com',
  projectId: 'indicacao-7e4ad',
  storageBucket: 'indicacao-7e4ad.appspot.com',
  messagingSenderId: '190881935586',
  appId: '1:190881935586:web:7edb5deb485dc16de4eebb',
  measurementId: 'G-LEX9Y8X68N',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
