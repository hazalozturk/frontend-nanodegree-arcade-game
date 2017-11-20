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

    checkCollision(this);
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
    player.x -= player.speed;
  }
  if (keyPress == 'right') {
    player.x += player.speed;
  }
  if (keyPress == 'up') {
    player.y -= player.speed;
  }
  if (keyPress == 'down') {
    player.y += player.speed;
  }
}

var checkCollision = function(anEnemy) {
  // check for collision between enemy and player
  if (
        player.y + 131 >= anEnemy.y + 90 &&
        player.x + 25 <= anEnemy.x + 88 &&
        player.y + 73 <= anEnemy.y + 135 &&
        player.x + 76 >= anEnemy.x + 11) {
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
