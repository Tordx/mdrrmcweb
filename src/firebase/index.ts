import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCKb1B3-_VHWMtSMbkMVjek1bDlmzIDQLA",
  authDomain: "mdrrmc-bdrrmc.firebaseapp.com",
  projectId: "mdrrmc-bdrrmc",
  storageBucket: "mdrrmc-bdrrmc.appspot.com",
  messagingSenderId: "1010058942404",
  appId: "1:1010058942404:web:15461fb754958c39d97691",
  measurementId: "G-TZPWSQ2FKV"
};
  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
