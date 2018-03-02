AutoForm.hooks({
    'ajoutCommerce': {
        onSubmit: function(doc){ // Gestion du formulaire d'ajout de commerce
            console.log(doc);
            var error = null;
            var name = doc.name;
            var horaire = doc.horaire;
            var telephone = doc.telephone;
            var ville = doc.ville;
            var adresse = doc.adresse;

            Commerces.insert({
                name: name,
                horaire: horaire,
                telephone: telephone,
                ville: ville,
                adresse: adresse
            }, function(err){
                if(err){
                    error = new Error("Une erreur s'est produite");
                }
            });

            if(error === null){
                this.done(); // Appelle onSuccess
            }
            else{
                this.done(error); // Appelle onError
            }

            return false; // Dans tout les cas, arrete la soumission des donneés.
        },

        onSuccess: function(){
            Router.go(Utils.pathFor('accueil'));
        },

        onError: function(formType, err){
            alert(err.reason)
        }

    }
});