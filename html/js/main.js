/**
 * Main router file
 */

var AppRouter = Backbone.Router.extend({
	routes: {
		""				: "home",
		"users"			: "userList",
		"user/add"		: "addUser",
		"user/:id"		: "viewUser",
		"user/edit/:id"	: "updateUser"
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
		var user = new User();
		
		this.userEditView = new UserEditView({model:user});
		
		$('#content').html('').html(this.userEditView.el);
	},
	updateUser: function(id) {
		var user = new User({userId: id});
		
		user.fetch({
			success: function(data) {				
				$('#content').html('').html(new UserEditView({model:data}).el);
			},error:function(error){
				alert("There is error");
			}
		});
	},
	viewUser: function(id){
		var user = new User({userId:id});
		
		user.fetch({success: function(){			
			$('#content').html(new UserView({model:user}).el);
		}});
	}
});

utils.loadTemplate(['HomeView', 'HeaderView', 'UserListItemView', 'UserView', 'UserEditView'], function() {
	app = new AppRouter();
	Backbone.history.start();
});