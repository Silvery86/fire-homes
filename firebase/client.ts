// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig : FirebaseOptions = {
    apiKey: "AIzaSyD8WFakixZph9Fq4NKErhgU6Syu63GCX2s",
    authDomain: "fire-homes-47284.firebaseapp.com",
    projectId: "fire-homes-47284",
    storageBucket: "fire-homes-47284.firebasestorage.app",
    messagingSenderId: "260396390322",
    appId: "1:260396390322:web:30af8a1f05b3053b9776ab",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const storage: FirebaseStorage = getStorage(app);

export { auth, storage };

