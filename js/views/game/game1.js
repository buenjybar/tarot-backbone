/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'js/models/game',
    'text!templates/game/game1.html',
    'enums',
    'util'
], function ($, _, Backbone, Game, game1Template, ENUMS, Util) {

    var Game1View = Backbone.View.extend({
        el: $("#container"),
        model: Game,
        $taker: null,
        $dead: null,
        $contract: null,
        $king: null,
        game: null,
        players: null,
        initialize: function (options) {
            this.game = new Game({id : options.gameid});
            this.game.fetch({
                success: function(model){
                    this.players = this.game.getPlayers();
                    this.render();
                }.bind(this)
            })
        },
        render: function () {
            var data = {};
            var compiledTemplate = _.template(game1Template, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);

            this.$taker = $('#taker');
            this.$contract = $('#contract');
            this.$king = $('#king');
            this.$dead = $('#dead');

            this.$taker.append(Util.getPlayersToHTML(this.players));
            this.$dead.append(Util.getPlayersToHTML(this.players));
            this.$contract.append(Util.getEnumsToHTML(ENUMS.BIDS, true));
            this.$king.append(Util.getEnumsToHTML(ENUMS.KINGS, true));
            
            if(this.players && this.players.length < 5){
                this.$king.parent().parent().addClass('hidden');
            }
            if(this.players && this.players.length !== 6){
                this.$dead.parent().parent().addClass('hidden');
            }
        },
        events: {
            'click #game1 button:button': 'checkValidForm'
        },
        checkValidForm: function () {
            var valid = true;

            var taker = this.$taker.find(':selected')[0].value;
            var dead = this.$dead.find(':selected')[0].value;
            var bid = this.$contract.find(':selected')[0].value;
            var king = this.$king ? this.$king.find(':selected')[0].value: ENUMS.KINGS.NONE;

            valid = this.players.length < 6  || (this.players.length === 6 && dead.toLowerCase() !== taker.toLowerCase());

            if (valid) {
                if(this.players.length < 5) {
                    //no king called
                    king = ENUMS.KINGS.NONE;
                }
                if(this.players.length !== 6){
                    //no dead player
                    dead = '';
                }

                var play = this.game.createNewTrick({bid: bid, taker: taker, king: king, dead: dead});

                this.goToNext(this.game.id, play.id);
            } else {
                Util.displayErrorMessage("<strong>Warning</strong> Please make sure a taker and a contract are set");
            }
        },
        goToNext: function (gameid, playid) {
            Backbone.history.navigate('/games/' + gameid + '/plays/' + playid, {trigger: true});
        }
    });

    return Game1View;
});