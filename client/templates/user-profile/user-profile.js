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
	
	rarity_color: function()
	{
		return rarities.findOne(this.rarityID).color;
	},
	
	card_by_id: function()
	{
		return cards.findOne(this.cardID);
	}
});