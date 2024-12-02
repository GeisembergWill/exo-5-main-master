// Initialise un tableau pour stocker les auteurs ajoutés aux favoris
var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function getAuthors() { 
    return Object.keys(allQuotes); // Fonction pour récupérer les auteurs
}

function getQuotes() { 
    return Object.values(allQuotes); // Fonction pour récupérer les citations
}

function displayAllQuotes() { 
    var quoteContainer = document.getElementById('quote-container');
    var authors = getAuthors();
    var quotes = getQuotes();

    // Parcourt chaque auteur et citation pour afficher
    for (var i = 0; i < authors.length; i++) {
        var author = authors[i]; 
        var quote = quotes[i]; 
        
        // Crée un élément de div pour chaque citation avec un style de carré
        var quoteElement = document.createElement('div'); 
        quoteElement.classList.add('quote-card'); // Ajoute la classe de style pour le carré
        
        // Ajoute le contenu HTML à l'élément, incluant la citation, l'auteur et l'étoile
        quoteElement.innerHTML = `
            <p>"${quote}"</p>
            <strong>- ${author}</strong>
            <span class="etoile ${favorites.includes(author) ? 'clicked' : ''}">★</span>
        `; 
        
        // Ajoute un événement au clic sur l'élément de la citation
        quoteElement.addEventListener('click', function() { 
            var author = this.querySelector('strong').innerText.slice(2); // Récupère l'auteur
            toggleFavorite(author, quote); // Passe aussi la citation lors du clic
            updateStarDisplay(this.querySelector('.etoile'), author);
        }); 
        
        // Ajoute la citation au conteneur principal
        quoteContainer.appendChild(quoteElement); 
    } 
}

// Fonction pour ajouter ou retirer une citation des favoris
function toggleFavorite(author, quote) {
    const index = favorites.findIndex(item => item.author === author);

    if (index === -1) {
        // Si l'auteur n'est pas déjà dans les favoris, on l'ajoute avec sa citation
        favorites.push({ author: author, quote: quote });
    } else {
        // Si l'auteur est déjà dans les favoris, on le retire
        favorites.splice(index, 1);
    }

    // Sauvegarde les favoris dans le localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Met à jour l'affichage des favoris après modification
    displayFavorites();
}

// Fonction pour mettre à jour l'état visuel de l'étoile
function updateStarDisplay(etoileElement, author) {
    // Cette fonction agit sur l'étoile associée à une citation.
    if (favorites.some(fav => fav.author === author)) {
        etoileElement.classList.add('clicked');
    } else {
        etoileElement.classList.remove('clicked');
    }
}

// Fonction pour afficher toutes les citations favorites
function displayFavorites() {
    // Sélectionne le conteneur où les favoris seront affichés
    var favoritesContainer = document.getElementById('favorites-container');
    
    // Réinitialise le contenu actuel du conteneur des favoris
    favoritesContainer.innerHTML = '<h2>Favoris</h2>';
    
    // Parcours le tableau des favoris pour les afficher
    favorites.forEach(favorite => {
        // Crée un nouvel élément de paragraphe pour chaque favori
        var favoriteElement = document.createElement('div');
        favoriteElement.classList.add('favorite-card'); // Classe de style pour le carré

        favoriteElement.innerHTML = `
            <p>"${favorite.quote}"</p>
            <strong>- ${favorite.author}</strong>
            <span class="etoile clicked">★</span>
        `;

        // Ajoute le favori au conteneur des favoris
        favoritesContainer.appendChild(favoriteElement);
    });
}


displayAllQuotes();
displayFavorites(); 