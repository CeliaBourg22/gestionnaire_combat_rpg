class Equipement {

    constructor({
        nom,
        icone,
        type,
        description,
        bonus = {}
    }) {

        this.nom = nom;

        this.icone = icone;

        this.type = type;

        this.description = description;

        this.bonus = bonus;

    }

}