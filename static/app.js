const publicKey = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEvEAweJTo/7VIVeizOqiBYbiMKIwi6/CCAA9lKjQdAvMNu4kfJnkHkTn6Q32U6IybbTLJC+1w8gxmuP8QIlSezA==";

function openModule(name){
    alert('Модуль "' + name + '" находится в разработке');
}

function urlBase64ToUint8Array(base64String) {

    const padding = '='.repeat((4 - base64String.length % 4) % 4);

    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);

    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

async function subscribePush(){

    try{

        const permission = await Notification.requestPermission();

        if(permission !== "granted"){
            alert("Уведомления не разрешены");
            return;
        }

        const registration = await navigator.serviceWorker.register("/static/sw.js");

        await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({

            userVisibleOnly:true,
            applicationServerKey:urlBase64ToUint8Array(publicKey)

        });

        await fetch("/subscribe",{

            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(subscription)

        });

        alert("Уведомления успешно включены");

    }
    catch(e){

        console.error(e);

        alert("Ошибка подписки push: " + e.message);

    }

}