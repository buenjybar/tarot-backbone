/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'util',
    'synchronization',
    'router',
    'js/collections/gamecollection',
    'q',
    'backbonedebug',
    'bootstrap'
], function ($, _, Backbone, Util, Synchronization, Router, GameCollection, Q) {
    var initialize = function () {
        
        Backbone.debug.on();
        this.gameColl = new GameCollection();
        window.app = this;
        //new Synchronization();
        new Router();
//        Backbone.history.start({pushState: true});
        Backbone.history.start({pushState: false});

        //patch close template
        //this avoid ghost view
        Backbone.View.prototype.close = function () {
            this.remove();
            this.unbind();
            if (this.onClose) {
                this.onClose();
            }
        };
    };

    function loadAvatars() {
        //var promise = Q.fcall().then();
    }

    function getGameCollection() {
        return this.gameColl;
    }

    return {
        initialize: initialize,
        getGameCollection: getGameCollection
    };
});