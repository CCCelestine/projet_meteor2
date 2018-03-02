Meteor.publish("allCommerces", function(){
    return Commerces.find({}, {});
});

Meteor.publish("allMenus", function(){
    return Menus.find({}, {});
});