import { createApp } from "vue";
import App from "./App.vue";

// eslint-disable-next-line no-unused-vars
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-zLwPjnyaOCXO2XHBd7fWV4-nYBiCYuU",
  authDomain: "back-end-test-ed691.firebaseapp.com",
  databaseURL: "https://back-end-test-ed691-default-rtdb.firebaseio.com",
  projectId: "back-end-test-ed691",
  storageBucket: "back-end-test-ed691.appspot.com",
  messagingSenderId: "512756766561",
  appId: "1:512756766561:web:b39a4a55381aac7d7dd720",
  measurementId: "G-R40K0QHWWN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
// eslint-disable-next-line no-unused-vars
const db = getFirestore(app);

createApp(App).mount("#app");
