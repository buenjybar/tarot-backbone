var verbose = true;
var express = require('express');
var app = express();
var testData = {
    "players": [
        {
            "name": "ben",
            "id": "p1"
        },
        {
            "name": "bob",
            "id": "p2"
        },
        {
            "name": "marie",
            "id": "p3"
        },
        {
            "name": "pierre",
            "id": "p4"
        },
        {
            "name": "charles",
            "id": "p5"
        }
    ],
    "id": "test",
    "name": "gameTests",
    "date": "2014-03-18T03:18:12.996Z",
    "tricks": [
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
        response.send(200);
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
        response.send(200);
    }
});

app.listen(3000, function () {
    console.log('server started');
});





