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
            this.classList.toggle('active')

            /* Un compteur qui est utilisé pour changer le texte du bouton et pour supprimer les
            commentaires. */
            if (!openAvis) {
                openAvis = true

                const response = await fetch(`http://localhost:8081/pieces/${id}/avis`)
                const avis = await response.json()

                const avisElement = document.createElement("p")
                this.textContent = "Fermer les avis"
                this.classList.add('pointer')

                for (let i = 0; i < avis.length; i++) {
                    avisElement.innerHTML +=/*html*/
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

export function addListenerFormAvis() {
    const formulaireAvis = document.querySelector(".form-avis")

    formulaireAvis.addEventListener("submit", function (e) {
        e.preventDefault()
        this.lastElementChild.classList.add('active')
        this.lastElementChild.disabled = true

        setTimeout(() => {
            formulaireAvis.lastElementChild.classList.remove('active')
            formulaireAvis.lastElementChild.disabled = false
            formulaireAvis.reset()
        }, 1000)

        const avis = {
            pieceId: +(e.target.querySelector("[name=piece-id]").value),
            utilisateur: e.target.querySelector("[name=utilisateur]").value,
            commentaire: e.target.querySelector("[name=commentaire]").value,
            nbEtoiles: +(e.target.querySelector("[name=nbEtoiles]").value)
        }

        const body = JSON.stringify(avis)

        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: body
        }).then(r => console.log(r))

    })
}