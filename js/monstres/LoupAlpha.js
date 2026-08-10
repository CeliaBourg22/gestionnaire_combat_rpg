const LoupAlpha = new Personnage({

    nom: "Loup Alpha",

    icone: "🐺",

    pvMax: 20,

    manaMax: 0,

    defense: 3,

    competences: [

        new Competence({

            nom: "Bond",

            icone: "🐺",

            description:
            "Bondit sur une cible.",

            type: TYPE_ACTION.ATTAQUE,

            cible: "ENNEMI",

            maxCibles: 1,

            coutMana: 0,

            seuil: 15,

            degats: 2,

            effets: []

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

            degats: 4,

            effets: []

        })

    ]

});