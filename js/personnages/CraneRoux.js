const CraneRoux = new Personnage({

    nom: "Crâne-Roux",

    icone: "⚔️",

    pvMax: 14,

    manaMax: 8,

    defense: 4,

    competences: [

        new Competence({

            nom: "Attaque intimidante",

            icone: "😈",

            description:
            "Provoque une menace égale à 5 dégâts.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 1,

            coutMana: 0,

            seuil: 15,

            degats: 1,

            effets: [

                {

                    type: "menace",

                    valeur: 5

                }

            ]

        }),


        new Competence({

            nom: "Assaut éclair",

            icone: "⚡",

            description:
            "Crâne-Roux se téléporte sur le champ de bataille à la vitesse de l'éclair, infligeant des dégâts physiques à plusieurs unités sur son chemin tout en étant impossible à cibler.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 3,

            coutMana: 2,

            seuil: 15,

            degats: 2,

            effets: []


        }),


        new Competence({

            nom: "Méditation",

            icone: "🧘",

            description:
            "Crâne-Roux médite, régénérant 1 PV chaque tour et subissant moitié de dégâts pendant 2 tours.",

            type: TYPE_ACTION.SOIN,

            cible: CIBLE.SOI,

            maxCibles: 1,

            coutMana: 2,

            seuil: 15,

            soin: 1,

            effets: [

                {

                    type: "meditation",

                    duree: 2

                }

            ]

        })

    ]

});