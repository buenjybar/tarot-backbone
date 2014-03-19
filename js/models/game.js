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
                date: new Date().toDateString(),
                tricks: [],
                players: [],
                playerNumber: 0,
                trickCounter: 0
            }
        },
        initialize: function (options) {
            this.bind("error", function (model, error) {
                // We have received an error, log it, alert it or forget it :)
                debugger;
                console.log(error);
            });
            this.bind('change', function(model, changes){
                console.log(model);
            });
            this.set(options);
        },
        getPlayers: function () {
            return this.get('players');
        },
        addPlayers: function (array) {
            if (!array) return;

            var players = [];
            _.each(array, function (element) {
                players.push(new Player({ name: element.name}));
            }, this);

            this.set('players', players);
            this.set('playerNumber', array.length);
        },
        createNewTrick: function (options) {
            var trick = new Trick({ urlRoot: this.url()});
            trick.set(options);

            this.get('tricks').push(trick);
            this.set('trickCounter', this.get('trickCounter') + 1);
            return trick;
        },
        getTrick: function (play) {
            return new Trick({id: play.id, urlRoot: this.url()});
        },
        getPlayer : function(name){
            var players = this.get('players');
            for(var i = 0; i< players.length; ++i){
                if(players[i] && players[i]['name'] == name){
                    return players[i];
                }
            }
            return null;
        }
    });

    return Game;
});