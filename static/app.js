import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyARhnBGMJtjgWhQLg5Vfmx4BhLfWQdxOXQ",
  authDomain: "epidmonitorimate-push.firebaseapp.com",
  projectId: "epidmonitorimate-push",
  storageBucket: "epidmonitorimate-push.firebasestorage.app",
  messagingSenderId: "311713349541",
  appId: "1:311713349541:web:4070db41ea46d83e2ab24c",
  measurementId: "G-RQ37KYTZJN"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function initPush() {

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    console.log("Push запрещён");
    return;
  }

  try {

    const token = await getToken(messaging);

    console.log("PUSH TOKEN:", token);

    // отправляем токен на сервер
    fetch("/save_push_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({token: token})
    });

  } catch (e) {
    console.log("Push error", e);
  }
}

initPush();

onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
});