function afficherEquipe(liste, idDiv){

    const div = document.getElementById(idDiv);


    liste.forEach(personnage => {


        const carte = document.createElement("div");

        carte.className = "personnage";

        carte.id = "perso-" + personnage.id;


        carte.onclick = () => {

            selectionnerCible(personnage);

        };




        carte.innerHTML = `

        <h3>
            ${personnage.icone}
            ${personnage.nomCombat || personnage.nom}
        </h3>


        <div class="barre">

            <div 
            class="vie"
            id="vie-${personnage.id}">
            
            </div>

        </div>


        <p id="texte-vie-${personnage.id}">
        ❤️ ${personnage.pv} / ${personnage.pvMax}
        </p>



        <div class="barre">

            <div 
            class="mana"
            id="mana-${personnage.id}">
            
            </div>

        </div>


        <p id="texte-mana-${personnage.id}">
        💧 ${personnage.mana} / ${personnage.manaMax}
        </p>



        ${personnage.ressources?.chargesRuniques !== undefined ? `
        <p id="charges-${personnage.id}">
            ⚔️ Charges runiques : ${personnage.ressources.chargesRuniques}
        </p>
        ` : ""}


        <div id="ressources-${personnage.id}">

        </div>



        <p id="etats-${personnage.id}">
            📌 Aucun état
        </p>

        `;


        div.appendChild(carte);


        mettreAJourBarres(personnage);

        mettreAJourRessources(personnage);


    });

}



function mettreAJourBarres(personnage){

    const vie =
        document.getElementById(
            "vie-" + personnage.id
        );

    const texteVie =
        document.getElementById(
            "texte-vie-" + personnage.id
        );

    const mana =
        document.getElementById(
            "mana-" + personnage.id
        );

    const texteMana =
        document.getElementById(
            "texte-mana-" + personnage.id
        );


    // =====================================================
    // 🖥️ Le personnage n'est pas affiché actuellement
    // =====================================================

    if(
        !vie ||
        !texteVie ||
        !mana ||
        !texteMana
    ){

        return;

    }


    // =====================================================
    // ❤️ PV
    // =====================================================

    const viePourcentage =
        personnage.pv / personnage.pvMax * 100;


    vie.style.width =
        viePourcentage + "%";


    texteVie.textContent =
        `❤️ ${personnage.pv} / ${personnage.pvMax}`;


    // =====================================================
    // 💧 MANA
    // =====================================================

    const manaPourcentage =
        personnage.mana / personnage.manaMax * 100;


    mana.style.width =
        manaPourcentage + "%";


    texteMana.textContent =
        `💧 ${personnage.mana} / ${personnage.manaMax}`;


    // =====================================================
    // ⚔️ CHARGES RUNIQUES
    // =====================================================

    const charges =
        document.getElementById(
            "charges-" + personnage.id
        );


    if(charges){

        charges.textContent =
            `⚔️ Charges runiques : ${personnage.ressources.chargesRuniques}`;

    }


    // =====================================================
    // 📌 ÉTATS
    // =====================================================

    const zoneEtats =
        document.getElementById(
            "etats-" + personnage.id
        );


    if(zoneEtats){

        if(personnage.etats.length === 0){

            zoneEtats.textContent =
                "📌 Aucun état";

        }
        else{

            zoneEtats.innerHTML =
                "📌 " +
                personnage.etats
                .map(e => {

                    switch(e.type){

                        case "immobilisation":

                            return "🦶 Immobilisé";


                        case "etourdissement":

                            return "😵 Étourdi";


                        case "bravoure":

                            return `🛡️ Bravoure (${e.valeurBlocage})`;


                        case "barriere_prismatique":

                            return `🌈 Barrière prismatique (${e.valeurBlocage})`;


                        case "mort":

                            return "💀 Mort";


                        case "anomalie_radieuse":

                            return "✨ Anomalie radieuse";


                        case "exaltation":

                            return `🛡️ Exaltation (${e.valeurBlocage})`;


                        default:

                            return e.type;

                    }

                })
                .join("<br>");

        }

    }

}




function ajouterAuJournal(message){


    const log =
    document.getElementById("log");


    log.innerHTML += "<br>" + message;


    log.scrollTop = log.scrollHeight;

}






function afficherActions(personnage){

    const zone =
    document.getElementById("actions");


    zone.innerHTML = "";


    // =====================================================
    // 🧪 POTIONS
    // =====================================================

    const zonePotions =
    document.createElement("div");

    zonePotions.className =
    "zone-potions";


    const boutonSoin =
    document.createElement("button");

    boutonSoin.textContent =
    `🧪 Potion de soins (${personnage.ressources.potionsSoins})`;


    boutonSoin.disabled =
    personnage.ressources.potionsSoins <= 0;


    boutonSoin.onclick = () => {

        combat.utiliserPotion("soins");

    };


    zonePotions.appendChild(
        boutonSoin
    );


    const boutonMana =
    document.createElement("button");

    boutonMana.textContent =
    `💧 Potion de mana (${personnage.ressources.potionsMana})`;


    boutonMana.disabled =
    personnage.ressources.potionsMana <= 0;


    boutonMana.onclick = () => {

        combat.utiliserPotion("mana");

    };


    zonePotions.appendChild(
        boutonMana
    );


    zone.appendChild(
        zonePotions
    );


    // =====================================================
    // ⚔️ COMPÉTENCES
    // =====================================================

    const zoneCompetences =
    document.createElement("div");

    zoneCompetences.className =
    "zone-competences";


    personnage.competences.forEach(
        competence => {

            const bouton =
            document.createElement("button");


            bouton.textContent =
            `${competence.icone} ${competence.nom} (${competence.coutMana}💧)`;


            bouton.onclick = () => {

                combat.commencerCompetence(
                    competence
                );

            };


            zoneCompetences.appendChild(
                bouton
            );

        }
    );


    zone.appendChild(
        zoneCompetences
    );

}





function selectionnerCible(personnage){


    if(!combat.actionEnCours){
        return;
    }


    const carte =
    document.getElementById(
        "perso-" + personnage.id
    );


    if(carte.classList.contains("selectionnee")){


        combat.selectionnerCible(personnage);


        carte.classList.remove(
            "selectionnee"
        );


    }
    else{


        const ajoute =
        combat.selectionnerCible(personnage);


        if(ajoute){

            carte.classList.add(
                "selectionnee"
            );

        }

    }


}



function viderSelectionVisuelle(){

    document
    .querySelectorAll(".selectionnee")
    .forEach(carte => {

        carte.classList.remove("selectionnee");

    });

}



function ouvrirPopupDe(){

    document
    .getElementById("popup-de")
    .style.display = "flex";

}



function fermerPopupDe(){

    document
    .getElementById("popup-de")
    .style.display = "none";

}



document
.getElementById("confirmer-de")
.addEventListener(
    "click",
    () => {

        const resultat =
        Number(
            document.getElementById("resultat-de").value
        );


        combat.recevoirJetDe(resultat);

    }
);



function mettreAJourRessources(personnage){

    const zone =
    document.getElementById(
        "ressources-" + personnage.id
    );


    if(!zone){
        return;
    }


    const ressources = [];


    // ⚫ Sphères noires

    if(personnage.ressources.spheresNoires){

        ressources.push(
            `⚫ Sphères noires : ${personnage.ressources.spheresNoires.length}`
        );

    }


    // 🧪 Potions

    if(personnage.ressources.potionsSoins !== undefined){

        ressources.push(
            `🧪 Potions de soins : ${personnage.ressources.potionsSoins}`
        );

    }


    if(personnage.ressources.potionsMana !== undefined){

        ressources.push(
            `💧 Potions de mana : ${personnage.ressources.potionsMana}`
        );

    }


    zone.innerHTML =
    ressources.join("<br>");

}




