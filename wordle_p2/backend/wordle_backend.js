/**
 * read    GET - Safe, Idempotent, Cachable
 * update  PUT - Idempotent
 * delete  DELETE - Idempotent
 * create  POST
 *
 * https://restfulapi.net/http-methods/
 * https://restfulapi.net/http-status-codes/
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 * https://restfulapi.net/rest-put-vs-post/
 **/

const maxPlayers = 5;
let numPlayers = 0;
let serverStats = {wins: 0, losses: 0};
const port = 8510; 
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const fs = require('fs');
const http = require('http');
const{WebSocketServer} = require('ws');
const server = http.createServer(app);
const wsServer = new WebSocketServer({server: server});
const Wordle = require("./model.js");
const { off } = require('process');

wsServer.on("connection", (ws, req) =>{
	//reject if too many players
	if(numPlayers >= maxPlayers){
		ws.send("Too Many Players.");
		ws.close();
		return;
	}
	numPlayers++;
	//handle client messages
	ws.on('message', (message) =>{
		//not sure what to do here
		//this is where I process guesses???

		//let other clients know
		wsServer.clients.forEach(client =>{
			if (client !== ws && client.readyState === WebSocket.OPEN){
				client.send(message);
			}
		});
	});
	ws.on('close', () => {
        connectedPlayers--;
        // Update stats if necessary
        // Broadcast updated stats to all clients
    });
});

const database = {};
var words = ["words"]; // just in case!!
// const wss = new WebSocket.Server({ server });
/******************************************************************************
 * word routines
 ******************************************************************************/

// Read in all words, lets hope this finished before we need the words!
// https://www.memberstack.com/blog/reading-files-in-node-js
fs.readFile('./words.5', 'utf8', (err, data) => {
        if (err)console.error(err);
        else words = data.split("\n");
});



/******************************************************************************
 * middleware
 ******************************************************************************/
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser()); //supports cookies
// https://expressjs.com/en/starter/static-files.html
// app.use(express.static('static-content')); 

/******************************************************************************
 * routes
 ******************************************************************************/
app.get('/api/username/', function (req, res) {

	
	let wordle=new Wordle(words);
	if(!req.cookies.username){
		let minutes = 1;
		username=wordle.getUsername();
		res.cookie('username', "thisValueIsSecret", {maxAge: minutes * 60 * 1000}); //create an "x" min cookie for the username
	}
	res.status(200);
	res.json({"username":username});
});

app.get('/api/words', function(req,res){
	res.json({"words": words});
});


app.put('/api/username/:username/newgame', function (req, res) {
	let username=req.params.username;

	if(!(username in database)){
		let wordle=new Wordle(words);
		wordle.setUsername(username);
		database[username]=wordle;
	} 
	database[username].reset();
	console.log(database[username].target);
	res.status(200);
	res.json({"status":"created"});
});

// Add another guess against the current secret word
app.post('/api/username/:username/guess/:guess', function (req, res) {
	let username=req.params.username;
	let guess=req.params.guess;

	if(! username in database){
		res.status(409);
		res.json({"error":`${username} does not have an active game`});
		return;
	}
	var data = database[username].makeGuess(guess);
	res.status(200);
	res.json(data);
});


app.listen(port, function () {
  	console.log('Example app listening on port '+port);
});



