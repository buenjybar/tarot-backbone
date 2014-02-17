/**
 * Created by ben on 2/16/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/scores/scores.html',
], function ($, _, Backbone, scoresTemplate) {

    var Score = Backbone.View.extend({
        el : $("#container"),
        initialize: function(options){
            
        },
        render : function(){
            var data = {};
            var compiledTemplate = _.template(scoresTemplate, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);
        },
        events: {
            
        },
        goToNext : function(){
            
        }
    });
    
    return Score;
});