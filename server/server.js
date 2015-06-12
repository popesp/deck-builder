Meteor.startup(function ()
{
	Cards.remove({});
	Classes.remove({});
	Sets.remove({});
	Rarities.remove({});
	
	var all_cards = EJSON.parse(Assets.getText('cards.json'));
	
	var set_names = Object.getOwnPropertyNames(all_cards);
	
	// add all cards to collection
	for (i in set_names)
	{
		var set_name = set_names[i];
		var set = all_cards[set_name];
		
		// insert set name to collection
		Sets.insert({name: set_name}); 
		
		// add each card in each set
		for (j in set)
		{
			var card = set[j];
			
			card.set = set_name;
			card.rating = 0;
			card.rate_count = 0;
			
			Cards.insert(card);
		}
	}
	
	// TODO: eventually pull from database
	
	// add classes to collection
	Classes.insert({name: "Druid"});
	Classes.insert({name: "Hunter"});
	Classes.insert({name: "Mage"});
	Classes.insert({name: "Paladin"});
	Classes.insert({name: "Priest"});
	Classes.insert({name: "Rogue"});
	Classes.insert({name: "Shaman"});
	Classes.insert({name: "Warlock"});
	Classes.insert({name: "Warrior"});
	
	Rarities.insert({name: "Free"});
	Rarities.insert({name: "Common"});
	Rarities.insert({name: "Rare"});
	Rarities.insert({name: "Epic"});
	Rarities.insert({name: "Legendary"});
});