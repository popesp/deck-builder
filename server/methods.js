Meteor.methods
({
	rateCard: function(cardID, rating)
	{
		console.log(cardID);
		console.log(rating);
		
		if (!Meteor.userId())
		{
			// user needs to be logged TODO: router.go
		} else
		{
			var card = Cards.findOne(cardID);
			
			var new_count = card.rate_count + 1;
			var new_rating = (card.rating * card.rate_count + rating) / new_count;
			
			Cards.update(cardID, {$set: {rating: new_rating, rate_count: new_count}});
		}
	}
});