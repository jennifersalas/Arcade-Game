// // Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started
//
//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };
//
// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };
//
// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

 let colwidth =  101, rowheight =  83;

class Sprite {
  constructor ({sprite = '', location = [0,0], speed = 1, game = null} = {}) {
    this.sprite = sprite;
    this.location = location;
    this.speed = speed;
    this.game = game;
  }
  get x () {
    return this.location[0] * colwidth;
  };
  get y () {
    return this.location[1] * rowheight;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Enemy extends Sprite {
  constructor ({
    sprite = 'images/enemy-bug.png',
    location = [1 + Math.floor(Math.random() * 4), 1 + Math.floor(Math.random() * 4)],
    speed = Math.random() / 10,
    game = null} = {},) {
    super({sprite, location, speed, game});
  }
  update(dt) {
      this.location[0] += this.speed;
      if (this.location[0] > 5) {
         this.location[0] = 0;
      }
      if (this.y == player.y && Math.abs(this.x - player.x) < colwidth * .75) {
        console.log("You lost");
        player.location = [2,5]

    }
  }
}

class Player extends Sprite {
  constructor({sprite = 'images/char-boy.png', location = [2,5], speed = .001, game = null} = {}) {
    super({sprite, location, speed, game});
  }
  handleInput(direction) {
      if (direction === 'left' && this.location[0] > 0) {
        this.location[0] -= 1;
      } else if (direction === 'right' && this.location[0] < 4) {
        this.location[0] += 1;
      } else if (direction == 'up' && this.location[1] > 0) {
        this.location[1] -= 1;
      } else if (direction == 'down' && this.location[1] < 5) {
        this.location[1] += 1;

    }
  }
  update() {
    if (this.location[1] == 0 && game.live) {
      this.game.live = false;
      this.game.won();
      console.log('won');
    }
  }
}

var player = {};
var allEnemies = {};
const winAlert = document.querySelector('.winPopup');

class Game {
  constructor() {
    console.log(this);
    this.reset();
  }
  won() { winAlert.classList.add('active'); }
  reset() {
    console.log('game has been set')
    this.live = true;
    allEnemies = [];
    for (let i = 1; i < 5; i++) {
      allEnemies.push(new Enemy({location : [Math.floor(Math.random() * 5),i], game : this}));
    }
    player = new Player({ game : this });
  }
}

const game = new Game();

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

document.querySelector('.reset').addEventListener('click', _ =>{
   winAlert.classList.remove('active');
   game.reset();
});
