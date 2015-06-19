// Default routing configuration
Router.configure
({
	layoutTemplate: 'main'
});

// Home
Router.route('/',
	{
		name: 'home',
		action: function()
		{
			this.render("home");
		}
	}
);

// Build Deck
Router.route('/build',
	{
		name: 'build',
		action: function()
		{
			this.render("build");
		}
	}
);

// Browse Decks
Router.route('/decks',
	{
		name: 'decks',
		action: function()
		{
			this.render("decks");
		}
	}
);

// Card Database
Router.route('/cards',
	{
		name: 'cards',
		action: function()
		{
			this.render("cards");
		}
	}
);

Router.route('/login',
	{
		name: 'login',
		action: function()
		{
			this.render("login");
		}
	}
);

// Individual card
Router.route('/card/:id',
	{
		name: 'card',
		action: function()
		{
			this.render("card",
			{
				data: function()
				{
					return cards.findOne({_id: this.params.id});
				}
			});
		}
	}
);

// Deck builder
Router.route('/build/:name',
	{
		name: 'deck_builder',
		action: function()
		{
			this.render("deck_builder",
			{
				data: function()
				{
					return player_classes.findOne({name: this.params.name});
				}
			});
		}
	}
);


// User Profiles
Router.route('/user/:id',
	{
		name: 'users',
		action: function()
		{
			this.render("user_profile",
			{
				data: function()
				{
					return Meteor.users.findOne({_id: this.params.id});
				}
			});
		}
	}
);