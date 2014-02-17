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
        backbonedebug: 'js/libs/backbone/backbone.debug',
        bootstrap: 'js/libs/bootstrap/bootstrap.min',
        text: 'js/libs/text',
        q: 'js/libs/q/q.min',

        //app
        app: 'js/app',
        router: 'js/router',
        enums: 'js/enums',
        util: 'js/util'
    },
    shim: {
        underscore: {exports: '_'},
        backbone: { deps: ["underscore", "jquery"], exports: 'Backbone'},
        backbonedebug: {deps: ["backbone"]}
    },
    waitSeconds: 0
});

require([
    'app',
], function (App) {

    App.initialize();
});