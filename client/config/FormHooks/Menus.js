AutoForm.hooks({
    'ajoutMenu': {
        onSubmit: function(doc){ // Gestion du formulaire d'ajout de menu
            console.log(doc);
            var error = null;
            var commerces =  doc.commerces;
            var name = doc.name;
            var description = doc.description;
            var prix = doc.prix;
            var rest = doc.rest;
            var photo = doc.photo;

            Menus.insert({
                commerces: commerces,
                name: name,
                description: description,
                prix: prix,
                rest: rest,
                photo: photo
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