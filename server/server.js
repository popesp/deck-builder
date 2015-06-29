Meteor.startup(function ()
{
	if (Meteor.users.find({}).count() === 0)
	{
		var id = Accounts.createUser
		({
			username: 'admin',
			password: 'l3p3r_gn0m3'
		});
		
		console.log(Meteor.users.find({}).fetch());
		
		Roles.addUsersToRoles(id, ['administrator'])
	}
});