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
        gameid : null,
        players: null,
        initialize: function(options){
            if(options && options.gameid) {
                this.gameid = options.gameid;
                var gameColl = window.app.getGameCollection();
                if(gameColl === undefined) return;
                var game = gameColl.get(this.gameid);
                if(game === undefined) return;
                this.players = game.get('players');
            }
        },
        render: function () {
            var data = {};
            var compiledTemplate = _.template(game2Template, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);
            
            $("#called").append(Util.getPlayersOption(this.players));
            $("#bouts").append(Util.getEnumsToHTML(ENUMS.BOUTS));
        },
        events: {
            'click #submitgame button:button': 'checkValidForm',
            'click #additionaloptions' : 'additionalOptions',
            'change input[name="other"]' : 'computeOtherScore',
            'change input[name="taker"]': 'computeTakerScore'
        },
        checkValidForm : function(){
          var valid = true;
            
            if(valid){
                //get id and generate play number
                this.goToNext(this.gameid);   
            }else{
                
            }
        },
        goToNext: function(id, play){
            Backbone.history.navigate('#/scores/' + id , {trigger: true});
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