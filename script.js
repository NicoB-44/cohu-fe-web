// 📌 Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyASQVCg8yyA_oRBn_PnGQUYTg4WwHjqByI",
    authDomain: "pc-scraper-poc.firebaseapp.com",
    projectId: "pc-scraper-poc",
    storageBucket: "pc-scraper-poc.firebasestorage.app",
    messagingSenderId: "474435730603",
    appId: "1:474435730603:web:ddd69a9b3cbc88de24cbee"
};

// Initialise Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 📌 URL de ton backend sur Render
const BACKEND_URL = "https://cohu-fe-backend.onrender.com";

// 📌 Mise à jour de l'affichage de l'état d'authentification
function updateAuthStatus(user) {
    const authStatus = document.getElementById("authStatus");
    const logoutButton = document.getElementById("logoutButton");

    if (user) {
        authStatus.innerText = `Meow ${user.email}! still no fur ? 🐱‍👤`;
        logoutButton.classList.remove("hidden");
    } else {
        authStatus.innerText = "Meow, 'new smell... let's meet ? 🐱‍👤";
        logoutButton.classList.add("hidden");
    }
}

// 📌 Inscription d'un nouvel utilisateur
document.getElementById("signupButton").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user.getIdToken();  // Récupère le token Firebase
        })
        .then((idToken) => {
            return fetch(`${BACKEND_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                },
                body: JSON.stringify({})
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log("nice of you to join this cat-gang ! meow 🐱‍👤", data);
        })
        .catch((error) => {
            console.error("mrrraw ! something's wrong with you !", error.message);
        });
});

// 📌 Connexion d'un utilisateur
document.getElementById("loginButton").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("✅ Connexion réussie :", userCredential.user.email);
        })
        .catch((error) => {
            console.error("❌ Erreur de connexion :", error.message);
        });
});

// 📌 Déconnexion d'un utilisateur
document.getElementById("logoutButton").addEventListener("click", () => {
    auth.signOut()
        .then(() => {
            console.log("✅ Déconnexion réussie");
        })
        .catch((error) => {
            console.error("❌ Erreur lors de la déconnexion :", error.message);
        });
});

// 📌 Vérifier si l'utilisateur est connecté et mettre à jour l'affichage
auth.onAuthStateChanged((user) => {
    updateAuthStatus(user);
});
