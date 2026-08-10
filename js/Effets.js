class GestionnaireEffets {


    static appliquer(effet, lanceur, cibles){


        switch(effet.type){


            case "invocation_sphere_noire":

                this.invoquerSphereNoire(lanceur);

                break;



            case "consomme_sphere_noire":

                this.utiliserSphereNoire(lanceur);

                break;



            case "dispersion_spheres":

                this.disperserSpheres(lanceur);

                break;



            case "immobilisation":

                cibles.forEach(cible => {

                    this.ajouterEtat(

                        cible,

                        "immobilisation",

                        effet.duree

                    );

                });

                break;



            case "bouclier_conditionnel":

                this.ajouterEtat(

                    lanceur,

                    "bravoure",

                    effet.duree,

                    {

                        valeurBlocage:

                        lanceur.combat.jet === 1 ? 6 : 3

                    }

                );

                break;


        }


    }



    static invoquerSphereNoire(personnage){


        personnage.ressources.spheresNoires.push({

            duree: 3

        });


        ajouterAuJournal(
            `${personnage.nom} invoque une sphère noire.`
        );


    }



    static utiliserSphereNoire(personnage){


        if(personnage.ressources.spheresNoires.length === 0){

            ajouterAuJournal(
                "Aucune sphère noire disponible."
            );

            return;

        }


        personnage.ressources.spheresNoires.shift();


        ajouterAuJournal(
            "Une sphère noire est utilisée."
        );


    }



    static disperserSpheres(personnage){


        const nombre =
        personnage.ressources.spheresNoires.length;


        personnage.ressources.spheresNoires = [];


        ajouterAuJournal(
            `${nombre} sphère(s) noire(s) disparaissent.`
        );


        return nombre;


    }



    static ajouterEtat(personnage, type, duree, donnees = {}){

        personnage.etats.push({

            type: type,

            duree: duree,

            ...donnees

        });

        mettreAJourBarres(personnage);

    }



    static retirerEtat(personnage, type){

        personnage.etats =
        personnage.etats.filter(

            etat => etat.type !== type

        );

        mettreAJourBarres(personnage);

    }


}