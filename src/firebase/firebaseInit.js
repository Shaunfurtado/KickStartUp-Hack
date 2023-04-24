import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBSHN-HDc4-2ZQ-30IddrE0o6V3Fxg-JuI",
    authDomain: "firestartup-a5450.firebaseapp.com",
    projectId: "firestartup-a5450",
    storageBucket: "firestartup-a5450.appspot.com",
    messagingSenderId: "521102050708",
    appId: "1:521102050708:web:35a8c232274ac222fc3b81"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
