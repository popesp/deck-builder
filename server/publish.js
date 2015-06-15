Meteor.publish('userData', function ()
{
	return Meteor.users.find({_id: this.userId}, {fields: {'ratings': 1}});
});

Meteor.publish('cards', function()
{
	return cards.find({collectible: true, type: {$ne: "Hero"}});
});

Meteor.publish('filters', function()
{
	return filters.find({});
});