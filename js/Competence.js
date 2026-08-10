class Competence {

    constructor({
        nom,
        icone,
        description,
        type,
        cible,
        maxCibles,
        coutMana,
        seuil,
        degats = 0,
        soin = 0,
        effets = [],

        critiqueSeuil = 1,
        degatsCritique = null,
        degatsSpecial = null,
        seuilSpecial = null
    }) {

        this.nom = nom;

        this.icone = icone;

        this.description = description;

        this.type = type;

        this.cible = cible;

        this.maxCibles = maxCibles;

        this.coutMana = coutMana;

        this.seuil = seuil;

        this.degats = degats;

        this.soin = soin;

        this.effets = effets;


        // Gestion des critiques particuliers

        this.critiqueSeuil =
        critiqueSeuil;

        this.degatsCritique =
        degatsCritique;

        this.degatsSpecial =
        degatsSpecial;

        this.seuilSpecial =
        seuilSpecial;

    }

}