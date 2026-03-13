const publicKey = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEvEAweJTo/7VIVeizOqiBYbiMKIwi6/CCAA9lKjQdAvMNu4kfJnkHkTn6Q32U6IybbTLJC+1w8gxmuP8QIlSezA==";


function openModule(name){
    alert('Модуль "' + name + '" находится в разработке');
}


function urlBase64ToUint8Array(base64String){

    const padding = '='.repeat((4 - base64String.length % 4) % 4);

    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);

    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i){
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;

}


async function subscribePush(){

    try{

        const permission = await Notification.requestPermission();

        if(permission !== "granted"){
            alert("Разрешение на уведомления не получено");
            return;
        }

        const registration = await navigator.serviceWorker.register("/static/sw.js");

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

        alert("Уведомления включены");

    }

    catch(err){

        console.error(err);
        alert("Ошибка подписки push");

    }

}