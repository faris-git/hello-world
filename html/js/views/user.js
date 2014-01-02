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
		'change'				: 'change',
		'click .save'			: 'save',
		'click .update'			: 'update',
		'click .delete'			: 'remove',
		'drop #picture'			: 'dropHandler',
		'change #pictureFile'	: 'imageHandler'
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
	update: function(e) {
		var self = this;
		console.log(self.model);
		var userId = self.model.get('userId');
		self.model.save(userId, {
			success: function(data){
				utils.showAlert('Success!', 'User updated successfully', 'alert-success');
			}, error: function(error) {
				utils.showAlert('Error', 'An error occurred while trying to update this item', 'alert-danger');
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
	},
	dropHandler: function(event) {
		event.stopPropagation();
		event.preventDefault();
		var e = event.originalEvent;
		e.dataTransfer.dropEffect = 'copy';
		this.pictureFile = e.dataTransfer.files[0];
		console.log("picture file"+ this.pictureFile);
		// Read the image from the local file system and display it in the image box
		var reader = new FileReader();
		reader.onloadend = function() {
			$('#picture').attr('src', reader.result);
		};
		
		/**http://www.tweetegy.com/2012/01/basic-multiple-image-gallery-upload-html5-and-backbone-application/ */
		reader.readAsDataURL(this.pictureFile);
		return false;
	},
	imageHandler: function(event) {
		event.stopPropagation();
		event.preventDefault();
		
		var e = event.originalEvent;
		var self = this;
		var target = event.target;
		var targetfieldname = $(target).attr('name');
		if(targetfieldname)
			targetfieldname = targetfieldname.replace('File', '');
		
		self[target.name] = e.target.files[0];
		
		var reader = new FileReader();
		reader.onloadend = function() {
			$('#'+targetfieldname).attr('src', reader.result);
			var change = {};
			change[targetfieldname] = reader.result;
			
			self.model.set(change);
		};
		
		reader.readAsDataURL(self[target.name]);
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

