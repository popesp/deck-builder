Template.build.helpers
({
	player_classes: function()
	{
		return player_classes.find({name: {$ne: 'Neutral'}});
	}
});