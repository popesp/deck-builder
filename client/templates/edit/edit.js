Template.edit.helpers
({
	decks: function()
	{
		return decks_incomplete.find({authorID: Meteor.userId()});
	},
	
	class_color: function()
	{
		return player_classes.findOne(this.player_classID).color;
	},
	
	class_name: function()
	{
		return player_classes.findOne(this.player_classID).name;
	},
	
	editing: function()
	{
		return active_deck.active.get();
	},
	
	active_class_name: function()
	{
		return player_classes.findOne(active_deck.player_classID).name;
	},
	
	active_name: function()
	{
		return active_deck.name.get();
	}
});

Template.edit.events
({
	"click .edit-deck": function()
	{
		active_deck.active.set(true);
		active_deck.player_classID = this.player_classID;
		active_deck.name.set(this.name);
		active_deck.description = this.description;
		
		active_deck.cards = new ReactiveArray();
		
		for (var i in this.cards)
		{
			var exists = false;
			
			var deck_list = active_deck.cards.array();
			for (var j in deck_list)
			{
				if (deck_list[j].cardID === this.cards[i])
				{
					deck_list[j].count++;
					exists = true;
					break;
				}
			}
			
			if (!exists)
			{
				var cost = cards_by_cost.findOne(this.cards[i]).cost;
				active_deck.cards.push({cardID: this.cards[i], count: 1, cost: cost});
			}
		}
		
		console.log(active_deck.cards.array());
	}
});