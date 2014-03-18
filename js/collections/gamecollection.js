/**
 * Created by ben on 2/12/14.
 */

define([
    'underscore',
    'backbone',
    'js/models/game'
], function (_, Backbone, Game) {

    var GameCollection = Backbone.Collection.extend({
        model: Game,
        currentGame: null,
        url: function () {
            return 'http://' + window.document.domain + ':3000/games/';
        },
        initialize: function (models, options) {

            this.bind('add', function(game){
               this.currentGame = game;
            });

            this.on('reset', function () {
                this.model = this.get(this.model.id);
            }.bind(this));
        },
        getCurrentGame : function(){
            return this.currentGame;
        }
    });

    return GameCollection;
});