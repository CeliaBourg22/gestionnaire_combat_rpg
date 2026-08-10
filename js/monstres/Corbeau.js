const Corbeau = new Personnage({

    nom: "Corbeau",

    icone: "🐦‍⬛",

    pvMax: 15,

    manaMax: 0,

    defense: 2,

    competences: [

        new Competence({

            nom: "Attaque en piqué",

            icone: "🦅",

            description:
            "Plonge sur une cible au hasard.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 1,

            coutMana: 0,

            seuil: 15,

            degats: 3,

            effets: []

        }),


        new Competence({

            nom: "Harcèlement",

            icone: "🐦‍⬛",

            description:
            "Harcèle une cible et la déconcentre (-3 au seuil pour lancer un sort).",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 1,

            coutMana: 0,

            seuil: 15,

            degats: 3,

            effets: [

                {

                    type: "deconcentration",

                    valeur: 3,

                    duree: 1

                }

            ]

        })

    ]

});