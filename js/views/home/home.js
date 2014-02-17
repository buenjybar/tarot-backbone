/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'text!templates/home/home.html'
], function ($, _, Backbone, Router, homeTemplate) {

    var HomeView = Backbone.View.extend({
        el: $("#container"),
        render: function () {
            var data = {};
            var compiledTemplate = _.template(homeTemplate, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);
        },
        events: {
            'click #startgame': 'goToNext',
            'click [data-toggle=offcanvas]': 'toggleClass'
        },
        goToNext: function (event) {
            Backbone.history.navigate('#/games/newgame', {trigger: true});
        },
        toggleClass: function (e) {
            this.$('.row-offcanvas').toggleClass('active');
        }
    });

    return HomeView;
});