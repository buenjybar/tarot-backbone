/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/game1.html',
    'enums',
    'util'
], function ($, _, Backbone, game1Template, ENUMS, Util) {

    var Game1View = Backbone.View.extend({
        el: $("#container"),
        $taker: null,
        $contract: null,
        $king: null,
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
            var compiledTemplate = _.template(game1Template, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);

            this.$taker = $('#taker');
            this.$contract = $('#contract');
            this.$king = $('#king');

            this.$taker.append(Util.getPlayersOption(this.players));
            this.$contract.append(Util.getEnumsToHTML(ENUMS.BIDS));
            this.$king.append(Util.getEnumsToHTML(ENUMS.KINGS));
        },
        events: {
            'click #game1 button:button': 'checkValidForm'
        },
        checkValidForm: function () {
            var valid = true;

            var taker = this.$taker.find(':selected');
            var contract = this.$contract.find(':selected');
            var king = this.$king.find(':selected');

            var gameBypassed = contract.text().toLowerCase() === 'none';
            if (gameBypassed) {
                //implement game Bypassed
                //confirm box?
            }

            if (valid) {

                this.goToNext(this.gameid);
            } else {
                Util.displayErrorMessage("<strong>Warning</strong> Please make sure a taker and a contract are set");
            }
        },
        goToNext: function (id) {
            Backbone.history.navigate('#/games/' + id + '/suite', {trigger: true});
        }
    });

    return Game1View;
});