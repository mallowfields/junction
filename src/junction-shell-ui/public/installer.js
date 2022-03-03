console.log('INSTALLER')
// Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => { console.log('Service Worker Registered!'); });
}

// Code to handle install prompt on desktop
window.installPromptEvent = {};
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  window.installPromptEvent = event;
});
