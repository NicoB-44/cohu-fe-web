// Initialisation Firebase
const firebaseConfig = {
    apiKey: "AIzaSyASQVCg8yyA_oRBn_PnGQUYTg4WwHjqByI",
    authDomain: "pc-scraper-poc.firebaseapp.com",
    projectId: "pc-scraper-poc",
    storageBucket: "pc-scraper-poc.firebasestorage.app",
    messagingSenderId: "474435730603",
    appId: "1:474435730603:web:ddd69a9b3cbc88de24cbee"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const messaging = firebase.messaging();
const BACKEND_URL = "https://cohu-fe-backend.onrender.com";

// Création d'un message temporaire
function showTemporaryMessage(message) {
    let msgBox = document.createElement("div");
    msgBox.innerText = message;
    msgBox.className = "temp-message";
    document.body.appendChild(msgBox);
    setTimeout(() => msgBox.remove(), 2000);
}

// Mise à jour de l'état de connexion
function updateAuthStatus(user) {
    const checkboxes = document.querySelectorAll(".product-notifs input[type='checkbox']");
    const testNotifButton = document.getElementById("testNotifButton");
    const authStatus = document.getElementById("authStatus");

    if (user) {
        authStatus.innerText = `👋 Hello ${user.email} !`;
        checkboxes.forEach(checkbox => checkbox.disabled = false);
        testNotifButton.disabled = false;
        document.querySelector(".signin-container").style.display = "none";
        document.querySelector(".logout-container").style.display = "block";
        loadUserPreferences(user);

        initializeFCM().then(token => {
            if (token) updateFCMToken(user, token);
        });
    } else {
        authStatus.innerText = "Joining the gang ?";
        checkboxes.forEach(checkbox => checkbox.disabled = true);
        testNotifButton.disabled = true;
        document.querySelector(".signin-container").style.display = "block";
        document.querySelector(".logout-container").style.display = "none";
    }
}

// Initial state
document.addEventListener("DOMContentLoaded", () => {
    updateAuthStatus(null);
});

auth.onAuthStateChanged(user => {
    updateAuthStatus(user);
});

// Init FCM
async function initializeFCM() {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.warn("⚠️ Notifications refusées par l'utilisateur.");
            return;
        }

        const token = await messaging.getToken({
            serviceWorkerRegistration: await navigator.serviceWorker.register('/cohu-fe-web/firebase-messaging-sw.js')
        });

        if (!token) {
            console.warn("⚠️ Impossible de récupérer le token FCM.");
            return;
        }

        console.log("✅ Token FCM récupéré :", token);
        const user = auth.currentUser;
        if (user) {
            updateFCMToken(user, token);
        }
        return token;
    } catch (error) {
        console.error("❌ Erreur lors de l'initialisation de FCM :", error);
    }
}

// Gestion des notifications foreground
function handleForegroundNotifications(payload) {
    if (payload?.data?.test === "ping") {
        console.log("🔕 Notification silencieuse (ping) ignorée.");
        return;
    }
    console.log("📩 Notification reçue en foreground :", payload);

    const title = payload.notification?.title || payload.data?.title || "Cohu Alert!";
    const body = payload.notification?.body || payload.data?.body || payload.data?.message || "Nouvelle alerte disponible";
    const icon = payload.notification?.image || payload.data?.image || "/cohu-fe-web/img/logo.png";
    const badge = "/cohu-fe-web/img/badge.png";
    const click_action = payload.data?.link || payload.data?.click_action;

    if (Notification.permission === "granted") {
        const notification = new Notification(title, {
            body,
            icon,
            badge,
            data: { click_action }
        });

        notification.onclick = event => {
            event.preventDefault();
            if (click_action) {
                window.open(click_action, '_blank');
            }
        };
    } else {
        console.warn("⚠️ Notifications bloquées par l'utilisateur.");
    }
}

messaging.onMessage(handleForegroundNotifications);

// Envoi token FCM au backend
async function updateFCMToken(user, token) {
    if (!user || !token) return;

    try {
        const idToken = await user.getIdToken();
        const response = await fetch(`${BACKEND_URL}/user/fcm-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`
            },
            body: JSON.stringify({ fcm_token: token })
        });

        const data = await response.json();
        console.log("✅ FCM token envoyé au backend :", data);
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi du token FCM :", error);
    }
}

// Chargement des préférences utilisateur
function loadUserPreferences(user) {
    user.getIdToken().then(token => {
        fetch(`${BACKEND_URL}/user/preferences`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(preferences => {
            console.log("📥 Préférences utilisateur :", preferences);

            document.querySelectorAll(".product-notifs input[type='checkbox']").forEach(checkbox => {
                const productCode = checkbox.dataset.code;
                checkbox.checked = preferences.products?.[productCode]?.includes("push") || false;
            });

            const globalNotifsCheckbox = document.getElementById("global-notifs");
            const notifStatus = document.getElementById("notifStatus");

            if (globalNotifsCheckbox) {
                globalNotifsCheckbox.checked = preferences.notifications_enabled || false;
            }

            if (notifStatus) {
                notifStatus.textContent = preferences.notifications_enabled 
                    ? "✅ Notifications activées"
                    : "❌ Notifications désactivées";
            }
        })
        .catch(error => console.error("❌ Erreur lors du chargement des préférences :", error));
    });
}

// Mise à jour des préférences utilisateur
function updateUserPreferences(user) {
    const globalNotifsCheckbox = document.getElementById("global-notifs");
    const notifStatus = document.getElementById("notifStatus");

    const updatedPreferences = {
        products: {},
        notifications_enabled: globalNotifsCheckbox.checked
    };

    document.querySelectorAll(".product-notifs input[type='checkbox']").forEach(checkbox => {
        const productCode = checkbox.dataset.code;
        updatedPreferences.products[productCode] = checkbox.checked ? ["push"] : [];
    });

    user.getIdToken().then(token => {
        fetch(`${BACKEND_URL}/user/preferences`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedPreferences)
        })
        .then(response => response.json())
        .then(() => {
            console.log("✅ Préférences mises à jour !");
            showTemporaryMessage("✅ Préférences sauvegardées !");

            notifStatus.textContent = globalNotifsCheckbox.checked 
                ? "✅ Notifications activées"
                : "❌ Notifications désactivées";
        })
        .catch(error => console.error("❌ Erreur lors de la mise à jour des préférences :", error));
    });
}

// Authentification
function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("✅ Inscription réussie :", userCredential.user);
            userCredential.user.getIdToken().then(token => {
                fetch(`${BACKEND_URL}/user/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(() => {
                    console.log("✅ Données utilisateur initialisées dans Firestore !");
                })
                .catch(error => console.error("❌ Erreur lors de l'initialisation des données utilisateur :", error));
            });
        })
        .catch(error => {
            console.error("❌ Erreur lors de l'inscription :", error);
        });
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("✅ Connexion réussie :", userCredential.user);
        })
        .catch(error => {
            console.error("❌ Erreur lors de la connexion :", error);
        });
}

function logout() {
    auth.signOut()
        .then(() => {
            console.log("✅ Déconnexion réussie !");
        })
        .catch(error => {
            console.error("❌ Erreur lors de la déconnexion :", error);
        });
}

// Initialisation des événements

document.addEventListener("DOMContentLoaded", () => {
    const testNotifButton = document.getElementById("testNotifButton");
    if (testNotifButton) {
        testNotifButton.addEventListener("click", async () => {
            console.log("📩 Bouton de test de notification cliqué.");
            const user = auth.currentUser;
            if (!user) {
                alert("⚠️ Vous devez être connecté pour tester une notification.");
                return;
            }
            try {
                const token = await user.getIdToken();
                const response = await fetch(`${BACKEND_URL}/user/test-notification`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: "Test de notification",
                        body: "Tu as bien reçu la notif 😺",
                        image: "/cohu-fe-web/img/logo.png",
                        link: "https://nicob-44.github.io/cohu-fe-web/testnotification.html"
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    console.log("✅ Notification test envoyée :", data);
                    alert("✅ Notification envoyée avec succès !");
                } else {
                    console.error("❌ Erreur lors de l'envoi :", data);
                    alert(`❌ Erreur : ${data.detail}`);
                }
            } catch (error) {
                console.error("❌ Erreur inattendue :", error);
                alert("❌ Une erreur est survenue.");
            }
        });
    }

    const signupButton = document.getElementById("signupButton");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");

    if (signupButton) signupButton.addEventListener("click", signup);
    if (loginButton) loginButton.addEventListener("click", login);
    if (logoutButton) logoutButton.addEventListener("click", logout);

    console.log("✅ Écouteurs d'événements attachés aux boutons !");

    document.querySelectorAll(".product-notifs input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (auth.currentUser) updateUserPreferences(auth.currentUser);
        });
    });

    const globalNotifsCheckbox = document.getElementById("global-notifs");
    if (globalNotifsCheckbox) {
        globalNotifsCheckbox.addEventListener("change", () => {
            if (auth.currentUser) updateUserPreferences(auth.currentUser);
        });
    }
});
