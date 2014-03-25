/**
 * Created by ben on 2/13/14.
 */

define([
    'underscore',
    'backbone',
    'enums',
    'util'
], function (_, Backbone, ENUMS, Util) {

    var Trick = Backbone.Model.extend({
        url: function () {
            return this.urlRoot + 'plays/' + this.id + '/';
        },
        defaults: function () {
            return {
                id: _.uniqueId(),
                bid: ENUMS.BIDS.NONE,
                bonusPetit: ENUMS.BONUS.PETIT.NONE,
                bonusChelem: ENUMS.BONUS.CHELEM.NONE,
                bout: ENUMS.BOUTS.NONE,
                poignee: ENUMS.POIGNEES.NONE,
                king: ENUMS.KINGS.NONE,
                taker: null,
                called: null,
                dead: null,
                others: null,
                points: 0
            }
        },
        initialize: function (options) {
            this.urlRoot = options.urlRoot;
//            this.save();
        },
        update: function (options) {
            this.save(options);
        },
        computePoints: function (players) {

            //2 times for the taker others -
            function getScoreAt3(name) {
                if (name == taker['name'])
                    return 2 * points;
                else
                    return -points;
            };

            //3 times for taker others -
            function getScoreAt4(name) {
                if (name == taker['name'])
                    return 3 * points;
                else
                    return -points;
            };

            // we can call himself so sum of taker and called
            function getScoreAt5(name) {
                var sum = 0;
                if (name == taker['name'])
                    sum += 2 * points;
                if (name == called['name'])
                    sum += points;

                if (sum > 0)
                    return sum;
                else
                    return -points;
            };

            //filter the dead person otherwise it s a normal 5 players game
            function getScoreAt6(name) {
                if (name == dead['name'])
                    return 0;
                else
                    return getScoreAt5(name);
            };


            //compte this trick points
            function getTrickPoints(){
                var pt = takerPts - bout;
                return (25 + pt + bonusPetit) * multiplier + bonusPoignee + bonusChelem;
            }

            var taker = this.get('taker');
            var called = this.get('called');
            var dead = this.get('dead');
            var number = players.length;
            var takerPts = +this.get('points');
            var bout = +this.get('bout')['points'];
            var bonusPetit = +this.get('bonusPetit')['points'];
            var bonusChelem = +this.get('bonusChelem')['points'];
            var multiplier = +this.get('bid')['points'];
            var bonusPoignee = +this.get('poignee')['value']['points'];

            var points = getTrickPoints();

            var result = [];
            var pts, name;
            _.each(players, function (player) {
                pts = 0;
                name = player['name'];

                switch (number) {
                    case 3:
                        pts = getScoreAt3(name);
                        break;
                    case 4:
                        pts = getScoreAt4(name);
                        break;
                    case 5:
                        pts = getScoreAt5(name);
                        break;
                    case 6:
                        pts = getScoreAt6(name);
                        break;
                    default :
                        pts = 0;
                        break;
                }

                result.push({player: player['name'], points: pts});
            }, this);

            return result;
        }
    });

    return Trick;
});