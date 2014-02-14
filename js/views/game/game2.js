/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/game2.html',
    'enums',
    'util'
], function ($, _, Backbone, game2Template, ENUMS, Util) {

    var Game2View = Backbone.View.extend({
        el: $("#container"),
        render: function () {
            var data = {};
            var compiledTemplate = _.template(game2Template, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);
            
            $("#called").append();
            $("#bouts").append(Util.getEnumsToHTML(ENUMS.BOUTS));
        },
        events: {
            'click #game2 button:submit': 'goToScore',
            'click #additionaloptions' : 'additionalOptions',
            'change input[name="other"]' : 'computeOtherScore',
            'change input[name="taker"]': 'computeTakerScore'
        },
        goToScore : function(){
            Backbone.history.navigate('scores', {trigger: true});
        },
        additionalOptions : function(){
            
        },
        computeOtherScore : function(e){
            this.computeScore("input[name='other']","input[name='taker']");
        },
        computeTakerScore : function(e){
            this.computeScore("input[name='taker']","input[name='other']");
        },
        computeScore : function(source, target){
            var value = +$(source).val();
            if(value > 91) {
                $(source).val(91); 
                $(target).val(0);
                return;
            }
            $(target).val(91 - value);
        }
    });

    return Game2View;
});