// Fonction pour ajouter un produit au panier
function ajouterAuPanier() {
    alert("Produit ajouté au panier !");
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
