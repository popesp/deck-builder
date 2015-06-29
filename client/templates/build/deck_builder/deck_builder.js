Template.deck_builder.onCreated(function()
{
	this.cardcount_class = new ReactiveVar(0);
	this.cardcount_neutral = new ReactiveVar(0);
	
	this.pagecount_class = new ReactiveVar(0);
	this.pagecount_neutral = new ReactiveVar(0);
	
	this.card_skip = new ReactiveVar(0);
	this.card_page_num = new ReactiveVar(1);
	
	this.autorun(function()
	{
		var instance = Template.instance();
		var page_num = instance.card_page_num.get();
		
		if (page_num > instance.pagecount_class.get())
			page_num -= instance.pagecount_class.get();
		
		instance.card_skip.set((page_num - 1) * CARDPAGE_LIMIT_BUILDER);
	});
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
		
		// NOTE: fixes weird bug where data is null on first helper call
		if (instance.data === null)
			return;
		
		var class_query = {$and: [{player_classID: instance.data._id}]};
		var neutral_query = {$and: [{player_classID: player_classes.findOne({name: 'Neutral'})._id}]};
		
		var cardcount_class = cards.find(class_query).count();
		var cardcount_neutral = cards.find(neutral_query).count();
		
		instance.cardcount_class.set(cardcount_class);
		instance.cardcount_neutral.set(cardcount_neutral);
		
		instance.pagecount_class.set(Math.floor((cardcount_class - 1) / CARDPAGE_LIMIT_BUILDER) + 1);
		instance.pagecount_neutral.set(Math.floor((cardcount_neutral - 1) / CARDPAGE_LIMIT_BUILDER) + 1);
		
		if (instance.card_page_num.get() <= instance.pagecount_class.get())
			return cards_by_cost.find(class_query, {limit: CARDPAGE_LIMIT_BUILDER, skip: instance.card_skip.get()});
		else
			return cards_by_cost.find(neutral_query, {limit: CARDPAGE_LIMIT_BUILDER, skip: instance.card_skip.get()});
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
		
		if (instance.card_page_num.get() <= instance.pagecount_class.get())
			return Template.instance().pagecount_class.get();
		else
			return Template.instance().pagecount_neutral.get();
	},
	
	page_number: function()
	{
		var instance = Template.instance();
		
		if (instance.card_page_num.get() <= instance.pagecount_class.get())
			return instance.card_page_num.get();
		else
			return instance.card_page_num.get() - instance.pagecount_class.get();
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
	},
	
	addable: function()
	{
		var deck_list = active_deck.cards.array();
		
		for (var i in deck_list)
		{
			if (deck_list[i].cardID === this._id)
			{
				var legID = rarities.findOne({name: 'Legendary'})._id;
				
				if (this.rarityID === legID)
					return false;
				
				if (deck_list[i].count > 1)
					return false;
				
				break;
			}
		}
		
		return true;
	},
	
	exists: function()
	{
		var deck_list = active_deck.cards.array();
		
		for (var i in deck_list)
		{
			if (deck_list[i].cardID === this._id)
				return true;
		}
		
		return false;
	},
	
	deck_count: function()
	{
		var deck_list = active_deck.cards.array();
		
		for (var i in deck_list)
		{
			if (deck_list[i].cardID === this._id)
				return deck_list[i].count;
		}
		
		return 0;
	},
	
	class_active: function()
	{
		var instance = Template.instance();
		
		if (instance.card_page_num.get() <= instance.pagecount_class.get())
			return true;
		
		return false;
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
			instance.card_page_num.set(instance.card_page_num.get() - 1);
	},
	
	"click .scroll-right": function()
	{
		var instance = Template.instance();
		
		if (instance.card_page_num.get() < (instance.pagecount_class.get() + instance.pagecount_neutral.get()))
			instance.card_page_num.set(instance.card_page_num.get() + 1);
	},
	
	"click .builder-card.builder-addable": function()
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
	},
	
	"click .builder-tab-neutral": function()
	{
		var instance = Template.instance();
		
		if (instance.card_page_num.get() <= instance.pagecount_class.get())
			instance.card_page_num.set(instance.pagecount_class.get() + 1);
	},
	
	"click .builder-tab-class": function()
	{
		var instance = Template.instance();
		
		if (instance.card_page_num.get() > instance.pagecount_class.get())
			instance.card_page_num.set(1);
	}
});


Template.deck_entry.events
({
	"click .deck-entry": function()
	{
		var deck_list = active_deck.cards.list();
		var data = Template.parentData();
		
		if (data.count > 1)
		{
			data.count--;
			
			// trigger reactive callbacks
			deck_list.push(null);
			deck_list.pop();
		} else
		{
			for (i in deck_list)
			{
				if (data.cardID === deck_list[i].cardID)
					deck_list.splice(i, 1);
			}
		}
	}
});