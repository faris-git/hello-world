
/**
 * Header View
 */
window.HeaderView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		var model = this.model.toJSON();
		$(this.el).html(this.template(model));
		return this;
	}
});

/**
 * Home view
 */
window.HomeView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		$(this.el).html(this.template());
		return this;
	}
});

/**
 * Login View
 */
window.LoginView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		$(this.el).html(this.template());
		return this;
	},
	events: {
		'change'		: 'change',
		'click .login'	: function(event) {
			var self = this;
			console.log(self);
			self.model.save(null, {
				success: function(model) {
					console.log("Success");
					app.navigate("/",{trigger:true,replace:true});
					utils.showAlert('Success!', 'Logged in successfully', 'alert-success');
				},
				error:function(error) {
					console.log("Errror"+error);
					utils.showAlert('Error', 'Failure Attempt', 'alert-danger');
				}
			});
		}
	},
	change: function(event) {
		utils.hideAlert();
		
		var target = event.target;
		var change = {};
		
		change[target.name] = target.value;
		this.model.set(change);
		
		//Add validation rule here
	}
});
