// @ts-nocheck
import {
  generatePieces,
  removeClass,
  sectionFiches,
  toggleClass,
} from "./function.js"
import { addListenerFormAvis, showGraphAvis } from "./avis.js"

// Recuperation des pièces depuis le fichier JSON
/*const pieces = await fetch("pieces-autos.json")
    .then(piece => piece.json())*/

/* Obtenir la valeur de l'élément de stockage local "pieces". */
let pieces = window.localStorage.getItem("pieces")

/* Vérifier si le stockage local contient les données. Si ce n'est pas le cas, il récupère les données
du serveur et les stocke dans le stockage local. Si c'est le cas, il analyse les données du stockage
local. */
if (pieces === null) {
  /* Récupérer les données du serveur local et les convertir en JSON. */
  const pieces = await fetch("http://localhost:8081/pieces").then((piece) =>
    piece.json()
  )

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

const numberPieces = document.querySelector("#id")
numberPieces.setAttribute("max", `${pieces.length}`)

/* Fonction appelée lorsque la valeur d'entrée change. */
document.querySelector("#range").addEventListener("input", function (e) {
  /* Suppression de la classe "active" de tous les boutons. */
  removeClass(
    "active",
    btnSortAsc,
    btnSortDesc,
    btnSortAbordable,
    btnSortDescription
  )

  document.querySelector(".span").innerText = `${e.target.value} €`

  const piecesFiltrer = pieces.filter((piece) => piece.prix <= e.target.value)

  sectionFiches.innerHTML = ""
  generatePieces(piecesFiltrer)
})

/* Tri des pièces par ordre croissant. */
btnSortAsc.addEventListener("click", function () {
  toggleClass(this, btnSortDesc, btnSortAbordable, btnSortDescription)

  const piecesSort = Array.from(pieces)
  piecesSort.sort((a, b) => a.prix - b.prix)

  sectionFiches.innerHTML = ""
  generatePieces(piecesSort)
})

/* Tri des pièces par ordre décroissant. */
btnSortDesc.addEventListener("click", function () {
  toggleClass(this, btnSortAsc, btnSortAbordable, btnSortDescription)

  const piecesSort = Array.from(pieces)
  piecesSort.sort((a, b) => b.prix - a.prix)

  sectionFiches.innerHTML = ""
  generatePieces(piecesSort)
})

/* Filtrer les pièces par prix. */
btnSortAbordable.addEventListener("click", function () {
  toggleClass(this, btnSortAsc, btnSortDesc, btnSortDescription)

  const piecesFiltrer = pieces.filter((piece) => piece.prix <= 35)

  sectionFiches.innerHTML = ""
  generatePieces(piecesFiltrer)
})

/* Filtrage des pièces par description. */
btnSortDescription.addEventListener("click", function () {
  toggleClass(this, btnSortAsc, btnSortDesc, btnSortAbordable)

  const piecesWithDesc = pieces.filter((piece) => piece.description)

  sectionFiches.innerHTML = ""
  generatePieces(piecesWithDesc)
})

/* Suppression de l'élément de stockage local "pieces" lorsque le bouton avec la classe "btn-maj" est
cliqué. */
document.querySelector(".btn-maj").addEventListener("click", () => {
  window.localStorage.removeItem("pieces")
})

/* Appeler la fonction `showGraphAvis` et attendre qu'elle se termine avant de continuer. */
await showGraphAvis()
