import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPPQkEDJZDd9lUNN8gF4QO_rUOnoUdR8s",
  authDomain: "msci342---project-ffa77.firebaseapp.com",
  databaseURL: "https://msci342---project-ffa77-default-rtdb.firebaseio.com",
  projectId: "msci342---project-ffa77",
  storageBucket: "msci342---project-ffa77.appspot.com",
  messagingSenderId: "965761441872",
  appId: "1:965761441872:web:367c9e4fa7cbcbd864f155",
  measurementId: "G-MSRFVV9XBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

class Firebase {
  constructor() {
    this.auth = getAuth(app);
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Successfully created user
        return userCredential.user;
      })
      .catch((error) => {
        throw error;
      });
    
    doSignInWithEmailAndPassword = (email, password) =>
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return user;
        })
        .catch((error) => {
          throw error;
        });

    doGetIdToken = (bool) => {
      return this.auth.currentUser.getIdToken(/* forceRefresh */ bool);
    }
      
}


export default Firebase;
