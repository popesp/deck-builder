CARDPAGE_LIMIT = 32;

Accounts.ui.config
({
	passwordSignupFields: "USERNAME_ONLY"
});

accountsUIBootstrap3.logoutCallback = function(error) {
  if(error)
	  console.log("Error:" + error);
  
  Router.go('home');
}

Meteor.subscribe("cards");
Meteor.subscribe("classes", function()
{
	var class_array = Classes.find({}).fetch();
	class_events = {};
	
	for (i in class_array)
	{
		console.log('test');
		
		var name = class_array[i].name.toLowerCase();
		
		// set session variables for class filters
		Session.setDefault("filter_" + name, false);
		
		// define class filter event callbacks
		class_events["change .filter-" + name] = function(event)
		{
			//Session.set("filter_" + name, event);
			//console.log(Session.get("filter_" + name));
			console.log("FOOBAR");
		};
	}
	
	Template.cards.events(class_events);
});