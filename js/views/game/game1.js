/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/game1.html',
    'enums',
    'util',
    'js/collections/gamecollection'
], function ($, _, Backbone, game1Template, ENUMS, Util, GameCollection) {

    var Game1View = Backbone.View.extend({
        el: $("#container"),
        $taker: null,
        $contract : null,
        $king: null,
        render: function () {
            var data = {};
            var compiledTemplate = _.template(game1Template, data);            
            this.$el.empty();
            this.$el.append(compiledTemplate);
            
            this.$taker = $('#taker');
            this.$contract = $('#contract');
            this.$king = $('#king');
            
            this.$taker.append();
            this.$contract.append(Util.getEnumsToHTML(ENUMS.BIDS));
            this.$king.append(Util.getEnumsToHTML(ENUMS.KINGS));
        },
        events: {
            'click #game1 button:submit': 'checkValidForm'
        },
        checkValidForm: function(){
            var valid = true;
            
            var taker = this.$taker.find(':selected');
            var contract = this.$contract.find(':selected');
            var king = this.$king.find(':selected');
            
            var gameBypassed = contract.text().toLowerCase() === 'none';
            if(gameBypassed){
                //implement game Bypassed
                //confirm box?
            }        
            
            if(valid){
                
                this.goToNext();
            } else {
                Util.displayErrorMessage("<strong>Warning</strong> Please make sure a taker and a contract is set");
            }
        },
        goToNext: function () {
            Backbone.history.navigate('game2', {trigger: true});
        }
    });

    return Game1View;
});