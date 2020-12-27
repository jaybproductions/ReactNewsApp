import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.app = app;
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  async register(name, email, password, photoURL) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await newUser.user.updateProfile({
      displayName: name,
      photoURL: photoURL,
    });

    const userData = {
      id: newUser.user.uid,
      name: newUser.user.displayName,
      email: newUser.user.email,
      emailVerified: newUser.user.emailVerified,

      created: Date.now(),
    };
    this.db.collection("users").doc(newUser.user.uid).set(userData);
    console.log("User added to database");
    console.log(newUser.user.uid);
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(email, password) {
    return this.auth.signOut();
  }

  resetPassword(email) {
    return this.auth.sendPasswordResetEmail(email);
  }
}

const firebase = new Firebase();
export default firebase;
