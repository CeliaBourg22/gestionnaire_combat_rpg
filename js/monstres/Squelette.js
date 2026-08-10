const Squelette = new Personnage({

    nom: "Squelette",

    icone: "💀",

    pvMax: 10,

    manaMax: 0,

    defense: 1,

    competences: [

        new Competence({

            nom: "Tir",

            icone: "🏹",

            description:
            "Tire sur une cible.",

            type: TYPE_ACTION.ATTAQUE,

            cible: "ENNEMI",

            maxCibles: 1,

            coutMana: 0,

            seuil: 14,

            degats: 3,

            effets: []

        })

    ]

});