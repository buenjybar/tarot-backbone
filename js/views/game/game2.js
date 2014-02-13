/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/game2.html'
], function ($, _, Backbone, game2Template) {

    var HomeView = Backbone.View.extend({
        el: $("#container"),
        render: function () {
            var data = {};
            var compiledTemplate = _.template(game2Template, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);
        },
        events: {
            "submit ": 'onsubmit'
        },
        onsubmit : function(){

        }
    });

    return HomeView;
});