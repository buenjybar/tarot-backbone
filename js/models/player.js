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
            id: _.uniqueId('p'),
            name: 'player_name'
        },
        initialize : function(options){
            if(options && options.name) this.set('name', options.name);
        },
        get: function(prop){
            return this.get(prop);
        }
    });
   
    return Player;
});