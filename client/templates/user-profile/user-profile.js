Template.user_profile.helpers
({
	ratings: function()
	{
		return this.ratings;
	},
	
	card_name: function()
	{
		return cards.findOne(this.cardID).name;
	},
	
	decks: function()
	{
		return decks_incomplete.find({authorID: this._id});
	},
	
	class_color: function()
	{
		return player_classes.findOne(this.player_classID).color;
	},
	
	card: function()
	{
		return cards.findOne(this.cardID);
	}
});