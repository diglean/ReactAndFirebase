import firebase from 'firebase/app';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyAxRRIN_VM9u7Aul4rDprPWCgdapcni0fU",
    authDomain: "curso-60818.firebaseapp.com",
    projectId: "curso-60818",
    storageBucket: "curso-60818.appspot.com",
    messagingSenderId: "591480196268",
    appId: "1:591480196268:web:c7f9c701b1d4b60cd36309",
    measurementId: "G-P3PZCPXNKY"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
