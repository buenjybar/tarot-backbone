/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'js/models/game',
    'js/models/trick',
    'text!templates/game/game1.html',
    'enums',
    'util'
], function ($, _, Backbone, Game, Trick, game1Template, ENUMS, Util) {

    var Game1View = Backbone.View.extend({
        el: "#container",
        model: Game,
        game: null,
        players: null,
        initialize: function (options) {
            this.gameid = options.gameid;
            this.playid = options.playid;
            this.game = new Game({id: options.gameid});
            this.game.fetch({
                success: function (model, response, options) {
                    this.players = this.game.getPlayers();
                    this.render();
                }.bind(this),
                error: function (model, response, options) {
                    Util.displayErrorMessage('Game Not Found: you fill be redirected to the home page');
                }
            });

            this.trick = new Trick({urlRoot: this.game.url(), id: options.playid});
            this.trick.fetch({
                success: function (model, response, options) {
                    this.updateView({
                        taker: this.trick.get('taker'),
                        dead: this.trick.get('dead'),
                        bid: this.trick.get('bid'),
                        king: this.trick.get('king')
                    });
                }.bind(this),
                error: function (model, response, options) {
                    Util.displayErrorMessage('Play Not Found: you fill be redirected to the home page');
                }
            })
        },
        render: function () {
            var data = {};
            var compiledTemplate = _.template(game1Template, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);

            this.taker = '#taker';
            this.bid = '#bid';
            this.king = '#king';
            this.dead = '#dead';

            this.$(this.taker).append(Util.getPlayersToHTML(this.players));
            this.$(this.dead).append(Util.getPlayersToHTML(this.players));
            this.$(this.bid).append(Util.getEnumsToHTML(ENUMS.BIDS, true));
            this.$(this.king).append(Util.getEnumsToHTML(ENUMS.KINGS, true));

            if (this.players && this.players.length < 5) {
                this.$(this.king).parent().parent().addClass('hidden');
            }
            if (this.players && this.players.length !== 6) {
                this.$(this.dead).parent().parent().addClass('hidden');
            }
        },
        updateView: function (options) {
            for(var prop in options){
                if(options[prop] != null){
                    this.$(this[prop]).val(options[prop]['name']);
                }
            }
        },
        select: function(id){
            return this.$(this[id]).find(':selected')[0].value;
        },
        events: {
            'click #game1 button:button': 'checkValidForm'
        },
        checkValidForm: function () {
            var taker = this.game.getPlayer(this.select('taker'));
            var dead = this.game.getPlayer(this.select('dead'));
            var bid = Util.parseEnums(ENUMS.BIDS, this.select('bid'));
            var king = Util.parseEnums(ENUMS.KINGS, this.select('king'));

            var valid = this.players.length < 6 || (this.players.length === 6 && dead.toLowerCase() !== taker.toLowerCase());

            if (valid) {
                if (this.players.length < 5) {
                    //no king called
                    king = ENUMS.KINGS.NONE;
                }
                if (this.players.length !== 6) {
                    //no dead player
                    dead = null;
                }

                this.trick.update({ bid: bid, taker: taker, dead: dead, king: king});
                this.goToNext(this.game.id, this.trick.id);
            } else {
                Util.displayErrorMessage("<strong>Warning</strong> Please make sure a taker and a contract are set");
            }
        },
        goToNext: function (gameid, playid) {
            Backbone.history.navigate('/games/' + gameid + '/plays/' + playid + '/suite', {trigger: true});
        }
    });

    return Game1View;
});