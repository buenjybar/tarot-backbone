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
            id: Util.getNewGameId(),
            name : 'game_' + Util.getNewId(),
            date : new Date(),
            ticks: [],
            players: [],
            playerNumber: 0
        },
        initialize : function(options){
            if(options && options.name) this.set('name', options.name);        
            if(options && options.players) this.createPlayers(options.players);   

        },
        getPlayers: function(){
          return this.get('players');  
        },
        createPlayers: function(array){
            if(!array) return;
            
            this.set('playerNumber', array.length);
            this.set('players', []);
            array.forEach(function(el){
              this.get('players').push(new Player(el));   
            }.bind(this));
        }
    });

    return Game;
});