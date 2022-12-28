import * as firebase from 'firebase';
import '@firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCUfFE8j_9jxEgxV4363Gm51n66w-Nh9Jw",
    authDomain: "chikitsha-3ce59.firebaseapp.com",
    projectId: "chikitsha-3ce59",
    storageBucket: "chikitsha-3ce59.appspot.com",
    messagingSenderId: "926137579027",
    appId: "1:926137579027:web:d22606759f3a0375bab1e6",
    measurementId: "G-FJL467VF1L"
};
// firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}
export default firebase;