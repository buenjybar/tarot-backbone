define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var Debug = function(){
        view.on('all', function(eventName){
            console.log('Name of View: ' + eventName);
        });   
    }
 


    return Debug;
}