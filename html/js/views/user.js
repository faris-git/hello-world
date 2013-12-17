
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
		console.log("Yes I'm here");
		$(this.el).html('<ul class="thumbnails"></ul>');
		
		for (var i= 0; i < len; i++) {
			$('.thumbnails', this.el).append(new UserListItemView({model:users[i]}).render().el);
		}
		
		console.log($(this.el));
		//Paginator code here
		return this;
	}
 });

window.UserListItemView = Backbone.View.extend({
	tagName: "li",
	initialize: function() {
		this.model.bind("change", this.render, this);
		this.model.bind("destroy", this.close, this);
	},
	render: function() {
		console.log(this.model);
		console.log(this.model.toJSON());
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

