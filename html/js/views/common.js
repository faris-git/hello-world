
/**
 * Header View
 */
window.HeaderView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		$(this.el).html(this.template());
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
					utils.showAlert('Success!', 'Logged in successfully', 'alert-success');
				},
				error:function() {
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
