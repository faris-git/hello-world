
window.utils = {
		loadTemplate: function(views, callback) {
			var deferreds = [];
			
			$.each(views, function(index, view){
				if(window[view]) {
					deferreds.push($.get('template/' + view + '.html', function(data) {
						window[view].prototype.template = _.template(data);
					}));
				} else {
					alert(view + ' not found');
				}
			});
			
			$.when.apply(null, deferreds).done(callback);
		},
		
		displayValidationErrors: function(messages) {
			
			for (var key in messages) {
				if (messages.hasOwnProperty(key)) {
					this.addValidationError(key, messages[key]);
				}
			}
			this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
		},
		
		addValidationError: function(field, message) {
			var controlGroup = $('#'+field).parent().parent();
			controlGroup.addClass('error');
			$('.help-inline', controlGroup).html(message);
		},
		
		removeValidationError: function(field) {
			var controlGroup = $('#'+field).parent().parent();
			controlGroup.removeClass('error');
			$('.help-inline', controlGroup).html('');
		},
		
		showAlert: function(title, text, className) {
			$('.alert').removeClass("alert-danger alert-warning alert-success alert-info hide");
			$('.alert').addClass(className);
			$('.alert').html('<strong>'+title+'</strong> '+text);
			$('.alert').show();
		},
		
		hideAlert: function() {
			$('.alert').hide();
		},
		
		readCookie : function(name) {
	    	var name_ = name + "=";
	    	var ca = document.cookie.split(';');
	    	for(var i=0;i < ca.length;i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1,c.length);
		        if (c.indexOf(name_) == 0) return c.substring(name_.length,c.length);
	    	}
	    	return null;
	    }
};