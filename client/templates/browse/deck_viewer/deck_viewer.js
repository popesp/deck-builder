Template.deck_viewer.helpers
({
	cards: function()
	{
		var cards = Template.instance().data.cards;
		var cards_display = new Array();
		
		for (var i in cards)
		{
			var exists = false;
			for (var j in cards_display)
			{
				if (cards_display[j].cardID === cards[i])
				{
					cards_display[j].count++;
					exists = true;
					break;
				}
			}
			
			if (!exists)
					cards_display.push({cardID: cards[i], count: 1});
		}
		
		return cards_display;
	},
	
	card_by_id: function()
	{
		return cards_by_name.findOne(this.cardID);
	},
	
	time_to_date: function()
	{
		return this.time_stamp.toDateString();
	},
	
	rarity_color: function()
	{
		return rarities.findOne(this.rarityID).color;
	}
});