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
	
	addDeck: function(deck)
	{
		if (!this.userId)
			throw new Meteor.Error('logged-out', 'You must be logged in to add a deck.');
		
		// deck validation goes here
		
		return decks_private.insert(deck);
	},
	
	publishDeck: function(privateID)
	{
		if (!this.userId)
			throw new Meteor.Error('logged-out', 'You must be logged in to publish a deck.');
		
		var deck = decks_private.findOne(privateID);
		
		if (deck === undefined)
			throw new Meteor.Error('invalid-id', 'Could not find a deck with that identifier.');
		
		if (deck.authorID !== this.userId)
			throw new Meteor.Error('invalid-id', 'Could not find a deck with that identifier.');
		
		if (deck.cards.length !== 30)
			throw new Meteor.Error('invalid-data', 'Deck does not have 30 cards.');
		
		// add deck to complete collection
		decks_public.insert(deck);
		
		// remove deck from incomplete collection
		decks_private.remove(deck._id);
	}
});