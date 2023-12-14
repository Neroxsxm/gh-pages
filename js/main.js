// BD Produit
const products = [
    {
        sku: "1", // Identificateur de produit unique
        img: "./img/product1.jpg", // path to imagre relative
        titre: "Clavier Gamer G-Lab",
        description: "Clavier Gamer de premier choix",
        price: 19.99,
        featured: false, // true|false
    },
    {
        sku: "2", // Identificateur de produit unique
        img: "./img/product2.jpg", // path to imagre relative
        titre: "Souris Gamer Spirit of Gamer",
        description: "La souris gamer la plus optimisée",
        price: 29.99,
        featured: false,
    },
    {
        sku: "3", // Identificateur de produit unique
        img: "./img/product3.jpg", // path to imagre relative
        titre: "Moniteur Gaming 144Hz",
        description: "Le meilleur moniteur Gaming",
        price: 190.0,
        featured: true,
    },
    {
        sku: "4", // Identificateur de produit unique
        img: "./img/product4.jpg", // path to imagre relative
        titre: "Casque Gamer Ultra Suround",
        description: "Le meilleur Casque Gaming le son ne sera plus un problème",
        price: 80.0,
        featured: true,
    },
    
];

// Base ShopingCart

let currentCart = {
    client: {
        fisrtname: "",
        lastname: "",
        address: {
            street: "",
            zip: "",
            town: "",
            country: "",
        },
    },
    products: []
};

// BD Users

// Current User

function init() {
    console.log('init start');
    currentCart = JSON.parse(sessionStorage.getItem('cart')) || currentCart;
    console.log(document.location.pathname);
    let listeProduits = document.querySelector("section.products");
    const template = document.querySelector("#product");
    let currentPage = document.location.pathname.split('/').reverse()[0];
    if ('index.html' == currentPage) {
        products
            .filter(function (item) { return item.featured })
            .forEach(function (item) {
                itemToPage(item, listeProduits, template.content.cloneNode(true))
            });
    } else if ('panier.html' == currentPage) {
        renderCart(template);
    } else if(listeProduits && template) {
        products
            .forEach(function (item) {
                itemToPage(item, listeProduits, template.content.cloneNode(true))
            });
    }
}

function itemToPage(item, listeProduits, thisProduit) {
    let article = thisProduit.querySelector("article");
    article.dataset.sku = item.sku;
    thisProduit.querySelectorAll("h2,h3").forEach(function (title) {
        title.textContent = item.titre;
    });
    let description = thisProduit.querySelector("p");
    description.textContent = item.description;
    let price = thisProduit.querySelector("var.price");
    price.textContent = item.price.toFixed(2);
    let image = thisProduit.querySelector("img");
    image.src = item.img;
    listeProduits.appendChild(thisProduit);
}

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(ev) {
    let sku = ev.parentNode.dataset.sku;
    let produitToPanier = products.find(function (item) { return item.sku == sku });
    currentCart.products.push(produitToPanier);
    sessionStorage.setItem('cart', JSON.stringify(currentCart));
    alert("Votre produit ete ajouter");
}

// Vous pourriez ajouter ici d'autres fonctionnalités JavaScript liées à votre site de e-commerce
// Par exemple, la gestion du panier, des requêtes AJAX pour récupérer des données du serveur, etc.

// Fonction pour ouvrir le panneau (à personnaliser selon vos besoins)
function ouvrirPanneau() {
    window.location.href="./panier.html";

    // Vous pouvez ajouter ici la logique pour afficher le panneau, le panier, etc.
    // Par exemple, en manipulant les classes CSS, en modifiant le DOM, ou en utilisant une bibliothèque JavaScript.
}

// Fonction pour retirer un produit du panier
function retirerDuPanier(ev) {
    let sku = ev.parentNode.dataset.sku;
    // Trouver l'index du produit dans le panier
    const index = currentCart.products.findIndex(item => item.sku === sku);

    // Si le produit est présent dans le panier, le retirer
    if (index !== -1) {
        currentCart.products.splice(index, 1);
        sessionStorage.setItem('cart', JSON.stringify(currentCart));
        renderCart(document.querySelector("#product"));
        alert("Votre produit a été retiré du panier");
    } else {
        alert("Le produit n'est pas dans le panier");
    }
}

function renderCart(template) {
    let productList = document.getElementById("productList");
    productList.innerText = '';
    if (currentCart.products.length) {
        currentCart.products.forEach(function (item) {
            itemToPage(item, productList, template.content.cloneNode(true))
        });
    } else {
        productList.innerHTML = "<p>Le panier est vide.</p>";
    }
    document.getElementById('cart-total').innerText = calculerPrixTotalDuPanier().toFixed(2);
}



// Fonction pour passer la commande
function passerLaCommande() {
    // Logique de passer la commande ici
    alert("Commande passée ! Merci pour votre achat.");

    // Vous pouvez ajouter ici la logique pour vider le panier, envoyer la commande au serveur, etc.
    // Par exemple, en réinitialisant la liste des articles dans le panier.
    var panier = document.querySelector(".cart");
    panier.innerHTML = "<h2>Panier</h2><p>Le panier est vide.</p>";

    window.location.href="./paiement.html";

}

init(); 




// Fonction pour créer un compte (simulation côté client)
function creerCompte() {
    var nom = document.getElementById('nom').value;
    var prenom = document.getElementById('prenom').value;
    var email = document.getElementById('email').value;
    var motdepasse = document.getElementById('motdepasse').value;

    // Simulez une requête vers le serveur pour créer un compte
    // En production, cette opération doit être effectuée côté serveur de manière sécurisée
    // Vous devrez utiliser des méthodes de hachage pour stocker les mots de passe, par exemple

    // Stockez les informations du compte dans le localStorage (à adapter selon la logique réelle)
    var compte = { nom: nom, prenom: prenom, email: email, motdepasse: motdepasse };
    localStorage.setItem('compte', JSON.stringify(compte));

    // Affichez un message de réussite (à adapter selon la logique réelle)
    alert("Compte créé avec succès !");

    // Redirigez l'utilisateur vers une autre page après la création du compte
    // window.location.href = "connexion.html";
}


// Fonction de connexion (simulation côté client)
function connexion() {
    var email = document.getElementById('email').value;
    var motdepasse = document.getElementById('motdepasse').value;

    // Récupérez les informations du compte depuis le localStorage (à adapter selon la logique réelle)
    var compte = JSON.parse(localStorage.getItem('compte'));

    // Vérifiez si l'adresse e-mail et le mot de passe sont valides
    if (compte && email === compte.email && motdepasse === compte.motdepasse) {
        alert("Connexion réussie !");
        sessionStorage.setItem('utilisateurConnecte', 'true');
        // Redirigez l'utilisateur vers une autre page ou effectuez d'autres actions après la connexion
        // window.location.href = "page_apres_connexion.html";
    } else {
        alert("Adresse e-mail ou mot de passe incorrect.");
    }
}

function calculerPrixTotalDuPanier() {
    // Assurez-vous que currentCart.products est une liste d'objets avec une propriété "prix"
    let produitsDuPanier = currentCart.products;

    // Iterer à travers chaque produit dans le panier et additionner les prix
    let prixTotal =  produitsDuPanier.reduce(function(total, produit) {
        return total + produit.price;
    }, 0);

    // Afficher le prix total (ou faites ce que vous voulez avec le prix total)
    console.log("Prix total du panier : " + prixTotal);

    return prixTotal;
}

function effectuerPaiement() {
    // Récupérer les données du formulaire
    var pays = document.getElementById('pays').value;
    var ville = document.getElementById('ville').value;
    var rue = document.getElementById('rue').value;
    var codePostal = document.getElementById('codePostal').value;

    var numeroCarte = document.getElementById('numeroCarte').value;
    var dateExpiration = document.getElementById('dateExpiration').value;
    var nomTitulaire = document.getElementById('nomTitulaire').value;
    var cryptogrammeVisuel = document.getElementById('cryptogrammeVisuel').value;

    // Valider les champs (vous pouvez ajouter une logique de validation plus robuste)
    if (!pays || !ville || !rue || !codePostal || !numeroCarte || !dateExpiration || !nomTitulaire || !cryptogrammeVisuel) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;
    }

    // Simuler le traitement du paiement côté client
    alert("Paiement effectué avec succès ! Merci de votre achat.");

    // Vous pourriez également rediriger l'utilisateur vers une page de confirmation
    // window.location.href = "confirmation_paiement.html";
}



function estConnecte() {
    // Simulez une vérification de connexion côté client
    // Vous pouvez remplacer cela par une logique de vérification plus sophistiquée
    return sessionStorage.getItem('utilisateurConnecte') === 'true';
}

function connexionUtilisateur() {
    // Simulez le processus de connexion côté client
    sessionStorage.setItem('utilisateurConnecte', 'true');
    alert('Vous êtes maintenant connecté !');
}

function deconnexionUtilisateur() {
    // Simulez le processus de déconnexion côté client
    sessionStorage.removeItem('utilisateurConnecte');
    alert('Vous êtes maintenant déconnecté.');
}

// Fonction de paiement
function effectuerPaiement() {
    // Vérifier si l'utilisateur est connecté
    if (!estConnecte()) {
        alert('Erreur : Vous devez être connecté pour effectuer un paiement.');
        window.location.href = "connexion.html"; 
        return;
    }

    // Récupérer les données du formulaire et simuler le traitement du paiement
    var pays = document.getElementById('pays').value;
    var ville = document.getElementById('ville').value;
    var rue = document.getElementById('rue').value;
    var codePostal = document.getElementById('codePostal').value;

    var numeroCarte = document.getElementById('numeroCarte').value;
    var dateExpiration = document.getElementById('dateExpiration').value;
    var nomTitulaire = document.getElementById('nomTitulaire').value;
    var cryptogrammeVisuel = document.getElementById('cryptogrammeVisuel').value;

    // Valider les champs (vous pouvez ajouter une logique de validation plus robuste)
    if (!pays || !ville || !rue || !codePostal || !numeroCarte || !dateExpiration || !nomTitulaire || !cryptogrammeVisuel) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;
    }

    // Simuler le traitement du paiement côté client
    alert("Paiement effectué avec succès ! Merci de votre achat.");

    // Vous pourriez également rediriger l'utilisateur vers une page de confirmation
    // window.location.href = "confirmation_paiement.html";
}

// Ajoutez ces fonctions dans votre fichier HTML pour permettre à l'utilisateur de se connecter/déconnecter
// par exemple, vous pouvez ajouter des boutons dans le HTML liés à ces fonctions.
