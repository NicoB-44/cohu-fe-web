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
    const authStatus = document.getElementById("authStatus"); // Récupère l'élément du statut

    if (user) {
        authStatus.innerText = `👋 Hello ${user.email} !`;
        checkboxes.forEach(checkbox => checkbox.disabled = false);
        testNotifButton.disabled = false;
        document.querySelector(".signin-container").style.display = "none";
        document.querySelector(".logout-container").style.display = "block";
        loadUserPreferences(user);
        
        // Initialize FCM when user logs in
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

// Appelle `updateAuthStatus(null)` au chargement initial
document.addEventListener("DOMContentLoaded", () => {
    updateAuthStatus(null);
});

// Gestion de l'authentification
auth.onAuthStateChanged(user => {
    updateAuthStatus(user);
});

// 📌 Récupérer et enregistrer le token FCM au chargement
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
    } catch (error) {
        console.error("❌ Erreur lors de l'initialisation de FCM :", error);
    }
}

// 📩 Gérer les notifications en foreground
messaging.onMessage((payload) => {
    console.log("📩 Notification reçue en foreground :", payload);
    new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/img/logo.png"
    });
});



// Update FCM token in backend
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

function displayNotification(title, body) {
    new Notification(title, {
        body: body,
        icon: "/img/logo.png",
        badge: "/img/badge.png"
    });
}


function handleForegroundNotifications(payload) {
    console.log("📩 Notification reçue en foreground :", payload);

    if (Notification.permission === "granted") {
        displayNotification(payload.notification.title, payload.notification.body);
    } else {
        console.warn("⚠️ Notifications bloquées par l'utilisateur.");
    }
}


// Récupérer les préférences utilisateur
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

            // ✅ Mise à jour des checkboxes des produits
            document.querySelectorAll(".product-notifs input[type='checkbox']").forEach(checkbox => {
                const productCode = checkbox.dataset.code;
                checkbox.checked = preferences.products?.[productCode]?.includes("push") || false;
            });

            // ✅ Ajout de la gestion de notifications_enabled
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
        .catch(error => console.error("❌ Erreur lors du chargement des préférences :", error)); // ✅ Catch bien positionné
    });
}

// Mettre à jour les préférences utilisateur
function updateUserPreferences(user) {
    const updatedPreferences = { 
        products: {}, 
        notifications_enabled: document.getElementById("global-notifs").checked // 🔥 Ajout de notifications_enabled
    };

    // Parcourir les cases à cocher des produits
    document.querySelectorAll(".product-notifs input[type='checkbox']").forEach(checkbox => {
        const productCode = checkbox.dataset.code;
        if (checkbox.checked) {
            updatedPreferences.products[productCode] = ["push"];
        } else {
            updatedPreferences.products[productCode] = []; // Envoyer un tableau vide pour supprimer la notif
        }
    });

    // Envoyer les préférences mises à jour au backend
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

            // ✅ Mettre à jour le texte immédiatement après modification
            notifStatus.textContent = globalNotifsCheckbox.checked 
                ? "✅ Notifications activées"
                : "❌ Notifications désactivées";
            
        })
        .catch(error => console.error("❌ Erreur lors de la mise à jour des préférences :", error));
    });
}

// Fonctions d'authentification
function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("✅ Inscription réussie :", userCredential.user);

            // Envoi des infos au backend pour Firestore
            userCredential.user.getIdToken().then(token => {
                fetch(`${BACKEND_URL}/user/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
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

// Écouter les modifications des toggles
document.addEventListener("DOMContentLoaded", () => {
    // Boutons d'authentification
    const signupButton = document.getElementById("signupButton");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");

    if (signupButton) {
        signupButton.addEventListener("click", signup);
    }
    if (loginButton) {
        loginButton.addEventListener("click", login);
    }
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
    console.log("✅ Écouteurs d'événements attachés aux boutons !");

    // Rétablissement de l'écoute sur les checkboxes
    document.querySelectorAll(".product-notifs input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (auth.currentUser) {
                updateUserPreferences(auth.currentUser);
            }
        });
    });

    // Ajout d'un écouteur d'événements pour la checkbox globale
    const globalNotifsCheckbox = document.getElementById("global-notifs");
    if (globalNotifsCheckbox) {
        globalNotifsCheckbox.addEventListener("change", () => {
            if (auth.currentUser) {
                updateUserPreferences(auth.currentUser);
            }
        });
    }

});
