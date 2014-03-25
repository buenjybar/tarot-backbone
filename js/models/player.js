/**
 * Created by ben on 2/15/14.
 */

define([
    'underscore',
    'backbone',
    'util'
], function (_, Backbone, Util) {

    var Player = Backbone.Model.extend({
        defaults: {
            id: _.uniqueId('player_'),
            name: 'player_name'
        },
        initialize : function(options){
            this.set(options);
        },
        get: function(prop){
            return this.get(prop);
        }
    });
   
    return Player;
});