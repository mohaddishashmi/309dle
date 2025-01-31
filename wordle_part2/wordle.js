// https://nodejs.org/api/n-api.html
// https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/
// https://developer.mozilla.org/en-US/docs/Web
// https://developer.mozilla.org/en-US/docs/Web/JavaScript

var port = 8510;
var express = require('express');
var crypto = require('crypto');
var app = express();
const fs = require('fs');
const Wordle = require('./model');
var games = {};
var curr_user = "";
const path = './db/words.5';
const data = fs.readFileSync(path, 'utf8');
const words = data.split("\n");
// https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

// https://expressjs.com/en/starter/static-files.html
app.use(express.static('static-content')); 

app.listen(port, function () {
  	console.log('Example app listening on port '+port);
});


app.get('/api/getUser', function(req,res){
	if (!games[curr_user]) {
        res.status(404).json({ error: "No User" });
        return;
    }
	var game = games[curr_user];
	user = game.username;
	res.json({'username': user});
})

app.get('/api/getWins', function(req, res){
	if (!games[curr_user]) {
        res.status(404).json({ error: "No User" });
        return;
    }
	var game = games[curr_user];
	wins = game.won;
	res.json({'wins':wins});

})

app.get('/api/getLosses', function(req, res){
	if (!games[curr_user]) {
        res.status(404).json({ error: "No User" });
        return;
    }
	var game = games[curr_user];
	losses = game.lost;
	res.json({'losses':losses});
})


app.post('/api/makeGuess', function(req,res){
	if (!games[curr_user]) {
        res.status(404).json({ error: "No User" });
        return;
    }
	var game = games[curr_user];
	guess_data =req.body.guess;

	if (!guess_data) {
        res.status(400).json({ error: "Invalid guess" });
        return;
    }
	response_data = game.makeGuess(guess_data);
	res.json({'response-data':response_data});
})

//remove target after testing is done
app.post('/api/createGame', function(req,res){

	try{
	wordle_instance = new Wordle(words);
	var user = wordle_instance.getUsername();
	curr_user = user;
	games[curr_user] = wordle_instance; //save this instance into the dictionary
	res.json({'username': user, 'target':games[curr_user].target});
	}catch(error){
		res.status(500).json({ error: "Cannot create game" });
	}
})

//remove last 3 lines after testing is done
app.put('/api/resetGame', function(req, res){
	if (!games[curr_user]) {
        res.status(404).json({ error: "No User" });
        return;
    }

	try{
	var game = games[curr_user];
	game.reset();
	var user = game.getUsername();
	curr_user = user;
	res.json({'target': game.target, 'username': user})
	}catch(error){
		res.status(500).json({ error: "Can't reset game" });

	}
})