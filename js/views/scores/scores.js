/**
 * Created by ben on 2/16/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/scores/scores.html',
], function ($, _, Backbone, scoresTemplate) {

    var Score = Backbone.View.extend({
        el: $("#container"),
        game: null,
        initialize: function (options) {
            if(options && options.gameid){
                if (window.app === undefined) return;
                var gameColl = window.app.getGameCollection();
                if(gameColl === undefined) return;
                //this.games = gameColl.models;
                this.game = gameColl.get(options.gameid);
                if(this.game === undefined) return;
                //this.tricks = this.game.
            }            
        },
        render: function () {
            var data = {};
            var compiledTemplate = _.template(scoresTemplate, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);
            
            
            var attr = this.game.attributes;
            
        },
        events: {

        },
        goToNext: function () {

        }
    });

    return Score;
});