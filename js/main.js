/**
 * Created by ben on 2/12/14.
 */
require.config({
    baseUrl: '.',
    paths: {
        //libs
        jquery: 'js/libs/jquery/jquery-1.11.0.min',
        underscore: 'js/libs/underscore/underscore-min',
        backbone: 'js/libs/backbone/backbone',
        bootstrap: 'js/libs/bootstrap/bootstrap.min',
        text: 'js/libs/text',

        //app
        app: 'js/app',
        router: 'js/router'

    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: 'Backbone'
        }
    },
    waitSeconds: 0
});

require([
    'app',
], function (App) {

    App.initialize();
});