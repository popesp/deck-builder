/*	CARD HELPERS
	(these all assume the data context is a card entry)
*/
Template.registerHelper('card_image', function()
{
	return this.name.replace(/ /g, '_').replace(/:/g, '_').toLowerCase() + '.png';
});

Template.registerHelper('card_rarity_name', function()
{
	return rarities.findOne(this.rarityID).name;
});

Template.registerHelper('card_rarity_color', function()
{
	return rarities.findOne(this.rarityID).color;
});

Template.registerHelper('card_class_name', function()
{
	return player_classes.findOne(this.player_classID).name;
});

Template.registerHelper('card_class_color', function()
{
	return player_classes.findOne(this.player_classID).color;
});