Meteor.methods
({
	rateCard: function(cardID, rating)
	{
		if (!Meteor.userId())
		{
			// user needs to be logged TODO: router.go
		} else
		{
			var user_ratings = Meteor.user().ratings;
			var card = cards.findOne(cardID);
			var rating_temp = rating;
			var new_count = card.rate_count;
			
			// check if user has already voted on this card
			var exists = false;
			for (i in user_ratings)
			{
				if (user_ratings[i].cardID === cardID)
				{
					rating_temp -= user_ratings[i].rating;
					
					user_ratings[i].rating = rating;
					
					Meteor.users.update(Meteor.userId(), {$set: {ratings: user_ratings}});
					
					exists = true;
					break;
				}
			}
			
			if (!exists)
			{
				Meteor.users.update(Meteor.userId(), {$addToSet: {ratings: {cardID: cardID, rating: rating}}});
				
				new_count++;
			}
			
			var new_rating = ((card.rating * card.rate_count) + rating_temp) / new_count;
			
			cards.update(cardID, {$set: {rating: new_rating, rate_count: new_count}});
		}
	},
	
	insertDeck: function(deck)
	{
		if (!Meteor.userId())
		{
			// user needs to be logged in
		} else
		{
			// deck validation goes here
			
			
			return decks_incomplete.insert(deck);
		}
	}
});