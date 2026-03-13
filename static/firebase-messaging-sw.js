importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyARhnBGMJtjgWhQLg5Vfmx4BhLfWQdxOXQ",
  authDomain: "epidmonitorimate-push.firebaseapp.com",
  projectId: "epidmonitorimate-push",
  messagingSenderId: "311713349541",
  appId: "1:311713349541:web:4070db41ea46d83e2ab24c"
});

const messaging = firebase.messaging();