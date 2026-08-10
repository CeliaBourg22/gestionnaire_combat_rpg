const VieuxSage = new Personnage({

    nom: "Vieux-sage",

    icone: "🧙",

    pvMax: 10,

    manaMax: 12,

    defense: 0,

    competences: [

        new Competence({

            nom: "Flamme intérieure",

            icone: "🔥",

            description:
            "Vieux-sage lance une boule d'énergie spirituelle qui explose et inflige des dégâts au contact d'une unité ennemie.",

            type: TYPE_ACTION.ATTAQUE,

            cible: CIBLE.ENNEMI,

            maxCibles: 1,

            coutMana: 1,

            seuil: 16,

            degats: 2,

            effets: []

        }),


        new Competence({

            nom: "Anomalie radieuse",

            icone: "✨",

            description:
            "Vieux-sage crée une anomalie composée de lumière qui confère un bonus de vitesse de déplacement pendant 3 tours.",

            type: TYPE_ACTION.BUFF,

            cible: CIBLE.ALLIE,

            maxCibles: 1,

            coutMana: 2,

            seuil: 16,

            degats: 0,

            effets: [

                {

                    type: "anomalie_radieuse",

                    duree: 3

                }

            ]

        }),


        new Competence({

            nom: "Exaltation",

            icone: "🛡️",

            description:
            "Vieux-sage invoque un bouclier qui absorbe les dégâts et augmente la vitesse de déplacement de l'allié protégé pendant 3 tours.",

            type: TYPE_ACTION.BUFF,

            cible: CIBLE.ALLIE,

            maxCibles: 1,

            coutMana: 2,

            seuil: 16,

            degats: 0,

            effets: [

                {

                    type: "exaltation",

                    valeurBlocage: 2,

                    duree: 3

                }

            ]

        })

    ]

});