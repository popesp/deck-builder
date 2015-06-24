Template.cards.onCreated(function()
{
	this.card_count = new ReactiveVar(0);
	this.card_skip = new ReactiveVar(0);
	
	this.card_page_count = new ReactiveVar(0);
	this.card_page_num = new ReactiveVar(1);
	
	this.autorun(function()
	{
		Template.instance().card_page_count.set(Math.floor(Template.instance().card_count.get() / CARDPAGE_LIMIT_DB) + 1);
		Template.instance().card_skip.set((Template.instance().card_page_num.get() - 1) * CARDPAGE_LIMIT_DB);
	})
});

Template.cards.helpers
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
		var card_filters_array = card_filters.find({}).fetch();
		var query = {$and: [{name: {$exists: true}}]};
		var instance = Template.instance();
		
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
		
		instance.card_count.set(cards_by_name.find(query).count());
		
		return cards_by_name.find(query, {limit: CARDPAGE_LIMIT_DB, skip: instance.card_skip.get()});
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
		
		return Template.instance().card_skip.get() + CARDPAGE_LIMIT_DB;
	},
	
	page_btns: function()
	{
		var numbers = new Array();
		
		for (i = 0; i < Template.instance().card_page_count.get(); i++)
			numbers.push(i + 1);
		
		return numbers;
	},
	
	setName: function()
	{
		return sets.findOne(this.setID).name;
	},
	
	rarityName: function()
	{
		return rarities.findOne(this.rarityID).name;
	},
	
	card_image: function()
	{
		return this.name.replace(/ /g, '_').replace(/:/g, '_').toLowerCase() + '.png';
	}
});

Template.cards.events
({
	"click .card-filter-add": function()
	{
		if (filter_types.findOne(filters.findOne(this._id).typeID).name !== 'singular' || card_filters.findOne({filterID: this._id}) === undefined)
			card_filters.insert({label: this.label, filterID: this._id, options: []});
	},
	
	"click .page-btn": function()
	{
		Template.instance().card_page_num.set(this);
	},
	
	"change .card-filter-checkbox": function()
	{
		Template.instance().card_page_num.set(1);
	}
});

Template.card_filter.helpers
({
	type: function()
	{
		return filter_types.findOne(filters.findOne(this.filterID).typeID).name;
	},
	
	options: function()
	{
		return Mongo.Collection.get(filters.findOne(this.filterID).collection_name).find({});
	}
});

Template.card_filter.events
({
	"click .close": function()
	{
		card_filters.remove(this._id);
	},
	
	"change input": function(event)
	{
		var data = Template.instance().data;
		
		if (event.target.checked)
			card_filters.update(data._id, {$addToSet: {options: this._id}});
		else
			card_filters.update(data._id, {$pullAll: {options: [this._id]}})
	}
});