
let personnagesSelectionnes = [];

let monstresSelectionnes = [];



function afficherBibliotheque(){

    const zonePersonnages =
    document.getElementById(
        "bibliotheque-personnages"
    );


    const zoneMonstres =
    document.getElementById(
        "bibliotheque-monstres"
    );


    BibliothequePersonnages.forEach(personnage => {

        const bouton =
        document.createElement("button");


        bouton.textContent =
        `${personnage.icone} ${personnage.nom}`;


        bouton.onclick = () => {

            if(
                personnagesSelectionnes.includes(
                    personnage
                )
            ){

                personnagesSelectionnes =
                personnagesSelectionnes.filter(
                    p => p !== personnage
                );

                bouton.classList.remove(
                    "selectionne"
                );

                bouton.textContent =
                `${personnage.icone} ${personnage.nom}`;

            }
            else{

                personnagesSelectionnes.push(
                    personnage
                );

                bouton.classList.add(
                    "selectionne"
                );

                bouton.textContent =
                `✅ ${personnage.icone} ${personnage.nom}`;

            }

        };


        zonePersonnages.appendChild(
            bouton
        );

    });



    BibliothequeMonstres.forEach(monstre => {

        const bouton =
        document.createElement("button");


        bouton.textContent =
        `${monstre.icone} ${monstre.nom}`;


        bouton.onclick = () => {

            if(
                monstresSelectionnes.includes(
                    monstre
                )
            ){

                monstresSelectionnes =
                monstresSelectionnes.filter(
                    m => m !== monstre
                );

                bouton.classList.remove(
                    "selectionne"
                );

                bouton.textContent =
                `${monstre.icone} ${monstre.nom}`;

            }
            else{

                monstresSelectionnes.push(
                    monstre
                );

                bouton.classList.add(
                    "selectionne"
                );

                bouton.textContent =
                `✅ ${monstre.icone} ${monstre.nom}`;

            }

        };


        zoneMonstres.appendChild(
            bouton
        );

    });

}



afficherBibliotheque();









document
.getElementById("lancer-combat")
.addEventListener(
    "click",
    () => {

        if(personnagesSelectionnes.length === 0){

            alert(
                "Sélectionne au moins un personnage."
            );

            return;

        }


        if(monstresSelectionnes.length === 0){

            alert(
                "Sélectionne au moins un monstre."
            );

            return;

        }



        const equipe1 =
        personnagesSelectionnes;


        const equipe2 =
        monstresSelectionnes;



        document
        .getElementById("preparation")
        .style.display = "none";


        document
        .getElementById("combat")
        .style.display = "flex";


        document
        .getElementById("tour")
        .style.display = "block";


        document
        .getElementById("actions")
        .style.display = "block";


        document
        .getElementById("valider-action")
        .style.display = "inline-block";


        document
        .getElementById("fin-tour")
        .style.display = "inline-block";


        document
        .getElementById("quitter-combat")
        .style.display = "inline-block";



        afficherEquipe(
            equipe1,
            "equipe-gauche"
        );


        afficherEquipe(
            equipe2,
            "equipe-droite"
        );



        window.combat =
        new Combat(
            equipe1,
            equipe2
        );


        window.combat.commencerCombat();

    }
);



















document
.getElementById("fin-tour")
.addEventListener(
    "click",
    () => {

        combat.terminerTour();

    }
);







document
.getElementById("valider-action")
.addEventListener(
    "click",
    () => {

        combat.executerCompetence();

    }
);




// Gestion du bouton "Quitter le combat"
// Il réinitialise l'état du jeu et revient à l'écran de préparation




document
.getElementById("quitter-combat")
.addEventListener(
    "click",
    () => {

        // Nettoyage des états temporaires

        combat.combattants.forEach(
            personnage => {

                personnage.etats = [];

                if(
                    personnage.ressources
                ){

                    if(
                        personnage.ressources.spheresNoires
                    ){

                        personnage.ressources.spheresNoires = [];

                    }


                    if(
                        personnage.ressources.chargesRuniques
                        !== undefined
                    ){

                        personnage.ressources.chargesRuniques = 0;

                    }

                }

            }
        );


        // Vider les anciennes cartes

        document
        .getElementById("equipe-gauche")
        .innerHTML = "<h2>Équipe 1</h2>";


        document
        .getElementById("equipe-droite")
        .innerHTML = "<h2>Équipe 2</h2>";


        // Réinitialiser la sélection

        personnagesSelectionnes = [];

        monstresSelectionnes = [];


        document
        .getElementById("bibliotheque-personnages")
        .innerHTML = "";


        document
        .getElementById("bibliotheque-monstres")
        .innerHTML = "";


        afficherBibliotheque();


        // Retour à l'écran de préparation

        document
        .getElementById("combat")
        .style.display = "none";


        document
        .getElementById("tour")
        .style.display = "none";


        document
        .getElementById("actions")
        .style.display = "none";


        document
        .getElementById("valider-action")
        .style.display = "none";


        document
        .getElementById("fin-tour")
        .style.display = "none";


        document
        .getElementById("quitter-combat")
        .style.display = "none";


        document
        .getElementById("preparation")
        .style.display = "block";


        document
        .getElementById("log")
        .innerHTML =
        "Prêt pour un nouveau combat !";

    }
);














// =====================================================
// 🎒 GESTION DE L'ÉQUIPEMENT
// =====================================================


// Affiche la liste des personnages dans l'armurerie

function afficherGestionEquipement(){

    const zonePersonnage =
        document.getElementById(
            "personnage-equipement"
        );

    const zoneEquipements =
        document.getElementById(
            "liste-equipements"
        );


    zonePersonnage.innerHTML = "";

    zoneEquipements.innerHTML = "";


    BibliothequePersonnages.forEach(
        personnage => {

            const bouton =
                document.createElement("button");


            bouton.className =
                "bouton-personnage-equipement";


            bouton.textContent =
                `${personnage.icone} ${personnage.nom}`;


            bouton.onclick = () => {

                afficherEquipementsPersonnage(
                    personnage
                );

            };


            zonePersonnage.appendChild(
                bouton
            );

        }
    );

}


// =====================================================
// 🔢 Nombre d'exemplaires actuellement équipés
// =====================================================

function nombreEquipementsEquipes(equipement){

    let nombre = 0;


    BibliothequePersonnages.forEach(
        personnage => {

            Object.values(
                personnage.equipement
            ).forEach(
                objet => {

                    if(objet === equipement){

                        nombre++;

                    }

                }
            );

        }
    );


    return nombre;

}


// =====================================================
// 📦 Nombre d'exemplaires encore disponibles
// =====================================================

function nombreEquipementsDisponibles(equipement){

    const total =
        InventaireEquipements[equipement.nom] || 0;


    const equipes =
        nombreEquipementsEquipes(equipement);


    return total - equipes;

}


// =====================================================
// 🎒 Affichage de la fiche équipement
// =====================================================

function afficherEquipementsPersonnage(personnage){

    const zone =
        document.getElementById(
            "liste-equipements"
        );


    zone.innerHTML = `

        <div class="fiche-personnage-equipement">

            <h3>
                ${personnage.icone}
                ${personnage.nom}
            </h3>


            <div class="zone-equipement">


                <!-- CASQUE -->

                <div
                    class="emplacement-equipement emplacement-casque"
                >

                    <div class="icone-emplacement">
                        ${
                            personnage.equipement.casque
                            ? personnage.equipement.casque.icone
                            : "🪖"
                        }
                    </div>

                    <div class="nom-emplacement">
                        ${
                            personnage.equipement.casque
                            ? personnage.equipement.casque.nom
                            : "Casque"
                        }
                    </div>

                </div>



                <!-- ÉPAULIÈRES -->

                <div
                    class="emplacement-equipement emplacement-epaulieres"
                >

                    <div class="icone-emplacement">
                        ${
                            personnage.equipement.epaulieres
                            ? personnage.equipement.epaulieres.icone
                            : "🛡️"
                        }
                    </div>

                    <div class="nom-emplacement">
                        ${
                            personnage.equipement.epaulieres
                            ? personnage.equipement.epaulieres.nom
                            : "Épaulières"
                        }
                    </div>

                </div>



                <!-- PLASTRON -->

                <div
                    class="emplacement-equipement emplacement-plastron"
                >

                    <div class="icone-emplacement">
                        ${
                            personnage.equipement.plastron
                            ? personnage.equipement.plastron.icone
                            : "🛡️"
                        }
                    </div>

                    <div class="nom-emplacement">
                        ${
                            personnage.equipement.plastron
                            ? personnage.equipement.plastron.nom
                            : "Plastron"
                        }
                    </div>

                </div>



                <!-- CAPE -->

                <div
                    class="emplacement-equipement emplacement-cape"
                >

                    <div class="icone-emplacement">
                        ${
                            personnage.equipement.cape
                            ? personnage.equipement.cape.icone
                            : "🧥"
                        }
                    </div>

                    <div class="nom-emplacement">
                        ${
                            personnage.equipement.cape
                            ? personnage.equipement.cape.nom
                            : "Cape"
                        }
                    </div>

                </div>



                <!-- PERSONNAGE -->

                <div class="personnage-central">

                    <div class="icone-personnage">
                        ${personnage.icone}
                    </div>

                    <div>
                        ${personnage.nom}
                    </div>

                </div>



                <!-- GANTS -->

                <div
                    class="emplacement-equipement emplacement-gants"
                >

                    <div class="icone-emplacement">
                        ${
                            personnage.equipement.gants
                            ? personnage.equipement.gants.icone
                            : "🧤"
                        }
                    </div>

                    <div class="nom-emplacement">
                        ${
                            personnage.equipement.gants
                            ? personnage.equipement.gants.nom
                            : "Gants"
                        }
                    </div>

                </div>



                <!-- BOTTES -->

                <div
                    class="emplacement-equipement emplacement-bottes"
                >

                    <div class="icone-emplacement">
                        ${
                            personnage.equipement.bottes
                            ? personnage.equipement.bottes.icone
                            : "🥾"
                        }
                    </div>

                    <div class="nom-emplacement">
                        ${
                            personnage.equipement.bottes
                            ? personnage.equipement.bottes.nom
                            : "Bottes"
                        }
                    </div>

                </div>



                <!-- JAMBIÈRES -->

                <div
                    class="emplacement-equipement emplacement-jambes"
                >

                    <div class="icone-emplacement">
                        ${
                            personnage.equipement.jambes
                            ? personnage.equipement.jambes.icone
                            : "👖"
                        }
                    </div>

                    <div class="nom-emplacement">
                        ${
                            personnage.equipement.jambes
                            ? personnage.equipement.jambes.nom
                            : "Jambières"
                        }
                    </div>

                </div>



                <!-- ARME 1 -->

                <div
                    class="emplacement-equipement emplacement-arme1"
                >

                    <div class="icone-emplacement">
                        ${
                            personnage.equipement.arme1
                            ? personnage.equipement.arme1.icone
                            : "⚔️"
                        }
                    </div>

                    <div class="nom-emplacement">
                        ${
                            personnage.equipement.arme1
                            ? personnage.equipement.arme1.nom
                            : "Arme 1"
                        }
                    </div>

                </div>



                <!-- ARME 2 -->

                <div
                    class="emplacement-equipement emplacement-arme2"
                >

                    <div class="icone-emplacement">
                        ${
                            personnage.equipement.arme2
                            ? personnage.equipement.arme2.icone
                            : "⚔️"
                        }
                    </div>

                    <div class="nom-emplacement">
                        ${
                            personnage.equipement.arme2
                            ? personnage.equipement.arme2.nom
                            : "Arme 2"
                        }
                    </div>

                </div>



                <!-- ACCESSOIRE 1 -->

                <div
                    class="emplacement-equipement emplacement-accessoire1"
                >

                    <div class="icone-emplacement">
                        ${
                            personnage.equipement.accessoire1
                            ? personnage.equipement.accessoire1.icone
                            : "💍"
                        }
                    </div>

                    <div class="nom-emplacement">
                        ${
                            personnage.equipement.accessoire1
                            ? personnage.equipement.accessoire1.nom
                            : "Accessoire 1"
                        }
                    </div>

                </div>



                <!-- ACCESSOIRE 2 -->

                <div
                    class="emplacement-equipement emplacement-accessoire2"
                >

                    <div class="icone-emplacement">
                        ${
                            personnage.equipement.accessoire2
                            ? personnage.equipement.accessoire2.icone
                            : "💍"
                        }
                    </div>

                    <div class="nom-emplacement">
                        ${
                            personnage.equipement.accessoire2
                            ? personnage.equipement.accessoire2.nom
                            : "Accessoire 2"
                        }
                    </div>

                </div>


            </div>

        </div>


        <div class="armurerie-disponible">

            <h4>
                📚 Armurerie disponible
            </h4>

            <div id="equipements-disponibles"></div>

        </div>

    `;


    // =================================================
    // 🖱️ Rendre les équipements équipés cliquables
    // =================================================

    const emplacements = [
        "casque",
        "epaulieres",
        "plastron",
        "cape",
        "gants",
        "bottes",
        "jambes",
        "arme1",
        "arme2",
        "accessoire1",
        "accessoire2"
    ];


    emplacements.forEach(
        emplacement => {

            const equipement =
                personnage.equipement[emplacement];


            if(!equipement){

                return;

            }


            const zoneEquipement =
                document.querySelector(
                    ".emplacement-" + emplacement
                );


            zoneEquipement.classList.add(
                "equipement-equipe"
            );


            zoneEquipement.title =
                "Cliquer pour déséquiper";


            zoneEquipement.onclick = () => {

                desequiper(
                    personnage,
                    emplacement
                );

            };

        }
    );


    // =================================================
    // 📚 Afficher les équipements disponibles
    // =================================================

    const zoneDisponibles =
        document.getElementById(
            "equipements-disponibles"
        );


    BibliothequeEquipements.forEach(
        equipement => {

            const disponibles =
                nombreEquipementsDisponibles(
                    equipement
                );


            if(disponibles <= 0){

                return;

            }


            const bouton =
                document.createElement("button");


            bouton.className =
                "carte-equipement";


            bouton.innerHTML = `

                <span class="icone-equipement">
                    ${equipement.icone}
                </span>

                <span>
                    ${equipement.nom}
                </span>

                <span>
                    Disponible : ×${disponibles}
                </span>

            `;


            bouton.title =
                equipement.description;


            bouton.onclick = () => {

                equiper(
                    personnage,
                    equipement
                );

            };


            zoneDisponibles.appendChild(
                bouton
            );

        }
    );

}


// =====================================================
// ❌ DÉSÉQUIPER
// =====================================================

function desequiper(
    personnage,
    emplacement
){

    personnage.equipement[emplacement] =
        null;


    afficherEquipementsPersonnage(
        personnage
    );

}


// =====================================================
// ⚔️ ÉQUIPER
// =====================================================

function equiper(
    personnage,
    equipement
){

    const disponibles =
        nombreEquipementsDisponibles(
            equipement
        );


    if(disponibles <= 0){

        alert(
            "❌ Il n'y a plus d'exemplaire disponible de cet équipement."
        );

        return;

    }


    // ---------------------------------------------
    // Trouver un emplacement compatible
    // ---------------------------------------------

    let emplacement = null;


    if(equipement.type === "accessoire"){

        if(!personnage.equipement.accessoire1){

            emplacement = "accessoire1";

        }
        else if(!personnage.equipement.accessoire2){

            emplacement = "accessoire2";

        }

    }
    else if(equipement.type === "arme"){

        if(!personnage.equipement.arme1){

            emplacement = "arme1";

        }
        else if(!personnage.equipement.arme2){

            emplacement = "arme2";

        }

    }
    else {

        // Les autres types correspondent
        // directement à un emplacement.

        if(
            personnage.equipement.hasOwnProperty(
                equipement.type
            )
        ){

            emplacement =
                equipement.type;

        }

    }


    if(!emplacement){

        alert(
            "❌ Aucun emplacement disponible pour cet équipement."
        );

        return;

    }


    personnage.equipement[emplacement] =
        equipement;


    afficherEquipementsPersonnage(
        personnage
    );

}


// =====================================================
// ⚔️ OUVRIR L'ARMURERIE
// =====================================================

document
.getElementById("gerer-equipement")
.addEventListener(
    "click",
    () => {

        document
        .getElementById("preparation")
        .style.display = "none";


        document
        .getElementById("armurerie")
        .style.display = "block";


        afficherGestionEquipement();

    }
);


// =====================================================
// ↩️ RETOUR À LA PRÉPARATION
// =====================================================

document
.getElementById("retour-preparation")
.addEventListener(
    "click",
    () => {

        document
        .getElementById("armurerie")
        .style.display = "none";


        document
        .getElementById("preparation")
        .style.display = "block";

    }
);













document
.getElementById("reinitialiser-personnages")
.addEventListener(
"click",
() => {

    BibliothequePersonnages.forEach(
        personnage => {

            personnage.reinitialiser();

            mettreAJourBarres(personnage);
            mettreAJourRessources(personnage);

        }
    );


    BibliothequeMonstres.forEach(
        monstre => {

            monstre.reinitialiser();

            mettreAJourBarres(monstre);
            mettreAJourRessources(monstre);

        }
    );


    alert(
        "🔄 Tous les personnages et monstres ont été réinitialisés !"
    );

});