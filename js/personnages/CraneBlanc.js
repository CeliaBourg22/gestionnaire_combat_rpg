const CraneBlanc = new Personnage({

    nom: "Crâne-Blanc",

    icone: "🏹",

    pvMax: 12,

    manaMax: 10,

    defense: 2,

    competences: [

        new Competence({

            nom: "Tir",

            icone: "🏹",

            description:
            "Vise sa cible.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 1,

            coutMana: 0,

            seuil: 15,

            degats: 1,

            effets: [],

            critiqueSeuil: 1,

            degatsCritique: 4,

            degatsSpecial: 2,

            seuilSpecial: 7

        }),


        new Competence({

            nom: "Tir dans la tête",

            icone: "🎯",

            description:
            "Inflige des dégâts qui augmentent avec ses chances de coup critique.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 1,

            coutMana: 2,

            seuil: 15,

            degats: 3,

            effets: [],

            critiqueSeuil: 2,

            degatsCritique: 6

        }),


        new Competence({

            nom: "Salve",

            icone: "🏹",

            description:
            "Crâne-Blanc tire des flèches dans une zone conique pour infliger plus de dégâts.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 3,

            coutMana: 4,

            seuil: 15,

            degats: 3,

            effets: []

        })

    ]

});