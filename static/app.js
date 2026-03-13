function openModule(name){

alert("Модуль \"" + name + "\" находится в разработке");

}

if ("serviceWorker" in navigator) {

navigator.serviceWorker.register("/static/sw.js");

}