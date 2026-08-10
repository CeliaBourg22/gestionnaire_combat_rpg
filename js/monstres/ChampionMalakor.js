const ChampionMalakor = new Personnage({

    nom: "Champion de Malakor",

    icone: "⚔️",

    pvMax: 30,

    manaMax: 0,

    defense: 4,

    competences: [

        new Competence({

            nom: "Poigne de la mort",

            icone: "💀",

            description:
            "Attire votre cible devant vous à l’aide d’un rayon de puissance impie.",

            type: TYPE_ACTION.ATTAQUE,

            cible: "ENNEMI",

            maxCibles: 1,

            coutMana: 0,

            seuil: 15,

            degats: 2,

            effets: []

        }),


        new Competence({

            nom: "Oblitération",

            icone: "⚔️",

            description:
            "Champion de Malakor frappe le sol avec son épée, infligeant des dégâts à tous les ennemis touchés. Les dégâts sont augmentés si un seul ennemi est touché.",

            type: TYPE_ACTION.ATTAQUE,

            cible: "ENNEMI",

            maxCibles: 3,

            coutMana: 0,

            seuil: 15,

            degats: 3,

            effets: [

                {
                    type: "obliteration"
                }

            ]

        }),


        new Competence({

            nom: "Royaume des morts",

            icone: "💀",

            description:
            "Champion de Malakor entraîne sa victime avec lui dans une autre dimension et lui vole une partie de son mana.",

            type: TYPE_ACTION.ATTAQUE,

            cible: "ENNEMI",

            maxCibles: 1,

            coutMana: 0,

            seuil: 15,

            degats: 2,

            effets: [

                {
                    type: "vol_mana",

                    valeur: 3

                }

            ]

        })

    ]

});