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
        checkboxes.forEach(checkbox => checkbox.disabled = false);
        testNotifButton.disabled = false;
        loadUserPreferences(user);
        
        // ✅ Met à jour le statut de connexion
        authStatus.innerText = `✅ Connecté en tant que ${user.email}`;
    } else {
        checkboxes.forEach(checkbox => checkbox.disabled = true);
        testNotifButton.disabled = true;
        
        // ✅ Met à jour le statut pour afficher "Déconnecté"
        authStatus.innerText = "🔄 Vérification de l'état de connexion...";
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
            document.querySelectorAll(".product-notifs input[type='checkbox']").forEach(checkbox => {
                const productCode = checkbox.dataset.code;
                checkbox.checked = preferences.products?.[productCode]?.includes("push") || false;
            });
        })
        .catch(error => console.error("❌ Erreur lors du chargement des préférences :", error));
    });
}

// Mettre à jour les préférences utilisateur
function updateUserPreferences(user) {
    const updatedPreferences = { products: {} };
    document.querySelectorAll(".product-notifs input[type='checkbox']").forEach(checkbox => {
        const productCode = checkbox.dataset.code;
        if (checkbox.checked) {
            updatedPreferences.products[productCode] = ["push"];
        }
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
        })
        .catch(error => console.error("❌ Erreur lors de la mise à jour des préférences :", error));
    });
}

// Gestion de l'authentification
auth.onAuthStateChanged(user => {
    updateAuthStatus(user);
});

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
});

// Fonctions d'authentification
function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("✅ Inscription réussie :", userCredential.user);
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
