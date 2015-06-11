Session.setDefault("filter_neutral", true);

Template.cards.onCreated(function()
{
	this.card_count = new ReactiveVar(0);
	this.card_skip = new ReactiveVar(0);
	this.card_limit = new ReactiveVar(CARDPAGE_LIMIT);
	this.card_class = new ReactiveVar('Warlock');
	// this.card_classes = new ReactiveDict();
});

Template.cards.helpers
({
	anotherCard: function () {
		return Cards.find({playerClass: Template.instance().card_class.get(), collectible: true}, {sort: {name: 1}});
	},
	card: function()
	{
		var class_array = Classes.find({}).fetch();
		var class_filters = new Array();
		var query = new Object();
		
		for (i in class_array)
		{
			var name = class_array[i].name.toLowerCase();
			
			if (Session.get("filter_" + name))
				class_filters.push(class_array[i].name);
		}
		
		if (Session.get("filter_neutral"))
			class_filters.push("Neutral");
		
		query.collectible = true;
		query.type = {$ne: "Hero"};
		
		// add class filters
		if (class_filters.length > 0)
		{
			query.$or = new Array();
			
			for (i in class_filters)
			{
				if (class_filters[i] === "Neutral")
					query.$or.push({playerClass: {$exists: false}});
				
				query.$or.push({playerClass: class_filters[i]});
			}
		}
		
		Template.instance().card_count.set(Cards.find(query).count());
		
		return Cards.find(query);
	},
	
	cardCount: function()
	{
		return Template.instance().card_count.get();
	},
	
	page: function()
	{
		var page_count = Math.floor(Template.instance().card_count.get() / 32) + 1;
		var numbers = new Array();
		
		console.log(Template.instance().card_count.get());
		
		for (i = 0; i < page_count; i++)
			numbers.push({num: i + 1});
		
		return numbers;
	},
	
	filter_hunter_check: function()
	{
		return Session.get("filter_hunter");
	},
	
	filter_mage_check: function()
	{
		return Session.get("filter_mage");
	},
	
	filter_druid_check: function()
	{
		return Session.get("filter_druid");
	},
	
	filter_priest_check: function()
	{
		return Session.get("filter_priest");
	},
	
	filter_warlock_check: function()
	{
		return Session.get("filter_warlock");
	},
	
	filter_paladin_check: function()
	{
		return Session.get("filter_paladin");
	},
	
	filter_rogue_check: function()
	{
		return Session.get("filter_rogue");
	},
	
	filter_shaman_check: function()
	{
		return Session.get("filter_shaman");
	},
	
	filter_warrior_check: function()
	{
		return Session.get("filter_warrior");
	},
	
	filter_neutral_check: function()
	{
		return Session.get("filter_neutral");
	}
});

Template.cards.events
({
	"change .filter-hunter": function (event)
	{
		Template.instance().card_class.set('Hunter');
		Session.set("filter_hunter", event.target.checked);
		console.log(Session.get("filter_hunter"));
	},
	
	"change .filter-mage": function (event)
	{
		Session.set("filter_mage", event.target.checked);
	},
	
	"change .filter-druid": function (event)
	{
		Session.set("filter_druid", event.target.checked);
	},
	
	"change .filter-priest": function (event)
	{
		Session.set("filter_priest", event.target.checked);
	},
	
	"change .filter-warlock": function (event)
	{
		Session.set("filter_warlock", event.target.checked);
	},
	
	"change .filter-paladin": function (event)
	{
		Session.set("filter_paladin", event.target.checked);
	},
	
	"change .filter-rogue": function (event)
	{
		Session.set("filter_rogue", event.target.checked);
	},
	
	"change .filter-shaman": function (event)
	{
		Session.set("filter_shaman", event.target.checked);
	},
	
	"change .filter-warrior": function (event)
	{
		Session.set("filter_warrior", event.target.checked);
	},
	
	"change .filter-neutral": function (event)
	{
		Session.set("filter_neutral", event.target.checked);
	}
});