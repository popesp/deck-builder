Meteor.publish('userData', function ()
{
	return Meteor.users.find({_id: this.userId}, {fields: {'ratings': 1}});
});

Meteor.publish('cards', function()
{
	return cards.find({});
});


Meteor.publish('types', function()
{
	return types.find({});
});

Meteor.publish('rarities', function()
{
	return rarities.find({});
});

Meteor.publish('races', function()
{
	return races.find({});
});

Meteor.publish('player_classes', function()
{
	return player_classes.find({});
});

Meteor.publish('sets', function()
{
	return sets.find({});
});

Meteor.publish('mechanics', function()
{
	return mechanics.find({});
});


Meteor.publish('filters', function()
{
	return filters.find({});
});

Meteor.publish('filter_types', function()
{
	return filter_types.find({});
});


Meteor.publish('decks_incomplete', function()
{
	return decks_incomplete.find({});
});

Meteor.publish('decks_complete', function()
{
	return decks_complete.find({});
});