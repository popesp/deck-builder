Meteor.publish('cards', function()
{
	return cards.find({collectible: true, type: {$ne: "Hero"}});
});

Meteor.publish('filters', function()
{
	return filters.find({});
});