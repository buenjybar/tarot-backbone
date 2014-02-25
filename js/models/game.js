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
        url: 'http://localhost:80/#/games',
        idAttribute: 'id',
        model: Trick,
        defaults:{
            id: Util.getNewGameId(),
            name : 'game_' + this.id,
            date : new Date(),
            ticks: [],
            players: [],
            playerNumber: 0
        },
        initialize : function(options){
            if(options && options.name) this.set('name', options.name);        
            if(options && options.players) this.createPlayers(options.players);   
            
            this.save();
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