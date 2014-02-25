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

    Util.setCurrentCollection = function (col) {
        currentCollection = col;
    };

    Util.getCurrentCollection = function (col) {
        return currentCollection;
    };

    //static method get New ID
    Util.getNewId = function (prefix) {
        //return _.uniqueId(prefix);
        return Math.random().toString(36).substring(12);
    };

    Util.getNewGameId = function (prefix) {
        return Math.random().toString(36).substring(12);
    };

    Util.getRandomAvatarImg = function () {

    };

    Util.isOnlyUniqueValues = function (array) {
        if (!array || array.length < 1)
            return false;

        var length = array.length;

        return (length === _.uniq(array).length);
    };

    Util.displayErrorMessage = function (msg, force) {
        var alert = $('.alert-danger');
        if (alert.length < 1) {
            $("#container :first").prepend("<div class='alert alert-danger'></div>");
            alert = $('.alert-danger');
        }

        var unlimited = force !== undefined ? force : false;
        if (unlimited) {
            alert.html(msg).show();
        } else {
            alert.html(msg).show().delay(5000).fadeOut();
        }
    };

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

    Util.getEnumsToHTML = function (enums, removeNone) {
        var hide = removeNone !== undefined ? removeNone : false;
        var html = '';
        for (var prop in enums) {
            if(hide === true && prop.toLowerCase() === 'none') 
                continue;
            var el = enums[prop];
            var name = el.name != undefined ? el.name : el;
            var value = el.points != undefined ? el.points : null;
            html+= '<option value="' + value + '">' + name + '</option>';
        }
        return html;
    };

    Util.getPlayersToHTML = function (players) {
        var html = '';
        if (!players || !players.length) return html;
        for (var i = 0; i < players.length; ++i) {
            html += '<option>' + players[i].get('name') + '</option>';
        }
        return html;
    };
    
    Util.getOptionsToHTML = function (options) {
        var html = '<li role="presentation" class="dropdown-header">click to add options</li>';
        if(!options) return html;
        
        for(var prop in options){
            var name = options[prop] !== undefined ? options[prop].name : options[prop];
            html+= '<li><a role="menu-item">' + name + '</a></li>'
        }
        
        return html;
    };

    return Util;
});