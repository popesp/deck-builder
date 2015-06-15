Meteor.startup(function ()
{
	// get card definitions from json file
	var card_defs = EJSON.parse(Assets.getText('cards.json'));
	
	// clear the collections
	cards.remove({});
	filters.remove({});
	
	// add all cards to collection
	for (var set_name in card_defs)
	{
		var set = card_defs[set_name];
		
		for (var i in set)
		{
			var card = set[i];
			
			card.set = set_name;
			card.rating = 0;
			card.rate_count = 0;
			
			cards.insert(card);
		}
	}
	
	function uniqueField(field)
	{
		var projection = {sort: {}, fields: {}};
		
		projection.fields[field] = 1;
		
		// get all unique values for the given field
		return _.compact(_.uniq(_.flatten(cards.find({}, projection).fetch().map(function(a){return a[field];})), false));
	}
	
	// add class filter with specific omissions
	var classes = _.without(uniqueField('playerClass'), 'Dream');
	filters.insert({label: 'Class', query: 'playerClass', type: 'text', options: classes});
	
	// add set filter with specific omissions
	var sets = _.without(uniqueField('set'), 'Missions', 'System', 'Credits', 'Debug');
	filters.insert({label: 'Set', query: 'set', type: 'text', options: sets});
	
	filters.insert({label: 'Rarity', query: 'rarity', type: 'text', options: uniqueField('rarity')});
	filters.insert({label: 'Faction', query: 'faction', type: 'text', options: uniqueField('faction')});
	filters.insert({label: 'Race', query: 'race', type: 'text', options: uniqueField('race')});
	filters.insert({label: 'Mechanics', query: 'mechanics', type: 'text', options: uniqueField('mechanics')});
	filters.insert({label: 'Mana Cost', query: 'cost', type: 'numeric'});
	filters.insert({label: 'Attack', query: 'attack', type: 'numeric'});
	filters.insert({label: 'Health', query: 'health', type: 'numeric'});
	filters.insert({label: 'Durability', query: 'durability', type: 'numeric'});
});