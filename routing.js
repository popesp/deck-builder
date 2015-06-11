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

// User Profiles
Router.route('/user/:id',
	{
		name: 'users',
		action: function()
		{
			this.render("user-profile",
			{
				data: function()
				{
					return Meteor.users.findOne({_id: this.params.id});
				}
			});
		}
	}
);