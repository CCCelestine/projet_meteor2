var require = meteorInstall({"lib":{"Globals.js":function(){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// lib/Globals.js                                                               //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
Globals = {
  appName: "GFaim",
  appSlogan: "L'application qui comble votre faim !",
  schemas: {}
};
//////////////////////////////////////////////////////////////////////////////////

},"Utils.js":function(){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// lib/Utils.js                                                                 //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
Utils = {
  formatDate: function (date) {
    var date = new Date(date);
    var day = date.getDate().toString();
    var month = (date.getMonth() + 1).toString();
    var year = date.getFullYear();

    if (day.length === 1) {
      day = '0' + day;
    }

    if (month.length === 1) {
      month = '0' + month;
    }

    return day + '/' + month + '/' + year;
  },
  pathFor: function (routeName, params) {
    // Similaire au helper "pathFor", mais utilisable directement dans le code
    var route = Router.routes[routeName].path(params);
    return route;
  }
};
//////////////////////////////////////////////////////////////////////////////////

},"routeur.js":function(){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// lib/routeur.js                                                               //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
Router.configure({
  layoutTemplate: 'mainLayout'
});
Router.route('/', {
  name: 'accueil',
  template: "accueil",
  data: function () {
    var commerces = Commerces.find();
    return {
      commerces: commerces
    };
  },
  waitOn: function () {
    return Meteor.subscribe("allCommerces");
  }
});
Router.route('/register', {
  name: "user.register",
  //name: "register",
  template: "register"
});
Router.route('/login', {
  name: "user.login",
  //name: "login",
  template: "login"
});
Router.route('/loggedInHome', {
  name: "loggedInHome",
  template: "loggedInHome"
});
Router.route('/ajoutCommerce', {
  name: "ajoutCommerce",
  template: "ajoutCommerce"
});
Router.route('/ajoutMenu', {
  name: "ajoutMenu",
  template: "ajoutMenu"
}); //Page affichant un commerce et ses menus

Router.route('/commerces/:_id', function () {
  this.render('commerces', {
    data: function () {
      let id = this.params._id;
      return Commerces.findOne({
        _id: this.params._id
      });
    },
    waitOn: function () {
      return Meteor.subscribe("allCommerces");
    }
  });
});
Router.route('/commerces/:_id/add', function () {
  this.render('ajoutMenu', {
    data: function () {
      return Commerces.findOne({
        _id: this.params._id
      });
    },
    waitOn: function () {
      return Meteor.subscribe("allCommerces");
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////

}},"collections":{"Commerces.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// collections/Commerces.js                                                     //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
let SimpleSchema;
module.watch(require("simpl-schema"), {
  default(v) {
    SimpleSchema = v;
  }

}, 0);
SimpleSchema.extendOptions(['autoform']);
SimpleSchema.extendOptions(['denyUpdate']);
Commerces = new Mongo.Collection('commerces');
Commerces.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
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
//////////////////////////////////////////////////////////////////////////////////

},"Menus.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// collections/Menus.js                                                         //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
let SimpleSchema;
module.watch(require("simpl-schema"), {
  default(v) {
    SimpleSchema = v;
  }

}, 0);
SimpleSchema.extendOptions(['autoform']);
SimpleSchema.extendOptions(['denyUpdate']);
Menus = new Mongo.Collection('menus');
Menus.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
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
//////////////////////////////////////////////////////////////////////////////////

},"Users.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// collections/Users.js                                                         //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
let SimpleSchema;
module.watch(require("simpl-schema"), {
  default(v) {
    SimpleSchema = v;
  }

}, 0);
SimpleSchema.extendOptions(['autoform']);
SimpleSchema.extendOptions(['denyUpdate']); // Schéma du profil

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
        type: "select2",
        // type de champ particulier, voir plus bas
        options: [{
          value: "M",
          label: "Homme"
        }, {
          value: "F",
          label: "Femme"
        }]
      }
    }
  }
}); // Schéma principal

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
    custom: function () {
      if (this.value !== this.field('password').value) {
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
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,

    /*regEx :[
    {msg: " failed regular expression validation"},
    {exp: SimpleSchema.RegEx.Email, msg: " must be a valid e-mail address"}],*/
    label: "Adresse"
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
        return new Date();
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
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  },
  roles: {
    type: Array,
    optional: true,
    autoform: {
      omit: true
    }
  },
  "roles.$": {
    type: String
  }
}); // On attache ce schéma à la collection

Meteor.users.attachSchema(Globals.schemas.User);
//////////////////////////////////////////////////////////////////////////////////

}},"server":{"commerces.js":function(){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// server/commerces.js                                                          //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
Meteor.publish("allCommerces", function () {
  return Commerces.find({}, {});
});
Meteor.publish("allMenus", function () {
  return Menus.find({}, {});
});
//////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// server/main.js                                                               //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
Meteor.startup(() => {// code to run on server at startup
});
//////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("/lib/Globals.js");
require("/lib/Utils.js");
require("/lib/routeur.js");
require("/collections/Commerces.js");
require("/collections/Menus.js");
require("/collections/Users.js");
require("/server/commerces.js");
require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvbGliL0dsb2JhbHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2xpYi9VdGlscy5qcyIsIm1ldGVvcjovL/CfkrthcHAvbGliL3JvdXRldXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2NvbGxlY3Rpb25zL0NvbW1lcmNlcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvY29sbGVjdGlvbnMvTWVudXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2NvbGxlY3Rpb25zL1VzZXJzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvY29tbWVyY2VzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJHbG9iYWxzIiwiYXBwTmFtZSIsImFwcFNsb2dhbiIsInNjaGVtYXMiLCJVdGlscyIsImZvcm1hdERhdGUiLCJkYXRlIiwiRGF0ZSIsImRheSIsImdldERhdGUiLCJ0b1N0cmluZyIsIm1vbnRoIiwiZ2V0TW9udGgiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJsZW5ndGgiLCJwYXRoRm9yIiwicm91dGVOYW1lIiwicGFyYW1zIiwicm91dGUiLCJSb3V0ZXIiLCJyb3V0ZXMiLCJwYXRoIiwiY29uZmlndXJlIiwibGF5b3V0VGVtcGxhdGUiLCJuYW1lIiwidGVtcGxhdGUiLCJkYXRhIiwiY29tbWVyY2VzIiwiQ29tbWVyY2VzIiwiZmluZCIsIndhaXRPbiIsIk1ldGVvciIsInN1YnNjcmliZSIsInJlbmRlciIsImlkIiwiX2lkIiwiZmluZE9uZSIsIlNpbXBsZVNjaGVtYSIsIm1vZHVsZSIsIndhdGNoIiwicmVxdWlyZSIsImRlZmF1bHQiLCJ2IiwiZXh0ZW5kT3B0aW9ucyIsIk1vbmdvIiwiQ29sbGVjdGlvbiIsImFsbG93IiwiaW5zZXJ0IiwidXBkYXRlIiwicmVtb3ZlIiwiYXR0YWNoU2NoZW1hIiwidHlwZSIsIlN0cmluZyIsImxhYmVsIiwiaG9yYWlyZSIsInRlbGVwaG9uZSIsInZpbGxlIiwiYWRyZXNzZSIsIm1lbnVzIiwiQXJyYXkiLCJNZW51cyIsImRlc2NyaXB0aW9uIiwicHJpeCIsIk51bWJlciIsInJlc3QiLCJvcHRpb25hbCIsInBob3RvIiwiVXNlclByb2ZpbGUiLCJmaXJzdE5hbWUiLCJyZWdFeCIsImxhc3ROYW1lIiwiYmlydGhEYXkiLCJnZW5kZXIiLCJhbGxvd2VkVmFsdWVzIiwiYXV0b2Zvcm0iLCJhZkZpZWxkSW5wdXQiLCJvcHRpb25zIiwidmFsdWUiLCJVc2VyIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImNvbmZpcm1hdGlvbiIsImN1c3RvbSIsImZpZWxkIiwiZW1haWxzIiwiT2JqZWN0IiwiUmVnRXgiLCJFbWFpbCIsIkJvb2xlYW4iLCJvbWl0IiwiY3JlYXRlZEF0IiwiYXV0b1ZhbHVlIiwiaXNJbnNlcnQiLCJ1bnNldCIsInByb2ZpbGUiLCJzZXJ2aWNlcyIsImJsYWNrYm94Iiwicm9sZXMiLCJ1c2VycyIsInB1Ymxpc2giLCJzdGFydHVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxVQUFVO0FBQ05DLFdBQVMsT0FESDtBQUVOQyxhQUFXLHVDQUZMO0FBR05DLFdBQVM7QUFISCxDQUFWLEM7Ozs7Ozs7Ozs7O0FDQUFDLFFBQVE7QUFDSkMsY0FBWSxVQUFTQyxJQUFULEVBQWU7QUFDdkIsUUFBSUEsT0FBTyxJQUFJQyxJQUFKLENBQVNELElBQVQsQ0FBWDtBQUVBLFFBQUlFLE1BQU1GLEtBQUtHLE9BQUwsR0FBZUMsUUFBZixFQUFWO0FBQ0EsUUFBSUMsUUFBUSxDQUFDTCxLQUFLTSxRQUFMLEtBQWtCLENBQW5CLEVBQXNCRixRQUF0QixFQUFaO0FBQ0EsUUFBSUcsT0FBT1AsS0FBS1EsV0FBTCxFQUFYOztBQUVBLFFBQUlOLElBQUlPLE1BQUosS0FBZSxDQUFuQixFQUFzQjtBQUNsQlAsWUFBTSxNQUFNQSxHQUFaO0FBQ0g7O0FBRUQsUUFBSUcsTUFBTUksTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUNwQkosY0FBUSxNQUFNQSxLQUFkO0FBQ0g7O0FBRUQsV0FBT0gsTUFBTSxHQUFOLEdBQVlHLEtBQVosR0FBb0IsR0FBcEIsR0FBMEJFLElBQWpDO0FBQ0gsR0FqQkc7QUFtQkpHLFdBQVMsVUFBU0MsU0FBVCxFQUFvQkMsTUFBcEIsRUFBMkI7QUFDaEM7QUFDQSxRQUFJQyxRQUFRQyxPQUFPQyxNQUFQLENBQWNKLFNBQWQsRUFBeUJLLElBQXpCLENBQThCSixNQUE5QixDQUFaO0FBQ0EsV0FBT0MsS0FBUDtBQUNIO0FBdkJHLENBQVIsQzs7Ozs7Ozs7Ozs7QUNBQUMsT0FBT0csU0FBUCxDQUFpQjtBQUNiQyxrQkFBZ0I7QUFESCxDQUFqQjtBQUlBSixPQUFPRCxLQUFQLENBQWEsR0FBYixFQUFrQjtBQUNkTSxRQUFNLFNBRFE7QUFFZEMsWUFBVSxTQUZJO0FBR2RDLFFBQU0sWUFBVTtBQUNaLFFBQUlDLFlBQVlDLFVBQVVDLElBQVYsRUFBaEI7QUFFQSxXQUFPO0FBQ0hGLGlCQUFXQTtBQURSLEtBQVA7QUFHSCxHQVRhO0FBVWRHLFVBQVEsWUFBVTtBQUNkLFdBQU9DLE9BQU9DLFNBQVAsQ0FBaUIsY0FBakIsQ0FBUDtBQUNIO0FBWmEsQ0FBbEI7QUFlQWIsT0FBT0QsS0FBUCxDQUFhLFdBQWIsRUFBMEI7QUFDdEJNLFFBQU0sZUFEZ0I7QUFFdEI7QUFDQUMsWUFBVTtBQUhZLENBQTFCO0FBTUFOLE9BQU9ELEtBQVAsQ0FBYSxRQUFiLEVBQXVCO0FBQ25CTSxRQUFNLFlBRGE7QUFFbkI7QUFDQUMsWUFBVTtBQUhTLENBQXZCO0FBTUFOLE9BQU9ELEtBQVAsQ0FBYSxlQUFiLEVBQThCO0FBQzFCTSxRQUFNLGNBRG9CO0FBRTFCQyxZQUFVO0FBRmdCLENBQTlCO0FBS0FOLE9BQU9ELEtBQVAsQ0FBYSxnQkFBYixFQUErQjtBQUMzQk0sUUFBTSxlQURxQjtBQUUzQkMsWUFBVTtBQUZpQixDQUEvQjtBQUtBTixPQUFPRCxLQUFQLENBQWEsWUFBYixFQUEyQjtBQUN2Qk0sUUFBTSxXQURpQjtBQUV2QkMsWUFBVTtBQUZhLENBQTNCLEUsQ0FLQTs7QUFDQU4sT0FBT0QsS0FBUCxDQUFhLGlCQUFiLEVBQWdDLFlBQVk7QUFDeEMsT0FBS2UsTUFBTCxDQUFZLFdBQVosRUFBeUI7QUFDckJQLFVBQU0sWUFBWTtBQUNkLFVBQUlRLEtBQUssS0FBS2pCLE1BQUwsQ0FBWWtCLEdBQXJCO0FBQ0EsYUFBT1AsVUFBVVEsT0FBVixDQUFrQjtBQUFDRCxhQUFLLEtBQUtsQixNQUFMLENBQVlrQjtBQUFsQixPQUFsQixDQUFQO0FBQ0gsS0FKb0I7QUFLckJMLFlBQVEsWUFBVTtBQUNkLGFBQU9DLE9BQU9DLFNBQVAsQ0FBaUIsY0FBakIsQ0FBUDtBQUNIO0FBUG9CLEdBQXpCO0FBU0gsQ0FWRDtBQVlBYixPQUFPRCxLQUFQLENBQWEscUJBQWIsRUFDSSxZQUFZO0FBQ1osT0FBS2UsTUFBTCxDQUFZLFdBQVosRUFBeUI7QUFDckJQLFVBQU0sWUFBWTtBQUNkLGFBQU9FLFVBQVVRLE9BQVYsQ0FBa0I7QUFBQ0QsYUFBSyxLQUFLbEIsTUFBTCxDQUFZa0I7QUFBbEIsT0FBbEIsQ0FBUDtBQUNILEtBSG9CO0FBSXJCTCxZQUFRLFlBQVU7QUFDZCxhQUFPQyxPQUFPQyxTQUFQLENBQWlCLGNBQWpCLENBQVA7QUFDSDtBQU5vQixHQUF6QjtBQVFILENBVkQsRTs7Ozs7Ozs7Ozs7QUMzREEsSUFBSUssWUFBSjtBQUFpQkMsT0FBT0MsS0FBUCxDQUFhQyxRQUFRLGNBQVIsQ0FBYixFQUFxQztBQUFDQyxVQUFRQyxDQUFSLEVBQVU7QUFBQ0wsbUJBQWFLLENBQWI7QUFBZTs7QUFBM0IsQ0FBckMsRUFBa0UsQ0FBbEU7QUFDakJMLGFBQWFNLGFBQWIsQ0FBMkIsQ0FBQyxVQUFELENBQTNCO0FBQ0FOLGFBQWFNLGFBQWIsQ0FBMkIsQ0FBQyxZQUFELENBQTNCO0FBRUFmLFlBQVksSUFBSWdCLE1BQU1DLFVBQVYsQ0FBcUIsV0FBckIsQ0FBWjtBQUVBakIsVUFBVWtCLEtBQVYsQ0FBZ0I7QUFDWkMsVUFBUSxZQUFVO0FBQUMsV0FBTyxJQUFQO0FBQWEsR0FEcEI7QUFFWkMsVUFBUSxZQUFVO0FBQUMsV0FBTyxJQUFQO0FBQWEsR0FGcEI7QUFHWkMsVUFBUSxZQUFVO0FBQUMsV0FBTyxJQUFQO0FBQWE7QUFIcEIsQ0FBaEI7QUFNQXJCLFVBQVVzQixZQUFWLENBQXVCLElBQUliLFlBQUosQ0FBaUI7QUFDcENiLFFBQU07QUFDRjJCLFVBQU1DLE1BREo7QUFFRkMsV0FBTztBQUZMLEdBRDhCO0FBS3BDQyxXQUFTO0FBQ0xILFVBQU1DLE1BREQ7QUFFTEMsV0FBTztBQUZGLEdBTDJCO0FBU3BDRSxhQUFXO0FBQ1BKLFVBQU1DLE1BREM7QUFFUEMsV0FBTztBQUZBLEdBVHlCO0FBYXBDRyxTQUFPO0FBQ0hMLFVBQU1DLE1BREg7QUFFSEMsV0FBTztBQUZKLEdBYjZCO0FBaUJwQ0ksV0FBUztBQUNMTixVQUFNQyxNQUREO0FBRUxDLFdBQU87QUFGRixHQWpCMkI7QUFxQnBDSyxTQUFPO0FBQ1BQLFVBQU1RLEtBREM7QUFFUE4sV0FBTztBQUZBLEdBckI2QjtBQXlCcEMsYUFBVztBQUNQRixVQUFNQyxNQURDO0FBRVBDLFdBQU87QUFGQTtBQXpCeUIsQ0FBakIsQ0FBdkIsRTs7Ozs7Ozs7Ozs7QUNaQSxJQUFJaEIsWUFBSjtBQUFpQkMsT0FBT0MsS0FBUCxDQUFhQyxRQUFRLGNBQVIsQ0FBYixFQUFxQztBQUFDQyxVQUFRQyxDQUFSLEVBQVU7QUFBQ0wsbUJBQWFLLENBQWI7QUFBZTs7QUFBM0IsQ0FBckMsRUFBa0UsQ0FBbEU7QUFDakJMLGFBQWFNLGFBQWIsQ0FBMkIsQ0FBQyxVQUFELENBQTNCO0FBQ0FOLGFBQWFNLGFBQWIsQ0FBMkIsQ0FBQyxZQUFELENBQTNCO0FBRUFpQixRQUFRLElBQUloQixNQUFNQyxVQUFWLENBQXFCLE9BQXJCLENBQVI7QUFFQWUsTUFBTWQsS0FBTixDQUFZO0FBQ1JDLFVBQVEsWUFBVTtBQUFDLFdBQU8sSUFBUDtBQUFhLEdBRHhCO0FBRVJDLFVBQVEsWUFBVTtBQUFDLFdBQU8sSUFBUDtBQUFhLEdBRnhCO0FBR1JDLFVBQVEsWUFBVTtBQUFDLFdBQU8sSUFBUDtBQUFhO0FBSHhCLENBQVo7QUFNQVcsTUFBTVYsWUFBTixDQUFtQixJQUFJYixZQUFKLENBQWlCO0FBQ2hDYixRQUFNO0FBQ0YyQixVQUFNQyxNQURKO0FBRUZDLFdBQU87QUFGTCxHQUQwQjtBQUtoQ1EsZUFBYTtBQUNUVixVQUFNQyxNQURHO0FBRVRDLFdBQU87QUFGRSxHQUxtQjtBQVNoQ1MsUUFBTTtBQUNGWCxVQUFNWSxNQURKO0FBRUZWLFdBQU87QUFGTCxHQVQwQjtBQWFoQ1csUUFBTTtBQUNGYixVQUFNQyxNQURKO0FBRUZDLFdBQU8sMENBRkw7QUFHRlksY0FBVTtBQUhSLEdBYjBCO0FBa0JoQ0MsU0FBTztBQUNIZixVQUFNQyxNQURIO0FBRUhDLFdBQU8sNkJBRko7QUFHSFksY0FBVTtBQUhQLEdBbEJ5QjtBQXVCaEN0QyxhQUFXO0FBQ1B3QixVQUFNQyxNQURDO0FBRVBDLFdBQU87QUFGQTtBQXZCcUIsQ0FBakIsQ0FBbkIsRTs7Ozs7Ozs7Ozs7QUNaQSxJQUFJaEIsWUFBSjtBQUFpQkMsT0FBT0MsS0FBUCxDQUFhQyxRQUFRLGNBQVIsQ0FBYixFQUFxQztBQUFDQyxVQUFRQyxDQUFSLEVBQVU7QUFBQ0wsbUJBQWFLLENBQWI7QUFBZTs7QUFBM0IsQ0FBckMsRUFBa0UsQ0FBbEU7QUFDakJMLGFBQWFNLGFBQWIsQ0FBMkIsQ0FBQyxVQUFELENBQTNCO0FBQ0FOLGFBQWFNLGFBQWIsQ0FBMkIsQ0FBQyxZQUFELENBQTNCLEUsQ0FFQTs7QUFDQTVDLFFBQVFHLE9BQVIsQ0FBZ0JpRSxXQUFoQixHQUE4QixJQUFJOUIsWUFBSixDQUFpQjtBQUMzQytCLGFBQVc7QUFDUGpCLFVBQU1DLE1BREM7QUFFUGlCLFdBQU8sa0JBRkE7QUFHUEosY0FBVSxJQUhIO0FBSVBaLFdBQU87QUFKQSxHQURnQztBQU8zQ2lCLFlBQVU7QUFDTm5CLFVBQU1DLE1BREE7QUFFTmlCLFdBQU8sa0JBRkQ7QUFHTkosY0FBVSxJQUhKO0FBSU5aLFdBQU87QUFKRCxHQVBpQztBQWEzQ2tCLFlBQVU7QUFDTnBCLFVBQU03QyxJQURBO0FBRU4yRCxjQUFVLElBRko7QUFHTlosV0FBTztBQUhELEdBYmlDO0FBa0IzQ21CLFVBQVE7QUFDSnJCLFVBQU1DLE1BREY7QUFFSnFCLG1CQUFlLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FGWDtBQUdKUixjQUFVLElBSE47QUFJSlosV0FBTyxPQUpIO0FBS0pxQixjQUFVO0FBQ05DLG9CQUFjO0FBQ1Z4QixjQUFNLFNBREk7QUFDTztBQUNqQnlCLGlCQUFTLENBQ0w7QUFDSUMsaUJBQU8sR0FEWDtBQUVJeEIsaUJBQU87QUFGWCxTQURLLEVBS0w7QUFDSXdCLGlCQUFPLEdBRFg7QUFFSXhCLGlCQUFPO0FBRlgsU0FMSztBQUZDO0FBRFI7QUFMTjtBQWxCbUMsQ0FBakIsQ0FBOUIsQyxDQXlDQTs7QUFDQXRELFFBQVFHLE9BQVIsQ0FBZ0I0RSxJQUFoQixHQUF1QixJQUFJekMsWUFBSixDQUFpQjtBQUNwQzBDLFlBQVU7QUFDTjVCLFVBQU1DLE1BREE7QUFFTmlCLFdBQU8sc0JBRkQ7QUFHTmhCLFdBQU87QUFIRCxHQUQwQjtBQU1wQzJCLFlBQVU7QUFDTjdCLFVBQU1DLE1BREE7QUFFTkMsV0FBTyxjQUZEO0FBR05ZLGNBQVUsSUFISjtBQUlOUyxjQUFVO0FBQ05DLG9CQUFjO0FBQ1Z4QixjQUFNO0FBREk7QUFEUjtBQUpKLEdBTjBCO0FBZ0JwQzhCLGdCQUFjO0FBQ1Y5QixVQUFNQyxNQURJO0FBRVZDLFdBQU8sY0FGRztBQUdWWSxjQUFVLElBSEE7QUFJVmlCLFlBQVEsWUFBVTtBQUNkLFVBQUcsS0FBS0wsS0FBTCxLQUFlLEtBQUtNLEtBQUwsQ0FBVyxVQUFYLEVBQXVCTixLQUF6QyxFQUErQztBQUMzQyxlQUFPLG1CQUFQO0FBQ0g7QUFDSixLQVJTO0FBU1ZILGNBQVU7QUFDTkMsb0JBQWM7QUFDVnhCLGNBQU07QUFESTtBQURSO0FBVEEsR0FoQnNCO0FBK0JwQ2lDLFVBQVE7QUFDSmpDLFVBQU1RLEtBREY7QUFFSk0sY0FBVSxLQUZOO0FBR0paLFdBQU87QUFISCxHQS9CNEI7QUFvQ3BDLGNBQVk7QUFDUkYsVUFBTWtDO0FBREUsR0FwQ3dCO0FBdUNwQyxzQkFBb0I7QUFDaEJsQyxVQUFNQyxNQURVO0FBRWhCaUIsV0FBT2hDLGFBQWFpRCxLQUFiLENBQW1CQyxLQUZWOztBQUdoQjs7O0FBR0FsQyxXQUFPO0FBTlMsR0F2Q2dCO0FBK0NwQyx1QkFBcUI7QUFDakJGLFVBQU1xQyxPQURXO0FBRWpCdkIsY0FBVSxJQUZPO0FBR2pCUyxjQUFVO0FBQ05lLFlBQU07QUFEQTtBQUhPLEdBL0NlO0FBc0RwQ0MsYUFBVztBQUNQdkMsVUFBTTdDLElBREM7QUFFUHFGLGVBQVcsWUFBWTtBQUNuQixVQUFJLEtBQUtDLFFBQVQsRUFBbUI7QUFDZixlQUFPLElBQUl0RixJQUFKLEVBQVA7QUFDSCxPQUZELE1BRU87QUFDSCxhQUFLdUYsS0FBTDtBQUNIO0FBQ0osS0FSTTtBQVNQbkIsY0FBVTtBQUNOZSxZQUFNO0FBREE7QUFUSCxHQXREeUI7QUFtRXBDSyxXQUFTO0FBQ0wzQyxVQUFNcEQsUUFBUUcsT0FBUixDQUFnQmlFLFdBRGpCO0FBRUxGLGNBQVU7QUFGTCxHQW5FMkI7QUF3RXBDOEIsWUFBVTtBQUNONUMsVUFBTWtDLE1BREE7QUFFTnBCLGNBQVUsSUFGSjtBQUdOK0IsY0FBVSxJQUhKO0FBSU50QixjQUFTO0FBQ0xlLFlBQU07QUFERDtBQUpILEdBeEUwQjtBQWdGcENRLFNBQU87QUFDSDlDLFVBQU1RLEtBREg7QUFFSE0sY0FBVSxJQUZQO0FBR0hTLGNBQVU7QUFDTmUsWUFBTTtBQURBO0FBSFAsR0FoRjZCO0FBd0ZwQyxhQUFXO0FBQ1B0QyxVQUFNQztBQURDO0FBeEZ5QixDQUFqQixDQUF2QixDLENBNkZBOztBQUNBckIsT0FBT21FLEtBQVAsQ0FBYWhELFlBQWIsQ0FBMEJuRCxRQUFRRyxPQUFSLENBQWdCNEUsSUFBMUMsRTs7Ozs7Ozs7Ozs7QUM3SUEvQyxPQUFPb0UsT0FBUCxDQUFlLGNBQWYsRUFBK0IsWUFBVTtBQUNyQyxTQUFPdkUsVUFBVUMsSUFBVixDQUFlLEVBQWYsRUFBbUIsRUFBbkIsQ0FBUDtBQUNILENBRkQ7QUFJQUUsT0FBT29FLE9BQVAsQ0FBZSxVQUFmLEVBQTJCLFlBQVU7QUFDakMsU0FBT3ZDLE1BQU0vQixJQUFOLENBQVcsRUFBWCxFQUFlLEVBQWYsQ0FBUDtBQUNILENBRkQsRTs7Ozs7Ozs7Ozs7QUNKQSxJQUFJRSxNQUFKO0FBQVdPLE9BQU9DLEtBQVAsQ0FBYUMsUUFBUSxlQUFSLENBQWIsRUFBc0M7QUFBQ1QsU0FBT1csQ0FBUCxFQUFTO0FBQUNYLGFBQU9XLENBQVA7QUFBUzs7QUFBcEIsQ0FBdEMsRUFBNEQsQ0FBNUQ7QUFFWFgsT0FBT3FFLE9BQVAsQ0FBZSxNQUFNLENBQ25CO0FBQ0QsQ0FGRCxFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJHbG9iYWxzID0ge1xyXG4gICAgYXBwTmFtZTogXCJHRmFpbVwiLFxyXG4gICAgYXBwU2xvZ2FuOiBcIkwnYXBwbGljYXRpb24gcXVpIGNvbWJsZSB2b3RyZSBmYWltICFcIixcclxuICAgIHNjaGVtYXM6IHt9XHJcbn07IiwiVXRpbHMgPSB7XHJcbiAgICBmb3JtYXREYXRlOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuXHJcbiAgICAgICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIG1vbnRoID0gKGRhdGUuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgIGlmIChkYXkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGRheSA9ICcwJyArIGRheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtb250aC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgbW9udGggPSAnMCcgKyBtb250aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXkgKyAnLycgKyBtb250aCArICcvJyArIHllYXI7XHJcbiAgICB9LFxyXG5cclxuICAgIHBhdGhGb3I6IGZ1bmN0aW9uKHJvdXRlTmFtZSwgcGFyYW1zKXtcclxuICAgICAgICAvLyBTaW1pbGFpcmUgYXUgaGVscGVyIFwicGF0aEZvclwiLCBtYWlzIHV0aWxpc2FibGUgZGlyZWN0ZW1lbnQgZGFucyBsZSBjb2RlXHJcbiAgICAgICAgdmFyIHJvdXRlID0gUm91dGVyLnJvdXRlc1tyb3V0ZU5hbWVdLnBhdGgocGFyYW1zKTtcclxuICAgICAgICByZXR1cm4gcm91dGU7XHJcbiAgICB9XHJcbn07IiwiUm91dGVyLmNvbmZpZ3VyZSh7XHJcbiAgICBsYXlvdXRUZW1wbGF0ZTogJ21haW5MYXlvdXQnXHJcbn0pO1xyXG5cclxuUm91dGVyLnJvdXRlKCcvJywge1xyXG4gICAgbmFtZTogJ2FjY3VlaWwnLFxyXG4gICAgdGVtcGxhdGU6IFwiYWNjdWVpbFwiLFxyXG4gICAgZGF0YTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgY29tbWVyY2VzID0gQ29tbWVyY2VzLmZpbmQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tbWVyY2VzOiBjb21tZXJjZXNcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIHdhaXRPbjogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gTWV0ZW9yLnN1YnNjcmliZShcImFsbENvbW1lcmNlc1wiKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5Sb3V0ZXIucm91dGUoJy9yZWdpc3RlcicsIHtcclxuICAgIG5hbWU6IFwidXNlci5yZWdpc3RlclwiLFxyXG4gICAgLy9uYW1lOiBcInJlZ2lzdGVyXCIsXHJcbiAgICB0ZW1wbGF0ZTogXCJyZWdpc3RlclwiXHJcbn0pO1xyXG5cclxuUm91dGVyLnJvdXRlKCcvbG9naW4nLCB7XHJcbiAgICBuYW1lOiBcInVzZXIubG9naW5cIixcclxuICAgIC8vbmFtZTogXCJsb2dpblwiLFxyXG4gICAgdGVtcGxhdGU6IFwibG9naW5cIlxyXG59KTtcclxuXHJcblJvdXRlci5yb3V0ZSgnL2xvZ2dlZEluSG9tZScsIHtcclxuICAgIG5hbWU6IFwibG9nZ2VkSW5Ib21lXCIsXHJcbiAgICB0ZW1wbGF0ZTogXCJsb2dnZWRJbkhvbWVcIlxyXG59KTtcclxuXHJcblJvdXRlci5yb3V0ZSgnL2Fqb3V0Q29tbWVyY2UnLCB7XHJcbiAgICBuYW1lOiBcImFqb3V0Q29tbWVyY2VcIixcclxuICAgIHRlbXBsYXRlOiBcImFqb3V0Q29tbWVyY2VcIlxyXG59KTtcclxuXHJcblJvdXRlci5yb3V0ZSgnL2Fqb3V0TWVudScsIHtcclxuICAgIG5hbWU6IFwiYWpvdXRNZW51XCIsXHJcbiAgICB0ZW1wbGF0ZTogXCJham91dE1lbnVcIlxyXG59KTtcclxuXHJcbi8vUGFnZSBhZmZpY2hhbnQgdW4gY29tbWVyY2UgZXQgc2VzIG1lbnVzXHJcblJvdXRlci5yb3V0ZSgnL2NvbW1lcmNlcy86X2lkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5yZW5kZXIoJ2NvbW1lcmNlcycsIHtcclxuICAgICAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoaXMucGFyYW1zLl9pZDtcclxuICAgICAgICAgICAgcmV0dXJuIENvbW1lcmNlcy5maW5kT25lKHtfaWQ6IHRoaXMucGFyYW1zLl9pZH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2FpdE9uOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gTWV0ZW9yLnN1YnNjcmliZShcImFsbENvbW1lcmNlc1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5Sb3V0ZXIucm91dGUoJy9jb21tZXJjZXMvOl9pZC9hZGQnLFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5yZW5kZXIoJ2Fqb3V0TWVudScsIHtcclxuICAgICAgICBkYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDb21tZXJjZXMuZmluZE9uZSh7X2lkOiB0aGlzLnBhcmFtcy5faWR9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdhaXRPbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIE1ldGVvci5zdWJzY3JpYmUoXCJhbGxDb21tZXJjZXNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCJpbXBvcnQgU2ltcGxlU2NoZW1hIGZyb20gJ3NpbXBsLXNjaGVtYSc7XHJcblNpbXBsZVNjaGVtYS5leHRlbmRPcHRpb25zKFsnYXV0b2Zvcm0nXSk7XHJcblNpbXBsZVNjaGVtYS5leHRlbmRPcHRpb25zKFsnZGVueVVwZGF0ZSddKTtcclxuXHJcbkNvbW1lcmNlcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdjb21tZXJjZXMnKTtcclxuXHJcbkNvbW1lcmNlcy5hbGxvdyh7XHJcbiAgICBpbnNlcnQ6IGZ1bmN0aW9uKCl7cmV0dXJuIHRydWU7fSxcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24oKXtyZXR1cm4gdHJ1ZTt9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpe3JldHVybiB0cnVlO31cclxufSk7XHJcblxyXG5Db21tZXJjZXMuYXR0YWNoU2NoZW1hKG5ldyBTaW1wbGVTY2hlbWEoe1xyXG4gICAgbmFtZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogXCJOb21cIlxyXG4gICAgfSxcclxuICAgIGhvcmFpcmU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiSG9yYWlyZXNcIlxyXG4gICAgfSxcclxuICAgIHRlbGVwaG9uZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogXCJUw6lsw6lwaG9uZVwiXHJcbiAgICB9LFxyXG4gICAgdmlsbGU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiVmlsbGVcIlxyXG4gICAgfSxcclxuICAgIGFkcmVzc2U6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiQWRyZXNzZVwiXHJcbiAgICB9LFxyXG4gICAgbWVudXM6IHtcclxuICAgIHR5cGU6IEFycmF5LFxyXG4gICAgbGFiZWw6IFwibWVudXNcIlxyXG59LFxyXG4gICAgXCJtZW51cy4kXCI6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwibWVudVwiXHJcbiAgICB9XHJcblxyXG59KSk7IiwiaW1wb3J0IFNpbXBsZVNjaGVtYSBmcm9tICdzaW1wbC1zY2hlbWEnO1xyXG5TaW1wbGVTY2hlbWEuZXh0ZW5kT3B0aW9ucyhbJ2F1dG9mb3JtJ10pO1xyXG5TaW1wbGVTY2hlbWEuZXh0ZW5kT3B0aW9ucyhbJ2RlbnlVcGRhdGUnXSk7XHJcblxyXG5NZW51cyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdtZW51cycpO1xyXG5cclxuTWVudXMuYWxsb3coe1xyXG4gICAgaW5zZXJ0OiBmdW5jdGlvbigpe3JldHVybiB0cnVlO30sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCl7cmV0dXJuIHRydWU7fSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24oKXtyZXR1cm4gdHJ1ZTt9XHJcbn0pO1xyXG5cclxuTWVudXMuYXR0YWNoU2NoZW1hKG5ldyBTaW1wbGVTY2hlbWEoe1xyXG4gICAgbmFtZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogXCJOb21cIlxyXG4gICAgfSxcclxuICAgIGRlc2NyaXB0aW9uOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGxhYmVsOiBcIkRlc2NyaXB0aW9uXCJcclxuICAgIH0sXHJcbiAgICBwcml4OiB7XHJcbiAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgIGxhYmVsOiBcIlByaXhcIlxyXG4gICAgfSxcclxuICAgIHJlc3Q6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiTm9tYnJlIGRlIHByb2R1aXRzIHJlc3RhbnRzIChmYWN1bHRhdGlmKVwiLFxyXG4gICAgICAgIG9wdGlvbmFsOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgcGhvdG86IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiVVJMIGRlIGwnaW1hZ2UgKGZhY3VsdGF0aWYpXCIsXHJcbiAgICAgICAgb3B0aW9uYWw6IHRydWVcclxuICAgIH0sXHJcbiAgICBjb21tZXJjZXM6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiQ29tbWVyY2VzXCJcclxuICAgIH1cclxuXHJcbn0pKTsiLCJpbXBvcnQgU2ltcGxlU2NoZW1hIGZyb20gJ3NpbXBsLXNjaGVtYSc7XHJcblNpbXBsZVNjaGVtYS5leHRlbmRPcHRpb25zKFsnYXV0b2Zvcm0nXSk7XHJcblNpbXBsZVNjaGVtYS5leHRlbmRPcHRpb25zKFsnZGVueVVwZGF0ZSddKTtcclxuXHJcbi8vIFNjaMOpbWEgZHUgcHJvZmlsXHJcbkdsb2JhbHMuc2NoZW1hcy5Vc2VyUHJvZmlsZSA9IG5ldyBTaW1wbGVTY2hlbWEoe1xyXG4gICAgZmlyc3ROYW1lOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHJlZ0V4OiAvXlthLXpBLVotXXsyLDI1fS8sXHJcbiAgICAgICAgb3B0aW9uYWw6IHRydWUsXHJcbiAgICAgICAgbGFiZWw6IFwiUHLDqW5vbVwiXHJcbiAgICB9LFxyXG4gICAgbGFzdE5hbWU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgcmVnRXg6IC9eW2EtekEtWi1dezIsMjV9LyxcclxuICAgICAgICBvcHRpb25hbDogdHJ1ZSxcclxuICAgICAgICBsYWJlbDogXCJOb21cIlxyXG4gICAgfSxcclxuICAgIGJpcnRoRGF5OiB7XHJcbiAgICAgICAgdHlwZTogRGF0ZSxcclxuICAgICAgICBvcHRpb25hbDogdHJ1ZSxcclxuICAgICAgICBsYWJlbDogXCJEYXRlIGRlIG5haXNzYW5jZVwiXHJcbiAgICB9LFxyXG4gICAgZ2VuZGVyOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGFsbG93ZWRWYWx1ZXM6IFsnTScsICdGJ10sXHJcbiAgICAgICAgb3B0aW9uYWw6IHRydWUsXHJcbiAgICAgICAgbGFiZWw6IFwiR2VucmVcIixcclxuICAgICAgICBhdXRvZm9ybToge1xyXG4gICAgICAgICAgICBhZkZpZWxkSW5wdXQ6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0MlwiLCAvLyB0eXBlIGRlIGNoYW1wIHBhcnRpY3VsaWVyLCB2b2lyIHBsdXMgYmFzXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkhvbW1lXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiRlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJGZW1tZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vIFNjaMOpbWEgcHJpbmNpcGFsXHJcbkdsb2JhbHMuc2NoZW1hcy5Vc2VyID0gbmV3IFNpbXBsZVNjaGVtYSh7XHJcbiAgICB1c2VybmFtZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICByZWdFeDogL15bYS16MC05QS1aX117MywxNX0kLyxcclxuICAgICAgICBsYWJlbDogXCJOb20gZCd1dGlsaXNhdGV1clwiXHJcbiAgICB9LFxyXG4gICAgcGFzc3dvcmQ6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiTW90IGRlIHBhc3NlXCIsXHJcbiAgICAgICAgb3B0aW9uYWw6IHRydWUsXHJcbiAgICAgICAgYXV0b2Zvcm06IHtcclxuICAgICAgICAgICAgYWZGaWVsZElucHV0OiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb25maXJtYXRpb246IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFwiQ29uZmlybWF0aW9uXCIsXHJcbiAgICAgICAgb3B0aW9uYWw6IHRydWUsXHJcbiAgICAgICAgY3VzdG9tOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnZhbHVlICE9PSB0aGlzLmZpZWxkKCdwYXNzd29yZCcpLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInBhc3N3b3JkTWlzc21hdGNoXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1dG9mb3JtOiB7XHJcbiAgICAgICAgICAgIGFmRmllbGRJbnB1dDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwYXNzd29yZFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZW1haWxzOiB7XHJcbiAgICAgICAgdHlwZTogQXJyYXksXHJcbiAgICAgICAgb3B0aW9uYWw6IGZhbHNlLFxyXG4gICAgICAgIGxhYmVsOiBcIkFkcmVzc2VzIEVtYWlsXCJcclxuICAgIH0sXHJcbiAgICBcImVtYWlscy4kXCI6IHtcclxuICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICB9LFxyXG4gICAgXCJlbWFpbHMuJC5hZGRyZXNzXCI6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgcmVnRXg6IFNpbXBsZVNjaGVtYS5SZWdFeC5FbWFpbCxcclxuICAgICAgICAvKnJlZ0V4IDpbXHJcbiAgICAgICAge21zZzogXCIgZmFpbGVkIHJlZ3VsYXIgZXhwcmVzc2lvbiB2YWxpZGF0aW9uXCJ9LFxyXG4gICAgICAgIHtleHA6IFNpbXBsZVNjaGVtYS5SZWdFeC5FbWFpbCwgbXNnOiBcIiBtdXN0IGJlIGEgdmFsaWQgZS1tYWlsIGFkZHJlc3NcIn1dLCovXHJcbiAgICAgICAgbGFiZWw6IFwiQWRyZXNzZVwiLFxyXG4gICAgfSxcclxuICAgIFwiZW1haWxzLiQudmVyaWZpZWRcIjoge1xyXG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgb3B0aW9uYWw6IHRydWUsXHJcbiAgICAgICAgYXV0b2Zvcm06IHtcclxuICAgICAgICAgICAgb21pdDogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjcmVhdGVkQXQ6IHtcclxuICAgICAgICB0eXBlOiBEYXRlLFxyXG4gICAgICAgIGF1dG9WYWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0luc2VydCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNldCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRvZm9ybToge1xyXG4gICAgICAgICAgICBvbWl0OiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByb2ZpbGU6IHtcclxuICAgICAgICB0eXBlOiBHbG9iYWxzLnNjaGVtYXMuVXNlclByb2ZpbGUsXHJcbiAgICAgICAgb3B0aW9uYWw6IHRydWUsXHJcblxyXG4gICAgfSxcclxuICAgIHNlcnZpY2VzOiB7XHJcbiAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgIG9wdGlvbmFsOiB0cnVlLFxyXG4gICAgICAgIGJsYWNrYm94OiB0cnVlLFxyXG4gICAgICAgIGF1dG9mb3JtOntcclxuICAgICAgICAgICAgb21pdDogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb2xlczoge1xyXG4gICAgICAgIHR5cGU6IEFycmF5LFxyXG4gICAgICAgIG9wdGlvbmFsOiB0cnVlLFxyXG4gICAgICAgIGF1dG9mb3JtOiB7XHJcbiAgICAgICAgICAgIG9taXQ6IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICxcclxuICAgIFwicm9sZXMuJFwiOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gT24gYXR0YWNoZSBjZSBzY2jDqW1hIMOgIGxhIGNvbGxlY3Rpb25cclxuTWV0ZW9yLnVzZXJzLmF0dGFjaFNjaGVtYShHbG9iYWxzLnNjaGVtYXMuVXNlcik7IiwiTWV0ZW9yLnB1Ymxpc2goXCJhbGxDb21tZXJjZXNcIiwgZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBDb21tZXJjZXMuZmluZCh7fSwge30pO1xyXG59KTtcclxuXHJcbk1ldGVvci5wdWJsaXNoKFwiYWxsTWVudXNcIiwgZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBNZW51cy5maW5kKHt9LCB7fSk7XHJcbn0pOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuXG5NZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG4gIC8vIGNvZGUgdG8gcnVuIG9uIHNlcnZlciBhdCBzdGFydHVwXG59KTtcbiJdfQ==
