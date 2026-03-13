const publicKey = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEvEAweJTo/7VIVeizOqiBYbiMKIwi6/CCAA9lKjQdAvMNu4kfJnkHkTn6Q32U6IybbTLJC+1w8gxmuP8QIlSezA==";

function openModule(name){

alert("Модуль \"" + name + "\" находится в разработке");

}

async function subscribePush(){

const registration = await navigator.serviceWorker.register("/static/sw.js");

const subscription = await registration.pushManager.subscribe({

userVisibleOnly: true,
applicationServerKey: publicKey

});

await fetch("/subscribe",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(subscription)

});

}

subscribePush();