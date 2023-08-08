// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_kFOqn09i5bMYGrW5HsDi96tiyJqq73U",
  authDomain: "straysahaya.firebaseapp.com",
  projectId: "straysahaya",
  storageBucket: "straysahaya.appspot.com",
  messagingSenderId: "462598724504",
  appId: "1:462598724504:web:f35e6ca550317ce6e529ed",
  measurementId: "G-972SFEHNHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth= getAuth(app);

//iOS :462598724504-lsu2geijpc46p824tj5s31lg711gfijj.apps.googleusercontent.com
//Android:462598724504-krki15h8qdgo4em3d6oumbadlhjbmf59.apps.googleusercontent.com
//Web:462598724504-fll33gjmr85qt80cgvk67afb6dumf3tl.apps.googleusercontent.com