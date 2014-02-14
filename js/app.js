/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'backbonedebug'
], function ($, _, Backbone, Router) {
    var initialize = function () {
        Backbone.debug.on();
        Router.initialize();
        
        Backbone.View.prototype.close = function(){
            this.remove();
            this.unbind();
            if (this.onClose){
                this.onClose();
            }
        };
        
        //Backbone.debug.routes();
        //Backbone.debug.views();
        //Backbone.debug.models();
        //Backbone.debug.collections();
    };

    return {
        initialize: initialize
    };
});