/**
 * Created by ben on 2/15/14.
 */

define([
    'underscore',
    'backbone',
    'util',
    'js/models/player',
], function (_, Backbone, Util, Player) {

    var Game = Backbone.Model.extend({
        defaults:{
            name : '',
            date : new Date(),
            ticks: [],
            players: [],
            playerNumber: 0
        },                             
        addPlayers: function(players){
            if(!players) return;
            
            this.set('playerNumber', players.length);
            players.forEach(function(player){
              this.get('players').push(new Player(player));   
            }.bind(this));
        }
    });

    return Game;
});