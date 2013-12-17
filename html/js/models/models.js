
window.User = Backbone.Model.extend({
	urlRoot: "/users",
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
		firstName:"",
		lastName:"",
		address:"",
		city:"Kšln",
		country:"Germany",
		phone:""
	}
});

/**
 * Now the collection for the user object
 */
window.UserCollection = Backbone.Collection.extend({
	model: User,
	url: "/users"
});