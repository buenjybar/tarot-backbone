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
    'backbonedebug',
    'bootstrap'
], function ($, _, Backbone, Util, Router, GameCollection, Q) {
    var initialize = function () {
        Backbone.debug.on();

        new Router();
        Backbone.history.start();
        this.gameColl = new GameCollection();
        window.app = this;

        //this.currentGameCollection = new GameCollection();
        Util.setCurrentCollection(new GameCollection());

        //var promise = loadAvatars().then()

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