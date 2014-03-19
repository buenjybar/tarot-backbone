/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/creategame.html',
    'util',
    'js/models/game',
    'js/collections/gamecollection'
], function ($, _, Backbone, createGameTemplate, Util, Game) {

    var HomeView = Backbone.View.extend({
        el: $("#container"),
        $players: null,
        currentNumber: 0,
        randomPlayers: ['ben', 'bob', 'marie', 'pierre', 'charles', 'nico'],
        render: function () {
            var data = {};
            var compiledTemplate = _.template(createGameTemplate, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);

            this.$players = $('#players');
            $('#playerOptions :first').click();//simulate 3 players click
        },
        events: {
            'click #playerOptions label': 'addPlayers',
            'click #playagame a': 'checkValidForm'
        },
        addPlayers: function (e) {
            var selected = $(e.currentTarget);
            var number = +selected.text().match(/\d+/g)[0];//extract number of players
            var diff = number - this.currentNumber;
            if (diff > 0) {
                var html = [];
                for (var i = 1; i <= diff; ++i) {
                    html.push(
                        '<div class="col-xs-12">' +
                        '<span>Player ' + (i + this.currentNumber) + ': </span>' +
                        '<input type="text" class="form-control" placeholder="name" value="' + this.randomPlayers[this.currentNumber + i - 1] + '">' +
                        '</div>'
                    );
                }
                this.$players.last().append(html.join(''));
            } else {
                for (i = 0; i < -diff; ++i) {
                    this.$players.children().last().remove();
                }
            }
            this.currentNumber = number;

            $('#playagame a').removeClass('hidden');
        },
        checkValidForm: function () {
            var valid = true;
            var players = [];
            var names = [];

            var elements = this.$players.find('input');
            elements.map(function (i) {
                names.push(elements[i].value);
            });
            valid = names.length > 2 && names.length < 7 && Util.isOnlyUniqueValues(names);

            if (valid) {
                names.forEach(function (name) {
                    players.push({
                        name: name
                    });
                });
                //add game to game collection
                var gameColl = window.app.getGameCollection();

                var game = gameColl.create(new Game());
                game.addPlayers(players);

                var play = game.createNewTrick();
                play.save();

                this.goToNext(game.id, play.id);
            } else {
                Util.displayErrorMessage("<strong>Warning</strong> please, make sure player names are uniques");
            }
        },
        goToNext: function (gameid, playid) {
            Backbone.history.navigate('games/' + gameid + '/plays/' + playid, {trigger: true});
        }
    });

    return HomeView;
});