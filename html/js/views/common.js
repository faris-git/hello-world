
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

