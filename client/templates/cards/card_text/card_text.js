Template.card_text.onRendered(function()
{
	this.$('.card-text').tooltip();
});

Template.card_text.helpers
({
	image: function()
	{
		return this.name.replace(/ /g, '_').replace(/:/g, '_').toLowerCase() + '.png';
	},
	
	color: function()
	{
		return rarities.findOne(this.rarityID).color;
	}
});