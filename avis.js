// @ts-nocheck
/* global Chart */
/**
 * Une fonction qui est appelée lorsque la page est chargée. Il ajoute un écouteur d'événement à
 * chaque bouton. Lorsque le bouton est cliqué, il récupère les commentaires du serveur et les
 * affiche.
 */
export default function getAvis() {
  const piecesElement = document.querySelectorAll(".fiches article button")

  for (let i = 0; i < piecesElement.length; i++) {
    let openAvis = false

    piecesElement[i].addEventListener("click", async function (e) {
      const id = e.target.dataset.id
      const parentElement = e.target.parentElement
      this.classList.toggle("active")

      /* Un compteur qui est utilisé pour changer le texte du bouton et pour supprimer les
            commentaires. */
      if (!openAvis) {
        openAvis = true

        const response = await fetch(`http://localhost:8081/pieces/${id}/avis`)
        const avis = await response.json()

        const avisElement = document.createElement("p")
        this.textContent = "Fermer les avis"
        this.classList.add("pointer")

        for (let i = 0; i < avis.length; i++) {
          avisElement.innerHTML +=
            /*html*/
            `<span> <b>${avis[i].utilisateur}</b>: ${avis[i].commentaire} <br> </span>`
        }
        parentElement.appendChild(avisElement)
      } else if (openAvis) {
        this.textContent = "Afficher les avis"
        parentElement.lastElementChild.remove()
        openAvis = false
      }
    })
  }
}

/**
 * Il ajoute un écouteur au formulaire, et lorsque le formulaire est soumis,
 * fait le traitemet et envoie une requête POST au serveur
 */
export function addListenerFormAvis() {
  const formulaireAvis = document.querySelector(".form-avis")

  formulaireAvis.addEventListener("submit", function (e) {
    e.preventDefault()
    this.lastElementChild.classList.add("active")
    this.lastElementChild.disabled = true

    setTimeout(() => {
      formulaireAvis.lastElementChild.classList.remove("active")
      formulaireAvis.lastElementChild.disabled = false
      formulaireAvis.reset()
    }, 1000)

    const avis = {
      pieceId: +e.target.querySelector("[name=piece-id]").value,
      utilisateur: e.target.querySelector("[name=utilisateur]").value,
      commentaire: e.target.querySelector("[name=commentaire]").value,
      nbEtoiles: +e.target.querySelector("[name=nbEtoiles]").value,
    }

    const body = JSON.stringify(avis)

    fetch("http://localhost:8081/avis", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: body,
    }).then((r) => console.log(r))
  })
}

/**
 * Il récupère les données du serveur, puis il compte le nombre de commentaires pour chaque classement
 * par étoiles, puis il crée un graphique à barres avec les données.
 */
export async function showGraphAvis() {
  /* Récupérer les données du serveur, puis les parcourir en boucle et compter le nombre de
  commentaires pour chaque classement par étoiles. */
  const avis = await fetch("http://localhost:8081/avis").then((avis) =>
    avis.json()
  )
  /* Compter le nombre de commentaires pour chaque classement par étoiles. */
  const nb_commentaires = [0, 0, 0, 0, 0]

  for (let comment of avis) {
    ++nb_commentaires[comment.nbEtoiles - 1]
  }

  // Légende qui s'affichera sur la gauche à côté de la barre horizontale
  const labels = [5, 4, 3, 2, 1]

  const data = {
    // Données et personnalisation du graphique
    labels: labels,
    datasets: [
      {
        label: "Etoile Attribuées",
        data: nb_commentaires.reverse(),
        backgroundColor: "rgba(183, 134, 11, 0.8)",
      },
    ],
  }
  /* Création d'un graphique à barres. */
  const config = {
    type: "bar",
    data: data,
    options: {
      indexAxis: "y",
    },
  }
  // Rendu du graphique dans l'élément canvas

  new Chart(document.querySelector("#graphique-avis"), config)

  /**-------------------------------------------------------------------------------------- */
  /**-------------------------------------------------------------------------------------- */

  /* Obtenir les données du stockage local. */
  const piecesJSON = window.localStorage.getItem("pieces")

  if (piecesJSON) {
    /**
     * @constant
     * @type {Array}
     */
    const pieces = JSON.parse(piecesJSON)

    const nb_pieces = [0, 0]

    /* Faire une boucle dans le tableau avis et vérifier si la pièce est disponible ou non. */
    for (let i = 0; i < avis.length; i++) {
      const piece = pieces.find((p) => p.id === avis[i].pieceId)

      if (piece) {
        if (piece.disponibilite) {
          ++nb_pieces[0]
        } else {
          ++nb_pieces[1]
        }
      }
    }

    // Légende qui s'affichera en bas à côté de la barre verticale
    const labelsComment = ["Disponibile", "Pas Disponibile"]

    /* Création d'un graphique à barres. */
    const dataComment = {
      // Données et personnalisation du graphique
      labels: labelsComment,
      datasets: [
        {
          label: "Commentaires",
          data: nb_pieces,
          backgroundColor: "rgba(0, 0, 139, 0.8)",
        },
      ],
    }
    const configComment = {
      type: "bar",
      data: dataComment,
    }

    // Rendu du graphique dans l'élément canvas
    new Chart(document.querySelector("#graphique-commentaires"), configComment)
  }
}
