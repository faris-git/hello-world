/**
 * Main router file
 * Refer: https://github.com/ccoenraets/nodecellar
 */

var AppRouter = Backbone.Router.extend({
	routes: {
		""				: "home",
		"users"			: "userList",
		"user/add"		: "addUser",
		"user/:id"		: "viewUser",
		"user/edit/:id"	: "updateUser",
		"login"			: "login",
		"logout"		: "logout"
	},
	initialize: function(){
		
		if(!window.userProfile) {
			var userProfile = new window.UserProfile();
			
			userProfile.fetch({success: function(profile) {
				profile.set({loggedIn:true});
				window.userProfile = profile;
			}, error: function(model, error) {				
				model.set({loggedIn: false});
				window.userProfile = model;
			}});
		}
		
		this.headerView = new HeaderView({model: window.userProfile});
		$('.header').html(this.headerView.el);
	},
	home: function(id) {
		this.homeView = new HomeView();
		
		$('#content').html(this.homeView.el);
	},
	login: function() {
		this.loginView = new LoginView({model:new Login()});
		
		$('#content').html(this.loginView.el);
	},
	logout: function() {
		var logout = new Logout();
		
		logout.fetch({success: function(){			
			app.navigate('/',{trigger:true,replace:true});
		}});
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

utils.loadTemplate(['HomeView', 'HeaderView', 'UserListItemView', 'UserView', 'UserEditView', 'LoginView'], function() {
	var userProfile = new window.UserProfile();
	
	userProfile.fetch({success: function(profile) {		
		profile.set({loggedIn:true});
		window.userProfile = profile;
		app = new AppRouter();
		Backbone.history.start();
	}, error: function(model, error) {
		model.set({loggedIn: false});
		window.userProfile = model;
		app = new AppRouter();
		Backbone.history.start();
	}});
});