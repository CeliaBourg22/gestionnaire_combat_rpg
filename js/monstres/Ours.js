const Ours = new Personnage({

    nom: "Ours",

    icone: "🐻",

    pvMax: 25,

    manaMax: 0,

    defense: 3,

    competences: [

        new Competence({

            nom: "Charge",

            icone: "🐻",

            description:
            "Charge une cible et l’immobilise.",

            type: TYPE_ACTION.ATTAQUE,

            cible: "ENNEMI",

            maxCibles: 1,

            coutMana: 0,

            seuil: 15,

            degats: 3,

            effets: [

                {
                    type: "immobilisation",
                    duree: 1
                }

            ]

        }),


        new Competence({

            nom: "Griffure",

            icone: "🐾",

            description:
            "Griffe une cible.",

            type: TYPE_ACTION.ATTAQUE,

            cible: "ENNEMI",

            maxCibles: 1,

            coutMana: 0,

            seuil: 15,

            degats: 5,

            effets: []

        }),


        new Competence({

            nom: "Balayage",

            icone: "🐾",

            description:
            "Griffe les cibles devant lui.",

            type: TYPE_ACTION.ATTAQUE,

            cible: "ENNEMI",

            maxCibles: 3,

            coutMana: 0,

            seuil: 15,

            degats: 3,

            effets: []

        })

    ]

});