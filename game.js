// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 50;

// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(375, 400, 'coin');
  createItem(225, 500, 'coin');
  createItem(575, 150, 'coin');
  createItem(225, 200, 'coin');
  createItem(375, 100, 'coin');
 
 
}

// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(450, 550, 'platform');
  platforms.create(100, 550, 'platform');
  platforms.create(3000, 450, 'platform');
  platforms.create(250, 150, 'platform');
  platforms.create(50, 300, 'platform');
  platforms.create(150, 250, 'platform');
  platforms.create(650, 300, 'platform');
  platforms.create(550, 200, 'platform');
  platforms.create(300, 450, 'platform');
  platforms.create(400, 350, 'platform');
  platforms.create(100, 550, 'platform');
  platforms.setAll('body.immovable', true);
}

// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin'); 
  item.animations.play('spin', 10, true);
}

// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  currentScore = currentScore + 10;
  if (currentScore === winningScore) {
      createBadge();
  }
}

// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render },true);

// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
  
// before the game begins
  function preload() {
    game.stage.backgroundColor = '#ffc3c3';

// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
  
  //Load images
    game.load.image('platform', 'platform_1.png');

// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
    
  //Load spritesheets
    game.load.spritesheet('player', 'characters.png', 48, 62);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    game.load.spritesheet('badge', 'badge.png', 42, 54);
    game.load.spritesheet('poison', 'poison.png', 32, 32);
    game.load.spritesheet('star', 'star.png', 32, 32);
  }
// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
  
// initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(515,10, "Jump: SpaceBar",  { font: "bold 30px Super Mario DS (Original)", fill: "white" });
    text = game.add.text(515,50, "Move: Arrow Keys",  { font: "bold 30px Super Mario DS (Original)", fill: "white" });
    text = game.add.text(16, 10, "Goal: 50 Points ", { font: "bold 30px Super Mario DS (Original)", fill: "orange", });
    text = game.add.text(16, 55, "SCORE: " + currentScore, { font: "bold 30px Super Mario DS (Original)", fill: "lightgreen" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 100px Super Mario DS (Original)", fill: "red" });
    winningMessage.anchor.setTo(0.5, 1);
  }
// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
  
// while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
    
// is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
    
// is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
    
// player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
    
// when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }
  }
// the following function was sourced from
//https://github.com/greatdaydesigns/starterFiles-firstGame/tree/main/project
//written by Blaine Ruttan on November 16, 2022
  
function render() {

  }

};
