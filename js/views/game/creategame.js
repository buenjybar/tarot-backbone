/**
 * Created by ben on 2/12/14.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/creategame.html',
    'util',
    'js/models/game',
    'js/collections/gamecollection'
], function ($, _, Backbone, createGameTemplate, Util, Game, Collection) {

    var HomeView = Backbone.View.extend({
        el: $("#container"),
        $players: null,
        render: function () {
            var data = {};
            var compiledTemplate = _.template(createGameTemplate, data);
            this.$el.empty();
            this.$el.append(compiledTemplate);
            
            this.$players = $('#players');
            $('#playerOptions :first').click();//simulate 3 players click
        },
        events: {
            'click #playerOptions label': 'addPlayers',
            'click #playagame a' : 'checkValidForm'
        },
        addPlayers: function (e) {
            var selected = $(e.currentTarget);
            var number = +selected.text().match(/\d+/g)[0];//extract number of players

            var html = '';
            for (var i = 1; i <= number; ++i) {
                html += '<div class="input-group">' +
                    '<span>Player ' + i + ': </span>' +
                    '<input type="text" class="form-control" placeholder="name">' +
                    '</div>';
            }
            
            this.$players.empty();
            this.$players.append(html);

            $('#playagame a').removeClass('hidden');
        },
        checkValidForm: function(){
            var valid = true;
            var players = [];
            var names = [];
            
            var elements = this.$players.find('input');
            elements.map(function(i){
                names.push(elements[i].value);
                
            });
            valid = names.length > 2 && names.length < 7 && Util.isOnlyUniqueValues(names);
                        
            valid = true;//TODO remove <--
            if(valid) {
                names.forEach(function(name){
                    players.push({
                        name: name,
                        img: Util.getRandomAvatarImg()
                    });
                });
                
                //create a new game
                var game = new Game({name: 'game1'});
                game.addPlayers(players);
                
                //add game to collection
                Util.getCurrentCollection().addGame(game);
                
                this.goToNext();
            } else {
                Util.displayErrorMessage("<strong>Warning</strong> please, make sure players names are uniques");
            }
        },
        goToNext: function(){
            Backbone.history.navigate('games', {trigger: true});
        }
    });

    return HomeView;
});