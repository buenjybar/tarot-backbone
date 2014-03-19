/**
 * Created by ben on 2/16/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'js/models/game',
    'text!templates/scores/scores.html',
    'enums',
    'util'
], function ($, _, Backbone, Game, scoresTemplate, ENUMS, Util) {

    var Score = Backbone.View.extend({
        el: $("#container"),
        model: Game,
        gameid: null,
        players: null,
        initialize: function (options) {
            this.gameid = options.gameid;
            this.game = new Game({id: options.gameid});
            this.game.fetch({
                success: function (model, response, options) {
                    this.players = this.game.get('players');
                    this.tricks = this.game.get('tricks');
                    this.render();
                }.bind(this),
                error: function (model, response, option) {
                    Util.displayErrorMessage('Game Not Found: you fill be redirected to the home page');
                }.bind(this)
            })

        },
        render: function () {
            var data = {
                name: this.game.get('name')
            };
            var compiledTemplate = _.template(scoresTemplate, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);

            this.table = '.table';
            this.body = this.table + ' tbody';
            this.head = this.table + ' thead';

            this.generateHTML();
        },
        generateHTML : function(){
            var html = ['<tr>'];
            html.push(this.generateTableHeader('#'));
            _.each(this.players, function(player){
                html.push(this.generateTableHeader(player['name']));
            }, this);
            html.push('</tr>');

            this.$(this.head).append(html.join(''));

            _.each(this.tricks, function(trick){
                html = ['<tr>'];
                html.push(this.generateTableHeader(trick.id));
                var scores = this.computeScore(trick);
                _.each(this.players, function(player){
                    html.push(this.generateTableBody(scores[player.name]))
                },this);
                html.push('</tr>');

                this.$(this.body).append(html.join(''));
            }, this);

        },
        generateTableHeader : function(name){
            return '<th>'+name+'</th>';
        },
        generateTableBody : function(score){
            return '<th>'+score+'</th>';
        },
        computeScore : function(options){
            var scores = {};
            _.each(this.players, function(player){
                scores[player.name] = Math.floor(Math.random()*91);
            }, this);
            return scores;
        },
        events: {

        },
        goToNext: function () {

        }
    });

    return Score;
});