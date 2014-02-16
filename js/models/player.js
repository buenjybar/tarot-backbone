/**
 * Created by ben on 2/15/14.
 */

define([
    'underscore',
    'backbone',
    'util'
], function (_, Backbone, Util) {

    var Player = Backbone.Model.extend({
       defaults:{
           name: '',
           img: null
       }
    });
   
    return Player;
});