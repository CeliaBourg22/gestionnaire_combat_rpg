const BoucleNoire = new Personnage({

    nom: "Boucle-Noire",

    icone: "🧝‍♀️",

    pvMax: 10,

    manaMax: 12,

    defense: 0,

    competences: [

        new Competence({

            nom: "Éclat radieux",

            icone: "✨",

            description:
            "Émet un petit rayon lumineux.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 1,

            coutMana: 0,

            seuil: 16,

            degats: 1,

            effets: []

        }),


        new Competence({

            nom: "Illumination",

            icone: "💚",

            description:
            "Boucle-Noire rayonne de persévérance et se soigne, ainsi qu'un allié blessé proche.",

            type: TYPE_ACTION.SOIN,

            cible: CIBLE.ALLIE,

            maxCibles: 2,

            coutMana: 2,

            seuil: 16,

            soin: 2,

            effets: []

        }),


        new Competence({

            nom: "Barrière prismatique",

            icone: "🌈",

            description:
            "Boucle-Noire courbe la lumière autour d’une cible alliée la protégeant contre les dégâts durant 3 tours.",

            type: TYPE_ACTION.BUFF,

            cible: CIBLE.ALLIE,

            maxCibles: 1,

            coutMana: 2,

            seuil: 16,

            degats: 0,

            effets: [

                {

                    type: "barriere_prismatique",

                    valeurBlocage: 3,

                    duree: 3

                }

            ]

        })

    ]

});