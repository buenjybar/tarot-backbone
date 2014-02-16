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
        url:'/games/',
        initialize: function(models, options){
            
        },
        getCurrentGame: function(){
            return this.get('currentGame');
        },
        setCurrentGame: function(game){
            return this.set('currentGame',game);
        },
        addGame: function(game){
            if(!game) return;
            
            this.set('currentGame',game);
            //this.get('list').push(game);
            this.add(game);
        }
    });

    return GameCollection;
});