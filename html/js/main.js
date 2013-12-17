/**
 * Main router file
 */

var AppRouter = Backbone.Router.extend({
	routes: {
		""			: "home",
		"users"		: "userList",
		"user/add"	: "addUser"
	},
	initialize: function(){
		this.headerView = new HeaderView();
		$('.header').html(this.headerView.el);
	},
	
	home: function(id) {
		this.homeView = new HomeView();
		
		$('#content').html(this.homeView.el);
	},
	userList: function(id) {
		var userList = new UserCollection();
		
		userList.fetch({
			success: function(data) {
				$('#content').html(new UserListView({model:userList}).el);
			}
		});
	},
	addUser: function(id) {
		this.home(id);
	}
});

utils.loadTemplate(['HomeView', 'HeaderView', 'UserListItemView'], function() {
	app = new AppRouter();
	Backbone.history.start();
});