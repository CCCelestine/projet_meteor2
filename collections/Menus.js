import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
SimpleSchema.extendOptions(['denyUpdate']);

Menus = new Mongo.Collection('menus');

Menus.allow({
    insert: function(){return true;},
    update: function(){return true;},
    remove: function(){return true;}
});

Menus.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Nom"
    },
    description: {
        type: String,
        label: "Description"
    },
    prix: {
        type: Number,
        label: "Prix"
    },
    rest: {
        type: String,
        label: "Nombre de produits restants (facultatif)",
        optional: true
    },
    photo: {
        type: String,
        label: "URL de l'image (facultatif)",
        optional: true
    },
    commerces: {
        type: String,
        label: "Commerces"
    }

}));