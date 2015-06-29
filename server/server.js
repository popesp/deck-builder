/*
Meteor.startup(function ()
{
	// clear the collections
	
	cards.remove({});
	filters.remove({});
	filter_types.remove({});
	
	types.remove({});
	rarities.remove({});
	races.remove({});
	player_classes.remove({});
	sets.remove({});
	mechanics.remove({});
	
	types.insert({name: 'Minion'});
	types.insert({name: 'Spell'});
	types.insert({name: 'Weapon'});
	
	rarities.insert({name: 'Free', dust: 0, color: '#a0a0a0'});
	rarities.insert({name: 'Common', dust: 40, color: '#f0f0f0'});
	rarities.insert({name: 'Rare', dust: 100, color: '#198eff'});
	rarities.insert({name: 'Epic', dust: 400, color: '#ab48ee'});
	rarities.insert({name: 'Legendary', dust: 1600, color: '#f07000'});
	
	races.insert({name: 'Beast'});
	races.insert({name: 'Mech'});
	races.insert({name: 'Murloc'});
	races.insert({name: 'Pirate'});
	races.insert({name: 'Totem'});
	races.insert({name: 'Demon'});
	races.insert({name: 'Dragon'});

	player_classes.insert({name: 'Hunter', color: '#4D944D'});
	player_classes.insert({name: 'Warlock', color: '#8D4DB8'});
	player_classes.insert({name: 'Mage', color: '#85c2ff'});
	player_classes.insert({name: 'Rogue', color: '#999999'});
	player_classes.insert({name: 'Paladin', color: '#FFDB4D'});
	player_classes.insert({name: 'Druid', color: '#916C47'});
	player_classes.insert({name: 'Shaman', color: '#456AB4'});
	player_classes.insert({name: 'Warrior', color: '#A34747'});
	player_classes.insert({name: 'Priest', color: '#ffffff'});
	player_classes.insert({name: 'Neutral', color: '#baa38d'});
	
	var basicID = sets.insert({name: 'Basic'});
	var classicID = sets.insert({name: 'Classic'});
	var naxxID = sets.insert({name: 'Curse of Naxxramas'});
	var gvgID = sets.insert({name: 'Goblins vs Gnomes'});
	var brmID = sets.insert({name: 'Blackrock Mountain'});
	var promID = sets.insert({name: 'Promotion'});
	var rewardID = sets.insert({name: 'Reward'});
	
	mechanics.insert({name: 'Charge'});
	mechanics.insert({name: 'Taunt'});
	mechanics.insert({name: 'Deathrattle'});
	mechanics.insert({name: 'Divine Shield'});
	mechanics.insert({name: 'Overload'});
	mechanics.insert({name: 'Windfury'});
	mechanics.insert({name: 'Battlecry'});
	mechanics.insert({name: 'Secret'});
	mechanics.insert({name: 'Freeze'});
	mechanics.insert({name: 'Combo'});
	mechanics.insert({name: 'Silence'});
	mechanics.insert({name: 'Spell Damage'});
	mechanics.insert({name: 'Choose One'});
	mechanics.insert({name: 'Stealth'});
	mechanics.insert({name: 'Enrage'});
	mechanics.insert({name: 'Immune'});
	
	
	var singularID = filter_types.insert({name: 'singular'});
	var multipleID = filter_types.insert({name: 'multiple'});
	var numericID = filter_types.insert({name: 'numeric'});
	
	// Singular filters
	filters.insert({collection_name: 'types', typeID: singularID, card_field: 'typeID', label: 'Type'});
	filters.insert({collection_name: 'rarities', typeID: singularID, card_field: 'rarityID', label: 'Rarity'});
	filters.insert({collection_name: 'races', typeID: singularID, card_field: 'raceID', label: 'Race'});
	filters.insert({collection_name: 'player_classes', typeID: singularID, card_field: 'player_classID', label: 'Class'});
	filters.insert({collection_name: 'sets', typeID: singularID, card_field: 'setID', label: 'Set'});
	
	// Multiple filters
	filters.insert({collection_name: 'mechanics', typeID: multipleID, card_field: 'mechanics', label: 'Mechanics'});
	
	// Numeric filters
	filters.insert({typeID: numericID, card_field: 'cost', label: 'Mana Cost'});
	filters.insert({typeID: numericID, card_field: 'attack', label: 'Attack'});
	filters.insert({typeID: numericID, card_field: 'health', label: 'Health'});
	filters.insert({typeID: numericID, card_field: 'durability', label: 'Durability'});
	
	
	// get card definitions from json file
	var card_defs = EJSON.parse(Assets.getText('cards.json'));
	
	// add all cards to collection
	for (var set_name in card_defs)
	{
		var set_full = card_defs[set_name];
		
		for (var i in set_full)
		{
			var card = set_full[i];
			var card_entry = {};
			
			if (card.collectible !== true || card.type === 'Hero')
				continue;
			
			card_entry.name = card.name;
			card_entry.cost = card.cost;
			card_entry.typeID = types.findOne({name: card.type})._id;
			card_entry.rarityID = rarities.findOne({name: card.rarity})._id;
			
			var race = races.findOne({name: card.race});
			if (race !== undefined)
				card_entry.raceID = race._id;
			
			var player_class = player_classes.findOne({name: card.playerClass});
			if (player_class !== undefined)
				card_entry.player_classID = player_class._id;
			else
				card_entry.player_classID = player_classes.findOne({name: 'Neutral'})._id;
			
			card_entry.setID = sets.findOne({name: set_name})._id;
			card_entry.text = card.text;
			
			card_entry.mechanics = new Array();
			for (var j in card.mechanics)
			{
				var mechanic = mechanics.findOne({name: card.mechanics[j]});
				
				if (mechanic !== undefined)
					card_entry.mechanics.push(mechanic._id);
			}
			
			card_entry.flavor = card.flavor;
			card_entry.artist = card.artist;
			card_entry.attack = card.attack;
			card_entry.health = card.health;
			card_entry.durability = card.durability;
			
			
			// [naxxID, brmID, basicID, rewardID]
			// if (card_entry.setID === naxxID || card_entry.setID === brmID || card_entry.setID === basicID || card_entry.setID === rewardID)
			
		
			card_entry.rating = 0;
			card_entry.rate_count = 0;
			
			cards.insert(card_entry);
		}
	}
});
*/
