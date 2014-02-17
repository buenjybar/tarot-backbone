/**
 * Created by ben on 2/13/14.
 */

define([
    'underscore'
], function (_) {
    var currentCollection = null;
    //Static class
    function Util() {
    };
    
    Util.setCurrentCollection = function(col){
        currentCollection = col;
    };

    Util.getCurrentCollection = function(col){
        return currentCollection;
    };
    
    //static method get New ID
    Util.getNewId = function (prefix) {
        return _.uniqueId(prefix);
        //return Math.random().toString(36).substring(12);
    };

    Util.getNewGameId = function (prefix) {
        return Math.random().toString(36).substring(12);
    };
    
    Util.getRandomAvatarImg = function(){
        
    };
    
    Util.isOnlyUniqueValues = function(array){
        if(!array || array.length < 1)
            return false;
    
        var length = array.length;
        
        return (length === _.uniq(array).length);
    };
    
    Util.displayErrorMessage = function(msg, force){
        var alert = $('.alert-danger');
        if(alert.length < 1){
            $("#container :first").prepend("<div class='alert alert-danger'></div>");
            alert = $('.alert-danger');
        }
        
        var unlimited = force !== undefined ? force : false;
        if(unlimited){
            alert.html(msg).show();
        } else {
            alert.html(msg).show().delay(5000).fadeOut();   
        }
    }
    
    //static method used to load an image from local storage
    Util.loadImage = function (path_to_img, callback) {
        var img = new Image();

        function onload() {
            if (img.complete) {
                if (callback) {
                    callback({img: img});
                }
                return;
            }
        }

        img.src = path_to_img;
        img.onload = onload;
        onload();
    };
    
    Util.getEnumsToHTML = function(enums){
        var html = '';
        for(var prop in enums){
            var el = enums[prop];
            var name = el.name != undefined ? el.name : el;
            html += '<option>'+ name +'</option>';
        }
        return html;
    }

    Util.getPlayersOption = function(players){
        var html = '';
        if(!players || players.length < 1) return html;
        for(var i = 0; i< players.length; ++i){
            html+= '<option>' + players[i].get('name') + '</option>';
        }
        return html;
    };
    
    return Util;
});