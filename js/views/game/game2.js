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
        additionaloptions: null,
        $points: null,
        $pointsOther: null,
        gameid: null,
        players: null,
        initialize: function (options) {
            if (options && options.gameid) {
                this.gameid = options.gameid;
                if (window.app === undefined) return;
                var gameColl = window.app.getGameCollection();
                if (gameColl === undefined) return;
                var game = gameColl.get(this.gameid);
                if (game === undefined) return;
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
            this.additionaloptions = $("#additionaloptions");
            this.$points = $("input[name='taker']");
            this.$pointsOther = $("input[name='other']");

            this.$called.append(Util.getPlayersOption(this.players));
            this.$bout.append(Util.getEnumsToHTML(ENUMS.BOUTS));
        },
        events: {
            'click #submitgame button:button': 'checkValidForm',
            'click #additionaloptions li a': 'additionalOptions',
            'change input[name="other"]': 'computeOtherScore',
            'change input[name="taker"]': 'computeTakerScore'
        },
        checkValidForm: function () {
            var valid = true;

            if (valid) {
                //get id and generate play number
                this.goToNext(this.gameid);
            } else {

            }
        },
        goToNext: function (id, play) {
            Backbone.history.navigate('#/scores/' + id, {trigger: true});
        },
        additionalOptions: function (e) {
            var selected = e.currentTarget;
            var text = selected.text;
            //TODO finish the function
//            var html = '';
//            if(text.match())
        },
        computeOtherScore: function (e) {
            this.computeScore(this.$pointsOther, this.$points);
        },
        computeTakerScore: function (e) {
            this.computeScore(this.$points, this.$pointsOther);
        },
        computeScore: function (source, target) {
            var value = +$(source).val();
            if (value > 91) {
                $(source).val(91);
                $(target).val(0);
                return;
            }
            $(target).val(91 - value);
        }
    });

    return Game2View;
});