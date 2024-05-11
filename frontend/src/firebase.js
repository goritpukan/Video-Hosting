
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxrzbhFb0L_scwi7NjxqoVTr-owbnlJhI",
  authDomain: "video-hosting-7ddd9.firebaseapp.com",
  projectId: "video-hosting-7ddd9",
  storageBucket: "video-hosting-7ddd9.appspot.com",
  messagingSenderId: "748015993208",
  appId: "1:748015993208:web:cf76fbf80e5c70a19d888d",
  measurementId: "G-SE3KFD42N3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;