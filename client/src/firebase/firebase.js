// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9s2hMB4_CiXfpU2cENA7CWkdFi60OPB4",
  authDomain: "m26prj.firebaseapp.com",
  projectId: "m26prj",
  storageBucket: "m26prj.appspot.com",
  messagingSenderId: "564642302442",
  appId: "1:564642302442:web:4633cfcc5267b6d5a74a93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
