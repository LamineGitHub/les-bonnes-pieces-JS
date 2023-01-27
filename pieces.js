import {generatePieces, removeClass, sectionFiches, toggleClass} from "./function.js";

// Recuperation des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json")
    .then(piece => piece.json())

generatePieces(pieces)

const btnSortAsc = document.querySelector(".btn-sort-asc")
const btnSortDesc = document.querySelector(".btn-sort-desc")
const btnSortAbordable = document.querySelector(".btn-filtrer-prix")
const btnSortDescription = document.querySelector(".btn-filtrer-desc")

const numberRange = document.querySelector('.span')

document.querySelector('#range')
    .addEventListener('input', function (e) {
        numberRange.innerText = `${e.target.value} €`
        removeClass("active", btnSortAsc, btnSortDesc, btnSortAbordable, btnSortDescription)
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

