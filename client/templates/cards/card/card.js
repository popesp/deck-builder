Template.card.helpers
({
	ratings: function()
	{
		return [0, 1, 2, 3, 4, 5];
	},
	
	ratingFormat: function()
	{
		return this.rating.toFixed(2);
	},
	
	isMinion: function()
	{
		if (this.type == "Minion")
			return true;	
	},
	
	isWeapon: function()
	{
		if (this.type == "Weapon")
			return true;
	},
	
	hasRace: function()
	{
		if (this.race === undefined)
			return false;
		return true;
	},
	
	rarity_color: function()
	{
		return rarities.findOne(this.rarityID).color;
	},
	
	hasRated: function()
	{
		var user_ratings = Meteor.user().ratings;
		
		for (i in user_ratings)
			if (user_ratings[i].cardID === this._id)
				return true;
		
		return false;
	},
	
	user_rating: function()
	{
		var user_ratings = Meteor.user().ratings;
		
		for (i in user_ratings)
			if (user_ratings[i].cardID === this._id)
				return user_ratings[i].rating;
	},
	
	card_image: function()
	{
		return this.name.replace(/ /g, '_').replace(/:/g, '_').toLowerCase() + '.png';
	},
	
	class_color: function()
	{
		return player_classes.findOne(this.player_classID).color;
	},
	
	class_name: function()
	{
		return player_classes.findOne(this.player_classID).name;
	}
});

Template.card.events
({
	"click .card-rate-btn": function()
	{
		Meteor.call('rateCard', Template.instance().data._id, this + 0);
	}
});