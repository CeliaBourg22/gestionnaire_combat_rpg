class Combat {


    constructor(equipe1, equipe2){


        this.combattants = [
            ...equipe1,
            ...equipe2
        ];


        this.tourActuel = 0;

        this.etat = ETAT_COMBAT.ATTENTE;

        this.actionEnCours = null;

        this.lanceur = null;

        this.ciblesSelectionnees = [];

        this.jet = null;

        this.modificateurDegats = 0;

        this.potionUtiliseeCeTour = false;


    }



    commencerCombat(){

        ajouterAuJournal(
            "⚔️ Le combat commence !"
        );


        this.afficherTour();


    }



    afficherTour(){


        const personnage =
        this.combattants[this.tourActuel];

        this.potionUtiliseeCeTour = false;

        this.verifierFinBravoure(personnage);



        if(personnage.pv <= 0){

            ajouterAuJournal(
                `💀 ${personnage.nom} est mort et ne peut pas agir.`
            );

            this.terminerTour();

            return;

        }





        if(this.verifierEtats(personnage)){

            this.terminerTour();

            return;

        }


        document.getElementById(
            "personnage-tour"
        ).textContent =
        `${personnage.icone} ${personnage.nom}`;


        ajouterAuJournal(
            `🎯 Tour de ${personnage.nom}`
        );

        afficherActions(personnage);

        const meditation =
        personnage.etats.find(
            etat => etat.type === "meditation"
        );

        if(meditation){

            personnage.soigner(1);

            ajouterAuJournal(
                `🧘 ${personnage.nom} récupère 1 PV grâce à Méditation.`
            );

            mettreAJourBarres(
                personnage
            );

        }


    }



    terminerTour(){


        this.tourActuel++;


        if(this.tourActuel >= this.combattants.length){

            this.tourActuel = 0;

        }


        this.afficherTour();


    }







utiliserPotion(type){

    const personnage =
    this.combattants[this.tourActuel];


    // =====================================================
    // Vérifications
    // =====================================================

    if(this.potionUtiliseeCeTour){

        ajouterAuJournal(
            `❌ ${personnage.nom} a déjà utilisé une potion ce tour.`
        );

        return false;

    }


    // Impossible d'utiliser une potion
    // pendant la préparation d'une compétence

    if(this.actionEnCours){

        ajouterAuJournal(
            "❌ Utilise la potion avant de préparer une compétence."
        );

        return false;

    }


    // =====================================================
    // 🧪 POTION DE SOINS
    // =====================================================

    if(type === "soins"){

        if(personnage.ressources.potionsSoins <= 0){

            ajouterAuJournal(
                "❌ Il n'y a plus de potion de soins."
            );

            return false;

        }


        const anciensPV =
        personnage.pv;


        personnage.pv =
        Math.min(
            personnage.pv + 4,
            personnage.pvMax
        );


        const soinReel =
        personnage.pv - anciensPV;


        personnage.ressources.potionsSoins--;


        this.potionUtiliseeCeTour = true;


        ajouterAuJournal(
            `🧪 ${personnage.nom} utilise une potion de soins et récupère ${soinReel} PV.`
        );


        mettreAJourBarres(
            personnage
        );


        mettreAJourRessources(
            personnage
        );


        afficherActions(
            personnage
        );


        return true;

    }


    // =====================================================
    // 💧 POTION DE MANA
    // =====================================================

    if(type === "mana"){

        if(personnage.ressources.potionsMana <= 0){

            ajouterAuJournal(
                "❌ Il n'y a plus de potion de mana."
            );

            return false;

        }


        const ancienneMana =
        personnage.mana;


        personnage.mana =
        Math.min(
            personnage.mana + 4,
            personnage.manaMax
        );


        const manaReel =
        personnage.mana - ancienneMana;


        personnage.ressources.potionsMana--;


        this.potionUtiliseeCeTour = true;


        ajouterAuJournal(
            `💧 ${personnage.nom} utilise une potion de mana et récupère ${manaReel} mana.`
        );


        mettreAJourBarres(
            personnage
        );


        mettreAJourRessources(
            personnage
        );


        afficherActions(
            personnage
        );


        return true;

    }


    return false;

}







commencerCompetence(competence){


    viderSelectionVisuelle();


    this.lanceur =
    this.combattants[this.tourActuel];



    if(
        competence.effets &&
        competence.effets.some(
            effet => effet.type === "consomme_charge_runique"
        )
    ){

        if(this.lanceur.ressources.chargesRuniques <= 0){

            ajouterAuJournal(
                "❌ Il faut au moins une charge runique."
            );

            return false;

        }



    

    }


    this.actionEnCours = competence;

    this.ciblesSelectionnees = [];

    this.etat = ETAT_COMBAT.SELECTION_CIBLES;


    ajouterAuJournal(
        `${this.lanceur.nom} prépare ${competence.nom}.`
    );


    return true;


}







selectionnerCible(personnage){


    if(!this.actionEnCours){

        ajouterAuJournal(
            "Aucune compétence sélectionnée."
        );

        return;

    }



    if(personnage.pv <= 0){

        ajouterAuJournal(
            `💀 ${personnage.nom} est mort et ne peut plus être ciblé.`
        );

        return;

    }



    const index =
    this.ciblesSelectionnees.indexOf(personnage);



    if(index !== -1){


        this.ciblesSelectionnees.splice(
            index,
            1
        );


        return;

    }



    if(
        this.ciblesSelectionnees.length 
        >= this.actionEnCours.maxCibles
    ){

        ajouterAuJournal(
            "Nombre maximum de cibles atteint."
        );

        return false;

    }



    this.ciblesSelectionnees.push(personnage);


    ajouterAuJournal(
        `${personnage.nom} ajouté comme cible.`
    );


    return true;


}







executerCompetence(){

    console.log("executerCompetence appelée");


    if(!this.actionEnCours){

        ajouterAuJournal(
            "Aucune compétence sélectionnée."
        );

        return;

    }



    if(this.ciblesSelectionnees.length === 0){

        ajouterAuJournal(
            "Aucune cible sélectionnée."
        );

        return;

    }



    this.consommerRessources();



    ouvrirPopupDe();


}



recevoirJetDe(resultat){

    this.jet = resultat;


    fermerPopupDe();


    const competence =
    this.actionEnCours;


    // =========================
    // CONSOMMATION DU MANA
    // =========================

    this.lanceur.mana -=
    competence.coutMana;


    mettreAJourBarres(
        this.lanceur
    );


    ajouterAuJournal(
        `🎲 ${this.lanceur.nom} obtient ${resultat}.`
    );



    // =========================
    // SEUIL DE BASE
    // =========================

    let seuilJet =
    competence.seuil;



    // =========================
    // DÉCONCENTRATION
    // =========================

    const deconcentration =
    this.lanceur.etats.find(
        etat =>
        etat.type === "deconcentration"
    );


    if(deconcentration){

        seuilJet -=
        deconcentration.valeur;


        if(seuilJet < 1){

            seuilJet = 1;

        }


        ajouterAuJournal(
            `${this.lanceur.nom} est déconcentré : seuil ${competence.seuil} - ${deconcentration.valeur} = ${seuilJet}.`
        );


        // Le malus est consommé
        // par cette action

        const indexDeconcentration =
        this.lanceur.etats.findIndex(
            etat =>
            etat.type === "deconcentration"
        );


        if(indexDeconcentration !== -1){

            this.lanceur.etats.splice(
                indexDeconcentration,
                1
            );

        }


        mettreAJourBarres(
            this.lanceur
        );

    }



    // =========================
    // VÉRIFICATION DU SEUIL
    // =========================

    if(resultat <= seuilJet){


        ajouterAuJournal(
            `✅ ${competence.nom} réussit !`
        );


        const effetsOk =
        this.appliquerEffets(
            competence
        );


        if(effetsOk){


            if(
                competence.type === TYPE_ACTION.SOIN
            ){

                this.resoudreSoins();

            }


            else if(
                competence.type === TYPE_ACTION.BUFF
            ){

                // La compétence applique
                // uniquement son effet.

            }


            else{

                this.resoudreDegats();

            }


        }


        else{

            ajouterAuJournal(
                "❌ L'action est annulée."
            );

        }



            // =====================================================
            // 🔄 FIN DE L'ACTION
            // =====================================================

            this.actionEnCours = null;
            this.lanceur = null;
            this.ciblesSelectionnees = [];
            this.jet = null;

            this.etat = ETAT_COMBAT.ATTENTE;

            viderSelectionVisuelle();


    }


    else{


        ajouterAuJournal(
            `❌ ${competence.nom} échoue.`
        );


    }

}



resoudreSoins(){


    const competence =
    this.actionEnCours;


    let multiplicateur = 1;


    // Critique

    if(this.jet === 1){

        multiplicateur = 2;

        ajouterAuJournal(
            "💚 Soin critique !"
        );

    }


    this.ciblesSelectionnees.forEach(cible => {


        const soin =
        competence.soin * multiplicateur;


        const anciensPV =
        cible.pv;


        cible.pv =
        Math.min(
            cible.pv + soin,
            cible.pvMax
        );


        const soinReel =
        cible.pv - anciensPV;


        ajouterAuJournal(
            `💚 ${cible.nom} récupère ${soinReel} PV.`
        );


        mettreAJourBarres(
            cible
        );


    });


}



resoudreDegats(){

    const competence =
    this.actionEnCours;


    let degats;


    // =========================
    // CALCUL DES DÉGÂTS
    // =========================

    // Oblitération
    if(competence.nom === "Oblitération"){

        if(this.ciblesSelectionnees.length === 1){

            degats = 4;

        }
        else{

            degats = 2;

        }

    }


    // Autres compétences
    else{

        // Critique

        if(this.jet <= competence.critiqueSeuil){

            ajouterAuJournal(
                "💥 Coup critique !"
            );


            if(competence.degatsCritique !== null){

                degats =
                competence.degatsCritique;

            }
            else{

                degats =
                competence.degats * 2;

            }

        }


        // Dégâts spéciaux

        else if(
            competence.degatsSpecial !== null &&
            this.jet >= 2 &&
            this.jet <= competence.seuilSpecial
        ){

            degats =
            competence.degatsSpecial;

        }


        // Dégâts normaux

        else{

            degats =
            competence.degats;

        }

    }


    // =========================
    // CIBLES
    // =========================

    this.ciblesSelectionnees.forEach(cible => {


        let seuilDefense =
        competence.seuil - cible.defense;


        ajouterAuJournal(
            `${cible.nom} : seuil ${competence.seuil} - défense ${cible.defense} = ${seuilDefense}.`
        );


        ajouterAuJournal(
            `🎲 Jet : ${this.jet}`
        );


        // =========================
        // RÉUSSITE
        // =========================

        if(this.jet <= seuilDefense){


            let degatsFinaux =
            degats;


            // =========================
            // CRITIQUE D'OBLITÉRATION
            // =========================

            if(
                competence.nom === "Oblitération" &&
                this.jet <= competence.critiqueSeuil
            ){

                ajouterAuJournal(
                    "💥 Coup critique !"
                );


                degatsFinaux *= 2;

            }


            // =========================
            // MODIFICATEUR DE DÉGÂTS
            // =========================

            if(this.modificateurDegats > 0){

                degatsFinaux =
                this.modificateurDegats;

                this.modificateurDegats = 0;

            }


            // =========================
            // BONUS DES SPHÈRES
            // =========================

            if(this.degatsBonusSpheres){

                degatsFinaux +=
                this.degatsBonusSpheres;

                this.degatsBonusSpheres = 0;

            }


            // =========================
            // MÉDITATION
            // =========================

            const meditation =
            cible.etats.find(
                etat => etat.type === "meditation"
            );


            if(meditation){

                degatsFinaux =
                Math.floor(
                    degatsFinaux / 2
                );


                ajouterAuJournal(
                    `🧘 ${cible.nom} réduit les dégâts de moitié grâce à Méditation.`
                );

            }


            // =========================
            // BRAVOURE
            // =========================

            const indexBravoure =
            cible.etats.findIndex(
                etat =>
                etat.type === "bravoure"
            );


            if(indexBravoure !== -1){

                const bravoure =
                cible.etats[indexBravoure];


                if(
                    degatsFinaux <=
                    bravoure.valeurBlocage
                ){

                    ajouterAuJournal(
                        `🛡️ ${cible.nom} bloque entièrement l'attaque !`
                    );


                    cible.etats.splice(
                        indexBravoure,
                        1
                    );


                    mettreAJourBarres(
                        cible
                    );


                    return;

                }


                ajouterAuJournal(
                    `💥 L'attaque est trop puissante pour Bravoure.`
                );


                cible.etats.splice(
                    indexBravoure,
                    1
                );

            }


            // =========================
            // BARRIÈRE PRISMATIQUE
            // =========================

            const indexBarriere =
            cible.etats.findIndex(
                etat =>
                etat.type === "barriere_prismatique"
            );


            if(indexBarriere !== -1){

                const barriere =
                cible.etats[indexBarriere];


                if(
                    degatsFinaux <=
                    barriere.valeurBlocage
                ){

                    barriere.valeurBlocage -=
                    degatsFinaux;


                    ajouterAuJournal(
                        `🌈 ${cible.nom} bloque ${degatsFinaux} dégâts avec sa Barrière prismatique.`
                    );


                    if(
                        barriere.valeurBlocage === 0
                    ){

                        cible.etats.splice(
                            indexBarriere,
                            1
                        );


                        ajouterAuJournal(
                            `🌈 La Barrière prismatique de ${cible.nom} disparaît.`
                        );

                    }
                    else{

                        ajouterAuJournal(
                            `🌈 Il reste ${barriere.valeurBlocage} protection.`
                        );

                    }


                    mettreAJourBarres(
                        cible
                    );


                    return;

                }


                const degatsRestants =
                degatsFinaux -
                barriere.valeurBlocage;


                ajouterAuJournal(
                    `🌈 La Barrière prismatique absorbe ${barriere.valeurBlocage} dégâts.`
                );


                cible.etats.splice(
                    indexBarriere,
                    1
                );


                degatsFinaux =
                degatsRestants;


                ajouterAuJournal(
                    `💥 ${cible.nom} subit ${degatsFinaux} dégâts restants.`
                );

            }


            // =========================
            // DÉGÂTS
            // =========================

            cible.recevoirDegats(
                degatsFinaux
            );


            ajouterAuJournal(
                `💥 ${cible.nom} subit ${degatsFinaux} dégâts.`
            );


            mettreAJourBarres(
                cible
            );


            this.verifierMort(
                cible
            );

        }


        else{

            ajouterAuJournal(
                `🛡️ ${cible.nom} esquive l'attaque.`
            );

        }

    });

}



ajouterSphereNoire(){

    this.lanceur.ressources.spheresNoires.push({

        duree:3

    });


    ajouterAuJournal(
        `⚫ Une sphère noire apparaît pour ${this.lanceur.nom}.`
    );


    mettreAJourRessources(
        this.lanceur
    );

}



appliquerEffets(competence){


    if(!competence.effets){

        return true;

    }


    for(const effet of competence.effets){


        switch(effet.type){


            case "invocation_sphere_noire":

                this.ajouterSphereNoire();

                break;



            case "consomme_sphere_noire":

                if(!this.consommeSphereNoire()){

                    return false;

                }

                break;



            case "dispersion_spheres":

                if(!this.disperserSpheres()){

                    return false;

                }

                break;



            case "ajout_charge_runique":

                this.ajouterChargeRunique();

                break;



            case "bouclier_conditionnel":

                let valeurBlocage = effet.valeur;


                if(this.jet === 1){

                    valeurBlocage *= 2;

                }


                this.lanceur.etats.push({

                    type:"bravoure",

                    valeurBlocage: valeurBlocage,

                    duree: effet.duree

                });

                console.log(
                    "ETATS DE",
                    this.lanceur.nom,
                    this.lanceur.etats
                );


                ajouterAuJournal(
                    `🛡️ ${this.lanceur.nom} obtient un bouclier de ${valeurBlocage}.`
                );


                mettreAJourBarres(
                    this.lanceur
                );


                break;



            case "etourdissement":


                this.ciblesSelectionnees.forEach(cible => {


                    this.ajouterEtat(
                        cible,
                        effet
                    );


                });


                break;



            case "immobilisation":


                this.ciblesSelectionnees.forEach(cible => {


                    this.ajouterEtat(
                        cible,
                        effet
                    );


                });


                break;



            case "anomalie_radieuse":

                this.ciblesSelectionnees.forEach(
                    cible => {

                        cible.etats.push({

                            type: "anomalie_radieuse",

                            duree: effet.duree

                        });


                        ajouterAuJournal(
                            `✨ ${cible.nom} reçoit l'Anomalie radieuse pendant ${effet.duree} tour(s).`
                        );


                        mettreAJourBarres(
                cible
                        );

                    }
                );

                break;



            case "exaltation":

                this.ciblesSelectionnees.forEach(
                    cible => {

                        let valeurBlocage =
                        effet.valeurBlocage;


                        // Critique

                        if(this.jet === 1){

                            valeurBlocage *= 2;

                        }


                        cible.etats.push({

                            type: "exaltation",

                            valeurBlocage:
                            valeurBlocage,

                            duree:
                            effet.duree

                        });


                        ajouterAuJournal(
                            `🛡️ ${cible.nom} obtient un bouclier d'Exaltation de ${valeurBlocage} pendant ${effet.duree} tour(s).`
                        );


                        mettreAJourBarres(
                            cible
                        );

                    }
                );

                break;



            case "barriere_prismatique":


                this.ciblesSelectionnees.forEach(
                    cible => {


                        let valeurBlocage =
                        effet.valeurBlocage;


                        // Critique

                        if(this.jet === 1){

                            valeurBlocage *= 2;

                        }


                        cible.etats.push({

                            type: "barriere_prismatique",

                            valeurBlocage:
                            valeurBlocage,

                            duree:
                            effet.duree
                            

                        });

                        console.log("BARRIERE AJOUTEE :", cible.etats);


                        ajouterAuJournal(
                            `🌈 ${cible.nom} obtient une Barrière prismatique de ${valeurBlocage} pendant ${effet.duree} tour(s).`
                        );


                        mettreAJourBarres(
                            cible
                        );


                    }
                );


                break;



            case "menace":

                ajouterAuJournal(
                    `😈 ${this.lanceur.nom} provoque une menace de ${effet.valeur} dégâts.`
                );

                break;



            case "meditation":

                this.lanceur.etats.push({

                    type: "meditation",

                    duree: effet.duree

                });


                this.lanceur.soigner(1);


                ajouterAuJournal(
                    `🧘 ${this.lanceur.nom} entre en méditation et récupère 1 PV.`
                );


                ajouterAuJournal(
                    `🛡️ ${this.lanceur.nom} subira moitié moins de dégâts pendant ${effet.duree} tours.`
                );


                mettreAJourBarres(
                    this.lanceur
                );


                break;



            case "deconcentration":

                this.ciblesSelectionnees.forEach(
                    cible => {

                        cible.etats.push({

                            type: "deconcentration",

                            valeur: effet.valeur,

                            duree: effet.duree

                        });


                        ajouterAuJournal(
                            `🐦‍⬛ ${cible.nom} est déconcentré : -${effet.valeur} au seuil de son prochain sort.`
                        );


                        mettreAJourBarres(
                            cible
                        );

                    }
                );

                break;



            case "vol_mana":

                this.ciblesSelectionnees.forEach(
                    cible => {

                        const manaVole =
                        Math.min(
                            3,
                            cible.mana
                        );


                        cible.mana -= manaVole;


                        ajouterAuJournal(
                            `💀 ${cible.nom} perd ${manaVole} mana avec Royaume des morts.`
                        );


                        mettreAJourBarres(
                            cible
                        );

                    }
                );

                break;



            default:


                ajouterAuJournal(
                    `Effet inconnu : ${effet.type}`
                );


                break;


        }


    }


    return true;


}



consommeSphereNoire(){


    const spheres =
    this.lanceur.ressources.spheresNoires;



    if(spheres.length === 0){


        ajouterAuJournal(
            "❌ Aucune sphère noire disponible."
        );


        return false;

    }



    spheres.shift();



    ajouterAuJournal(
        "⚫ Une sphère noire est consommée."
    );



    mettreAJourRessources(
        this.lanceur
    );


    return true;


}



disperserSpheres(){


    const spheres =
    this.lanceur.ressources.spheresNoires;



    const nombre =
    spheres.length;



    if(nombre === 0){


        ajouterAuJournal(
            "❌ Aucune sphère noire disponible."
        );


        return false;

    }



    spheres.length = 0;


    this.modificateurDegats =
    nombre * 3;



    ajouterAuJournal(
        `⚫ ${nombre} sphère(s) noire(s) utilisée(s).`
    );


    mettreAJourRessources(
        this.lanceur
    );


    return true;


}



ajouterEtat(cible, effet){


    cible.etats.push({

        type: effet.type,

        duree: effet.duree ?? 1

    });


    ajouterAuJournal(
        `📌 ${cible.nom} reçoit l'état : ${effet.type} (${effet.duree ?? 1} tour(s)).`
    );


    mettreAJourBarres(cible);


}



verifierEtats(personnage){

    const etourdi =
    personnage.etats.find(
        etat => etat.type === "etourdissement"
    );


    if(etourdi){

        ajouterAuJournal(
            `😵 ${personnage.nom} est étourdi et perd son tour.`
        );

    }


    personnage.etats.forEach(etat => {

        if(
            etat.duree !== undefined &&
            etat.type !== "deconcentration"
        ){

            etat.duree--;

        }

    });


    personnage.etats =
    personnage.etats.filter(
        etat => {

            if(
                etat.duree !== undefined &&
                etat.duree <= 0 &&
                etat.type !== "deconcentration"
            ){

                if(etat.type === "barriere_prismatique"){

                    ajouterAuJournal(
                        `🌈 La Barrière prismatique de ${personnage.nom} disparaît.`
                    );

                }


                if(etat.type === "immobilisation"){

                    ajouterAuJournal(
                        `🦶 ${personnage.nom} n'est plus immobilisé.`
                    );

                }


                if(etat.type === "etourdissement"){

                    ajouterAuJournal(
                        `😵 ${personnage.nom} n'est plus étourdi.`
                    );

                }


                return false;

            }


            return true;

        }
    );


    mettreAJourBarres(
        personnage
    );


    if(etourdi){

        this.terminerTour();

        return true;

    }


    return false;

}



ajouterChargeRunique(){

    this.lanceur.ressources.chargesRuniques++;

    ajouterAuJournal(
        `⚔️ ${this.lanceur.nom} gagne une charge runique.`
    );

    mettreAJourBarres(this.lanceur);

}



consommerChargeRunique(){

    if(this.lanceur.ressources.chargesRuniques <= 0){

        ajouterAuJournal(
            "❌ Aucune charge runique disponible."
        );

        return false;

    }

    this.lanceur.ressources.chargesRuniques--;

    ajouterAuJournal(
        `⚔️ ${this.lanceur.nom} consomme une charge runique.`
    );

    mettreAJourBarres(this.lanceur);

    return true;

}



consommerRessources(){


    const competence =
    this.actionEnCours;



    if(
        competence.effets &&
        competence.effets.some(
            effet => effet.type === "consomme_charge_runique"
        )
    ){


        this.lanceur.ressources.chargesRuniques--;


        ajouterAuJournal(
            `⚔️ ${this.lanceur.nom} consomme une charge runique.`
        );


        mettreAJourBarres(
            this.lanceur
        );


    }


}



verifierMort(personnage){


    if(personnage.pv <= 0){


        personnage.pv = 0;


        if(
            !personnage.etats.some(
                e => e.type === "mort"
            )
        ){

            personnage.etats.push({

                type:"mort",

                duree:0

            });

        }


        const carte =
        document.getElementById(
            "perso-" + personnage.id
        );


        if(carte){

            carte.classList.add(
                "mort"
            );

        }


        ajouterAuJournal(
            `💀 ${personnage.nom} est mort !`
        );


        mettreAJourBarres(
            personnage
        );


        return true;


    }


    return false;


}



verifierFinBravoure(personnage){

    const indexBravoure =
    personnage.etats.findIndex(
        etat => etat.type === "bravoure"
    );


    if(indexBravoure !== -1){

        personnage.etats.splice(
            indexBravoure,
            1
        );


        ajouterAuJournal(
            `🛡️ Le bouclier de Bravoure de ${personnage.nom} disparaît.`
        );


        mettreAJourBarres(
            personnage
        );

    }

}


}