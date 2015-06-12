Meteor.startup(function ()
{
	Cards.remove({});
	Classes.remove({});
	
	var categories = EJSON.parse(Assets.getText('cards.json'));
	
	var names = Object.getOwnPropertyNames(categories);
	
	// add all cards to collection
	for (name in names)
	{
		var category = categories[names[name]];
		for (card in category)
		{
			category[card].set = names[name];
			Cards.insert(category[card]);
		}
	}
	
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
});