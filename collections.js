/* User --- */
schemas.user = new SimpleSchema
({
	username:
	{
		type: String,
		regEx: /^[a-sz0-9A-Z_]{3,15}$/
	},
	
	createdAt:
	{
		type:Date
	},
	
	roles:
	{
		type: [String],
		optional: true
	},
	
	active_deck:
	{
		type: String,
		label: 'Active Deck',
		
	}
});

Meteor.users.attachSchema(schemas.user);


/* --- Card Type --- */
schemas.type = new SimpleSchema
({
	name:
	{
		type: String,
		label: 'Name'
	}
});

types = new Mongo.Collection('types');
types.attachSchema(schemas.type);


/* -- Card Rarity --- */
schemas.rarity = new SimpleSchema
({
	name:
	{
		type: String,
		label: 'Name'
	},
	
	dust:
	{
		type: Number,
		label: 'Dust Cost',
		min: 0
	},
	
	color:
	{
		type: String,
		label: 'Color'
	}
});

rarities = new Mongo.Collection('rarities');
rarities.attachSchema(schemas.rarity);


/* --- Card Race --- */
schemas.race = new SimpleSchema
({
	name:
	{
		type: String,
		label: 'Name'
	}
});

races = new Mongo.Collection('races');
races.attachSchema(schemas.race);


/* --- Card Player Class --- */
schemas.player_class = new SimpleSchema
({
	name:
	{
		type: String,
		label: 'Name'
	},
	
	color:
	{
		type: String,
		label: 'Color'
	}
});
player_classes = new Mongo.Collection('player_classes');
player_classes.attachSchema(schemas.player_class);


/* --- Card Set --- */
schemas.set = new SimpleSchema
({
	name:
	{
		type: String,
		label: 'Name'
	}
});

sets = new Mongo.Collection('sets');
sets.attachSchema(schemas.set);


/* --- Card Mechanic --- */
schemas.mechanic = new SimpleSchema
({
	name:
	{
		type: String,
		label: 'Name'
	}
});
mechanics = new Mongo.Collection('mechanics');
mechanics.attachSchema(schemas.mechanic);


/* --- Card --- */
schemas.card = new SimpleSchema
({
	name:
	{
		type: String,
		label: 'Name',
		max: 64
	},
	
	cost:
	{
		type: Number,
		label: 'Mana Cost',
		min: 0
	},
	
	typeID:
	{
		type: String,
		label: 'Type',
		regEx: SimpleSchema.RegEx.Id
	},
	
	rarityID:
	{
		type: String,
		label: 'Rarity',
		regEx: SimpleSchema.RegEx.Id
	},
	
	raceID:
	{
		type: String,
		label: 'mechanics',
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	},
	
	player_classID:
	{
		type: String,
		label: 'Class',
		regEx: SimpleSchema.RegEx.Id
	},
	
	setID:
	{
		type: String,
		label: 'Set',
		regEx: SimpleSchema.RegEx.Id
	},
	
	text:
	{
		type: String,
		label: 'Text',
		max: 256,
		optional: true
	},
	
	mechanics:
	{
		type: [String],
		label: 'Mechanics',
	},
	
	flavor:
	{
		type: String,
		label: 'Flavor Text',
		max: 256,
		optional: true
	},

	artist:
	{
		type: String,
		label: 'Artist',
		max: 256
	},
	
	attack:
	{
		type: Number,
		label: 'Attack',
		min: 0,
		optional: true
	},
	
	health:
	{
		type: Number,
		label: 'Health',
		min: 1,
		optional: true
	},
	
	durability:
	{
		type: Number,
		label: 'Durability',
		min: 1,
		optional: true
	},
	
	rating:
	{
		type: Number,
		label: "Rating",
		min: 0,
		max: 5,
		decimal: true
	},
	
	rate_count:
	{
		type: Number,
		label: "Rate Count",
		min: 0
	}
});

cards = new Mongo.Collection('cards');
cards.attachSchema(schemas.card);



/* --- Filter Type --- */
schemas.filter_type = new SimpleSchema
({
	name:
	{
		type: String,
		label: 'Name',
		max: 64
	}
});

filter_types = new Mongo.Collection('filter_types');
filter_types.attachSchema(schemas.filter_type);


/* --- Card Filter --- */
schemas.filter = new SimpleSchema
({
	collection_name:
	{
		type: String,
		label: 'Collection Name',
		optional: true
	},
	
	typeID:
	{
		type: String,
		label: 'Type',
		regEx: SimpleSchema.RegEx.Id
	},
	
	card_field:
	{
		type: String,
		label: 'Card Field'
	},
	
	label:
	{
		type: String,
		label: 'Label'
	}
});

filters = new Mongo.Collection('filters');
filters.attachSchema(schemas.filter);



/* --- Private Deck --- */
schemas.deck_private = new SimpleSchema
({
	name:
	{
		type: String,
		label: 'Name',
		max: 64
	},
	
	player_classID:
	{
		type: String,
		label: 'Class',
		regEx: SimpleSchema.RegEx.Id
	},
	
	authorID:
	{
		type: String,
		label: 'Author',
		regEx: SimpleSchema.RegEx.Id
	},
	
	cards:
	{
		type: [String],
		label: 'Card List',
		maxCount: 30,
		regEx: SimpleSchema.RegEx.Id
	},
	
	time_created:
	{
		type: Date,
		label: "Time Created"
	}
});

decks_private = new Mongo.Collection('decks_private');
decks_private.attachSchema(schemas.deck_private);


/* --- Public Deck --- */
schemas.deck_public = new SimpleSchema
({
	name:
	{
		type: String,
		label: 'Name',
		max: 64
	},
	
	player_classID:
	{
		type: String,
		label: 'Class',
		regEx: SimpleSchema.RegEx.Id
	},
	
	authorID:
	{
		type: String,
		label: 'Author',
		regEx: SimpleSchema.RegEx.Id
	},
	
	cards:
	{
		type: [String],
		label: 'Card List',
		minCount: 30,
		maxCount: 30,
		regEx: SimpleSchema.RegEx.Id
	},
	
	rating:
	{
		type: Number,
		label: 'Rating',
		min: 0,
		max: 5,
		decimal: true
	},
	
	rate_count:
	{
		type: Number,
		label: "Rate Count",
		min: 0
	},
	
	time_stamp:
	{
		type: Date,
		label: "Time Stamp"
	}
});

decks_public = new Mongo.Collection('decks_public');
decks_public.attachSchema(schemas.deck_public);