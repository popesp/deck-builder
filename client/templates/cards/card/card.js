Template.card.onCreated(function()
{
	console.log(this.data);
});

Template.card.helpers
({
	ratings: function()
	{
		return [1, 2, 3, 4, 5];
	},
	
	ratingFormat: function()
	{
		return Template.instance().data.rating.toFixed(2);
	}
});

Template.card.events
({
	"click .card-rate-btn": function()
	{
		Meteor.call('rateCard', Template.instance().data._id, this + 0);
	}
});