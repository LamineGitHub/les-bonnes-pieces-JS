import {generatePieces, removeClass, sectionFiches, toggleClass} from "./function.js";
import {addListenerFormAvis} from "./avis.js";

// Recuperation des pièces depuis le fichier JSON
/*const pieces = await fetch("pieces-autos.json")
    .then(piece => piece.json())*/

let pieces = window.localStorage.getItem("pieces")

if (pieces === null) {
    /* Récupérer les données du serveur local et les convertir en JSON. */
    const pieces = await fetch("http://localhost:8081/pieces")
        .then(piece => piece.json())

    const valuePieces = JSON.stringify(pieces)
    window.localStorage.setItem("pieces", valuePieces)
} else {
    pieces = JSON.parse(pieces)
}


generatePieces(pieces)

addListenerFormAvis()

const btnSortAsc = document.querySelector(".btn-sort-asc")
const btnSortDesc = document.querySelector(".btn-sort-desc")
const btnSortAbordable = document.querySelector(".btn-filtrer-prix")
const btnSortDescription = document.querySelector(".btn-filtrer-desc")

const numberPieces = document.querySelector('#id')
numberPieces.setAttribute("max", `${pieces.length}`)


document.querySelector('#range')
    .addEventListener('input', function (e) {
        /* Suppression de la classe "active" de tous les boutons. */
        removeClass("active", btnSortAsc, btnSortDesc, btnSortAbordable, btnSortDescription)

        document.querySelector('.span')
            .innerText = `${e.target.value} €`

        const piecesFiltrer = pieces.filter((piece) => piece.prix <= e.target.value)

        sectionFiches.innerHTML = ""
        generatePieces(piecesFiltrer)
    })


btnSortAsc.addEventListener("click", function () {
    toggleClass(this, btnSortDesc, btnSortAbordable, btnSortDescription)

    const piecesSort = Array.from(pieces)
    piecesSort.sort((a, b) => a.prix - b.prix)

    sectionFiches.innerHTML = ""
    generatePieces(piecesSort)
})


btnSortDesc.addEventListener("click", function () {
    toggleClass(this, btnSortAsc, btnSortAbordable, btnSortDescription)

    const piecesSort = Array.from(pieces)
    piecesSort.sort((a, b) => b.prix - a.prix)

    sectionFiches.innerHTML = ""
    generatePieces(piecesSort)
})


btnSortAbordable.addEventListener("click", function () {
    toggleClass(this, btnSortAsc, btnSortDesc, btnSortDescription)

    const piecesFiltrer = pieces.filter((piece) => piece.prix <= 35)

    sectionFiches.innerHTML = ""
    generatePieces(piecesFiltrer)
})


btnSortDescription.addEventListener("click", function () {
    toggleClass(this, btnSortAsc, btnSortDesc, btnSortAbordable)

    const piecesWithDesc = pieces.filter((piece) => piece.description)

    sectionFiches.innerHTML = ""
    generatePieces(piecesWithDesc)
})

document.querySelector('.btn-maj').addEventListener('click',() => {
        window.localStorage.removeItem("pieces")
    })