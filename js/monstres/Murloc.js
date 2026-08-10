const Murloc = new Personnage({

    nom: "Murloc",

    icone: "🦎",

    pvMax: 15,

    manaMax: 0,

    defense: 0,

    competences: [

        new Competence({

            nom: "Frappe simple",

            icone: "🪓",

            description:
            "Inflige 3 dégâts.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 1,

            coutMana: 0,

            seuil: 14,

            degats: 3,

            effets: []

        }),

        new Competence({

            nom: "Charge",

            icone: "💨",

            description:
            "Inflige 2 dégâts et immobilise.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 1,

            coutMana: 0,

            seuil: 14,

            degats: 2,

            effets: [

                {
                    type: "immobilisation",
                    duree: 1
                }

            ]

        })

    ]

});