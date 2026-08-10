function tenterAction(personnage, action){


    const seuil =
    personnage.seuilsReussite[action.nom];


    if(seuil === undefined){

        ajouterAuJournal(
            "Cette action n'a pas de seuil défini."
        );

        return;

    }


    const zoneActions =
    document.getElementById("actions");


    zoneActions.innerHTML = `

        <p>
        🎲 ${personnage.nom} utilise ${action.nom}
        </p>

        <p>
        Seuil de réussite : ${seuil}
        </p>


        <input 
        id="resultat-de"
        type="number"
        min="1"
        max="20"
        placeholder="Résultat du dé">


        <button id="valider-de">
            Valider
        </button>

    `;



    document
    .getElementById("valider-de")
    .onclick = () => {


        const jet =
        Number(
            document.getElementById("resultat-de").value
        );


        resoudreJet(
            personnage,
            action,
            jet,
            seuil
        );


    };


}





function resoudreJet(personnage, action, jet, seuil){


    if(jet <= seuil){


        ajouterAuJournal(
            `🎲 ${personnage.nom} lance ${action.nom} : ${jet}`
        );


        ajouterAuJournal(
            "✅ Réussite !"
        );


    }
    else{


        ajouterAuJournal(
            `🎲 ${personnage.nom} lance ${action.nom} : ${jet}`
        );


        ajouterAuJournal(
            "❌ Échec !"
        );


    }


}