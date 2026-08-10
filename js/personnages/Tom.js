const Tom = new Personnage({

    nom: "Tom",

    icone: "🧙",

    pvMax: 10,

    manaMax: 12,

    defense: 0,

    ressources: {

        spheresNoires: []

    },

    competences: [

    new Competence({

        nom: "Invocation noire",

        icone: "🟣",

        description:
        "Tom inflige 1 dégât et invoque une sphère noire.",

        type: TYPE_ACTION.ATTAQUE,

        cible: CIBLE.ENNEMI,

        maxCibles: 1,

        coutMana: 0,

        seuil: 16,

        degats: 1,

        effets: [

            {
                type: "invocation_sphere_noire"
            }

        ]

    }),



    new Competence({

        nom: "Sphère noire",

        icone: "🟤",

        description:
        "Tom utilise une sphère noire pour infliger 3 dégâts.",

        type: TYPE_ACTION.ATTAQUE,

        cible: CIBLE.ENNEMI,

        maxCibles: 1,

        coutMana: 2,

        seuil: 16,

        degats: 3,

        effets: [

            {
                type: "consomme_sphere_noire"
            }

        ]

    }),



    new Competence({

        nom: "Dispersion des faibles",

        icone: "🟢",

        description:
        "Les sphères noires infligent des dégâts et étourdissent les ennemis.",

        type: TYPE_ACTION.ATTAQUE,

        cible: CIBLE.ENNEMI,

        maxCibles: 1,

        coutMana: 3,

        seuil: 16,

        degats: 3,

        effets: [

            {
                type: "dispersion_spheres"
            },

            {
                type: "etourdissement",
                duree: 1
            }

        ]

    })

]

});