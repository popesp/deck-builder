Accounts.ui.config
({
	passwordSignupFields: "USERNAME_ONLY"
});

accountsUIBootstrap3.logoutCallback = function(error) {
  if(error)
	  console.log("Error:" + error);
  
  Router.go('home');
}

cards_sorted = new Mongo.Collection(null);
card_filters = new Mongo.Collection(null);