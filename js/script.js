/*

SKATEBOT
By: Thomas Bell

Play S.K.A.T.E against a bot

*/


var playerScore = 5;
var botScore = 5;
var level = 3;
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
  ["BS biggerspin", 5],
  ["BS flip", 4],
  ["BS heelflip", 6],
  ["BS double flip", 6],
  ["BS double heelflip", 6],
  ["BS bigflip", 5],
  ["BS biggerflip", 6],
  ["FS 180", 1],
  ["FS bigspin", 4],
  ["FS biggerspin", 5],
  ["FS flip", 5],
  ["FS heelflip", 6],
  ["FS double flip", 6],
  ["FS double heelflip", 7],
  ["FS bigflip", 6],
  ["FS biggerflip", 7],
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
  ["impossible BS body varial", 3],
  ["FS body varial", 1],
  ["pop shuv-it body varial" , 2],
  ["kickflip FS body varial", 4],
  ["heelflip FS body varial" , 6],
  ["double kickflip FS body varial", 6],
  ["double heelflip FS body varial", 7],
  ["varial flip body varial", 4],
  ["inward heelflip body varial", 6],
  ["treflip body varial", 4],
  ["front foot impossible FS body varial", 4],
  ["impossible FS body varial", 5]
]

$(document).ready(function() {

  startUp();

  // show the complete trick list
  console.log("Trick List: "+tricks);

  botSet();
});

//set up scoreboard and generate the trick list
function startUp(){
  //generate the fakie tricks
  for (var i = 0; i < (TOTALREGTRICKS); i++) {
    var renameFakie = ["fakie "+tricks[i][0], tricks[i][1]];
    tricks.push(renameFakie);
  }
  //generate the switch tricks
  for (var i = 0; i < (TOTALREGTRICKS); i++) {
    var renameSwitch = ["switch "+tricks[i][0], tricks[i][1]+2];
    tricks.push(renameSwitch);
  }
  //generate the nollie tricks
  for (var i = 0; i < (TOTALREGTRICKS); i++) {
    var renameNollie = ["nollie "+tricks[i][0], tricks[i][1]+2];
    tricks.push(renameNollie);
  }
  //set all tricks as unset [name, level, set]  0=unset, 1=set
  for (var i = 0; i < (TOTALTRICKS); i++) {
    tricks[i][2] = 0;
  }
  exceptions();
}

//fixes exceptions to trick naming
function exceptions() {
  tricks[62][0] = "fakie ollie one-foot";
  tricks[82][0] = "halfcab";
  tricks[85][0] = "halfcab flip";
  tricks[86][0] = "halfcab heelflip";
  tricks[87][0] = "halfcab double flip";
  tricks[88][0] = "halfcab double heelflip";
  tricks[91][0] = "FS halfcab";
  tricks[94][0] = "FS halfcab flip";
  tricks[95][0] = "FS halfcab heelflip";
  tricks[96][0] = "FS halfcab double flip";
  tricks[97][0] = "FS halfcab double heelflip";
  tricks[183][0] = "nollie";
  tricks[184][0] = "nollie one-foot";
}

//the bot attempts to set a trick
function botSet() {
  // make a list of all the possible tricks to set.
  // must be current lvl or one below and not already set
  for (var i = 0; i < (TOTALTRICKS); i++) {
    if (((tricks[i][1] == level) || (tricks[i][1] == level-1)) && (tricks[i][2] == 0)) {
      possibleTricks.push(i);
      console.log(tricks[i][0]);
    }
  }
  //select a trick to attempt
  attemptedTrick = possibleTricks[Math.floor(Math.random() * possibleTricks.length)];
  console.log("Attempted Trick: "+tricks[attemptedTrick][0]);
  //display the trickname
  display(tricks[attemptedTrick][0]);
}

//marquee text accross the display
function display(text) {
  $('#display').append("<marquee behavior=scroll direction='left' scrollamount='22'>"+text+"</marquee>")
}
