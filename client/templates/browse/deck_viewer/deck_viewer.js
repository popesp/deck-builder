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
	},
	
	cardTypeChart: function()
	{
		var card_count = this.cards.length;
		var type_ids = [];
		var type_counts = {};
		
		// get the card types from collection
		var types_array = types.find({}).fetch();
		for (var i in types_array)
			type_ids.push(types_array[i]._id);
		
		// initialize type counts to 0
		for (var i in type_ids)
			type_counts[type_ids[i]] = 0;
		
		// count all the card types
		for (var i in this.cards)
			type_counts[cards.findOne(this.cards[i]).typeID]++;
		
		// convert to percentages and add to array
		var percentages = new Array();
		for (var i in type_counts)
		{
			var per = type_counts[i]*100/card_count;
			
			if (per > 0)
				percentages.push([types.findOne(i).name, per]);
		}
		
		return {
			chart:
			{
				backgroundColor: '#1a1a1a',
				className: 'types-chart',
			},
			
			colors: ['#CC0000', '#f0f0f0', '#666699'],
			
			title:
			{
				text: "Card Types",
				style: {color: '#f0f0f0'}
			},
			
			tooltip:
			{
				pointFormat: '<b>{point.percentage:.1f}%</b>'
			},
			
			plotOptions:
			{
				pie:
				{
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels:
					{
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style:
						{
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						},
						connectorColor: 'silver'
					}
				}
			},
			
			credits:
			{
				enabled: false
			},
			
			series:
			[{
				type: 'pie',
				data: percentages
			}]
		};
	},
	
	cardManaCost: function()
	{
		var costs = new Array();
		
		for (var i = 7; i >= 0; i--)
			costs[i] = Array();
		
		for (var i in this.cards)
			if ( cards.findOne(this.cards[i]).cost > 7)
				costs[7]++;
			else				
				costs[cards.findOne(this.cards[i]).cost]++;
		
		return {
			chart:
			{
				backgroundColor: '#1a1a1a',
				borderRadius: 8,
				width: 300,
				height: 200,
				type: 'column'
			},
			
			colors: ['#3333FF'],
			
			credits:
			{
				enabled: false
			},
			
			legend: 
			{
				enabled: false
			},
			
			
			plotOptions:
			{
				column:
				{
					borderWidth: 0,
					dataLabels:
					{
						enabled: true,
						format: '<b>{point.y}</b>',
						y: -2
					}
				}
			},
			title:
			{
				text: "Mana Curve",
				style: {color: '#f0f0f0'}
			},
			
			tooltip:
			{
				pointFormat: '<b>{point.y}</b> cards with mana cost <b>{point.x}</b>.'
			},
			
			xAxis:
			{
				categories: ['0', '1', '2', '3', '4', '5', '6', '7+']
			},
		 
			 yAxis:
			{
				min: 0,
				allowDecimals: false
			},
			
			series:
			[{
				type: 'column',
				data: costs
			}]
		};
	}
});