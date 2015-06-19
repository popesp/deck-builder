Template.header.rendered = function()
{
	Meteor.typeahead.inject();
};

Template.header.helpers
({
	getCards: function()
	{
		return cards_sorted.find({}).fetch();
	},
	
	selected: function(event, card)
	{
		Router.go('/card/' + card._id);
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