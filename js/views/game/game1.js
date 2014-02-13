/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/game1.html'
], function ($, _, Backbone, game1Template) {

    var HomeView = Backbone.View.extend({
        el: $("#container"),
        render: function () {
            var data = {};
            var compiledTemplate = _.template(game1Template, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);
        },
        events: {
            "submit #game": 'onSubmit'
        },
        onSubmit: function () {
            Backbone.history.navigate('game2', {trigger: true});
        }
    });

    return HomeView;
});