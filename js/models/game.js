/**
 * Created by ben on 2/15/14.
 */

define([
    'underscore',
    'backbone',
    'util',
    'js/models/player',
    'js/models/trick'
], function (_, Backbone, Util, Player, Trick) {
    var Game = Backbone.Model.extend({
        url: function () {
            return 'http://' + window.document.domain + ':3000/games/' + this.id + '/';
        },
        model: Trick,
        defaults: function () {
            return {
                id: Util.getNewGameId(),
                name: 'gameTests',
                date: new Date(),
                tricks: [],
                players: [],
                playerNumber: 0,
                trickCounter: 0
            }
        },
        initialize: function (options) {
            if (!options) return;
            if (options.name) this.set('name', options.name);
            if (options.players) this.createPlayers(options.players);
            if (options.date) this.set('date', options.date);

            this.bind("error", function (model, error) {
                // We have received an error, log it, alert it or forget it :)
                debugger;
                console.log(error);
            });

        },
        getPlayers: function () {
            return this.get('players');
        },
        createPlayers: function (array) {
            if (!array) return;

            var players = [];
            this.set('playerNumber', array.length);
            array.forEach(function (element) {
                players.push(new Player({ name: element.name}));
            }.bind(this));
            this.set('players', players);
        },
        createNewTrick: function (options) {
            this.set('trickCounter', this.get('trickCounter') + 1);
            var trick = new Trick({ urlRoot: this.url()});
            trick.set(options);
            this.get('tricks').push(trick);
            return trick;
        },
        getTrick: function (play) {
            return new Trick({id: play.id, urlRoot: this.url()});
        }
    });

    return Game;
});