class Personnage {

    constructor({
        nom,
        icone,
        pvMax,
        manaMax,
        defense,
        competences = [],
        ressources = {}
    }) {

        this.id = nom.toLowerCase().replaceAll(" ", "_");

        this.nom = nom;

        this.icone = icone;

        this.pvMax = pvMax;
        this.pv = pvMax;

        this.manaMax = manaMax;
        this.mana = manaMax;

        this.defense = defense;

        this.competences = competences;

        this.ressources = ressources;

        // 🧪 Potions
        if(this.ressources.potionsSoins === undefined){
            this.ressources.potionsSoins = 4;
        }

        if(this.ressources.potionsMana === undefined){
            this.ressources.potionsMana = 4;
        }

        this.etats = [];


        // =====================================================
        // 🎒 ÉQUIPEMENT
        // =====================================================

        this.equipement = {

            casque: null,

            epaulieres: null,

            plastron: null,

            cape: null,

            gants: null,

            bottes: null,

            jambieres: null,

            arme1: null,

            arme2: null,

            accessoire1: null,

            accessoire2: null

        };

    }


    recevoirDegats(degats) {

        this.pv -= degats;

        if(this.pv < 0) {

            this.pv = 0;

        }

    }


    soigner(quantite) {

        this.pv += quantite;

        if(this.pv > this.pvMax) {

            this.pv = this.pvMax;

        }

    }


    estVivant() {

        return this.pv > 0;

    }


    // =====================================================
    // 🎒 BONUS D'ÉQUIPEMENT
    // =====================================================


    getBonusEquipement(typeBonus) {

        let total = 0;


        for(const emplacement in this.equipement) {

            const equipement = this.equipement[emplacement];


            if(
                equipement &&
                equipement.bonus &&
                equipement.bonus[typeBonus]
            ) {

                total += equipement.bonus[typeBonus];

            }

        }


        return total;

    }


    getDegats() {

        return this.getBonusEquipement("degats");

    }


    getBonusSeuil() {

        return this.getBonusEquipement("seuil");

    }


    getBonusSoins() {

        return this.getBonusEquipement("soins");

    }


    getBonusDefense() {

        return this.getBonusEquipement("defense");

    }


    getDefense() {

        return this.defense + this.getBonusDefense();

    }


    getSeuil(seuilBase) {

        return seuilBase + this.getBonusSeuil();

    }


    // =====================================================
    // 🔄 RÉINITIALISATION
    // =====================================================


    reinitialiser() {

        // ❤️ PV et 💙 Mana

        this.pv = this.pvMax;

        this.mana = this.manaMax;



        // 🧪 Réinitialiser les potions
        this.ressources.potionsSoins = 4;
        this.ressources.potionsMana = 4;


        // 📌 Supprimer tous les états

        this.etats = [];


        // 🔄 Réinitialiser les ressources temporaires

        if(this.ressources.spheresNoires) {

            this.ressources.spheresNoires = [];

        }


        if(this.ressources.chargesRuniques !== undefined) {

            this.ressources.chargesRuniques = 0;

        }

    }

}