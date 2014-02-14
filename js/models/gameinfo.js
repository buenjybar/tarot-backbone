/**
 * Created by ben on 2/12/14.
 */

define([
    'underscore',
    'backbone',
    'util'
], function (_, Backbone, Util) {

    var GameInfo = Backbone.Model.extend({
        defaults:{
            id : Util.getNewId(),
            name : '',
            date : new Date()
        }
    });

    return GameInfo;
});