// ===== PUBLIC VAPID KEY =====
const publicKey = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEvEAweJTo/7VIVeizOqiBYbiMKIwi6/CCAA9lKjQdAvMNu4kfJnkHkTn6Q32U6IybbTLJC+1w8gxmuP8QIlSezA==";


// ===== MODULE PLACEHOLDERS =====
function openModule(name) {
    alert('Модуль "' + name + '" находится в разработке');
}


// ===== BASE64 → UINT8ARRAY (Safari requirement) =====
function urlBase64ToUint8Array(base64String) {

    const padding = '='.repeat((4 - base64String.length % 4) % 4);

    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);

    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}


// ===== PUSH SUBSCRIPTION =====
async function subscribePush() {

    // Проверка поддержки
    if (!("serviceWorker" in navigator)) {
        console.log("Service Worker not supported");
        return;
    }

    if (!("PushManager" in window)) {
        console.log("Push not supported");
        return;
    }

    try {

        // Запрос разрешения
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
            console.log("Push permission denied");
            return;
        }

        // Регистрация Service Worker
        const registration = await navigator.serviceWorker.register("/static/sw.js");

        console.log("Service Worker registered");

        // Подписка
        const subscription = await registration.pushManager.subscribe({

            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey)

        });

        console.log("Push subscription created");

        // Отправка на сервер
        await fetch("/subscribe", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(subscription)

        });

        console.log("Subscription sent to server");

    }
    catch (err) {

        console.error("Push subscription error:", err);

    }

}


// ===== INIT =====
subscribePush();