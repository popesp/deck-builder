card_filters = new Mongo.Collection(null);

Template.cards.onCreated(function()
{
	this.card_count = new ReactiveVar(0);
	this.card_skip = new ReactiveVar(0);
	
	this.card_page_count = new ReactiveVar(0);
	this.card_page_num = new ReactiveVar(1);
	
	this.autorun(function()
	{
		Template.instance().card_page_count.set(Math.floor(Template.instance().card_count.get() / 32) + 1);
		Template.instance().card_skip.set((Template.instance().card_page_num.get() - 1) * CARDPAGE_LIMIT);
	})
});

Template.cards.helpers
({
	filters: function()
	{
		return filters.find({});
	},
	
	card_filters: function()
	{
		return card_filters.find({});
	},
	
	cards: function()
	{
		return cards.find({});
		/*
		var filter_class = card_filter_class.find({}).fetch();
		var filter_set = card_filter_set.find({}).fetch();
		var filter_rarity = card_filter_rarity.find({}).fetch();
		
		// TODO: temporary solution
		var query = {$and: [{name: {$exists: true}}]};
		
		if (filter_class.length > 0)
		{
			
			var or = new Array();
			for (var i = 0; i < filter_class.length; i++)
			{
				if (filter_class[i].name === "Neutral")
					or.push({playerClass: {$exists: false}});
				else
					or.push({playerClass: filter_class[i].name});
			}
			
			query.$and.push({$or: or});
		}
		
		if (filter_set.length > 0)
		{
			var or = new Array();
			
			for (var i = 0; i < filter_set.length; i++)
			{
				or.push({set: filter_set[i].name});
			
			}
			query.$and.push({$or: or})
		}
		
		if (filter_rarity.length > 0)
		{
			var or = new Array();
			
			for (var i = 0; i < filter_rarity.length; i++)
			{
				or.push({rarity: filter_rarity[i].name});
			
			}
			query.$and.push({$or: or})
		}
		
		Template.instance().card_count.set(Cards.find(query).count());
		
		return Cards.find(query, {limit: CARDPAGE_LIMIT, skip: Template.instance().card_skip.get()});
		*/
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
		
		return Template.instance().card_skip.get() + CARDPAGE_LIMIT;
	},
	
	page_btns: function()
	{
		var numbers = new Array();
		
		for (i = 0; i < Template.instance().card_page_count.get(); i++)
			numbers.push(i + 1);
		
		return numbers;
	}
});

Template.cards.events
({
	"click .card-filter-add": function()
	{
		card_filters.insert({label: this.label, query: this.query, type: this.type, options: {}});
	},
	
	"click .page-btn": function()
	{
		Template.instance().card_page_num.set(this);
	}
});

Template.card_filter.helpers
({
	type_text: function()
	{
		return filters.findOne({query: this.query}).type === 'text';
	},
	
	type_numeric: function()
	{
		return filters.findOne({query: this.query}).type === 'numeric';
	},
	
	options: function()
	{
		return filters.findOne({query: this.query}).options;
	}
});

Template.card_filter.events
({
	"click close": function()
	{
		// TODO
		card_filters.remove();
	}
});