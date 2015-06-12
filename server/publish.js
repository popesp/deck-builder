Meteor.publish('cards', function()
{
	return Cards.find({collectible: true, type: {$ne: "Hero"}});
});

Meteor.publish('classes', function()
{
	return Classes.find({});
});

Meteor.publish('sets', function()
{
	return Sets.find({name: {$nin: ["Missions", "Reward", "System", "Debug", "Credits"]}});
});

Meteor.publish('rarities', function()
{
	return Rarities.find({});
});