Template.header.rendered = function()
{
	Meteor.typeahead.inject();
};

Template.header.helpers
({
	getCards: function()
	{
		return cards_by_name.find({}).fetch();
	},
	
	selected: function(event, card)
	{
		Router.go('/card/' + card._id);
	},
	
	display_edit: function()
	{
		if (Meteor.user() && decks_incomplete.find({authorID: Meteor.userId()}).count() > 0)
			return true;
		
		return false;
	},
	
	active_deck: function()
	{
		return active_deck.active.get();
	},
	
	current_deck: function()
	{
		return active_deck.name.get();
	}
});

Template.header.events
({
	'keypress .card-search': function(event, template)
	{
		if (event.which === 13)
		{
			console.log('enter was pressed');
		}
	}
});