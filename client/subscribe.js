Meteor.subscribe('userData');
Meteor.subscribe('cards', function()
{
	var sorted_by_name = cards.find({}, {sort: {name: 1}, reactive: false}).fetch();
	var sorted_by_cost = cards.find({}, {sort: {cost: 1, name: 1}, reactive: false}).fetch();
	
	cards_by_name.remove({});
	cards_by_cost.remove({});
	
	for (var i in sorted_by_name)
	{
		cards_by_name.insert(sorted_by_name[i]);
		cards_by_cost.insert(sorted_by_cost[i]);
	}
});

Meteor.subscribe('types');
Meteor.subscribe('rarities');
Meteor.subscribe('races');
Meteor.subscribe('player_classes');
Meteor.subscribe('sets');
Meteor.subscribe('mechanics');

Meteor.subscribe('filters');
Meteor.subscribe('filter_types');

Meteor.subscribe('decks_private');
Meteor.subscribe('decks_public');