Template.card_text.onRendered(function()
{
	this.$('.card-text').tooltip();
});

Template.card_text.onDestroyed(function()
{
	this.$('.card-text').tooltip('destroy');
});