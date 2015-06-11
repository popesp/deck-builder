Template._loginButtonsLoggedInDropdown.events({
    'click #btn-view-profile': function(event)
	{
        Router.go('/user/' + Meteor.userId());
    }
});