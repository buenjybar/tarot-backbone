var verbose = true;
var express = require('express');
var app = express();
var testData = {
    "players": [
        {
            "name": "ben"
        },
        {
            "name": "bob"
        },
        {
            "name": "marie"
        },
        {
            "name": "pierre"
        },
        {
            "name": "charles"
        }
    ],
    "id": "test",
    "name": "gameTests",
    "date": "2014-03-18T03:18:12.996Z",
    "tricks": [
        {
            "urlRoot": "http://localhost:3000/games/41v2t9/",
            "id": "1",
            "bid": {
                "name": "Garde",
                "points": "2"
            },
            "bonusPetit": {
                "name": "Petit au Bout win",
                "points": "10"
            },
            "bonusChelem": {
                "name": "Chelem annonced and loose",
                "points": "-200"
            },
            "bout": {
                "name": "1",
                "points": "51"
            },
            "poignee": {
                "player": {
                    "name": "charles"
                },
                "value": {
                    "name": "Double ( 13 atouts)",
                    "points": "30"
                }
            },
            "king": {
                "name": "Hearts",
                "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsIAAA7CARUoSoAAAAHqSURBVEhLY0AGa/X0xN5wci57y8HxFYjP3uXjc4VKoYBrQkJuz3l4Lj7n5v7/gJ9/+2JdXXWoFAK8Y2Pz+cXE9PA/A8N/GP7DyPj1IytrB1QJGID4v4HiyOq+MzO/esLFlQRVwsDwnJPTHKj5L7IiOGZk/P+enb0BpA5Eg/hY1TEx/X/Iw+MPNvAbM/NxrIqgGOiiHzdFRLxBNDZ5GP7CwnKD4YqwsBNO1yHh92xsr7GJI2OgOT8YXnJwTMQmSQ7+y8Dwm+EVB8ckbJLk4H8gA6+KiNgBnfoHmwJSMdjLIPCVmfkQNgWk4g+srPfBBj7l4bHFmRyIxUD9V4SEcsEGgsAnVtZ+rAqJxC+4uI4AWUxQ4xgYQkNDmX8wMx/AppgQ/sDG9nKesrIs1CgEuMHDIwLMfrewacKFv7Gw/DgoJWUFNQITPOblVQUa+hKbZnT8i5n5/xkhoUCoVtzgGSenKTCbfcNmCBwD8+41QcEUqBbC4B0Xl88/XDEPFL/Hx1cDVUo8AObfQmwGPuPmngdVQjoABvpqZMOAMXqBIS2NFSpNOrgmJSUMjKQ3IMN+MjP/PiIlZQCVIh/AvP6Im3smVIgycIWPT+gLG9urw9LS+lAhysENfv7mQgsLTiiXYsAY7e5uC2XjAQwMAM1qHcLKhxmPAAAAAElFTkSuQmCC"
            },
            "taker": {
                "name": "bob"
            },
            "called": {
                "name": "pierre"
            },
            "others": null,
            "points": "56"
        }
    ],
    "playerNumber": 5,
    "currentTrick": null,
    "trickCounter": 0
};

var gameColl = [];
gameColl.push(testData);

var addGameToCollection = function (game) {
    if (game == null) return;
    //check if data is valid
    if (verbose) console.log('addGameToCollection %s', game.id);
    gameColl.push(game);
};
var addPlayToGame = function (game, play) {
    if (game == null || play == null) return;
    //check if data is valid
    if (verbose) console.log('addPlayToGame %s %s', game.id, play.id);
    if (game.tricks) game.tricks.push(play);
};

var getGameById = function (id) {
    if (id == null) return null;
    if (verbose) console.log('getGameById %s', id);
    var idx = gameColl.map(function (obj) {
        return obj.id;
    }).indexOf(id);

    if (idx < 0) return null;
    else return gameColl[idx];
};
var getPlayById = function (game, id) {
    if (game == null || id == null) return null;
    if (verbose) console.log('getPlayById %s %s', game.id, id);
    for (var i = 0; i < game.tricks.length; ++i) {
        if (game.tricks[i].id == id) return game.tricks[i];
    }
    return null;
};

var allowCrossDomain = function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.configure(function () {
    app.use(express.bodyParser());//parse JSON object
    app.use(allowCrossDomain);//allow crossDomain
});


app.get('/games/', function (request, response) {
    var nbr = gameColl.length;
    console.log('GETALL: ' + nbr);
    response.json({ length: nbr, gameColl: gameColl});
});

app.get('/games/:id/', function (request, response) {
    if (request.params && request.params.id) response.json(getGameById(request.params.id));
});
app.get('/games/:id', function (request, response) {
    if (request.params && request.params.id)  response.json(getGameById(request.params.id));
});
app.put('/games/:id/', function (request, response) {
    if (!request.params || !request.params.id) {
        response.send(500);
    } else {
        if (getGameById(request.params.id) != null) {
            response.send(500);
        }
        addGameToCollection(request.body);
    }
});

app.get('/games/:id/plays/:play', function (request, response) {
    var play = null,
        game = null;
    if (request.params && request.params.id) {
        game = getGameById(request.params.id);
        if (game && request.params.play) {
            play = getPlayById(game, request.params.play)
        }
    }
    response.json(play);
});
app.get('/games/:id/plays/:play/', function (request, response) {
    var play = null;
    if (request.params && request.params.id) {
        play = getPlayById(request.params.id, request.params.play)
    }
    response.json(play);
});
app.put('/games/:id/plays/:play/', function (request, response) {
    if (!request.params || !request.params.id) {
        response.send(500);
    } else {
        var game = getGameById(request.params.id);
        if (game == null) {
            response.send(500);
        }
        addPlayToGame(game, request.body);
    }
});

app.listen(3000, function () {
    console.log('server started');
});





