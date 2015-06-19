Meteor.subscribe('userData');
Meteor.subscribe('cards', function()
{
	var sorted_array = cards.find({}, {sort: {name: 1}, reactive: false}).fetch();
	
	cards_sorted.remove({});
	for (var i in sorted_array)
		cards_sorted.insert(sorted_array[i]);
});

Meteor.subscribe('types');
Meteor.subscribe('rarities');
Meteor.subscribe('races');
Meteor.subscribe('player_classes');
Meteor.subscribe('sets');
Meteor.subscribe('mechanics');

Meteor.subscribe('filters');
Meteor.subscribe('filter_types');