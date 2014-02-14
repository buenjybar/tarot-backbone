/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/game1.html',
    'enums',
    'util'
], function ($, _, Backbone, game1Template, ENUMS, Util) {

    var Game1View = Backbone.View.extend({
        el: $("#container"),
        render: function () {
            var data = {};
            var compiledTemplate = _.template(game1Template, data);            
            this.$el.empty();
            this.$el.append(compiledTemplate);
            
            $('#taker').append();
            $('#contract').append(Util.getEnumsToHTML(ENUMS.BIDS));
            $('#king').append(Util.getEnumsToHTML(ENUMS.KINGS));
        },
        events: {
            'click #game1 button:submit': 'goToGame2'
        },
        goToGame2: function () {
            Backbone.history.navigate('game2', {trigger: true});
        }
    });

    return Game1View;
});