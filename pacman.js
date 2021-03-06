// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var curly = {
  menuOption: '1',
  name: 'Curly',
  colour: 'Red',
  character: 'Sassy',
  edible: false
}

var moe = {
  menuOption: '2',
  name: 'Moe',
  colour: 'Blue',
  character: 'Bossy',
  edible: false
}

var larry = {
  menuOption: '3',
  name: 'Larry',
  colour: 'Pink',
  character: 'Brainy',
  edible: false
}

var shemp = {
  menuOption: '4',
  name: 'Shemp',
  colour: 'Orange',
  character: 'Goofy',
  edible: false
}

var ghosts = [curly, moe, larry, shemp]



// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\n\nPower-Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  ghosts.forEach(
    function (currentGhost) {
      console.log(`(${currentGhost.menuOption}) Eat ${currentGhost.name}` + ( currentGhost.edible ? " (edible)" : " (inedible)" ) );
    }
  )
  // console.log('(1) Eat Curly');
  // console.log('(2) Eat Moe');
  // console.log('(3) Eat Larry');
  // console.log('(4) Eat Shemp');
  if (powerPellets > 0){
    console.log('(p) POWER PELLETS');
  };
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    case 'p':
      if (powerPellets > 0){
        eatPowerPellet();
      } else {
        console.log("\n******!!!NO POWER PELLETS LEFT!!!******");
      }
      break;
    default:
      console.log('\nInvalid Command!');
  }
  isGameOver();
}

// Function to eat ghosts

function eatGhost(ghost) {
  if (ghost.edible){
    console.log(`\nYou just ate ${ghost.name} you bastard. He/she was so ${ghost.character}`);
    score += 200;
    ghost.edible = false;
  } else {
    lives--;
    console.log(`\n${ghost.colour} ${ghost.name} ate you!`);
  }
}

// Process game over
function isGameOver() {
  if (lives < 0){
    process.exit();
  }
}

// Process eat power pellets
function eatPowerPellet() {
  score += 50;
  ghosts.forEach(
    function(each_ghost) {
    each_ghost.edible = true;
  });
  powerPellets--;
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
