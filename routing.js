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

// Edit deck
Router.route('/edit',
	{
		name: 'edit',
		action: function()
		{
			this.render('edit');
		}
	}
);

// Browse Decks
Router.route('/browse',
	{
		name: 'browse',
		action: function()
		{
			this.render("browse");
		}
	}
);

Router.route('/browse/:id',
	{
		name: 'view_deck',
		action: function()
		{
			this.render('deck_viewer',
			{
				data: function()
				{
					return decks_incomplete.findOne(this.params.id);
				}
			});
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
					return cards.findOne(this.params.id);
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