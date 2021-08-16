// import * as firebase from "firebase/app";
import firebase from "firebase/app";
// storage in to store our images
import "firebase/storage";
// firestore is a database
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCqdBR2F-9zoghsCKKfa-D868tOy4HGyeA",
  authDomain: "photo-gallery-6b7eb.firebaseapp.com",
  projectId: "photo-gallery-6b7eb",
  storageBucket: "photo-gallery-6b7eb.appspot.com",
  messagingSenderId: "314650949988",
  appId: "1:314650949988:web:03c2471613cb6159086271",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };
