const attaqueSimple = {

    nom: "Attaque simple",

    icone: "⚔️",

    type: TYPE_ACTION.ATTAQUE,

    cible: CIBLE.ENNEMI,

    maxCibles: 1,

    coutMana: 0,

    degats: 20,

    effets: [],
    


    utiliser(lanceur, cible){


        ajouterAuJournal(
            `${lanceur.nom} attaque ${cible.nom} !`
        );


        cible.subirDegats(
            lanceur.attaque
        );


    }

};



const bouleDeFeu = {

    nom: "Boule de feu",

    icone: "🔥",

    type: TYPE_ACTION.ATTAQUE,

    cible: CIBLE.ENNEMI,

    maxCibles: 1,

    coutMana: 20,

    degats: 40,

    effets: [],


    utiliser(lanceur, cible){


        if(lanceur.mana < this.coutMana){

            ajouterAuJournal(
                `${lanceur.nom} n'a pas assez de mana !`
            );

            return;

        }


        lanceur.mana -= this.coutMana;


        ajouterAuJournal(
            `${lanceur.nom} lance une boule de feu !`
        );


        cible.subirDegats(40);


        mettreAJourBarres(lanceur);


    }

};