Template.build.helpers
({
	player_classes: function()
	{
		return player_classes.find({name: {$ne: 'Neutral'}});
	}
});

Template.build.events
({
	"click .class-select": function()
	{
		active_deck.cards = new ReactiveArray();
		active_deck.player_classID = this._id;
		
		active_deck.name.set("New " + this.name + " Deck");
		active_deck.active.set(true);
	}
});