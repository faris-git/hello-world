
window.User = Backbone.Model.extend({
	urlRoot: "/user",
	idAttribute: "userId",
	initialize: function() {
		this.validators = {};
		
		//Need to add validators
	},
	validateItem: function(key) {
		return true;//Need to give real validator value
	},
	validateAll: function() {
		var messages = {};
		
		//I'm waiting for the first surprise, then I'll add the validator for this application
		return {isValid: true};
	},
	defaults: {
		userId: null,
		userName:"",
		firstName:"",
		lastName:"",
		address:"",
		city:"",
		country:"Germany",
		phone:"",
		picture:""
	}
});

/**
 * Now the collection for the user object
 */
window.UserCollection = Backbone.Collection.extend({
	model: User,
	url: "/users"
});