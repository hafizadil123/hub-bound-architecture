import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB7MFuESS1rGRSA-4tIdC9RvKxx2FFRt3Y",
  authDomain: "hub-bound-5825d.firebaseapp.com",
  projectId: "hub-bound-5825d",
  storageBucket: "hub-bound-5825d.appspot.com",
  messagingSenderId: "140630362145",
  appId: "1:140630362145:web:f2a29651cb2335e6d0bb60",
  measurementId: "G-HFGMKXZGEQ",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;
