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
], function ($, _, Backbone, createGameTemplate, Util, Game, Collection) {

    var HomeView = Backbone.View.extend({
        el: $("#container"),
        $players: null,
        currentNumber : 0,
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
            if(diff > 0) {
                var html = '';
                for (var i = 1; i <= diff; ++i) {
                    html += '<div class="col-xs-12">' +
                        '<span>Player ' + (i + this.currentNumber) + ': </span>' +
                        '<input type="text" class="form-control" placeholder="name">' +
                        '</div>';
                }
                this.$players.last().append(html);
            } else {
                for(var i = 0 ; i < -diff; ++i){
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

            //valid = true;//TODO remove <--
            if (valid) {
                names.forEach(function (name) {
                    players.push({
                        name: name,
                        img: Util.getRandomAvatarImg()
                    });
                });

                //create a new game
                //var game = new Game();

                //add game to game collection
                var gameColl = window.app.getGameCollection();
                var game = gameColl.create({ players: players });

                //this.goToNext(game.get('id'));
                this.goToNext(game.cid);
            } else {
                Util.displayErrorMessage("<strong>Warning</strong> please, make sure player names are uniques");
            }
        },
        goToNext: function (id) {
            Backbone.history.navigate('#/games/' + id, {trigger: true});
        }
    });

    return HomeView;
});