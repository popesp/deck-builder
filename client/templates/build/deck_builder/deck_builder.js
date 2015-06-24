Template.deck_builder.onCreated(function()
{
	this.class_cards = new ReactiveVar(0);
	this.neutral_cards = new ReactiveVar(0);
	
	this.class_page_count = new ReactiveVar(0);
	this.neutral_page_count = new ReactiveVar(0);
	
	this.card_skip = new ReactiveVar(0);
	this.card_page_num = new ReactiveVar(1);
});

Template.deck_builder.helpers
({
	filters: function()
	{
		return filters.find({}, {fields: {label: 1}});
	},
	
	card_filters: function()
	{
		return card_filters.find({});
	},
	
	cards: function()
	{
		var instance = Template.instance();
		var class_query = {$and: [{player_classID: instance.data._id}]};
		var neutral_query = {$and: [{player_classID: player_classes.findOne({name: 'Neutral'})._id}]};
		
		/*
		for (i in card_filters_array)
		{
			var cf = card_filters_array[i];
			var filter = filters.findOne(cf.filterID);
			var ftype = filter_types.findOne(filter.typeID);
			
			if (ftype.name === 'singular')
			{
				if (cf.options.length > 0)
				{
					var options_in = {};
					
					options_in[filters.findOne(cf.filterID).card_field] = {$in: cf.options}
					query.$and.push(options_in);
				}
			} else if (ftype.name === 'multiple')
			{
				if (cf.options.length > 0)
				{
					var options_in = {};
					
					options_in[filters.findOne(cf.filterID).card_field] = {$in: cf.options}
					query.$and.push(options_in);
				}
			} else if (ftype.name === 'numeric')
			{
				
			}
		}
		*/
		
		if (instance.data !== null)
		{
			var class_cards = cards_by_cost.find(class_query).count();
			var neutral_cards = cards_by_cost.find(neutral_query).count();
			
			instance.class_cards.set(class_cards);
			instance.neutral_cards.set(neutral_cards);
			
			instance.class_page_count.set(Math.floor((class_cards - 1) / CARDPAGE_LIMIT_BUILDER) + 1);
			instance.neutral_page_count.set(Math.floor((neutral_cards - 1) / CARDPAGE_LIMIT_BUILDER) + 1);
		}
		
		if (instance.card_page_num.get() <= instance.class_page_count.get())
			return cards_by_cost.find(class_query, {limit: CARDPAGE_LIMIT_BUILDER, skip: instance.card_skip.get()});
		else
			return cards_by_cost.find(neutral_query, {limit: CARDPAGE_LIMIT_BUILDER, skip: instance.card_skip.get()});
	},
	
	card_image: function()
	{
		return this.name.replace(/ /g, '_').replace(/:/g, '_').toLowerCase() + '.png';
	},
	
	deck_entries: function()
	{
		return active_deck.cards.list();
	},
	
	entry_name: function()
	{
		return cards_by_cost.findOne(this.cardID).name;
	},
	
	deck_counter: function()
	{
		var deck_list = active_deck.cards.array();
		
		var count = 0;
		for (i in deck_list)
			count += deck_list[i].count;
		
		return count;
	},
	
	page_count: function()
	{
		var instance = Template.instance();
		
		if (instance.card_page_num.get() <= instance.class_page_count.get())
			return Template.instance().class_page_count.get();
		else
			return Template.instance().neutral_page_count.get();
	},
	
	page_number: function()
	{
		var instance = Template.instance();
		
		if (instance.card_page_num.get() <= instance.class_page_count.get())
			return instance.card_page_num.get();
		else
			return instance.card_page_num.get() - instance.class_page_count.get();
	},
	
	rarity_color: function()
	{
		var rarityID = cards_by_cost.findOne(this.cardID).rarityID;
		
		return rarities.findOne(rarityID).color;
	},
	
	deck_dust: function()
	{
		var deck_list = active_deck.cards.array();
		
		var cost = 0;
		for (var i in deck_list)
		{
			var rarityID = cards_by_cost.findOne(deck_list[i].cardID).rarityID;
			
			cost += rarities.findOne(rarityID).dust * deck_list[i].count;
		}
		
		return cost;
	},
	
	deck_name: function()
	{
		return active_deck.name.get();
	},
	
	card: function()
	{
		return cards_by_cost.findOne(this.cardID);

		
	}
});

var compare_deck = function(a, b)
{
	return a.cost - b.cost;
};

Template.deck_builder.events
({
	"click .scroll-left": function()
	{
		var instance = Template.instance();
		
		if (instance.card_page_num.get() > 1)
		{
			instance.card_page_num.set(instance.card_page_num.get() - 1);
			
			if (instance.card_page_num.get() <= instance.class_page_count.get())
				instance.card_skip.set((instance.card_page_num.get() - 1) * CARDPAGE_LIMIT_BUILDER);
			else
				instance.card_skip.set((instance.card_page_num.get() - 1 - instance.class_page_count.get()) * CARDPAGE_LIMIT_BUILDER);
		}
	},
	
	"click .scroll-right": function()
	{
		var instance = Template.instance();
		
		if (instance.card_page_num.get() < (instance.class_page_count.get() + instance.neutral_page_count.get()))
		{
			instance.card_page_num.set(instance.card_page_num.get() + 1);
			
			if (instance.card_page_num.get() <= instance.class_page_count.get())
				instance.card_skip.set((instance.card_page_num.get() - 1) * CARDPAGE_LIMIT_BUILDER);
			else
				instance.card_skip.set((instance.card_page_num.get() - 1 - instance.class_page_count.get()) * CARDPAGE_LIMIT_BUILDER);
		}
	},
	
	"click .deckbuilder-card": function()
	{
		var deck_list = active_deck.cards.list();
		
		var exists = false;
		for (i in deck_list)
		{
			if (this._id === deck_list[i].cardID)
			{
				var card = cards_by_cost.findOne(deck_list[i].cardID);
				var legID = rarities.findOne({name: 'Legendary'})._id;
				
				if (deck_list[i].count < 2 && (card.rarityID !== legID))
				{
					deck_list[i].count++;
				
					// trigger reactive callbacks
					deck_list.push(null);
					deck_list.pop();
				}
				
				exists = true;
				break;
			}
		}
		
		if (!exists)
		{
			deck_list.push({cardID: this._id, count: 1, cost: this.cost});
			
			deck_list.sort(compare_deck);
		}
	},
	
	"click .deck-entry": function()
	{
		var deck_list = active_deck.cards.list();
		
		if (this.count > 1)
		{
			this.count--;
			
			// trigger reactive callbacks
			deck_list.push(null);
			deck_list.pop();
		} else
		{
			for (i in deck_list)
			{
				if (this.cardID === deck_list[i].cardID)
					deck_list.splice(i, 1);
			}
		}
	},
	
	"click .deckbuilder-save": function()
	{
		var deck_list = active_deck.cards.array();
		var cards = new Array();
		
		for (var i in deck_list)
			for (var j = 0; j < deck_list[i].count; j++)
				cards.push(deck_list[i].cardID);
		
		var deck_obj = {name: active_deck.name.get(), player_classID: active_deck.player_classID, authorID: Meteor.userId(), time_stamp: new Date(), cards: cards};
		
		active_deck.active.set(false);
		
		Meteor.call('insertDeck', deck_obj,
		function(error, result)
		{
			if (error)
				console.log(error);
			
			Router.go('/browse/' + result);
		}
		);
	},
	
	"keyup input.deck-name": function(event, template)
	{
		active_deck.name.set(template.find('.deck-name').value);
	}
});