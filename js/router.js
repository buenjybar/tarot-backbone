/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'js/views/home/home',
    'js/views/game/creategame',
    'js/views/game/game1',
    'js/views/game/game2',
], function ($, _, Backbone, HomeView, CreateGameView, Game1View, Game2View) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'home': 'home',
            'creategame': 'creategame',
            'game1': 'game1',
            'game2': 'game2',
            'game/:id(/:play)': 'game',
            'score/:id(/:play)': 'score',
            'save': 'save',
            'load': 'load',
            'contacts': 'contacts',

            //default
            '*actions': 'defaultAction'
        },
        home: function () {
            var homeView = new HomeView();
            homeView.render();
        },
        creategame: function () {
            var createGame = new CreateGameView();
            createGame.render();
        },
        game: function (id, play) {
//            var gameView = new GameView();
//            gameView.render();
        },
        game1: function () {
            var game1View = new Game1View();
            game1View.render();
        },
        game2: function () {
            var game2View = new Game2View();
            game2View.render();
        },
        score: function (id, play) {

        },
        save: function () {

        },
        load: function () {

        },
        contacts: function () {

        },
        defaultAction: function (actions) {
            console.log("No route: " + actions);
        }
    });

    var initialize = function () {
        this._intance = new AppRouter;

//        app_router.on("home", function () {
//            var homeView = new HomeView();
//            homeView.render();
//        });
//
//        app_router.on("creategame", function () {
//            var createGame = new CreateGameView();
//            createGame.render();
//        })
//
//        app_router.on("game", function (id, play) {
//            var gameView = new GameView();
//            gameView.render();
//        });
//
//        app_router.on("defaultAction", function (actions) {
//            console.log("No route: " + actions);
//        });

        Backbone.history.start();
    };

    var navigate = function () {
        return this._intance.navigate
    }

    return {
        initialize: initialize,
        navigate: navigate
    };
});