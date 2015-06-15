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
		var card_filters_array = card_filters.find({}).fetch();
		var query = {$and: [{name: {$exists: true}}]}; // TODO: find a better solution
		
		for (i in card_filters_array)
		{
			var cf = card_filters_array[i];
			
			if (cf.type === 'text')
			{
				// text filter
				if (cf.options.length > 0)
				{
					var options_in = {};
					
					options_in[cf.query] = {$in: cf.options};
					
					console.log(cf.options);
					
					query.$and.push(options_in);
				}
			} else if (cf.type === 'numeric')
			{
				
			}
		}
		
		console.log(query);
		
		Template.instance().card_count.set(cards.find(query).count());
		
		return cards.find(query, {limit: CARDPAGE_LIMIT, skip: Template.instance().card_skip.get()});
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
		card_filters.insert({label: this.label, query: this.query, type: this.type, options: []});
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
	"click .close": function()
	{
		card_filters.remove({query: this.query});
	},
	
	"change input": function(event)
	{
		var data = Template.instance().data;
		
		if (event.target.checked)
			card_filters.update({query: data.query}, {$addToSet: {options: String(this)}});
		else
		{
			card_filters.update({query: data.query}, {$pullAll: {options: [String(this)]}})
			console.log(this);
		}
	}
});