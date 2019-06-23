
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
PeopleArr = [];
WolfArr = [];
grassEaterArr = [];
AmenakerArr = [];
matrix = [];
grassHashiv = 0;
PeopleCount = 0;
WolfCount = 0;
AmenakerCount = 0;
grassEaterCount = 0;
seasonCount = 0;
 weather = "";
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, grassEaterEater, waterArr, fireArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < grassEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < waterArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fireArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 1, 5,2,3,1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterCount++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }else if (matrix[y][x] == 3) {
                var people = new people(x, y);
                PeopleArr.push(people);
                PeopleCount++;
            }else if (matrix[y][x] == 4) {
                var wolf = new wolf(x, y);
                WolfArr.push(wolf);
                WolfCount++;
            }else if (matrix[y][x] == 5) {
                var amenaker = new amenaker(x, y);
                AmenakerArr.push(grassamenaker);
                AmenakerCount++;
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (WolfArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassWolfArr[i].eat();
            grassWolfArr[i].move();
            grassWolfArr[i].mul();
            grassWolfArr[i].die();
        }
    }
    if (PeopleArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassPeopleArr[i].eat();
            grassPeopleArr[i].move();
            grassPeopleArr[i].mul();
            grassPeopleArr[i].die();
        }
    }
    if (AmenakerArr[0] !== undefined) {
        for (var i in AmenakerArr ) {
            AmenakerArr[i].eat();
            AmenakerArr[i].move();
            AmenakerArr[i].mul();
            AmenakerArr[i].die();
        }
    }
    //! Object to send


    seasonCount++;
    if(seasonCount <= 10){
        //dzmer
        weather = "winter";
    }
    else if(seasonCount <= 20)
    {
        //garun
        weather = "spring";

    }
    else if(seasonCount <= 30)
    {
        //amar
        weather = "summer";

    }
    else if(seasonCount < 40)
    {
        //ashun
        weather = "autumn";

    }
    else{
        seasonCount = 0;
    }

    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCount: grassEaterCount,
        weather: weather
    }


    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)