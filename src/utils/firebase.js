import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyDbQfElfQe3mVRCeBV_zBt1ZD1v_LpRtgI",
    authDomain: "heatmap-tester.firebaseapp.com",
    databaseURL: "https://heatmap-tester.firebaseio.com",
    projectId: "heatmap-tester",
    storageBucket: "heatmap-tester.appspot.com",
    messagingSenderId: "93296413379"
};

firebase.initializeApp(config);

export default firebase;