/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'js/models/game',
    'js/models/trick',
    'js/views/home/home',
    'js/views/game/creategame',
    'js/views/game/game1',
    'js/views/game/game2',
    'js/views/scores/scores'
], function ($, _, Backbone, Game, Trick, HomeView, CreateGameView, Game1View, Game2View, ScoresView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'home': 'home',
            'newgame': 'creategame',
            'games/' : 'creategame',
            'games/:id(/)': 'game1',
            'games/:id/plays/:play(/)': 'game1',
            'games/:id/plays/:play/suite(/)': 'game2',
            'scores/(:id(plays/:play))': 'scores',
            'save': 'save',
            'load': 'load',
            'contacts': 'contacts',

            //default
            '*actions': 'defaultAction'
        },
        home: function () {
            new HomeView().render();
        },
        creategame: function () {
            new CreateGameView().render();
        },
//        games: function (id, play) {
//            if (play == null) {
//                //go to game1 view then game2 view
//                this.game1(id, play);
//            } else if (play.match(/suite/)) {
//                //go to game2
//                this.game2(id, play);
//            } else {
//                //go to gamedetail view
//            }
//        },
        game1: function (id, play) {
            new Game1View({ gameid: id, playid: play});
        },
        game2: function (id, play) {
            new Game2View({ gameid: id, playid: play });
        },
        scores: function (id, play) {
            new ScoresView({ gameid: id }).render();
        },
        save: function () {
        },
        load: function () {
        },
        contacts: function () {
        },
        defaultAction: function (actions) {
            console.log("No route: " + actions);
            this.home();
        }
    });

    function getCurrentGame() {
        return window.app.getGameCollection().getCurrentGame();
    }

    return AppRouter
});