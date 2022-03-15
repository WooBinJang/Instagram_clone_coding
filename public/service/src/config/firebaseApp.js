// Import the functions you need from the SDKs you need
import firebaseApp from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDzwUpjoTwk1YHpiPAlnbS5Te8aPwvhpTs',
  authDomain: 'sns-service-db71d.firebaseapp.com',
  databaseURL: 'https://sns-service-db71d-default-rtdb.firebaseio.com',
  projectId: 'sns-service-db71d',
  storageBucket: 'sns-service-db71d.appspot.com',
  messagingSenderId: '879816684426',
  appId: '1:879816684426:web:b5ad65d18785e86d32ce73',
  measurementId: 'G-D0TCTZFBE3'
};

// Initialize Firebase
firebaseApp.initializeApp(firebaseConfig);

export default firebaseApp;
