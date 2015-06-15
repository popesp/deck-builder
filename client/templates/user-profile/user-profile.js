Template.user_profile.helpers
({
	ratings: function()
	{
		console.log(this);
		return this.ratings;
	},
	
	card_name: function()
	{
		return cards.findOne(this.cardID).name;
	}
});