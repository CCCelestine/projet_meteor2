var require = meteorInstall({"client":{"views":{"app":{"template.accueil.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/app/template.accueil.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //

Template.__checkName("accueil");
Template["accueil"] = new Template("Template.accueil", (function() {
  var view = this;
  return [ Blaze.View("lookup:setTitle", function() {
    return Spacebars.mustache(view.lookup("setTitle"), "Accueil");
  }), HTML.Raw("\n\n    <h2>Accueil</h2>\n\n    <header>\n        <h3>Liste de commerces</h3>\n    </header>\n\n    "), HTML.UL("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("commerces"));
  }, function() {
    return [ "\n            ", HTML.LI(HTML.A({
      href: function() {
        return [ "/commerces/", Spacebars.mustache(view.lookup("_id")) ];
      }
    }, " ", Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    }), " ")), "\n        " ];
  }), "\n    ") ];
}));

Template.__checkName("commerce");
Template["commerce"] = new Template("Template.commerce", (function() {
  var view = this;
  return HTML.LI(Blaze.View("lookup:text", function() {
    return Spacebars.mustache(view.lookup("text"));
  }));
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.ajoutCommerce.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/app/template.ajoutCommerce.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //

Template.__checkName("ajoutCommerce");
Template["ajoutCommerce"] = new Template("Template.ajoutCommerce", (function() {
  var view = this;
  return [ HTML.Raw('<h1 class="text-center">Ajouter un commerce</h1>\n    '), Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call("Commerces"),
      id: Spacebars.call("ajoutCommerce")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {
      return [ "\n        ", HTML.FIELDSET("\n            ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("name")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n            ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("horaire")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n            ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("telephone")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n            ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("ville")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n            ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("adresse"),
          rows: Spacebars.call(2)
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n        "), "\n        ", HTML.BUTTON({
        type: "submit",
        class: "btn btn-primary"
      }, "Valider"), "\n    " ];
    });
  }) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.ajoutMenu.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/app/template.ajoutMenu.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //

Template.__checkName("ajoutMenu");
Template["ajoutMenu"] = new Template("Template.ajoutMenu", (function() {
  var view = this;
  return [ HTML.H1({
    class: "text-center"
  }, "Ajouter un menu au commerce ", Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  })), "\n    ", Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call("Menus"),
      id: Spacebars.call("ajoutMenu")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {
      return [ "\n        ", HTML.FIELDSET("\n            ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("commerces"),
          value: Spacebars.call(view.lookup("_id")),
          type: Spacebars.call("hidden")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n            ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("name")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n            ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("description"),
          rows: Spacebars.call(5)
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n            ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("prix"),
          placeholder: Spacebars.call(" €")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n            ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("rest")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n            ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("photo")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n        "), "\n        ", HTML.BUTTON({
        type: "submit",
        class: "btn btn-primary"
      }, "Valider"), "\n    " ];
    });
  }) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.commerces.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/app/template.commerces.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //

Template.__checkName("commerces");
Template["commerces"] = new Template("Template.commerces", (function() {
  var view = this;
  return [ HTML.Raw("<br>\n    "), HTML.H2(Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  })), "\n    ", HTML.P("Horaires : ", Blaze.View("lookup:horaire", function() {
    return Spacebars.mustache(view.lookup("horaire"));
  })), "\n    ", HTML.P("Téléphone : ", Blaze.View("lookup:telephone", function() {
    return Spacebars.mustache(view.lookup("telephone"));
  })), "\n    ", HTML.P("Ville : ", Blaze.View("lookup:ville", function() {
    return Spacebars.mustache(view.lookup("ville"));
  })), "\n    ", HTML.P("Adresse : ", Blaze.View("lookup:adresse", function() {
    return Spacebars.mustache(view.lookup("adresse"));
  })), HTML.Raw("\n<br>\n    <h3>Menus proposés :</h3>\n    "), HTML.UL("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("menus"));
  }, function() {
    return [ "\n            ", HTML.LI(" ", Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    }), " ", HTML.BR(), " Description : ", Blaze.View("lookup:description", function() {
      return Spacebars.mustache(view.lookup("description"));
    }), "\n                ", HTML.BR(), " Prix : ", Blaze.View("lookup:prix", function() {
      return Spacebars.mustache(view.lookup("prix"));
    }), " €\n                ", HTML.BR(), " Nombre de produits restants : ", Blaze.View("lookup:rest", function() {
      return Spacebars.mustache(view.lookup("rest"));
    }), "\n                ", HTML.BR(), " ", HTML.IMG({
      src: function() {
        return Spacebars.mustache(view.lookup("photo"));
      },
      alt: "Pas de photo disponible"
    }), "\n                ", HTML.BR(), " ", HTML.INPUT({
      type: "button",
      value: "Commander"
    }), "\n            "), "\n            ", HTML.BR(), "\n        " ];
  }), "\n    "), HTML.Raw("\n    <br>\n    "), Blaze.If(function() {
    return Spacebars.call(view.lookup("isAdmin"));
  }, function() {
    return [ "\n        ", HTML.H3(HTML.A({
      href: function() {
        return [ "/commerces/", Spacebars.mustache(view.lookup("_id")), "/add" ];
      }
    }, "-> Ajouter un menu ")), "\n    " ];
  }) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.loggedInHome.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/app/template.loggedInHome.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //

Template.__checkName("loggedInHome");
Template["loggedInHome"] = new Template("Template.loggedInHome", (function() {
  var view = this;
  return [ HTML.H2("Bienvenue ", Blaze.View("lookup:currentUser.username", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "username"));
  }), " !"), "\n    ", Blaze.View("lookup:setTitle", function() {
    return Spacebars.mustache(view.lookup("setTitle"), "Bienvenue");
  }) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"base":{"template.layout.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/base/template.layout.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //

Template.__checkName("mainLayout");
Template["mainLayout"] = new Template("Template.mainLayout", (function() {
  var view = this;
  return [ HTML.HEAD("\n        ", HTML.TITLE("GFaim"), "\n        ", HTML.Raw('<meta charset="utf-8">'), "\n    "), "\n    ", HTML.BODY("\n    ", Blaze.View("lookup:setTitle", function() {
    return Spacebars.mustache(view.lookup("setTitle"));
  }), "\n\n\n\n    ", HTML.DIV({
    class: "container"
  }, "\n        ", HTML.DIV({
    class: "row"
  }, "\n            ", HTML.HEADER({
    class: "col-md-12 jumbotron"
  }, "\n                ", HTML.H1("\n                    ", Blaze.View("lookup:getGlobal", function() {
    return Spacebars.mustache(view.lookup("getGlobal"), "appName");
  }), " ", HTML.Raw("<br>"), "\n                    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("getGlobal"), "appSlogan");
  }, function() {
    return [ "\n                    ", HTML.SMALL({
      class: "slogan"
    }, Blaze.View("lookup:getGlobal", function() {
      return Spacebars.mustache(view.lookup("getGlobal"), "appSlogan");
    })), "\n                    " ];
  }), "\n\n                "), "\n            "), "\n        "), "\n        ", HTML.DIV({
    class: "row"
  }, "\n            ", HTML.NAV({
    class: "col-md-3"
  }, Spacebars.include(view.lookupTemplate("menu"))), "\n            ", HTML.SECTION({
    class: "col-md-9 well"
  }, Spacebars.include(view.lookupTemplate("yield"))), "\n        "), "\n        ", HTML.Raw('<div class="row">\n            <footer class="col-md-12">\n                <hr>\n                <div class="footer">\n                    <p>Réalisé par Célestine Chareyre</p>\n                </div>\n            </footer>\n        </div>'), "\n    "), "\n    ") ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.menu.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/base/template.menu.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //

Template.__checkName("menu");
Template["menu"] = new Template("Template.menu", (function() {
  var view = this;
  return [ HTML.Raw("<h3>Menu</h3>\n    "), HTML.UL({
    class: "nav nav-pills nav-stacked"
  }, "\n        ", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
        route: "accueil"
      }));
    }
  }, "Accueil")), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return " ";
  }, function() {
    return [ " ", HTML.LI(HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
          route: "user.register"
        }));
      }
    }, "S'inscrire")), " " ];
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isAdmin"));
  }, function() {
    return [ "\n            ", HTML.LI(" ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
          route: "ajoutCommerce"
        }));
      }
    }, " Ajouter un commerce ")), "\n        " ];
  }), "\n    "), HTML.Raw("\n\n\n    <h3>Mon compte</h3>\n    "), HTML.UL({
    class: "nav nav-pills nav-stacked"
  }, "\n\n        ", HTML.Raw("<!-- Affiche le nom de l'user et un bouton de deconnexion quand l'user est connecté, sinon affiche un bouton de connexion -->"), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n            ", HTML.LI(" ", Spacebars.include(view.lookupTemplate("dashboard"))), "\n        " ];
  }, function() {
    return [ "\n                ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
          route: "user.login"
        }));
      }
    }, "Connectez-vous !"), "\n        " ];
  }), "\n    ") ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"users":{"template.dashboard.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/users/template.dashboard.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //

Template.__checkName("dashboard");
Template["dashboard"] = new Template("Template.dashboard", (function() {
  var view = this;
  return HTML.UL({
    class: "nav nav-pills nav-stacked"
  }, "\n    ", HTML.LI(" ", Blaze.View("lookup:currentUser.username", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "username"));
  }), " "), HTML.Raw('\n    <li><a href="#" class="logout">Se déconnecter</a></li>\n    '));
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.login.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/users/template.login.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //

Template.__checkName("login");
Template["login"] = new Template("Template.login", (function() {
  var view = this;
  return [ HTML.Raw('<h1 class="text-center">Se connecter</h1>\n    '), HTML.FORM("\n        ", HTML.Raw('<div class="form-group">\n            <label for="username">Nom d\'utilisateur ou email</label>\n            <input id="username" class="form-control" type="text">\n        </div>'), "\n        ", HTML.Raw('<div class="form-group">\n            <label for="password">Mot de passe</label>\n            <input id="password" class="form-control" type="password">\n        </div>'), "\n        ", HTML.P(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
        route: "user.register"
      }));
    }
  }, "Pas encore membre ?")), "\n        ", HTML.Raw('<button class="btn btn-primary">Connexion</button>'), "\n    ") ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.register.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/users/template.register.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //

Template.__checkName("register");
Template["register"] = new Template("Template.register", (function() {
  var view = this;
  return [ HTML.Raw('<h1 class="text-center">Enregistrement</h1>\n    '), Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call("Meteor.users"),
      id: Spacebars.call("insertUser")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {
      return [ "\n    ", HTML.FIELDSET("\n        ", HTML.LEGEND("Informations obligatoires"), "\n        ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("username")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n        ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("password")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n        ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("confirmation")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n        ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("emails")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n    "), "\n    ", HTML.FIELDSET("\n        ", HTML.LEGEND("Informations facultatives"), "\n        ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("profile.firstName")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n        ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("profile.lastName")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n        ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("profile.birthDay")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n        ", Blaze._TemplateWith(function() {
        return {
          name: Spacebars.call("profile.gender")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("afQuickField"));
      }), "\n\n    "), "\n    ", HTML.BUTTON({
        type: "submit",
        class: "btn btn-primary"
      }, "Valider"), "\n    " ];
    });
  }) ];
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dashboard.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/users/dashboard.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Template.dashboard.events({
  'click .logout': function (event) {
    event.preventDefault();
    Meteor.logout();
    Router.go(Utils.pathFor('accueil'));
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"login.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/views/users/login.js                                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Template.login.events({
  "submit form": function (event, template) {
    event.preventDefault();
    var user = $('#username').val();
    var password = $('#password').val();
    Meteor.loginWithPassword(user, password, function (err) {
      if (err) {
        alert(err.reason);
      } else {
        Router.go(Utils.pathFor('loggedInHome'));
      }
    });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"config":{"FormHooks":{"Commerces.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/config/FormHooks/Commerces.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AutoForm.hooks({
  'ajoutCommerce': {
    onSubmit: function (doc) {
      // Gestion du formulaire d'ajout de commerce
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
      }, function (err) {
        if (err) {
          error = new Error("Une erreur s'est produite");
        }
      });

      if (error === null) {
        this.done(); // Appelle onSuccess
      } else {
        this.done(error); // Appelle onError
      }

      return false; // Dans tout les cas, arrete la soumission des donneés.
    },
    onSuccess: function () {
      Router.go(Utils.pathFor('accueil'));
    },
    onError: function (formType, err) {
      alert(err.reason);
    }
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Menus.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/config/FormHooks/Menus.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AutoForm.hooks({
  'ajoutMenu': {
    onSubmit: function (doc) {
      // Gestion du formulaire d'ajout de menu
      console.log(doc);
      var error = null;
      var commerces = doc.commerces;
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
      }, function (err) {
        if (err) {
          error = new Error("Une erreur s'est produite");
        }
      });

      if (error === null) {
        this.done(); // Appelle onSuccess
      } else {
        this.done(error); // Appelle onError
      }

      return false; // Dans tout les cas, arrete la soumission des donneés.
    },
    onSuccess: function () {
      Router.go(Utils.pathFor('accueil'));
    },
    onError: function (formType, err) {
      alert(err.reason);
    }
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Users.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/config/FormHooks/Users.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AutoForm.hooks({
  'insertUser': {
    onSubmit: function (doc) {
      // Gestion du formulaire d'inscription
      console.log(doc);
      var error = null;
      var password = doc.password;
      var email = doc.emails[0].address;
      Accounts.createUser({
        username: doc.username,
        email: email,
        password: password,
        profile: doc.profile ? doc.profile : {}
      }, function (err) {
        if (err) {
          error = new Error("Une erreur s'est produite");
        }
      });

      if (error === null) {
        this.done(); // Appelle onSuccess
      } else {
        this.done(error); // Appelle onError
      }

      return false; // Dans tout les cas, arrete la soumission des donneés.
    },
    onSuccess: function () {
      Router.go(Utils.pathFor('accueil'));
    },
    onError: function (formType, err) {
      alert(err.reason);
    }
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Helpers.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/config/Helpers.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
UI.registerHelper('getGlobal', function (varName) {
  return Globals[varName];
});
UI.registerHelper('setTitle', function (title) {
  if (!title) {
    title = Globals.appName;
  } else {
    title += " - " + Globals.appName;
  }

  document.title = title;
});
UI.registerHelper('isAdmin', function () {
  if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
    return true;
  } else return false;
});
Template.commerces.helpers({
  'menus': function () {
    var controller = Iron.controller();

    var _id = controller.getParams()._id; //id du commerce


    var menus = Menus.find({
      commerces: _id
    });
    return menus;
  }
}); // Template.body.helpers({
//     exampleMapOptions: function() {
//         // Make sure the maps API has loaded
//         if (GoogleMaps.loaded()) {
//             // Map initialization options
//             return {
//                 center: new google.maps.LatLng(-37.8136, 144.9631),
//                 zoom: 8
//             };
//         }
//     }
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"lib":{"Globals.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/Globals.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Globals = {
  appName: "GFaim",
  appSlogan: "L'application qui comble votre faim !",
  schemas: {}
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Utils.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/Utils.js                                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routeur.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/routeur.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      var id = this.params._id;
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"Commerces.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// collections/Commerces.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var SimpleSchema;
module.watch(require("simpl-schema"), {
  "default": function (v) {
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Menus.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// collections/Menus.js                                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var SimpleSchema;
module.watch(require("simpl-schema"), {
  "default": function (v) {
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Users.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// collections/Users.js                                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var SimpleSchema;
module.watch(require("simpl-schema"), {
  "default": function (v) {
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});
require("/client/views/app/template.accueil.js");
require("/client/views/app/template.ajoutCommerce.js");
require("/client/views/app/template.ajoutMenu.js");
require("/client/views/app/template.commerces.js");
require("/client/views/app/template.loggedInHome.js");
require("/client/views/base/template.layout.js");
require("/client/views/base/template.menu.js");
require("/client/views/users/template.dashboard.js");
require("/client/views/users/template.login.js");
require("/client/views/users/template.register.js");
require("/lib/Globals.js");
require("/lib/Utils.js");
require("/lib/routeur.js");
require("/client/config/FormHooks/Commerces.js");
require("/client/config/FormHooks/Menus.js");
require("/client/config/FormHooks/Users.js");
require("/client/views/users/dashboard.js");
require("/client/views/users/login.js");
require("/client/config/Helpers.js");
require("/collections/Commerces.js");
require("/collections/Menus.js");
require("/collections/Users.js");