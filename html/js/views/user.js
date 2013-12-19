/**
 * User view
 * actions: add, update, view, delete
 */
window.UserView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	events:{
		'click .delete'		: 'remove'
	},
	render:function() {
		var model = this.model.toJSON();
		$(this.el).html(this.template(model));
	},
	remove: function(e) {
		var self = this;
		
		self.model.destroy({
			success: function(){				
				alert("Deleted the user successfully..");
				app.navigate('users',{trigger:true, replace:true});
			}
		});
		return false;
	}
});

window.UserEditView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		var model = this.model.toJSON();
		$(this.el).html(this.template(model));
		
		return this;
	},
	events:{
		'change'		: 'change',
		'click .save'	: 'save',
		'click .delete'	: 'remove'
	},
	change: function(event) {
		utils.hideAlert();
		
		var target = event.target;
		var change = {};
		
		change[target.name] = target.value;
		this.model.set(change);
		
		//Add validation rule here
	},
	save: function(){		
		this.model.save(null, {
			success: function(model) {				
				//self.render();
				//app.navigate('users', {trigger:true});
				utils.showAlert('Success!', 'User saved successfully', 'alert-success');
			},
			error: function() {
				utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-danger');
			}
		});
		
		return false;
	},
	remove: function(e) {
		var self = this;
		
		self.model.destroy({
			success: function(){				
				alert("Deleted the user successfully..");
				app.navigate('users',{trigger:true, replace:true});
			}
		});
		return false;
	}
});

/**
 * User List View
 */
window.UserListView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		var users = this.model.models;
		var len = users.length;
		
		if(len > 0) {
			$(this.el).html('<ul class="list-group"></ul>');
			
			for (var i= 0; i < len; i++) {
				$('.list-group', this.el).append(new UserListItemView({model:users[i]}).render().el);
			}
		} else {
			$(this.el).html('<div class="alert alert-info">Oops! There is no users to display </div>');
		}
		
		//console.log($(this.el));
		//Paginator code here
		return this;
	}
 });

window.UserListItemView = Backbone.View.extend({
	/*tagName: "li",*/
	initialize: function() {
		this.model.bind("change", this.render, this);
		this.model.bind("destroy", this.close, this);
	},
	events:{
		'click .delete'	:'remove'
	},
	render: function() {		
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	remove: function(e) {
		var self = this;
		var userId = $(e.target).attr('data');
		
		if(!userId)
			userId = $(e.target).parent().attr('data');
		
		self.model.destroy({
			success: function(){				
				alert("Deleted the user successfully..");
				Backbone.history.loadUrl();
			}
		});
		return false;
	}
});

