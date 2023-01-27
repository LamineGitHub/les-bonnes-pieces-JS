export const sectionFiches = document.querySelector(".fiches")

function generateList(pieces) {

    const divList = document.createElement('div')
    divList.setAttribute('class', 'liste')
    const divAbordable = document.createElement('div')
    divAbordable.setAttribute('class', 'abordables')
    divAbordable.innerHTML = "<b> Pieces abordables : </b>"
    const divDispo = document.createElement('div')
    divDispo.setAttribute('class', 'disponible')
    divDispo.innerHTML = "<b> Pieces disponibles : </b>"

    const noms = pieces.map(piece => piece.nom)
    for (let i = pieces.length - 1; i >= 0; i--) {
        if (pieces[i].prix > 35) {
            noms.splice(i, 1)
        }
    }

//Création de la liste
    const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
    for (let i = 0; i < noms.length; i++) {
        const nomElement = document.createElement('li');
        nomElement.innerText = noms[i];
        abordablesElements.appendChild(nomElement)
    }
// Ajout de l'en-tête puis de la liste au bloc résultat filtres
    divAbordable.appendChild(abordablesElements)

    const nomDispo = pieces.map(piece => piece.nom)
    const prixDispo = pieces.map(piece => piece.prix)

    for (let i = pieces.length - 1; i >= 0; i--) {
        if (pieces[i].disponibilite === false) {
            nomDispo.splice(i, 1)
            prixDispo.splice(i, 1)
        }
    }

    const pieceDisponibles = document.createElement('ul');
//Ajout de chaque nom à la liste
    for (let i = 0; i < nomDispo.length; i++) {
        const nomElement = document.createElement('li');
        nomElement.innerText = `${nomDispo[i]} - ${prixDispo[i]} €`;
        pieceDisponibles.appendChild(nomElement)
    }
// Ajout de l'en-tête puis de la liste au bloc résultat filtres
    divDispo.appendChild(pieceDisponibles)

// document.querySelector('.fiches').innerHTML = ""
    sectionFiches.appendChild(divList)
    divList.appendChild(divAbordable)
    divList.appendChild(divDispo)
}

export function toggleClass(activeClass, ...remove) {
    activeClass.classList.add("active")
    remove.map(value => value.classList.remove("active"))
}

export function removeClass(classRemove, ...remove) {
    remove.map(value => value.classList.remove(classRemove))
}

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
    }
}
