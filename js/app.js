let scoreOfGame = 0,  life = 5;
let	lifeRemain = document.querySelector('.life > span'),
	score = document.querySelector('.score > span');
// Enemies our player must avoid
        class Enemy {
            constructor(x, y, movement) {
            // Variables applied to each of our instances go here,
            // we've provided one for you to get started
            this.x = x;
            this.y = y;
            this.movement = movement;
            // The image/sprite for our enemies, this uses
            // a helper we've provided to easily load images
            this.sprite = 'images/enemy-bug.png';
            }
        
            // Update the enemy's position, required method for game
            // Parameter: dt, a time delta between ticks
            update(dt) {
            // You should multiply any movement by the dt parameter
            // which will ensure the game runs at the same speed for
            // all computers.
            this.x += this.movement * dt;
            lifeRemain.innerText = life;
            // return position of enemy 
            if (this.x > 500) {
                this.x = -150;
                this.movement = 150 + Math.floor(Math.random() * 500);
            }
        
            // Check collisons and return player to origin point
		if (player.x < this.x + 60 &&
			player.x + 37 > this.x &&
			player.y < this.y + 25 &&
			30 + player.y > this.y) {
			player.x = 200;
			player.y = 400;
			life--;
            lifeRemain.innerText = life;
            
			if (life === 0) {
				//show win pop
				confirm(`GAME OVER!!  play again?`);
				life = 5;
				scoreOfGame = 0;
				lifeRemain.innerText = life;
				score.innerText = '';
			}
		}
    };
    // show enemy
    render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
        }
  
  
  
  // Now write your own player class
  // This class requires an update(), render() and
  // a handleInput() method.
  class Player {
    constructor(x, y, movement) {
      this.x = x;
      this.y = y;
      this.movement = movement;
      this.sprite = 'images/char-boy.png';
    }
    update() {
      //stop the player from moving out canvas
      if (this.y > 380) {
        this.y = 380;
      }
  
      if (this.x > 400) {
        this.x = 400;
      }
  
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        scoreOfGame++;
        score.innerText = scoreOfGame * 50;
        if (scoreOfGame === 10 && life > 0) {
            confirm('You won!!');
            life = 5;
            scoreOfGame = 0;
            lifeRemain.innerText = life;
            score.innerText = '';
        }
    }
    };
  
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
  
    // Maneuver around the board using standard arrow keys OR WASD keys
    handleInput(keyPress) {
      switch (keyPress) {
        case 'left':
          this.x -= this.movement + 50;
          break;
        case 'up':
          this.y -= this.movement + 30;
          break;
        case 'right':
          this.x += this.movement + 50;
          break;
        case 'down':
          this.y += this.movement + 30;
          break;
      }
    };
  }
  
  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  // Place the player object in a variable called player
  
  let allEnemies = [];
  
  // Position enemies to be created
  let enemyPosition = [50, 135, 220];
  let player = new Player(200, 400, 50);
  let enemy;
  
  enemyPosition.forEach(function (posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 499));
    allEnemies.push(enemy);
  });
  
  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener('keyup', function (e) {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };
  
    player.handleInput(allowedKeys[e.keyCode]);
  });