Template.new_deck.helpers
({
	player_classes: function()
	{
		return player_classes.find({name: {$ne: 'Neutral'}});
	}
});

Template.new_deck.events
({
	"click .class-select": function()
	{
		if (Meteor.userId())
		{
			Meteor.call('addDeck', {name: 'New '+this.name+' Deck', player_classID: this._id, authorID: Meteor.userId(), cards: [], time_created: new Date()});
		} else
		{
			
		}
	}
});