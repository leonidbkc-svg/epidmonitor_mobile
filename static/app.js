console.log("EpidMonitor Mobile loaded");

if ("serviceWorker" in navigator) {

navigator.serviceWorker.register("/static/sw.js");

}