/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'util',
    'router',
    'js/collections/gamecollection',
    'q',
    'backbonedebug'
], function ($, _, Backbone, Util, Router, GameCollection, Q) {
    this.currentGameCollection = null;
    
    var initialize = function () {
        Backbone.debug.on();
        Router.initialize();
        
        //this.currentGameCollection = new GameCollection();
        Util.setCurrentCollection( new GameCollection());
        
        //var promise = loadAvatars().then()
        
        //patch close template
        Backbone.View.prototype.close = function(){
            this.remove();
            this.unbind();
            if (this.onClose){
                this.onClose();
            }
        };
    };
    
    function loadAvatars(){
     //var promise = Q.fcall().then();
    }
    
    return {
        initialize: initialize
    };
});