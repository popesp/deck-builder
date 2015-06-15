Accounts.ui.config
({
	passwordSignupFields: "USERNAME_ONLY"
});

accountsUIBootstrap3.logoutCallback = function(error) {
  if(error)
	  console.log("Error:" + error);
  
  Router.go('home');
}

Meteor.subscribe('cards');
Meteor.subscribe('filters');