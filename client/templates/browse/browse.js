Template.browse.helpers
({
	decks: function()
	{
		return decks_private.find({}, {sort: {time_stamp: -1}});
	},
	
	deck_author: function()
	{
		return Meteor.users.findOne(this.authorID).username;
	},
	
		deck_class: function()
	{

		return player_classes.findOne(this.player_classID).name;
	},
	
	class_color: function()
	{
		return player_classes.findOne(this.player_classID).color;
	}
});
