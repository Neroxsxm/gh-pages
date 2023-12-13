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

function init() {
    console.log('init start');
    currentCart = JSON.parse(sessionStorage.getItem('cart')) || currentCart;
    console.log(document.location.pathname);
    let listeProduits = document.querySelector("section.products");
    const template = document.querySelector("#product");
    if ('/index.html' == document.location.pathname) {
        products
            .filter(function (item) { return item.featured })
            .forEach(function (item) {
                itemToPage(item, listeProduits, template.content.cloneNode(true))
            });
    } else if ('/panier.html' == document.location.pathname) {
        currentCart.products.forEach(function (item) {
                itemToPage(item, document.querySelector("cart.products"), template.content.cloneNode(true))
            });
    } else {
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
    console.log(ev.parentNode.dataset.sku);
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
function retirerDuPanier() {
    // Supprimez le dernier article du panier (à adapter en fonction de votre implémentation réelle)
    var panier = document.querySelector(".cart");
    var articles = panier.querySelectorAll(".cart-item");

    if (articles.length > 0) {
        articles[articles.length - 1].remove();
    } else {
        alert("Le panier est vide.");
    }
}

// Fonction pour passer la commande
function passerLaCommande() {
    // Logique de passer la commande ici
    alert("Commande passée ! Merci pour votre achat.");

    // Vous pouvez ajouter ici la logique pour vider le panier, envoyer la commande au serveur, etc.
    // Par exemple, en réinitialisant la liste des articles dans le panier.
    var panier = document.querySelector(".cart");
    panier.innerHTML = "<h2>Panier</h2><p>Le panier est vide.</p>";
}

init();
