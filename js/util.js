/**
 * Created by ben on 2/13/14.
 */

define([], function () {
    //Static class
    function Util() {
    };

    //static method get New ID
    Util.getNewId = function () {
        return Math.random().toString(36).substring(12);
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
    
    Util.getEnumsToHTML = function(enums){
        var html = '';
        for(var prop in enums){
            var el = enums[prop];
            var name = el.name != undefined ? el.name : el;
            html += '<option>'+ name +'</option>';
        }
        return html;
    }

    return Util;
});