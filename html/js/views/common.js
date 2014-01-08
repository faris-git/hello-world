
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

/**
 * File Upload View
 */
window.FileUploadView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		$(this.el).html(this.template());
		
		
		return this;
	},
	events:{
		'click .submit': 'uploadFile'
	},
	uploadFile: function(e) {
		var self = this;
		
		var options = {
			beforeSend: function() {
				$('.progress', $(self.el)).removeClass('hide');
				$('.progress', $(self.el)).addClass('active').show();
				
				$('#message').html('');					
			},
			uploadProgress: function(event, position, total, percentComplete) {					
				$('.progress-bar', $(self.el)).css('width',percentComplete+'%');							
			},
			complete: function(response) {				
				$('.progress', $(self.el)).removeClass('active progress-striped');				
			}, 
			success: function() {
				$('#message').html('Successfully your file is uploaded !!');
			},
			error: function(error) {
				var errorMessage = JSON.parse(error.responseText);
				console.log(errorMessage.message);
				$('.progress', $(self.el)).hide();
				$('#message').html('Error: '+errorMessage.message);
			}
		};
		
		$('#upload-form').submit(function() { 
			 
	        $(this).ajaxSubmit(options); 
	 
	        // !!! Important !!! 
	        // always return false to prevent standard browser submit and page navigation 
	        return false; 
	    });
	}
});

