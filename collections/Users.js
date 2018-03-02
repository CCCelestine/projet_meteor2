import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
SimpleSchema.extendOptions(['denyUpdate']);

// Schéma du profil
Globals.schemas.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}/,
        optional: true,
        label: "Prénom"
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}/,
        optional: true,
        label: "Nom"
    },
    birthDay: {
        type: Date,
        optional: true,
        label: "Date de naissance"
    },
    gender: {
        type: String,
        allowedValues: ['M', 'F'],
        optional: true,
        label: "Genre",
        autoform: {
            afFieldInput: {
                type: "select2", // type de champ particulier, voir plus bas
                options: [
                    {
                        value: "M",
                        label: "Homme"
                    },
                    {
                        value: "F",
                        label: "Femme"
                    }
                ]
            }
        }
    }
});

// Schéma principal
Globals.schemas.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
        label: "Nom d'utilisateur"
    },
    password: {
        type: String,
        label: "Mot de passe",
        optional: true,
        autoform: {
            afFieldInput: {
                type: "password"
            }
        }
    },
    confirmation: {
        type: String,
        label: "Confirmation",
        optional: true,
        custom: function(){
            if(this.value !== this.field('password').value){
                return "passwordMissmatch";
            }
        },
        autoform: {
            afFieldInput: {
                type: "password"
            }
        }
    },
    emails: {
        type: Array,
        optional: false,
        label: "Adresses Email"
    },
    "emails.$": {
        type: Object,
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        /*regEx :[
        {msg: " failed regular expression validation"},
        {exp: SimpleSchema.RegEx.Email, msg: " must be a valid e-mail address"}],*/
        label: "Adresse",
    },
    "emails.$.verified": {
        type: Boolean,
        optional: true,
        autoform: {
            omit: true
        }
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            } else {
                this.unset();
            }
        },
        autoform: {
            omit: true
        }
    },
    profile: {
        type: Globals.schemas.UserProfile,
        optional: true,

    },
    services: {
        type: Object,
        optional: true,
        blackbox: true,
        autoform:{
            omit: true
        }
    },
    roles: {
        type: Array,
        optional: true,
        autoform: {
            omit: true
        }
    }
   ,
    "roles.$": {
        type: String
    }
});

// On attache ce schéma à la collection
Meteor.users.attachSchema(Globals.schemas.User);