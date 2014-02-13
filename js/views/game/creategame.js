/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/creategame.html'
], function ($, _, Backbone, createGameTemplate) {

    var HomeView = Backbone.View.extend({
        el: $("#container"),
        render: function () {
            var data = {};
            var compiledTemplate = _.template(createGameTemplate, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);
        },
        events: {
            "click #playerOptions label": 'addplayers'
        },
        addplayers: function (e) {
            var selected = $(e.currentTarget);
            var number = +selected.text().match(/\d+/g)[0];//extract number of players

            var html = '';
            for (var i = 1; i <= number; ++i) {
                html += '<div class="input-group">' +
                    '<span>Player ' + i + ': </span>' +
                    '<input type="text" class="form-control" placeholder="name">' +
                    '</div>';
            }

            var _players = $('#players');
            _players.empty();
            _players.append(html);

            var _startGame = $('#startgame a');
            _startGame.removeClass('hidden');
            _startGame.on('click', function () {
                Backbone.history.navigate('game1', {trigger: true});
            })
        }
    });

    return HomeView;
});