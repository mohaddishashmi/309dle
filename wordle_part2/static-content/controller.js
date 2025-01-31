/******************************************************************************
 * globals routines
 ******************************************************************************/
var words = [];
var wordle = null;

var gui_state = {
    row: 0,
    col: 0,
    guess: [],
    alphabetMap: getAlphabetMap(),
};
//resets ALL the game variables to their original state. This includes the coloring of the screen as well as error messages. Also increments the wins and losses
function gui_resetGame() { 
    gui_state.row = 0;
    gui_state.col = 0;
    gui_state.guess = [];
    gui_state.alphabetMap = getAlphabetMap();
     // Clear previous coloring
    $(".letterbox td").css("background-color", "");
    $(".keyboardrow td").css("background-color", "");
    document.getElementById('message-bay').innerHTML = '';
    //update wins and losses
    getWins();
    getLosses();
}
// Returns a map of letters to scores. All scores start at 0 and are updated throughout the game
function getAlphabetMap() {
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    alpha_map = {};
    for (i =0; i< alphabet.length; i++){
        alpha_map[alphabet[i]] = 0; //all letters start off at 0 (unchecked) and will update over the course of the game
        //0 = unchecked, 1=not in word, 2=in word, wrong position, 3=in word, right position
    }
    return alpha_map;
}
/******************************************************************************
 * gui utilities
 ******************************************************************************/
// manage the user interface, we show the specified user interface
// and also change the class of the nav so that the selected element is
// highlighted in green
function showUI(ui) {
    $(".ui_top").hide();
    $(ui).show();
    //handle nav highlighting. Resets all nav links to unselected then makes the current nav link active
    var navLinks = document.querySelectorAll('#ui_nav a');
    navLinks.forEach(function(link) {
        link.classList.remove('nav_selected');
    });
    var clickedNavLink = document.querySelector('[name="' + ui.slice(1) + '"]');
    clickedNavLink.classList.add('nav_selected');
}

/******************************************************************************
 * gui utilities: coloring the letters depending on the guess score
 ******************************************************************************/

// As a result of the latest guess, update the colours of the game board
// and keyboard.
function colourBoardAndKeyboard(score) { 
    var new_letter_score = 0;
    var word_score_map = {}; //functions the same as alphabet map but for just the word guessed. later compared against alphabetmap
    // Color the guessed letters on the game board
    for (var i = 0; i < score.length; i++) {
        var new_letter_score = 0;
        //row and column "coordinates"
        var colClass = ".col" + i;
        var rowClass = ".row" + gui_state.row;
        var letter_square = rowClass + " " + colClass;
        new_letter_score = Math.max(new_letter_score,score[i].score);
        word_score_map[$(letter_square).text()] = new_letter_score;
        //update the guess colors as required
        switch (score[i].score) {
            case 2:
                //yellow #B59F3B
                $(letter_square).css("background-color", "#B59F3B");
               break;
            case 3:
                //green #538D4E
                $(letter_square).css("background-color", "#538D4E");
               break;
            default:
                //grey #3A3A3C
                $(letter_square).css("background-color", "#3A3A3C");
               break;
        }
    }
    //color keyboard: loop thru all keyboard keys, check the letter, if that letters was guessed, compare it's pre-existing score against the guess score, and update accordingly
    $(".keyboardrow td").each(function () {
        var letter = $(this).text();
        if (gui_state.guess.includes(letter)) { //check the letters in the guess for potential updates
            if (word_score_map[letter] > gui_state.alphabetMap[letter]){ //only update if score increases
                switch(word_score_map[letter]){
                    case 2: //yellow
                        $(this).css("background-color", "#B59F3B")
                        break;
                    case 3: //green
                        $(this).css("background-color", "#538D4E")
                        break;
                    default: //grey
                        $(this).css("background-color", "#3A3A3C")
                        break;
                }
                gui_state.alphabetMap[letter] = word_score_map[letter]; //update alphabet map
            }
        }
    }

    );
}


/******************************************************************************
 * gui utilities: handling virtual keyboard events
 ******************************************************************************/

// #ui_play delete the last character from the current board row
function delCharacter() {
    //if in bounds, remove letter
    if (gui_state.col > 0) {
        gui_state.col--;
        gui_state.guess.pop(); //remove last (added) letter
        $(".row" + gui_state.row + " .col" + gui_state.col).text(""); //finds the (row,col) "coordinate" and sets it to blank
    }
}

// #ui_play put character c at the end of the current board row
function putCharacter(c) {
    //if in bounds, add letter
    if (gui_state.col < 5) {
        gui_state.guess.push(c);
        $(".row" + gui_state.row + " .col" + gui_state.col).text(c); //finds the (row,col) "coordinate" and sets the text to C
        gui_state.col++; //go to next letter
    }
}

// #ui_play called by a virtual keypress, c could be 'DEL', a character or 'ENTER'
function guessCharacter(c) {
    if (c === 'DEL') {
        delCharacter();
    } else if (c === 'ENTER') {
        var guess = gui_state.guess.join('');
        gui_guess(guess);
    } else {
        putCharacter(c);
    }
}

/******************************************************************************
 * gui routines
 ******************************************************************************/

// #ui_play update the model with a guess, and then modify the gui appropriately
function gui_guess(guess) {
    // var data = wordle.makeGuess(guess); //to be replaced by makeGuess() API call
    // var data = makeGuess(guess);
    var data;//clear the message bay by selecting the div and resetting its inner html
    var messageBay = document.getElementById('message-bay');
    messageBay.innerHTML = '';
    makeGuess(guess, function(responseData){
        data = responseData;
           //update message bay 
    if (!data.success) {
        messageBay.textContent = data.error;
        return;
    }
    colourBoardAndKeyboard(data.score);
    if (data.state === "won" || data.state === "lost") {
        gui_gameDisable();
        //update message
        messageBay.textContent=("Game Over! You " + (data.state === "won" ? "won!" : "lost!"));
    }
    gui_state.row++;
    gui_state.col = 0;
    gui_state.guess=[];
    });

   
 
  
}

// #ui_play: hide the play button and enable the on-screen keyboard
function gui_gameEnable() {
    $("#play_newgame_button").hide();
    $(".keyboardrow td").on("click", function () {
        guessCharacter($(this).text());
    });
}

// #ui_play: show the play button and disable the on-screen keyboard
function gui_gameDisable() {
    $("#play_newgame_button").show();
    $(".keyboardrow td").off("click");
}

// #ui_play: reset the state of the game in the model and gui_state, clear the game from #ui_play
function gui_newgame() {
    // wordle.reset(); //replaced by resetGame() Reset doesn't change stats or username
    resetGame();
    gui_resetGame();
    $(".letterbox td").text("");
    gui_gameEnable();
}

/******************************************************************************
 * API CALLS
 ******************************************************************************/


//GET REQUESTS
function getUser(){ //GET request for username, sets it in the profile page
    $.ajax({
        method: "GET",
        url: "/api/getUser",
        processData:false,
        contentType: "application/json; charset=utf-8",
		dataType:"json"
    }).done(function(req, res){
        $("#username").html(req.username); //just changes username
    }
    ).fail(function(err){ //handle error
		console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
	});
}

function getWins(){ //GET request for wins
    $.ajax({
        method: "GET",
        url: "/api/getWins",
        processData:false,
        contentType: "application/json; charset=utf-8",
		dataType:"json"
    }).done(function(req, res){ //changes wins in the frontend
        document.getElementById('wins_ctr').textContent = req.wins;
    }
    ).fail(function(err){ //error handling
		console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
	});
}

function getLosses(){ //GET request for Losses
    $.ajax({
        method: "GET",
        url: "/api/getLosses",
        processData:false,
        contentType: "application/json; charset=utf-8",
		dataType:"json"
    }).done(function(req, res){ //updates Losses in frontend
        document.getElementById('loss_ctr').textContent = req.losses;
    }
    ).fail(function(err){//error handling
		console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
	});
}



//POST REQUESTS

function makeGuess(guess, callback){ //POST request to make the guess
    $.ajax({
        method: "POST",
        url: "/api/makeGuess",
        data: JSON.stringify({"guess": guess}),
        processData:false,
        contentType: "application/json; charset=utf-8",
		dataType: "json"
    }).done(function(req){ //get the data and callbacj
        var data = req['response-data'];
        callback(data); // callback function
    }).fail(function(err){
		console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
	});
}


function createGame(){ //POST request to initialize the game
   
    $.ajax({
        method: "POST",
        url: "/api/createGame",
        processData:false,
        contentType: "application/json; charset=utf-8",
		dataType:"json"
    }).done(function(req,res){
        // console.log("created a game with user " + req.username + " and target "+ req.target); This was for testing purposes
    }).fail(function(err){ //error handling
		console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
	});
}

//PUT REQUESTS
function resetGame(guess){ //PUT to reset the game (edit all non-user params back to original vals)
    $.ajax({
        method: "PUT",
        url: "/api/resetGame",
        processData:false,
        contentType: "application/json; charset=utf-8",
		dataType:"json"
    }).done(function(req,res){
        // console.log("created a game with user " + req.username + " and target "+ req.target); This was for testing purposes
    }).fail(function(err){
		console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
	});
}


/******************************************************************************
 * onload 
 ******************************************************************************/
$(function () {
    createGame();
    getUser();

});
