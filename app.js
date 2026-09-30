const status = document.getElementById("status");
const enableBtn = document.getElementById("enableBtn");
const notifyBtn = document.getElementById("notifyBtn");

// Register Service Worker
if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register("sw.js")
    .then(() => {
      console.log("Service Worker registered");
      status.textContent = "Service Worker ready";
    })
    .catch(error => {
      console.error("Service Worker failed:", error);
      status.textContent = "Service Worker failed";
    });
}


// Enable notifications
enableBtn.addEventListener("click", async () => {

  if (!("Notification" in window)) {
    status.textContent = "Notifications are not supported";
    return;
  }

  const permission = await Notification.requestPermission();

  console.log("Permission:", permission);

  if (permission === "granted") {
    status.textContent = "✅ Notifications enabled";
  } else {
    status.textContent = "❌ Notification permission denied";
  }
});


// Send notification
notifyBtn.addEventListener("click", async () => {

  if (Notification.permission !== "granted") {
    alert("Please enable notifications first.");
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  registration.showNotification("🔔 Test Notification", {
    body: "Hello! Your PWA notification is working.",
    icon: "https://via.placeholder.com/192",
    badge: "https://via.placeholder.com/96",
    vibrate: [200, 100, 200]
  });

});