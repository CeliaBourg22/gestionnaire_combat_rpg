const LoupBeta = new Personnage({

    nom: "Loup Beta",

    icone: "🐺",

    pvMax: 15,

    manaMax: 0,

    defense: 2,

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

            degats: 1,

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

            degats: 3,

            effets: []

        })

    ]

});