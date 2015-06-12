Meteor.publish('cards', function()
{
	return Cards.find({});
});

Meteor.publish('classes', function()
{
	return Classes.find({});
});