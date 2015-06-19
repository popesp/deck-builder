Template.deck_builder.onCreated(function()
{
	this.card_count = new ReactiveVar(0);
	this.card_skip = new ReactiveVar(0);
	
	this.card_page_count = new ReactiveVar(0);
	this.card_page_num = new ReactiveVar(1);
	
	this.card_filters = new Mongo.Collection(null);
	this.card_filters.insert({label: 'Class', filterID: filters.findOne({card_field: 'player_classID'})._id, options: [this.data._id, player_classes.findOne({name: 'Neutral'})._id]});
	
	// decks_incomplete.insert({name: 'New Deck', player_classID: this.data._id, authorID: Meteor.userId(), cards: []});
	
	this.janky_deck_list = new ReactiveArray();
	
	this.autorun(function()
	{
		Template.instance().card_page_count.set(Math.floor(Template.instance().card_count.get() / CARDPAGE_LIMIT_BUILDER) + 1);
		Template.instance().card_skip.set((Template.instance().card_page_num.get() - 1) * CARDPAGE_LIMIT_BUILDER);
	})
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
		var card_filters_array = instance.card_filters.find({}).fetch();
		var query = {$and: [{name: {$exists: true}}]};
		
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
		
		instance.card_count.set(cards_sorted.find(query).count());
		
		return cards_sorted.find(query, {limit: CARDPAGE_LIMIT_BUILDER, skip: instance.card_skip.get()});
	},
	
	cardCount: function()
	{
		return Template.instance().card_count.get();
	},
	
	cardSkip: function()
	{
		return Template.instance().card_skip.get() + 1;
	},
	
	cardMax: function()
	{
		var page_num = Template.instance().card_page_num.get();
		var page_count = Template.instance().card_page_count.get();
		
		if (page_num == page_count)
			return  Template.instance().card_count.get();
		
		return Template.instance().card_skip.get() + CARDPAGE_LIMIT_BUILDER;
	},
	
	page_btns: function()
	{
		var numbers = new Array();
		
		for (i = 0; i < Template.instance().card_page_count.get(); i++)
			numbers.push(i + 1);
		
		return numbers;
	},
	
	card_image: function()
	{
		return this.name.replace(/ /g, '_').toLowerCase() + '.png';
	},
	
	deck_entries: function()
	{
		return Template.instance().janky_deck_list.list();
	},
	
	entry_name: function()
	{
		return cards_sorted.findOne(this.cardID).name;
	},
	
	deck_counter: function()
	{
		var instance = Template.instance();
		var jank = instance.janky_deck_list.array();
		
		var count = 0;
		for (i in jank)
			count += jank[i].count;
		
		return count;
	}
});

Template.deck_builder.events
({
	"click .page-btn": function()
	{
		Template.instance().card_page_num.set(this);
	},
	
	"click .deckbuilder-card": function()
	{
		var instance = Template.instance();
		
		var exists = false;
		for (i in instance.janky_deck_list)
		{
			if (this._id === instance.janky_deck_list[i].cardID)
			{
				if (instance.janky_deck_list[i].count < 2)
				{
					instance.janky_deck_list[i].count++;
				
					// trigger reactive callbacks
					instance.janky_deck_list.push(null);
					instance.janky_deck_list.pop();
				}
				
				exists = true;
				break;
			}
		}
		
		if (!exists)
			instance.janky_deck_list.push({cardID: this._id, count: 1});
	},
	
	"click .deck-entry": function()
	{
		var instance = Template.instance();
		
		if (this.count > 1)
		{
			this.count--;
			
			// trigger reactive callbacks
			instance.janky_deck_list.push(null);
			instance.janky_deck_list.pop();
		} else
		{
			for (i in instance.janky_deck_list)
			{
				if (this.cardID === instance.janky_deck_list[i].cardID)
				{
					instance.janky_deck_list.splice(i, 1);
				}
			}
		}
	}
});