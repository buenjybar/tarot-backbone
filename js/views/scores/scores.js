/**
 * Created by ben on 2/16/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/scores/scores.html',
    'js/models/game'
], function ($, _, Backbone, scoresTemplate, Game) {

    var Score = Backbone.View.extend({
        el: $("#container"),
        game: null,
        initialize: function (options) {
            this.game = new Game({id : options.gameid});

        },
        render: function () {
            var data = {};
            var compiledTemplate = _.template(scoresTemplate, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);
            
            var players = this.game.getPlayers();
        },
        events: {

        },
        goToNext: function () {

        }
    });

    return Score;
});