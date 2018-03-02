Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', {
    name: 'accueil',
    template: "accueil",
    data: function(){
        var commerces = Commerces.find();

        return {
            commerces: commerces
        };
    },
    waitOn: function(){
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
});

//Page affichant un commerce et ses menus
Router.route('/commerces/:_id', function () {
    this.render('commerces', {
        data: function () {
            let id = this.params._id;
            return Commerces.findOne({_id: this.params._id});
        },
        waitOn: function(){
            return Meteor.subscribe("allCommerces");
        }
    });
});

Router.route('/commerces/:_id/add',
    function () {
    this.render('ajoutMenu', {
        data: function () {
            return Commerces.findOne({_id: this.params._id});
        },
        waitOn: function(){
            return Meteor.subscribe("allCommerces");
        }
    });
});
