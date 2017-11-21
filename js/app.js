// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //start over after reaching canvas's right limit
    if (this.x >= 505) {
      this.x = 0;
    }

    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-boy.png';
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
  //not needed for now
}

Player.prototype.handleInput = function(keyPress) {
  if (keyPress == 'left') {
    this.x -= player.speed;
  }
  if (keyPress == 'right') {
    this.x += player.speed;
  }
  if (keyPress == 'up') {
    this.y -= player.speed;
  }
  if (keyPress == 'down') {
    this.y += player.speed;
  }
}

Enemy.prototype.checkCollision = function() {
  // check for collision between enemy and player
  if (
        player.y + 131 >= this.y + 90 &&
        player.x + 25 <= this.x + 88 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 76 >= this.x + 11) {
        console.log('OOPS!');
        player.x = 202;
        player.y = 383;
  }

  // make player start over when reaching water
  if (player.y + 43 <= 0) {
      player.x = 202;
      player.y = 383;
      console.log('yaay!');
  }

  // make player stay between canvas limits
  if (player.x + 65 >= 505) {
    player.x = 405;
    console.log('reached right limit!');
  }
  if (player.x < 2.5) {
    player.x = 2.5;
    console.log('reached left limit');
  }
  if (player.y > 383) {
    player.y = 383;
    console.log('reached down limit');
  }
}


// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place enemy randomly on canvas
var allEnemies = [];

var player = new Player(202, 383, 50);

//Function taken from here: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (i=0; i<5; i++) {
    var enemy = new Enemy(0, getRandomInt(50, 234), getRandomInt(0, 256))
    allEnemies.push(enemy)
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
