/*

SKATEBOT
By: Thomas Bell

Play S.K.A.T.E against a bot

*/

//starting difficulty lvl of the bot
var level = 3;
//odds from 0-1 of bot landing tricks [offense, defense]
var odds = [
  [1, 1],
  [.9, .9],
  [.8, .7],
  [.6, .45],
  [.4, .2],
  [.1, .05],
  [0, 0]
];

var playerScore = 5;
var botScore = 5;
var possibleTricks = [];
var attemptedTrick;
const TOTALREGTRICKS = 61;
const TOTALTRICKS = 242;

//base list of tricks and their levels
var tricks = [
  ["ollie", 1],
  ["ollie north", 2],
  ["pop shuv-it", 1],
  ["360 shuv-it", 3],
  ["frontside shuv-it", 2],
  ["frontside 360 shuv-it", 4],
  ["kickflip", 3],
  ["heelflip", 5],
  ["double kickflip", 5],
  ["double heelflip", 6],
  ["late flip", 4],
  ["varial kickflip", 3],
  ["varial heelflip", 6],
  ["hardflip", 5],
  ["inward heelflip", 6],
  ["treflip", 3],
  ["laser flip", 6],
  ["360 hardflip", 6],
  ["360 inward heelflip", 6],
  ["front foot impossible", 4],
  ["impossible", 3],
  ["BS 180", 1],
  ["BS bigspin", 3],
  ["BS biggerspin", 4],
  ["BS flip", 3],
  ["BS heelflip", 6],
  ["BS double flip", 6],
  ["BS double heelflip", 6],
  ["BS bigflip", 4],
  ["BS biggerflip", 5],
  ["impossible 180", 3],
  ["FS 180", 1],
  ["FS bigspin", 4],
  ["FS biggerspin", 5],
  ["FS flip", 4],
  ["FS heelflip", 6],
  ["FS double flip", 6],
  ["FS double heelflip", 7],
  ["FS bigflip", 6],
  ["FS biggerflip", 7],
  ["impossible FS 180", 5],
  ["BS body varial", 2],
  ["front shov body varial" , 4],
  ["kickflip BS body varial", 4],
  ["heelflip BS body varial" , 6],
  ["double kickflip BS body varial", 6],
  ["double heelflip BS body varial", 7],
  ["varial heelflip body varial" , 6],
  ["hardflip BS body varial", 7],
  ["laser flip body varial", 7],
  ["front foot impossible BS body varial", 5],
  ["FS body varial", 1],
  ["pop shuv-it body varial" , 2],
  ["kickflip FS body varial", 4],
  ["heelflip FS body varial" , 6],
  ["double kickflip FS body varial", 6],
  ["double heelflip FS body varial", 7],
  ["varial flip body varial", 4],
  ["inward heelflip body varial", 6],
  ["treflip body varial", 4],
  ["front foot impossible body varial", 4],
];

$(document).ready(function() {

  startUp();

  // show the complete trick list
  // console.log("Trick List: "+tricks);

  botSet();

  playerDefense();
});

//set up the screen and generate the trick list
function startUp() {
  //generate the fakie tricks
  for (var i = 0; i < (TOTALREGTRICKS); i++) {
    var renameFakie = ["fakie "+tricks[i][0], tricks[i][1]];
    tricks.push(renameFakie);
  }
  //generate the switch tricks
  for (var i = 0; i < (TOTALREGTRICKS); i++) {
    var renameSwitch = ["switch "+tricks[i][0], tricks[i][1]+3];
    tricks.push(renameSwitch);
  }
  //generate the nollie tricks
  for (var i = 0; i < (TOTALREGTRICKS); i++) {
    var renameNollie = ["nollie "+tricks[i][0], tricks[i][1]+3];
    tricks.push(renameNollie);
  }
  exceptions();
}

//fixes exceptions to trick naming
function exceptions() {
  tricks[62][0] = "fakie ollie one-foot";
  tricks[82][0] = "halfcab";
  tricks[83][0] = "fakie bigspin";
  tricks[85][0] = "halfcab flip";
  tricks[86][0] = "halfcab heelflip";
  tricks[87][0] = "halfcab double flip";
  tricks[88][0] = "halfcab double heelflip";
  tricks[92][0] = "FS halfcab";
  tricks[95][0] = "FS halfcab flip";
  tricks[96][0] = "FS halfcab heelflip";
  tricks[97][0] = "FS halfcab double flip";
  tricks[98][0] = "FS halfcab double heelflip";
  tricks[183][0] = "nollie";
  tricks[184][0] = "nollie one-foot";
}

//marquee text accross the display
function displayTextMarquee(text) {
  $('#display').append("<marquee behavior=scroll direction='left' scrollamount='22'>"+text+"</marquee>")
}

//display text centered
function displayTextStatic(text) {
  $('#display').append("<p>"+text+"</p>")
}


//the bot attempts to set a trick
function botSet() {
  // make a list of all the possible tricks to set.
  // must be current lvl or the lvl below (and not already set)
  for (var i = 0; i < (TOTALTRICKS); i++) {
    if (((tricks[i][1] <= level) && (tricks[i][1] >= level-1)) && (tricks[i][2] != 1)) {
      possibleTricks.push(i);
    }
  }
  //select a trick to attempt
  attemptedTrick = possibleTricks[Math.floor(Math.random() * possibleTricks.length)];
  //reset the possible tricks
  console.log(possibleTricks);
  possibleTricks = [];
  //ATTEMPT THE ODDS !!!!
  attempt(tricks[attemptedTrick][1], 0);
}

function attempt(lvl, position) {
  //if landed
  if (Math.random() < odds[lvl-1][position]) {
    //display the trick name
    $("#display").empty();
    displayTextMarquee(tricks[attemptedTrick][0]);
    //prevent the trick from being attempted again
    tricks[attemptedTrick][2] = 1;
    $(".defenseButtons").show();
  }
  //if failed
  else {
    $("#display").empty();
    displayTextStatic("FAILED");
    setTimeout(playerSet, 1500);
  }
}

//player records results of defending, a letter is given (if necessary), and a new trick is set
function playerDefense() {
  $("#didItButton, #nopeButton").click(function () {
    //if player successfully lands the trick
     if (this.id == "didItButton") {
        $("#display").empty();
        displayTextStatic("- BOT SET -");
        $(".defenseButtons").hide();
        setTimeout(botSet, 1500);
     }
     //if missed lower the player score and put a letter on their scoreboard
     else if (this.id == 'nopeButton') {
        $("#display").empty();
        playerScore--;
        $('#p'+playerScore).css('color', 'red');
        $(".defenseButtons").hide();
        //game over if the player is out of lives
        if (playerScore == 0) {
          $("#display").empty();
          displayTextMarquee("GAME OVER!");
          $("button").remove();
        }
        else {
          displayTextStatic("- BOT SET -");
          setTimeout(botSet, 1500);
        }
    }
  });
}

function playerSet() {
  $("#display").empty();
  displayTextStatic("- YOUR SET -");
}
