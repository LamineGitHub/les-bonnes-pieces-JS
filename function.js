import getAvis from './avis.js'

export const sectionFiches = document.querySelector(".fiches")


/**
 * Il crée une div, puis crée deux divs à l'intérieur, ensuite crée deux listes non ordonnées à l'intérieur
 * de ces divs, ensuite ajoute les divs aux divs, ensuite ajoute la div à la section
 * @param pieces - un tableau d'objets, chaque objet a un nom, un prix et une disponibilité.
 */
function generateList(pieces) {

    const divList = document.createElement('div')
    divList.setAttribute('class', 'liste')

    const divAbordable = document.createElement('div')
    divAbordable.setAttribute('class', 'abordables')
    divAbordable.innerHTML = /*html*/ `<b> Pieces abordables : </b>`

    const divDisposed = document.createElement('div')
    divDisposed.setAttribute('class', 'disponible')
    divDisposed.innerHTML = /*html*/ `<b> Pieces disponibles : </b>`

    const noms = pieces.map(piece => piece.nom)
    /* Suppression des éléments du tableau qui ne sont pas abordables. */
    for (let i = pieces.length - 1; i >= 0; i--) {
        if (pieces[i].prix > 35) {
            noms.splice(i, 1)
        }
    }

    // Création de la liste
    const abordablesElements = document.createElement('ul');

    // Ajout de chaque nom à la liste
    for (let i = 0; i < noms.length; i++) {
        const nomElement = document.createElement('li');
        nomElement.innerText = noms[i];
        abordablesElements.appendChild(nomElement)
    }

    // Ajout de l'en-tête puis de la liste au bloc résultat filtres
    divAbordable.appendChild(abordablesElements)

    const nomDisposed = pieces.map(piece => piece.nom)
    const prixDisposed = pieces.map(piece => piece.prix)

    /* Suppression des éléments du tableau qui ne sont pas disponibles. */
    for (let i = pieces.length - 1; i >= 0; i--) {
        if (pieces[i].disponibilite === false) {
            nomDisposed.splice(i, 1)
            prixDisposed.splice(i, 1)
        }
    }

    const pieceDisponibles = document.createElement('ul');
    // Ajout de chaque nom à la liste
    for (let i = 0; i < nomDisposed.length; i++) {
        const nomElement = document.createElement('li');
        nomElement.innerText = `${nomDisposed[i]} - ${prixDisposed[i]} €`;
        pieceDisponibles.appendChild(nomElement)
    }
    // Ajout de l'en-tête puis de la liste au bloc résultat filtres
    divDisposed.appendChild(pieceDisponibles)

    /* Ajout des divs à la section. */
    sectionFiches.appendChild(divList)
    divList.appendChild(divAbordable)
    divList.appendChild(divDisposed)
}

/**
 * La fonction prend une classe et y ajoute la classe 'active', puis elle prend n'importe quel nombre
 * de classes et en supprime la classe 'active'.
 * @param activeClass - La classe à laquelle vous souhaitez ajouter la classe active
 * @param remove - Les classes dont vous souhaitez supprimer la classe active.
 */
export function toggleClass(activeClass, ...remove) {
    activeClass.classList.add("active")
    remove.map(value => value.classList.remove("active"))
}

/**
 * Il supprime une classe d'une liste d'éléments.
 * @param classRemove - La classe que vous souhaitez supprimer
 * @param remove - Les éléments dont vous souhaitez supprimer la classe.
 */
export function removeClass(classRemove, ...remove) {
    remove.map(value => value.classList.remove(classRemove))
}

/**
 * Il génère une liste d'articles, et pour chaque article, il crée un élément article, ajoute une
 * image, un titre, un prix, une catégorie, une description, un état de stock et un bouton pour
 * afficher les avis.
 * @param pieces - un tableau d'objets
 */
export function generatePieces(pieces) {

    generateList(pieces)

    for (let i = 0; i < pieces.length; i++) {

        let article = pieces[i]

        const articleElement = document.createElement("article")
        const imageElement = document.createElement("img")
        imageElement.src = article.image

        articleElement.appendChild(imageElement)
        sectionFiches.appendChild(articleElement)


        const nomElement = document.createElement("h2")
        nomElement.innerText = article.nom
        articleElement.appendChild(nomElement)


        const prixElement = document.createElement("p")
        prixElement.innerText = `Prix : ${article.prix} ${article.prix < 35 ? "€" : "€€€"} `
        articleElement.appendChild(prixElement)


        const categorieElement = document.createElement("p")
        categorieElement.innerText = article.categorie ?? "aucune catégorie"
        articleElement.appendChild(categorieElement)


        const descriptionElement = document.createElement("p")
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment."
        articleElement.appendChild(descriptionElement)


        const stockElement = document.createElement("p")
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock"
        articleElement.appendChild(stockElement)


        const avisBouton = document.createElement("button");
        avisBouton.setAttribute('class', 'btn avis')
        avisBouton.dataset.id = article.id
        avisBouton.textContent = "Afficher les avis"
        articleElement.appendChild(avisBouton)
    }

    // /* C'est une fonction qui obtient les avis sur un produit. */
    getAvis()
}
