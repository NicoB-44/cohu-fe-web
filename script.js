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
    if (user) {
        document.querySelector(".auth-container").classList.add("hidden");
        document.querySelector(".notif-container").classList.remove("hidden");
        loadUserPreferences(user);
    } else {
        document.querySelector(".auth-container").classList.remove("hidden");
        document.querySelector(".notif-container").classList.add("hidden");
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
document.querySelectorAll(".product-notifs input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        if (auth.currentUser) {
            updateUserPreferences(auth.currentUser);
        }
    });
});
