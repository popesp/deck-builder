card_filter_class = new Mongo.Collection(null);
card_filter_set = new Mongo.Collection(null);
card_filter_rarity = new Mongo.Collection(null);

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
	sets: function()
	{
		return Sets.find({});
	},
	
	rarities: function()
	{
		return Rarities.find({});
	},
	
	classes: function()
	{
		return Classes.find({});	
	},
	
	cards: function()
	{
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
	"change .card-filters-class-check": function(event)
	{
		if (event.target.checked)
			card_filter_class.insert({name: this.name});
		else
			card_filter_class.remove({name: this.name});
		
		Template.instance().card_page_num.set(1);
	},
	
	"change .card-filters-set-check": function(event)
	{
		if (event.target.checked)
			card_filter_set.insert({name: this.name});
		else
			card_filter_set.remove({name: this.name});
		
		Template.instance().card_page_num.set(1);
	},
	
	"change .card-filters-rarity-check": function(event)
	{
		if (event.target.checked)
			card_filter_rarity.insert({name: this.name});
		else
			card_filter_rarity.remove({name: this.name});
		
		Template.instance().card_page_num.set(1);
	},
	
	"click .page-btn": function()
	{
		Template.instance().card_page_num.set(this);
	}
});

Template.card_filter_class.helpers
({
	checked: function()
	{
		return false;
	}
});

Template.card_filter_set.helpers
({
	checked: function()
	{
		return false;
	}
});

Template.card_filter_rarity.helpers
({
	checked: function()
	{
		return false;
	}
});