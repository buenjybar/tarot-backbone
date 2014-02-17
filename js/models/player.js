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
           name: '',
           img: null
        },
        initialize : function(options){
            if(options && options.name) this.set('name', options.name);    
            if(options && options.img) this.set('img', options.img);    
        }
    });
   
    return Player;
});