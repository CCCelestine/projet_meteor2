UI.registerHelper('getGlobal', function(varName) {
    return Globals[varName];
});

UI.registerHelper('setTitle', function(title){
    if(!title){
        title = Globals.appName;
    }
    else{
        title += " - " + Globals.appName;
    }

    document.title = title;
});

UI.registerHelper('isAdmin', function () {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        return true
    }
    else return false;
});

Template.commerces.helpers({
    'menus': function(){
        let controller = Iron.controller();
        let _id = controller.getParams()._id; //id du commerce
        let menus = Menus.find({commerces: _id });
        return menus;
        },
    }
);

// Template.body.helpers({
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