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

    
    //indexes represents the number of bouts the taker wins
    var BOUTS = {
        'NONE': { name: 0, points: 56 },
        'ONE': { name: 1, points: 51 },
        'TWO': { name: 2, points: 41 },
        'THREE': { name: 3, points: 36 }
    };

    //represents the extra points that can be win
    var POIGNEES = {
        'NONE': {name: 'None', points: 0},
        'SINGLE': {name: 'Single ( 10 atouts)', points: 20},
        'DOUBLE': {name: 'Double ( 13 atouts)', points: 30},
        'TRIPLE': {name: 'Triple ( 15 atouts)', points: 40}
    };
    
    //represents petit au bout
    var PETIT = {
        'NONE': {name: 'None', points: 0},
        'PETITWIN': { name: 'Petit au Bout win', points: 10},
        'PETITLOOSE': { name: 'Petit au Bout loose', points: -10}
    };
    
    //represents the chelem bonus
    var CHELEM = {
        'NONE': {name: 'None', points: 0},
        'CHELEMANNONCEDANDWIN': { name: 'Chelem annonced and win', points: 400},
        'CHELEMNOTANNONCEDANDWIN': {name: 'Chelem not annonced and win', points: 200 },
        'CHELEMANNONCEDANDLOOSE': {name: 'Chelem annonced and loose', points: -200 }
    };

    //represents the bonus
    var BONUS = {
        'PETIT' : PETIT,
        'CHELEM' : CHELEM 
    };
     
    //represents options menu context enumerator
    var OPTIONS = {
        'PETIT' : {name: "Petit au bout"},   
        'CHELEM' : {name: "Chelem"},   
        'POIGNEE' : {name: "Poignee"}   
    }
    
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
        OPTIONS : OPTIONS,
        BOUTS: BOUTS,
        POIGNEES: POIGNEES,
        KINGS: KINGS
    }
});