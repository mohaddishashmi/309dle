import React from 'react';
import { api_getUsername, api_guess, api_newgame, api_getWords }  from './api'; 
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastClicked: null
    };
  }

  handleLinkClick = (pageToRender) => {
    this.setState({lastClicked: pageToRender});
    this.props.secondaryPage(pageToRender);
  };
  render() {
    const ui_home_style = {
      fontSize: 'x-large',
      textDecoration: 'underline'
    };
    return (
		<header>
      <nav id="ui_nav">
				<span class="alignleft"></span>
				<span class="aligncenter">
					<a name="ui_home" onClick={() => this.handleLinkClick("ui_home")}  className={this.state.lastClicked === "ui_home" ? "clicked" : ""}style={ui_home_style}>309DLE</a>
				</span>
				<span class="alignright">
					<a name="ui_username"  className={this.state.lastClicked === "ui_username" ? "clicked" : ""}><span class="material-symbols-outlined"  onClick={() => this.handleLinkClick("ui_username")}> person </span></a>
					<a name="ui_play" className={this.state.lastClicked === "ui_play" ? "clicked" : ""}><span class="material-symbols-outlined" onClick={() => this.handleLinkClick("ui_play")}> play_circle </span></a>
					<a name="ui_stats"  className={this.state.lastClicked === "ui_stats" ? "clicked" : ""}><span class="material-symbols-outlined"onClick={() => this.handleLinkClick("ui_stats")}> leaderboard </span></a>
					<a name="ui_instructions"  className={this.state.lastClicked === "ui_instructions" ? "clicked" : ""}><span class="material-symbols-outlined" onClick={() => this.handleLinkClick("ui_instructions")}> help </span></a>
				</span>
			</nav>
		</header>
    
    );
  }
}

class GameModeComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return(
       <div class="ui_top" id="ui_home">
       <div class="textblock"> 
         Classic
         <br/>
         You have 6 chances to guess a word, the first one to guess it wins! 
       </div>
     </div>
    );
  }
}

class UserNameComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
 
  render(){
    return(
    <div class="ui_top" id="ui_username">
      <h2>username: {this.props.username}<span id="username"></span></h2>
    </div>
    );
  }
}


class NewGameButtonComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <center>
				<button id="play_newgame_button" onClick={this.props.newGameClickHandler} style={{background: "red"}}>NEW GAME</button>
			</center>
    )
  }
}

class UiPlayComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
   
  }
 
  render(){
    return(
    <div class="ui_top" id="ui_play">
    <center>
          <table className="letterbox">
            <tbody>
              {/* maps each row and cell in each row. each cell has a style, a letter, and a score*/}
              {this.props.letterBox.map((row, rowIndex) => (
                <tr key={rowIndex} className= {`row${rowIndex}`}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className={`col${colIndex}`} style={cell.style} score={cell.score} >
                      {cell.letter} 
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </center>

      <br/>
      <div style={{textAlign: "center"}}>{this.props.error}</div>
			<br/>
      {/* UI keyboard component */}
      <center>
				<table class="keyboardrow">
					<tr>
            <td onClick={() => this.props.keyBoardClickHandler("Q")} style={this.props.alphabetMap["Q"].style}>Q</td> 
            <td onClick={() => this.props.keyBoardClickHandler("W")} style={this.props.alphabetMap["W"].style}>W</td> 
            <td onClick={() => this.props.keyBoardClickHandler("E")} style={this.props.alphabetMap["E"].style}>E</td> 
            <td onClick={() => this.props.keyBoardClickHandler("R")} style={this.props.alphabetMap["R"].style}>R</td>
            <td onClick={() => this.props.keyBoardClickHandler("T")} style={this.props.alphabetMap["T"].style}>T</td>
            <td onClick={() => this.props.keyBoardClickHandler("Y")} style={this.props.alphabetMap["Y"].style}>Y</td>
            <td onClick={() => this.props.keyBoardClickHandler("U")} style={this.props.alphabetMap["U"].style}>U</td>
            <td onClick={() => this.props.keyBoardClickHandler("I")} style={this.props.alphabetMap["I"].style}>I</td>
            <td onClick={() => this.props.keyBoardClickHandler("O")} style={this.props.alphabetMap["O"].style}>O</td> 
            <td onClick={() => this.props.keyBoardClickHandler("P")} style={this.props.alphabetMap["P"].style}>P</td>
            </tr>
				</table>
				<table class="keyboardrow">
					<tr>
            <td onClick={() => this.props.keyBoardClickHandler("A")} style={this.props.alphabetMap["A"].style}>A</td> 
            <td onClick={() => this.props.keyBoardClickHandler("S")} style={this.props.alphabetMap["S"].style}>S</td> 
            <td onClick={() => this.props.keyBoardClickHandler("D")} style={this.props.alphabetMap["D"].style}>D</td> 
            <td onClick={() => this.props.keyBoardClickHandler("F")} style={this.props.alphabetMap["F"].style}>F</td> 
            <td onClick={() => this.props.keyBoardClickHandler("G")} style={this.props.alphabetMap["G"].style}>G</td> 
            <td onClick={() => this.props.keyBoardClickHandler("H")} style={this.props.alphabetMap["H"].style}>H</td>
            <td onClick={() => this.props.keyBoardClickHandler("J")} style={this.props.alphabetMap["J"].style}>J</td> 
            <td onClick={() => this.props.keyBoardClickHandler("K")} style={this.props.alphabetMap["K"].style}>K</td> 
            <td onClick={() => this.props.keyBoardClickHandler("L")} style={this.props.alphabetMap["L"].style}>L</td>
            </tr>
				</table>
				<table class="keyboardrow">
					<tr>
            <td onClick={() => this.props.keyBoardClickHandler("DEL")}>DEL</td>
            <td onClick={() => this.props.keyBoardClickHandler("Z")} style={this.props.alphabetMap["Z"].style}>Z</td> 
            <td onClick={() => this.props.keyBoardClickHandler("X")} style={this.props.alphabetMap["X"].style}>X</td> 
            <td onClick={() => this.props.keyBoardClickHandler("C")} style={this.props.alphabetMap["C"].style}>C</td> 
            <td onClick={() => this.props.keyBoardClickHandler("V")} style={this.props.alphabetMap["V"].style}>V</td> 
            <td onClick={() => this.props.keyBoardClickHandler("B")} style={this.props.alphabetMap["B"].style}>B</td>
            <td onClick={() => this.props.keyBoardClickHandler("N")} style={this.props.alphabetMap["N"].style}>N</td> 
            <td onClick={() => this.props.keyBoardClickHandler("M")} style={this.props.alphabetMap["M"].style}>M</td>
            <td onClick={() => this.props.keyBoardClickHandler("ENTER")}>ENTER</td>
            </tr>
				</table>
			</center>
			<br/>
			<br/>
      {this.props.gameIsRunning ? null : (
        <NewGameButtonComp gameIsRunning = {this.props.gameIsRunning} newGameClickHandler = {this.props.newGameClickHandler} />
      )}
    </div>
    );
  }
}

class StatsComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return(
      <div class="ui_top" id="ui_stats">
			<center style={{fontSize: "xx-large"}}>
				<span class="material-symbols-outlined"> check_circle </span> {this.props.wins} &nbsp;
				<span class="material-symbols-outlined"> help </span> 1 &nbsp;
				<span class="material-symbols-outlined"> cancel </span> {this.props.losses}
			</center>
		</div>
    );
  }
}

class InstructionsComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return(
    <div class="ui_top" id="ui_instructions">
    <div class="textblock"> 
      Take a look a mordle.io instructions.
    </div>
  </div>
    );
  }
}
class Main extends React.Component {
  constructor(props) {
    	super(props);
    	this.state = {
        pageToRender: "ui_home",
        username: "",
        isFetched: false,
        letterBox: Array(6).fill().map(() => Array(5).fill({ letter: '', style: {}, score:0 })),
        alphabetMap: { 
          "A": {score: 0, style: {}},  "B": {score: 0, style: {}},  "C": {score: 0, style: {}},  "D": {score: 0, style: {}},
          "E": {score: 0, style: {}},  "F": {score: 0, style: {}},  "G": {score: 0, style: {}},  "H": {score: 0, style: {}},
          "I": {score: 0, style: {}},  "J": {score: 0, style: {}},  "K": {score: 0, style: {}},  "L": {score: 0, style: {}},
          "M": {score: 0, style: {}},  "N": {score: 0, style: {}},  "O": {score: 0, style: {}},  "P": {score: 0, style: {}},
          "Q": {score: 0, style: {}},  "R": {score: 0, style: {}},  "S": {score: 0, style: {}},  "T": {score: 0, style: {}},
          "U": {score: 0, style: {}},  "V": {score: 0, style: {}},  "W": {score: 0, style: {}},  "X": {score: 0, style: {}},
          "Y": {score: 0, style: {}}, "Z": {score: 0, style: {}}
          },
        currGuess: "",
        gameIsRunning: false,
        words: [],
        error: "",
        wins: 0,
        losses: 0,
        web_wins: 0,
        web_losses: 0
      };
  }

  componentDidMount() {
  if(!this.state.isFetched){
    this.renderUserName();
    }
    // Establish WebSocket connection to receive stats updates
    const ws = new WebSocket('ws://localhost:8510');
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // Update stats
        this.setState({
            web_wins: data.wins,
            web_losses: data.losses
        });
    };
  }
  newGame = () =>{
    this.setState(
      {gameIsRunning: true
    });
  }
renderUserName() {
    api_getUsername(this.setName);
}

setName = (data) => {
    this.setState({ username: data.username, isFetched: true });
}

setWords = (data) =>{
  this.setState({words: data.words});
}

renderWords(){
  api_getWords(this.setWords);
}
newGameClickHandler = (e) => {
  const username = this.state.username;

  api_newgame(username, (callback) =>{
    if(callback.status === "created"){
      this.setState(
        {
          gameIsRunning: true,
          letterBox: Array(6).fill().map(() => Array(5).fill({ letter: '', style: {}, score:0 })),
          alphabetMap: { 
          "A": {score: 0, style: {}},  "B": {score: 0, style: {}},  "C": {score: 0, style: {}},  "D": {score: 0, style: {}},
          "E": {score: 0, style: {}},  "F": {score: 0, style: {}},  "G": {score: 0, style: {}},  "H": {score: 0, style: {}},
          "I": {score: 0, style: {}},  "J": {score: 0, style: {}},  "K": {score: 0, style: {}},  "L": {score: 0, style: {}},
          "M": {score: 0, style: {}},  "N": {score: 0, style: {}},  "O": {score: 0, style: {}},  "P": {score: 0, style: {}},
          "Q": {score: 0, style: {}},  "R": {score: 0, style: {}},  "S": {score: 0, style: {}},  "T": {score: 0, style: {}},
          "U": {score: 0, style: {}},  "V": {score: 0, style: {}},  "W": {score: 0, style: {}},  "X": {score: 0, style: {}},
          "Y": {score: 0, style: {}}, "Z": {score: 0, style: {}}
          },
          error: ""
        }
      );
      this.renderWords();
    }
    else{
      console.error("Could not start new game");
    }
  });
}

  secondaryPage = (page) => {
    this.setState({ pageToRender: page });
  };

  keyBoardClickHandler = async (letter) => {
    var game_ended;
    var game_won = 0;
    var game_lost = 0;
    var currRow = 0; //keep track of the current row for coloring purposes
    if(this.state.gameIsRunning){ //will only work if the game is running, otherwise it won't work at all
      const myLetterBox = this.state.letterBox.map(row => row.map(cell => ({ ...cell })));
      const myAlphabetMap = JSON.parse(JSON.stringify(this.state.alphabetMap));

    // Case 1: adding a letter. Loop forwards until you find an empty cell and add the letter
    if (letter !== "DEL" && letter !== "ENTER") {
      for (let i = 0; i < myLetterBox.length; i++) {
        for (let j = 0; j < myLetterBox[i].length; j++) {
          // Add letter if cell is empty and current guess length is less than 5
          if (myLetterBox[i][j].letter === '' && this.state.currGuess.length < 5) {
            myLetterBox[i][j].letter = letter;
            this.setState({ letterBox: myLetterBox, currGuess: this.state.currGuess + letter });
            return;
          }
        }
      }
    }
  
    // Case 2: Delete letter. Loop backwards until you find a non-empty cell and remove the letter
    if (letter === "DEL" && this.state.currGuess.length > 0) {
      for (let i = myLetterBox.length - 1; i >= 0; i--) {
        for (let j = myLetterBox[i].length; j >= 0; j--) {
          if (j > 0 && myLetterBox[i][j - 1].letter !== '') {
            myLetterBox[i][j - 1].letter = '';
            this.setState({ letterBox: myLetterBox, currGuess: this.state.currGuess.slice(0, -1) });
            return;
          }
        }
      }
    }
  
    // Case 3: ENTER key
    if (letter === "ENTER") {
      var score;
      var error_message="";

      //prevent guesses if too small or not a word
      if (this.state.currGuess.length < 5) {
        error_message = "Guess must be 5 characters";
        this.setState({error: error_message});
        return; 
      }
      if(!this.state.words.includes(this.state.currGuess)){
        error_message = "Guess must be a word";
        this.setState({error: error_message});
        return; 
      }
      //api guess
      const username = this.state.username;
      const currGuess = this.state.currGuess;

      //use await to get score (future actions depend on this)
      const getScore = (username, currGuess) => {
        return new Promise((resolve, reject) => {
          api_guess(username, currGuess, (callback) => {
            if(callback.error){
              console.error(callback.error);
              reject(callback.error);
            }
            else {
              const score = callback.score;
              resolve(score); // resolve using score
            }
          });
        });
      };
      score = await getScore(username, currGuess);
      var sumScore = score.reduce((total, current) => total + current.score, 0);
      if(sumScore === 15){
        error_message = "Congratulations! You win!";
        game_ended = true;
        game_won ++;
      }

      //logic for proceeding to the next row
      let nextRow = -1
      let lastRow = false;
      for (let i = 0; i <= myLetterBox.length; i++) { //edge case for the final row
        if(i ===6){
          nextRow = i;
          currRow = i-1;
          lastRow = true;
          break;
        }
        if (lastRow || myLetterBox[i].every(cell => cell.letter !== '')) {
          continue; // Skip filled rows
        }
        nextRow = i;
        currRow = i-1; //find the current row
        break;
      }
      // If no available row found, return
      if (nextRow === -1){
        return;
      }

      /**
       * Logic to change board colors as follows
       * go through each cell of currRow, check the score of the word. Change color of cell based on letter score
       * 1 = grey 2 = yellow 3 = green
       */
      if(currRow !== -2){
        for (let i = 0; i < myLetterBox[currRow].length; i++){
          if(myLetterBox[currRow][i].score === 0){
            myLetterBox[currRow][i].score = score[i].score;
            //update colors
            switch(score[i].score){
              case 1:
                myLetterBox[currRow][i].style = {background: "grey"}
                break;
              case 2:
                myLetterBox[currRow][i].style = {background: "gold"}
                break;
              case 3:
                myLetterBox[currRow][i].style = {background: "green"}
                break;
              default:
                break;
            }
          }
        }
    }

    /**change the keyboard colors. 
     * We need to update the alphabet map by comparing it to the score of the guess
     * We then update the styling based on the score of each individual character
     * Note that keyboard colors can only improve, can never regress, so we check the word score vs existing alpha map
     * */
    for (let i = 0; i < score.length; i ++){
      let char_to_update = score[i].char;
      let score_to_compare = score[i].score;
      if(score_to_compare > myAlphabetMap[char_to_update].score){
        myAlphabetMap[char_to_update].score = score_to_compare;

        switch(score_to_compare){
          case 1:
            myAlphabetMap[char_to_update].style = {background: "grey"};
            break;
          case 2:
            myAlphabetMap[char_to_update].style = {background: "gold"};
            break;
          case 3:
            myAlphabetMap[char_to_update].style = {background: "green"};
            break;
          default:
            break;
        }
      }
    }

    if(currRow ===5 && sumScore !== 15){
      error_message = "You Lost!";
      game_ended = true;
      game_lost ++;
    }
    // Clear the current guess and move to the next row
    this.setState({ letterBox: myLetterBox, alphabetMap: myAlphabetMap, currGuess: '', gameIsRunning: !game_ended, 
    error: error_message, wins: this.state.wins+game_won, losses: this.state.losses+game_lost});
  }
  };
}

  render() {
    let compToRender;
    switch (this.state.pageToRender) {
      case "ui_home":
        compToRender = <GameModeComp />;
        break;
      case "ui_username":
        compToRender = <UserNameComp username={this.state.username}/>;
        break;
      case "ui_play":
        compToRender = <UiPlayComp letterBox={this.state.letterBox} alphabetMap={this.state.alphabetMap} 
        currGuess={this.state.currGuess} gameIsRunning={this.state.gameIsRunning} error={this.state.error}
        keyBoardClickHandler={this.keyBoardClickHandler} newGameClickHandler={this.newGameClickHandler}/>;
        break;
      case "ui_stats":
        compToRender = <StatsComp wins={this.state.wins} losses={this.state.losses}/>;
        break;
      case "ui_instructions":
        compToRender = <InstructionsComp />;
        break;
      default:
        compToRender = null;
        break;
    }
    return (
	<div>
		<Header secondaryPage={this.secondaryPage}/>
    <div class="ui_top" id="ui_stats">
			<center style={{fontSize: "xx-large"}}>
				<span class="material-symbols-outlined"> check_circle </span> {this.props.web_wins}&nbsp;
				<span class="material-symbols-outlined"> help </span> 1 &nbsp;
				<span class="material-symbols-outlined"> cancel </span> {this.props.web_losses}
			</center>
		</div>

    {compToRender}
	</div>
    );
  }
}
export { Main };
