// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { get } from "http";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_CLIENT_API_KEY,
    authDomain: process.env.FIREBASE_CLIENT_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_CLIENT_PROJECT_ID,
    storageBucket: process.env.FIREBASE_CLIENT_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_CLIENT_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_CLIENT_APP_ID,
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
}else {
    const app = currentApps[0];
    auth = getAuth(app);
    storage = getStorage(app);
}

export { auth, storage };

