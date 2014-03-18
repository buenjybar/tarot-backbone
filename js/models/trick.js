/**
 * Created by ben on 2/13/14.
 */

define([
    'underscore',
    'backbone',
    'enums',
    'util'
], function (_, Backbone, ENUMS, Util) {

    var Trick = Backbone.Model.extend({
        url: function(){
            return this.urlRoot + 'plays/' + this.id + '/';
        },
        defaults: function () {
            return {
                id: _.uniqueId(),
                bid: ENUMS.BIDS.NONE,
                bonusPetit: ENUMS.BONUS.PETIT.NONE,
                bonusChelem: ENUMS.BONUS.CHELEM.NONE,
                bout: ENUMS.BOUTS.NONE,
                poignee: ENUMS.POIGNEES.NONE,
                king: ENUMS.KINGS.NONE,
                taker: null,
                called: null,
                others: null,
                points: 0
            }
        },
        initialize : function(options){
            this.urlRoot = options.urlRoot;
            this.save();
        },
        update: function(){
            this.save();
        }
    });

    return Trick;
});