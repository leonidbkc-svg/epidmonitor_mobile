console.log("EpidMonitor mobile loaded");


if ('serviceWorker' in navigator) {

navigator.serviceWorker.register('/static/sw.js');

}