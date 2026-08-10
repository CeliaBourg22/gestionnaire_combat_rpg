const BarbeNoire = new Personnage({

    nom: "Barbe-Noire",

    icone: "⚔️",

    pvMax: 12,

    manaMax: 10,

    defense: 2,

    ressources: {

        chargesRuniques: 0

    },

    competences: [

        new Competence({

            nom: "Lame runique",

            icone: "🗡️",

            description:
            "Inflige 2 dégâts et crée une charge runique.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 1,

            coutMana: 0,

            seuil: 15,

            degats: 2,

            effets: [

                {
                    type: "ajout_charge_runique"
                }

            ]

        }),



        new Competence({

            nom: "Ailes brisées",

            icone: "🪽",

            description:
            "Consomme une charge runique et inflige 4 dégâts.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 1,

            coutMana: 2,

            seuil: 15,

            degats: 4,

            effets: [

                {
                    type: "consomme_charge_runique"
                }

            ]

        }),



        new Competence({

            nom: "Bravoure",

            icone: "🛡️",

            description:
            "Bloque une attaque de 3 dégâts maximum jusqu'à son prochain tour.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.SOI,

            maxCibles: 1,

            coutMana: 2,

            seuil: 15,

            degats: 0,

            effets: [

                {
                    type: "bouclier_conditionnel",
                    valeur: 3,
                    duree: 1
                }

            ]

        })

    ]

});