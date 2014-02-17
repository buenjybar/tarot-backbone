/**
 * Created by ben on 2/13/14.
 */

define(function () {

    //represents the different bids and the number of point to do
    var BIDS = {
        'NONE': {name: 'None', multiply: 0},
        'PETITE': {name: 'Petite', multiply: 1},
        'GARDE': {name: 'Garde', multiply: 2},
        'GARDESANS': {name: 'Garde Sans', multiply: 4},
        'GARDECONTRE': {name: 'Garde Contre', multiply: 6}
    };

    //represents the bonus
    var BONUS = {
        'NONE': {name: 'None', points: 0},
        'PETIT': { name: 'Petit au bout', points: 10},
        'SLAMANNONCED': { name: 'Chelem annonce', points: 400},
        'SLAM': {name: 'Chelem non annonce', points: 200 }
    };

    //indexes represents the number of bouts the taker wins
    var BOUTS = {
        'NONE': { name: 0, points: 56 },
        'ONE': { name: 1, points: 51 },
        'TWO': { name: 2, points: 41 },
        'THREE': { name: 3, points: 36 }
    }

    //represents the extra points that can be win
    var POIGNEES = {
        'NONE': {name: 'None', points: 0},
        'SINGLE': {name: 'Single', points: 20},
        'DOUBLE': {name: 'Double', points: 30},
        'TRIPLE': {name: 'Triple', points: 40}
    };

    //represents the 4 kings and their images
    var KINGS = {
        'NONE': {name: 'None', img: ''},
        'DIAMONDS': {name: 'Diamonds', img: ''},
        'SPADES': {name: 'Spades', img: ''},
        'CLUBS': {name: 'Clubs', img: ''},
        'HEARTS': {name: 'Hearts', img: ''}
    };

    return {
        BIDS: BIDS,
        BONUS: BONUS,
        BOUTS: BOUTS,
        POIGNEES: POIGNEES,
        KINGS: KINGS
    }
});