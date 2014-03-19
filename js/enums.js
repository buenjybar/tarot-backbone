/**
 * Created by ben on 2/13/14.
 */

define(function () {

    //represents the different bids and the number of point to do
    var BIDS = {
        'NONE': {name: 'None', points: 0},
        'PETITE': {name: 'Petite', points: 1},
        'GARDE': {name: 'Garde', points: 2},
        'GARDESANS': {name: 'Garde Sans', points: 4},
        'GARDECONTRE': {name: 'Garde Contre', points: 6}
    };

    
    //indexes represents the number of bouts the taker wins
    var BOUTS = {
        'NONE': { name: '0', points: 56 },
        'ONE': { name: '1', points: 51 },
        'TWO': { name: '2', points: 41 },
        'THREE': { name: '3', points: 36 }
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
        'NONE': {name: 'None', img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='},
        'DIAMONDS': {name: 'Diamonds', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsIAAA7CARUoSoAAAAGhSURBVEhLpZTBSgJRFIavztw7MzKO6cZ04YC0Cnct6wGG9vYIrooeIEKiaBsV7aNFgSRCW2tlm2pliFQE0qpSzCwLbWNHOVrmnZwZP/gZ557//OD1HIlVcuHwAn4cnwdVnWsJQvVeVWfxyDnbhiF9iOJNm5D2pygWk/E4w5IzqoztdMJ6epGkLSzZp+T1zrddrn5YV/Be0jQDLda5ikRCTUEoD4Sh4Pz5Qtcn0WqBZFJsUHrOC+vpndIcSaUE7PifV0qPeSF/VWcshS0mwA2B6YjXbCbwH2L3IHEYhzqlGV7TKEFfeiaRoBhFSEbXJ+DOznhmq3qj9DQbjfrIZTAYg4G945nsChagQHKhUAR+sZOhebMr6IecNH5p2AhZ3nMcCn01Wd7FqB8qkrRpOxT8VUnawIhhyh7PquVQ8IF/BVvNqSjK+shQqINvDVtGU2PsgBuEgvo+Wq2xBP+DME7XvDAYj3xnEdBqnaLfH/tyu1u/w+C9WQgEptFinydFWe7fJzwfFWURS86BtequJTyzeDQeBU2bajCWv/X5onhkAiHfXqWyAeqYvvoAAAAASUVORK5CYII='},
        'SPADES': {name: 'Spades', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAb5JREFUSEutVD9Lw0Ac/d1dm6SX2lSrlKoUSgdBLBaU4qqI+gFEJ3HSr6BbZzd3J1EQFAfB2dlB/ADiog7FQaG4VCvGl2uiUK82/fPg5d7vzz3ucslRKLguo8fHmB/1AZOTBk1NzfpRH5BKjZKUZ37UB0i5TUK4NDIy7Wd6wMTEAMyeoFyKRq8ayV5gmsd4uoqMuWRZuyrfFaTcVSaBYWAaj6965c4g5dYfs4Cc11FfgQ4JKTcxSW8WkPMa+pag20DKjbZmARumy9AtYNvroc0Ceqa2PQ/dBMdZRPETSj/xPwpRpWSyAO0jk8ki+QqlnxCGkcgdftE4NGCalyrZK01zj2h4eK3l59EpOa94p3qvLXZDxt6JYrGqttgNGfvwTndfW2xmmNfCORZXKiVwwg/ahoCG8Yb/9xl9dW09oGGcYgQcZwHu2L+mSYgKJRKHGF8wHrRcqRD36iL+wdDQnLrvhHiHuddQQ3xB+fwM9C06vM/iGJPmkb9B7svvqyJ/RNlspmHUjHQ6h5u5SIXCoIoN4wTP35VY1o6XpvHxMeysSLlcWsX/olyOqNcQjV6rLTJWVyT6VLFpniuzPyD6BtVhAVmMAdQxAAAAAElFTkSuQmCC'},
        'CLUBS': {name: 'Clubs', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAAiJJREFUSEudVE1rE0EYfncmk93t5qMN3W3aEg9pLmkoevIgQRFE0IsHKd48efMi+AOK0EuPvdSL0IIXD6UEehAUAlJaqv6D/oX6Ub+j1azPO80m/ZiQaR54Zt6d95lnZnbeXRqIYvEqBcEWeECZzCZVKrOdzBBw3UUS4huiuEsp98n3H3L6fPD9J+Q4PaPj5PGRkfuILRGGFeysjchsyJTyA5XLecQWCILHaM1GCXmXmcwdxBbwvBW0ZqOEbBgEjxBbwPeX0JqNEh7t8AFiC2Szt/peSEIhYioUqogtMD8vSan3iMxmTNd9gf4cmJiIKJXaQ3TWLJ3epoWFFGILFItVHOUmDGtUr4e4oKcY7Zl53jOYeRRFc1rHeiPy+Us4ZhP11dbvhynlLk1PX8eOXkMRI78Dg9sYf3tM00a+qed3MTp6EYkviE4ejSlEC+LnyH+lXK6B519GHc9nHw2l3unBflSqhU/tAO/0nzGfUKltovHxewNLxJaO85trrmFMDkPHwfefzW4Yk8NQG4bhXasj22la6AEuB5MgoVI/cSmfcSmHxnxCpd6gB8bGarj2T3rwNIX4gXJYRc9ls47+u1En5Uft00WhMIsVXiLxB5OOipbLoFSqo29Cwc+7NDV1A5qtrob1PK/vjyIMZ7DSFZqcvKCfXXcZbW8n6fQaxbGEcUnroqjMssHI5S5j5Vf6MhznL3jYIe90B6/hGoxFR90B0X8eEB2q/JgUygAAAABJRU5ErkJggg=='},
        'HEARTS': {name: 'Hearts', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsIAAA7CARUoSoAAAAHqSURBVEhLY0AGa/X0xN5wci57y8HxFYjP3uXjc4VKoYBrQkJuz3l4Lj7n5v7/gJ9/+2JdXXWoFAK8Y2Pz+cXE9PA/A8N/GP7DyPj1IytrB1QJGID4v4HiyOq+MzO/esLFlQRVwsDwnJPTHKj5L7IiOGZk/P+enb0BpA5Eg/hY1TEx/X/Iw+MPNvAbM/NxrIqgGOiiHzdFRLxBNDZ5GP7CwnKD4YqwsBNO1yHh92xsr7GJI2OgOT8YXnJwTMQmSQ7+y8Dwm+EVB8ckbJLk4H8gA6+KiNgBnfoHmwJSMdjLIPCVmfkQNgWk4g+srPfBBj7l4bHFmRyIxUD9V4SEcsEGgsAnVtZ+rAqJxC+4uI4AWUxQ4xgYQkNDmX8wMx/AppgQ/sDG9nKesrIs1CgEuMHDIwLMfrewacKFv7Gw/DgoJWUFNQITPOblVQUa+hKbZnT8i5n5/xkhoUCoVtzgGSenKTCbfcNmCBwD8+41QcEUqBbC4B0Xl88/XDEPFL/Hx1cDVUo8AObfQmwGPuPmngdVQjoABvpqZMOAMXqBIS2NFSpNOrgmJSUMjKQ3IMN+MjP/PiIlZQCVIh/AvP6Im3smVIgycIWPT+gLG9urw9LS+lAhysENfv7mQgsLTiiXYsAY7e5uC2XjAQwMAM1qHcLKhxmPAAAAAElFTkSuQmCC'}
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