import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyARhnBGMJtjgWhQLg5Vfmx4BhLfWQdxOXQ",
  authDomain: "epidmonitorimate-push.firebaseapp.com",
  projectId: "epidmonitorimate-push",
  storageBucket: "epidmonitorimate-push.firebasestorage.app",
  messagingSenderId: "311713349541",
  appId: "1:311713349541:web:4070db41ea46d83e2ab24c"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

window.subscribePush = async function () {

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    alert("Уведомления запрещены");
    return;
  }

  try {

    const token = await getToken(messaging);

    console.log("PUSH TOKEN:", token);

    alert("Push включён!");

  } catch (e) {

    console.log("Push error:", e);
    alert("Ошибка push");

  }

};