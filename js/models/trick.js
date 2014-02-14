/**
 * Created by ben on 2/13/14.
 */

define([
    'underscore',
    'backbone',
    'enums',
], function (_, Backbone, ENUMS) {

    var Trick = Backbone.Model.extend({
        defaults:{
            bids: ENUMS.BIDS.NONE,
            bonusPetit: ENUMS.BONUS.NONE,
            bonusChelem: ENUMS.BONUS.NONE,
            bout: ENUMS.BOUTS.NONE,
            poignee: ENUMS.POIGNES.NONE,
            king: ENUMS.KING.NONE,
            taker: null,
            called: null,
            points: 0,
            score: 0
        }
    });
    
    return Trick;
});