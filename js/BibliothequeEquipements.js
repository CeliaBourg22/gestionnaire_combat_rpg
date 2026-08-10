const BibliothequeEquipements = [

    new Equipement({

        nom: "Bague magique",

        icone: "💍",

        type: "accessoire",

        description: "Une bague magique qui augmente les dégâts de son porteur.",

        bonus: {
            degats: 1
        }

    }),


    new Equipement({

        nom: "Bague de précision",

        icone: "💍",

        type: "accessoire",

        description: "Une bague qui augmente le seuil de réussite de toutes les capacités.",

        bonus: {
            seuil: 1
        }

    }),


    new Equipement({

        nom: "Bracelet de précision",

        icone: "📿",

        type: "accessoire",

        description: "Un bracelet qui augmente le seuil de réussite de toutes les capacités.",

        bonus: {
            seuil: 1
        }

    }),


    new Equipement({

        nom: "Broche de soin",

        icone: "📌",

        type: "accessoire",

        description: "Une broche qui augmente les soins prodigués par son porteur.",

        bonus: {
            soins: 1
        }

    }),


    new Equipement({

        nom: "Broche de protection",

        icone: "📌",

        type: "accessoire",

        description: "Une broche qui augmente la défense de son porteur.",

        bonus: {
            defense: 1
        }

    })

];