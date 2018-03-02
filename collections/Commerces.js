import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
SimpleSchema.extendOptions(['denyUpdate']);

Commerces = new Mongo.Collection('commerces');

Commerces.allow({
    insert: function(){return true;},
    update: function(){return true;},
    remove: function(){return true;}
});

Commerces.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Nom"
    },
    horaire: {
        type: String,
        label: "Horaires"
    },
    telephone: {
        type: String,
        label: "Téléphone"
    },
    ville: {
        type: String,
        label: "Ville"
    },
    adresse: {
        type: String,
        label: "Adresse"
    },
    menus: {
    type: Array,
    label: "menus"
},
    "menus.$": {
        type: String,
        label: "menu"
    }

}));