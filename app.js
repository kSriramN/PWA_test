const status = document.getElementById("status");

const enableBtn = document.getElementById("enableBtn");
const notifyBtn = document.getElementById("notifyBtn");


// Check browser support
if (!("Notification" in window)) {
    status.textContent = "❌ Notifications are not supported";
} else {
    status.textContent =
        "Current permission: " + Notification.permission;
}


// Register Service Worker
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("./sw.js")
        .then(registration => {

            console.log("Service Worker registered:", registration);

            status.textContent =
                "Service Worker ready | Permission: " +
                Notification.permission;

        })
        .catch(error => {

            console.error("Service Worker error:", error);

            status.textContent =
                "❌ Service Worker error: " + error;

        });
}


// Enable notifications
enableBtn.addEventListener("click", async () => {

    console.log("Notification permission before:",
        Notification.permission);

    if (!("Notification" in window)) {
        status.textContent =
            "❌ Notifications are not supported";
        return;
    }

    try {

        const permission =
            await Notification.requestPermission();

        console.log("Permission result:", permission);

        status.textContent =
            "Permission result: " + permission;

    } catch (error) {

        console.error(error);

        status.textContent =
            "❌ Error: " + error;

    }

});


// Send notification
notifyBtn.addEventListener("click", async () => {

    if (Notification.permission !== "granted") {

        status.textContent =
            "❌ Permission is not granted";

        return;
    }

    try {

        const registration =
            await navigator.serviceWorker.ready;

        await registration.showNotification(
            "🔔 PWA Test",
            {
                body: "Your PWA notification is working!",
                icon: "./icon-192.png",
                badge: "./icon-192.png"
            }
        );

        status.textContent =
            "✅ Notification sent";

    } catch (error) {

        console.error(error);

        status.textContent =
            "❌ Notification error: " + error;

    }

});