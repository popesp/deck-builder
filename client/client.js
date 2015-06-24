Accounts.ui.config
({
	passwordSignupFields: "USERNAME_ONLY"
});

accountsUIBootstrap3.logoutCallback = function(error) {
  if(error)
	  console.log("Error:" + error);
  
  Router.go('home');
}

cards_by_name = new Mongo.Collection(null);
cards_by_cost = new Mongo.Collection(null);

card_filters = new Mongo.Collection(null);

active_deck = {	active: new ReactiveVar(false),
				dupID: null,
				player_classID: null,
				name: new ReactiveVar(""),
				description: null,
				cards: null
				};