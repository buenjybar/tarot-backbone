/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'js/models/game',
    'js/models/trick',
    'text!templates/game/game2.html',
    'enums',
    'util'
], function ($, _, Backbone, Game, Trick, game2Template, ENUMS, Util) {

    var Game2View = Backbone.View.extend({
        el: "#container",
        model: Game,
        gameid: null,
        playid: null,
        gameContract: null,
        players: null,
        initialize: function (options) {
            this.gameid = options.gameid;
            this.playid = options.playid;
            this.game = new Game({id: options.gameid});
            this.game.fetch({
                success: function (model) {
                    this.players = this.game.get('players');
                    this.render();
                }.bind(this),
                error: function (model, response, option) {
                    Util.displayErrorMessage('Game Not Found: you fill be redirected to the home page');
                }.bind(this)
            });

            this.trick = new Trick({urlRoot: this.game.url(), id: options.playid});
            this.trick.fetch({
                success: function (model, response, options) {
                    this.updateView({
                        called: this.trick.get('called'),
                        bout: this.trick.get('bout'),
                        points: this.trick.get('points'),
                        bonusPetit: this.trick.get('bonusPetit'),
                        bonusChelem: this.trick.get('bonusChelem'),
                        poignee: this.trick.get('poignee')
                    });
                }.bind(this),
                error: function (model, response, options) {
                    Util.displayErrorMessage('Game Not Found: you fill be redirected to the home page');
                }.bind(this)
            });
        },
        render: function () {
            var data = {};
            var compiledTemplate = _.template(game2Template, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);

            this.called = "#called";
            this.bout = "#bouts";
            this.additionaloptions = "#additionaloptions";
            this.points = "input[name='taker']";
            this.pointsOther = "input[name='other']";
            this.options = "#options";
            this.gameinfo = "#gameinfo label";


            this.$(this.called).append(Util.getPlayersToHTML(this.players));
            this.$(this.bout).append(Util.getEnumsToHTML(ENUMS.BOUTS));
            this.$(this.additionaloptions).find('ul').append(Util.getOptionsToHTML(ENUMS.OPTIONS));

            if (this.players && this.players.length < 5) {
                this.$(this.called).parent().parent().addClass('hidden');
            }
        },
        events: {
            'click #submitgame button:button': 'checkValidForm',
            'click #additionaloptions li a': 'additionalOptionsDispatcher',
            'change #bouts': 'updateGameInfoText',
            'change input[name="other"]': 'computeOtherScore',
            'change input[name="taker"]': 'computeTakerScore'
        },
        updateView: function (options) {
            for (var prop in options) {
                if (options[prop] != null) {
                    if(prop == 'points') {
                        this.$(this.points).val(options[prop]);
                        this.computeTakerScore();
                        continue;
                    }
                    if(prop == 'bonusPetit')  this.displayPetitOptions();
                    if(prop == 'bonusChelem')  this.displayChelemOptions();
                    if(prop == 'poignee')  {
                        this.displayPoigneeOptions();
                        this.$(this.player).val(options[prop]['player']['name']);
                        this.$(this.poignee).val(options[prop]['value']['name']);
                        continue;
                    }

                    this.$(this[prop]).val(options[prop]['name']);
                }
            }
        },
        getSelected: function (id) {
            return this.$(this[id]).find(':selected')[0].value;
        },

        checkValidForm: function () {
            var valid = true;

            var called = this.game.getPlayer(this.getSelected('called'));
            var bonusPetit = Util.parseEnums(ENUMS.BONUS.PETIT, this.getSelected('bonusPetit'));
            var bonusChelem = Util.parseEnums(ENUMS.BONUS.CHELEM, this.getSelected('bonusChelem'));
            var bout = Util.parseEnums(ENUMS.BOUTS, this.getSelected('bout'));
            var poignee = Util.parseEnums(ENUMS.POIGNEE, this.getSelected('poignee'));
            var player = Util.parseEnums(ENUMS.POIGNEE, this.getSelected('player'));
            var points = this.$(this.points).val();

            valid = points !== '';

            if (valid) {
                this.trick.update({
                    called: called,
                    bonusPetit: bonusPetit,
                    bonusChelem: bonusChelem,
                    bout: bout,
                    points: points,
                    poignee: {player: player, value: poignee}
                });

                //get id and generate play number
                this.goToNext(this.game.id);
            } else {
                Util.displayErrorMessage('<strong>Warning</strong> please, enter a valid number of points.');
            }
        },
        goToNext: function (gameid) {
            Backbone.history.navigate('/scores/' + gameid , {trigger: true});
        },
        additionalOptionsDispatcher: function (e) {
            var selected = e.currentTarget;
            var text = selected.text;

            if (text.match(ENUMS.OPTIONS.PETIT.name)) this.displayPetitOptions();
            if (text.match(ENUMS.OPTIONS.CHELEM.name)) this.displayChelemOptions();
            if (text.match(ENUMS.OPTIONS.POIGNEE.name)) this.displayPoigneeOptions();
        },
        computeOtherScore: function (e) {
            this.computeScore(this.$(this.pointsOther), this.$(this.points));
            this.updateGameInfoText();
        },
        computeTakerScore: function (e) {
            this.computeScore(this.$(this.points), this.$(this.pointsOther));
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
        updateGameInfoText: function () {
            var target = +this.$(this.bout).val();
            var score = +this.$(this.points).val();
            var diff = score - target;
            if (diff >= 0) {
                this.$(this.gameinfo).html('<em>contract succeed by <strong>' + diff + (diff === 0 ? ' pt' : ' pts') + '</strong></em>');
                this.$(this.gameinfo).removeClass();
                this.$(this.gameinfo).addClass('text-success');
            } else {
                this.$(this.gameinfo).html('<em>contract fail by <strong>' + diff + ' pts</strong></em>');
                this.$(this.gameinfo).removeClass();
                this.$(this.gameinfo).addClass('text-danger');
            }
        },
        displayPetitOptions: function () {
            if (!this.$(this.additionaloptions)) return;
            var html = [];
            html.push('<div class="form-group">' +
                '<div class="col-xs-6">' +
                '<label class="control-label">Petit au bout</label>' +
                '</div>' +
                '<div class="col-xs-6">' +
                '<select class="form-control" id="bonusPetit">');
            html.push(Util.getEnumsToHTML(ENUMS.BONUS.PETIT, false));
            html.push('</select></div></div>');

            this.$(this.options).append(html.join(''));
            this.bonusPetit = '#bonusPetit';

            $("#additionaloptions ul li a").filter(function () {
                return $(this).text() === "Petit au bout"
            }).addClass('hidden');
        },
        displayChelemOptions: function () {
            if (!this.$(this.additionaloptions)) return;
            var html = [];
            html.push('<div class="form-group">' +
                '<div class="col-xs-6">' +
                '<label class="control-label">Chelem</label>' +
                '</div>' +
                '<div class="col-xs-6">' +
                '<select class="form-control" id="chelem">');
            html.push(Util.getEnumsToHTML(ENUMS.BONUS.CHELEM, false));
            html.push('</select></div></div>');

            this.$(this.options).append(html.join(''));
            this.bonusChelem = '#chelem';

            $("#additionaloptions ul li a").filter(function () {
                return $(this).text() === "Chelem"
            }).addClass('hidden');
        },
        displayPoigneeOptions: function () {
            if (!this.$(this.additionaloptions)) return;
            var html = [];
            html.push('<div class="form-group">' +
                '<div class="col-xs-6">' +
                '<label class="control-label">Poignee to</label>' +
                '</div>' +
                '<div class="col-xs-6">' +
                '<select class="form-control" id="player">');
            html.push(Util.getPlayersToHTML(this.players));
            html.push('</select></div>');

            html.push('<div class="col-xs-6">' +
                '</div>' +
                '<div class="col-xs-6">' +
                '<select class="form-control" id="poignee">');
            html.push(Util.getEnumsToHTML(ENUMS.POIGNEES, false));
            html.push('</select></div>');
            html.push('</div>');

            this.$(this.options).append(html.join(''));
            this.poignee = '#poignee';
            this.player = '#player'

            $("#additionaloptions ul li a").filter(function () {
                return $(this).text() === "Poignee"
            }).addClass('hidden');
        }
    });

    return Game2View;
});