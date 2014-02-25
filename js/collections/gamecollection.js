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
        url: 'ws://localhost:8080/#/games/',
        initialize: function (models, options) {

            this.on('reset', function () {
                this.model = this.get(this.model.id);
            }.bind(this));
        }
    });

    return GameCollection;
});