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
        $called: null,
        $bout: null,
        $additionaloptions: null,
        $points: null,
        $pointsOther: null,
        $chelem: null,
        $petit: null,
        $options: null,
        $gameinfo: null,
        gameid: null,
        gameContract: null,
        players: null,
        initialize: function (options) {
            if (options && options.gameid) {
                this.gameid = options.gameid;
                if (window.app === undefined) return;
                var gameColl = window.app.getGameCollection();
                if (gameColl === undefined) return;
                var game = gameColl.get(this.gameid);
                if (game === undefined) return;
                //this.gameContract = game.get('contract');//TODO 
                this.players = game.get('players');
            }
        },
        render: function () {
            var data = {};
            var compiledTemplate = _.template(game2Template, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);

            this.$called = $("#called");
            this.$bout = $("#bouts");
            this.$additionaloptions = $("#additionaloptions");
            this.$points = $("input[name='taker']");
            this.$pointsOther = $("input[name='other']");
            this.$options = $("#options");
            this.$gameinfo = $("#gameinfo label");

            this.$called.append(Util.getPlayersToHTML(this.players));
            this.$bout.append(Util.getEnumsToHTML(ENUMS.BOUTS));
            this.$additionaloptions.find('ul').append(Util.getOptionsToHTML(ENUMS.OPTIONS));

            if(this.players && this.players.length < 5){
                this.$called.parent().parent().addClass('hidden');
            }
        },
        events: {
            'click #submitgame button:button': 'checkValidForm',
            'click #additionaloptions li a': 'additionalOptionsDispatcher',
            'change #bouts' : 'updateGameInfoText',
            'change input[name="other"]': 'computeOtherScore',
            'change input[name="taker"]': 'computeTakerScore'
        },
        checkValidForm: function () {
            var valid = true;
            
            valid = this.$points.val() !== null && this.$points.val() !== undefined && this.$points.val() !== '';    
            
            if (valid) {
                //get id and generate play number
                this.goToNext(this.gameid);
            } else {
                Util.displayErrorMessage('<strong>Warning</strong> please, enter a valid number of points.');
            }
        },
        goToNext: function (id, play) {
            Backbone.history.navigate('#/scores/' + id, {trigger: true});
        },
        additionalOptionsDispatcher: function (e) {
            var selected = e.currentTarget;
            var text = selected.text;

            if(text.match(ENUMS.OPTIONS.PETIT.name)) this.displayPetitOptions();
            if(text.match(ENUMS.OPTIONS.CHELEM.name)) this.displayChelemOptions();
            if(text.match(ENUMS.OPTIONS.POIGNEE.name)) this.displayPoigneeOptions();
        },
        computeOtherScore: function (e) {
            this.computeScore(this.$pointsOther, this.$points);
            this.updateGameInfoText();
        },
        computeTakerScore: function (e) {
            this.computeScore(this.$points, this.$pointsOther);
            this.updateGameInfoText();
        },
        computeScore: function (source, target) {
            var value = +$(source).val();
            if (value > 91 || value < 0) {
                $(source).val(91);
                $(target).val(0);
                return;
            }
            $(target).val(91 - value);
        },
        updateGameInfoText: function(){          
            var target = +this.$bout.val();
            var score = +this.$points.val();
            var diff = score - target;
            if(diff >= 0){
                this.$gameinfo.html('<em>contract succeed by <strong>' + diff + (diff === 0 ? ' pt' : ' pts') + '</strong></em>');
                this.$gameinfo.removeClass();
                this.$gameinfo.addClass('text-success');
            }else {
                this.$gameinfo.html('<em>contract fail by <strong>' + diff + ' pts</strong></em>');
                this.$gameinfo.removeClass();
                this.$gameinfo.addClass('text-danger');
            } 
        },
        displayPetitOptions : function(){
            if(!this.$additionaloptions) return;
            var html = '<div class="form-group">' +
                            '<div class="col-xs-6">'+
                                '<label class="control-label">Petit au bout</label>' +
                            '</div>' +
                            '<div class="col-xs-6">'+
                                '<select class="form-control" id="petit">';
            html += Util.getEnumsToHTML(ENUMS.BONUS.PETIT , false);
            html += '</select></div></div>';
            
            this.$options.append(html);
            this.$petit = $('#petit');
            
            $("#additionaloptions ul li a").filter(function(){ return $(this).text() === "Petit au bout"}).addClass('hidden');
        },
        displayChelemOptions : function(){
            if(!this.$additionaloptions)
                return;
            var html = '<div class="form-group">' +
                            '<div class="col-xs-6">'+
                                '<label class="control-label">Chelem</label>' +
                            '</div>' +
                            '<div class="col-xs-6">'+
                                '<select class="form-control" id="chelem">';
            html += Util.getEnumsToHTML(ENUMS.BONUS.CHELEM, false);
            html += '</select></div></div>';
            
            this.$options.append(html);
            this.$chelem = $('#chelem');
            
            $("#additionaloptions ul li a").filter(function(){ return $(this).text() === "Chelem"}).addClass('hidden');
        },
        displayPoigneeOptions: function(){
            if(!this.$additionaloptions)
                return;
            var html = '<div class="form-group">' +
                            '<div class="col-xs-6">'+
                                '<label class="control-label">Poignee to player:</label>' +
                            '</div>' +
                            '<div class="col-xs-6">'+
                                '<select class="form-control" id="poignee1">';
            html += Util.getPlayersToHTML(this.players);
            html += '</select></div>';
            
            html +='<div class="col-xs-6">'+
                    //'<p class="control-label"><em># Atouts single:10,double:13,triple:15</em></p>' +
                            '</div>' +
                            '<div class="col-xs-6">'+
                                '<select class="form-control" id="poignee2">'
            html += Util.getEnumsToHTML(ENUMS.POIGNEES, false);
            html += '</select></div>';
            html += '</div>';
            
            this.$options.append(html);
            this.$poignee = $('#poignee');
            
           $("#additionaloptions ul li a").filter(function(){ return $(this).text() === "Poignee"}).addClass('hidden');
        }
        
    });

    return Game2View;
});