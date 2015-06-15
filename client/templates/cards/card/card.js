Template.card.onCreated(function()
{
	console.log(this.data);
});

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
	}
});

Template.card.events
({
	"click .card-rate-btn": function()
	{
		Meteor.call('rateCard', Template.instance().data._id, this + 0);
	}
});