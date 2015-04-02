window.onload = function()
{
    // William Aulson CS 325
    // Digital Assignment #7
    // Escape!
    
    "use strict";
    
    var game = new Phaser.Game( 1024, 576, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render} );
   
 
    function preload() //load assets
    {
    	    game.load.image('b1', 'assets/b1.png')
    	    game.load.image('b2', 'assets/b2.png')
    	    game.load.image('b3', 'assets/b3.png')
    	    game.load.image('b4', 'assets/b4.png')
    	    game.load.image('b5', 'assets/b5.png')
    	    game.load.image('b6', 'assets/b6.png')
    	    game.load.image('b7', 'assets/b7.png')
    	    game.load.image('b8', 'assets/b8.png')
    	    game.load.image('b9', 'assets/b9.png')
    	    game.load.image('back', 'assets/back.png')
    	    game.load.image('button', 'assets/button.png')
    	    game.load.image('buttondown', 'assets/buttondown.png')
    	    game.load.image('door', 'assets/door.png')
    	    game.load.image('floor', 'assets/floor.png')
    	    game.load.image('innerwall', 'assets/innerwall.png')
    	    game.load.image('smallwall', 'assets/smallwall.png')
    	    game.load.image('vertwall', 'assets/vertwall.png')
    	    game.load.image('wall', 'assets/wall.png')
    	    game.load.image('arrow', 'assets/arrow.png')
    	    game.load.image('attackplane', 'assets/attackplane.png')
    	    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    	    game.load.spritesheet('dude2', 'assets/dude2.png', 32, 48);
    	    game.load.spritesheet('shot', 'assets/shot.png', 20, 20);
    	    game.load.audio('shoot', 'assets/shoot.mp3');
    	    game.load.audio('music', 'assets/music.mp3');
    	    game.load.audio('death', 'assets/death.mp3');
    }
    
    //variables
    var bloodDict = {};
    var wSouth;
    var wNorth;
    var wWest;
    var wEast;
    var cellSouth;
    var cellNorth;
    var cellOne;
    var cellTwo;
    var cellThree;
    var cellFour;
    var startDoor;
    var endDoor;
    var startArrow;
    var endArrow;
    var centerLeft;
    var centerRight;
    var buttonOne;
    var buttonTwo;
    var buttonThree;
    var buttonFour;
    var buttonCoverOne;
    var buttonCoverTwo;
    var buttonCoverThree;
    var buttonCoverFour;
    var middleDoor;
    var doorOne;
    var doorTwo;
    var doorThree;
    var doorFour;
    var guardTop;
    var guardBottom;
    var guardTopTurn = 0;
    var guardBottomTurn = 1;
    var moveSpeed = 1;
    var moveSpeedTop = 2;
    var cursors;
    var avatar;
    var avatarDirect = 1;
    var buttonOneTime = 1;
    var buttonTwoTime = 1;
    var buttonThreeTime = 1;
    var buttonFourTime = 1;
    var overlapOne = 0;
    var overlapTwo = 0;
    var overlapThree = 0;
    var overlapFour = 0;
    var avatarOverlap = 1;
    var wallGroup;
    var wallGroupSpecial;
    var doorGroup;
    var attackplane;
    var shotFired = 0;
    var shot;
    var deathCount = 0;
    var blood;
    var gameRunning = 0;
    var firstTime = 1;
    var introBack;
    var introTitleText;
    var introText;
    var textStyle = { font: "60px Arial", fill: "#A30000", align: "center" };
    var titleStyle = { font: "100px Arial", fill: "#A30000", align: "center" };
    var guardGroup;
    var music;
    var shoot;
    var death;
    
    function create() //load initial state data
    {
    	    
    	    game.physics.startSystem(Phaser.Physics.ARCADE);
    	    game.world.setBounds(0, 0, 1024, 576);
    	    game.add.sprite(0, 0, 'back');
    	    
    	    attackplane = game.add.sprite(0, 175, 'attackplane');
    	    game.physics.arcade.enable(attackplane);
    	    
    	    wallGroupSpecial = game.add.group();
    	    game.physics.arcade.enable(wallGroupSpecial);
    	    
    	    wallGroup = game.add.group();
    	    game.physics.arcade.enable(wallGroup);
    	    
    	    doorGroup = game.add.group();
    	    game.physics.arcade.enable(doorGroup);
    	    
    	    guardGroup = game.add.group();
    	    game.physics.arcade.enable(guardGroup);
    	    
    	    startArrow = game.add.sprite(828, 456, 'arrow');
    	    game.physics.arcade.enable(startArrow);
    	    startArrow.body.immovable = true;
    	    endArrow = game.add.sprite(154, 31, 'arrow');
    	    game.physics.arcade.enable(endArrow);
    	    endArrow.body.immovable = true;
    	    
    	    centerLeft = game.add.sprite(190, 276, 'smallwall');
    	    game.physics.arcade.enable(centerLeft);
    	    centerLeft.body.immovable = true;
    	    wallGroup.add(centerLeft);
    	    centerRight = game.add.sprite(584, 276, 'smallwall');
    	    game.physics.arcade.enable(centerRight);
    	    centerRight.body.immovable = true;
    	    wallGroup.add(centerRight);
    	    
    	    cellSouth = game.add.sprite(0, 426, 'innerwall');
    	    game.physics.arcade.enable(cellSouth);
    	    cellSouth.body.immovable = true;
    	    wallGroupSpecial.add(cellSouth);
    	    cellNorth = game.add.sprite(0, 150, 'innerwall');
    	    game.physics.arcade.enable(cellNorth);
    	    cellNorth.body.immovable = true;
    	    wallGroupSpecial.add(cellNorth);
    	    
    	    cellOne = game.add.sprite(340, 427, 'vertwall');
    	    game.physics.arcade.enable(cellOne);
    	    cellOne.body.immovable = true;
    	    wallGroup.add(cellOne);
    	    cellTwo = game.add.sprite(684, 427, 'vertwall');
    	    game.physics.arcade.enable(cellTwo);
    	    cellTwo.body.immovable = true;
    	    wallGroup.add(cellTwo);
    	    cellThree = game.add.sprite(340, 0, 'vertwall');
    	    game.physics.arcade.enable(cellThree);
    	    cellThree.body.immovable = true;
    	    wallGroup.add(cellThree);
    	    cellFour = game.add.sprite(684, 0, 'vertwall');
    	    game.physics.arcade.enable(cellFour);
    	    cellFour.body.immovable = true;
    	    wallGroup.add(cellFour);
    	    
    	    wSouth = game.add.sprite(0, 551, 'floor');
    	    game.physics.arcade.enable(wSouth);
    	    wSouth.body.immovable = true;
    	    wallGroup.add(wSouth);
    	    wNorth = game.add.sprite(0, 0, 'floor');
    	    game.physics.arcade.enable(wNorth);
    	    wNorth.body.immovable = true;
    	    wallGroup.add(wNorth);
    	    wWest = game.add.sprite(0, 0, 'wall');
    	    game.physics.arcade.enable(wWest);
    	    wWest.body.immovable = true;
    	    wallGroup.add(wWest);
    	    wEast = game.add.sprite(999, 0, 'wall');
    	    game.physics.arcade.enable(wEast);
    	    wEast.body.immovable = true;
    	    wallGroup.add(wEast);
    	    
    	    startDoor = game.add.sprite(804, 426, 'door');
    	    game.physics.arcade.enable(startDoor);
    	    startDoor.body.immovable = true;
    	    doorGroup.add(startDoor);
    	    middleDoor = game.add.sprite(804, 150, 'door');
    	    game.physics.arcade.enable(middleDoor);
    	    middleDoor.body.immovable = true;
    	    doorGroup.add(middleDoor);
    	    endDoor = game.add.sprite(130, 1, 'door');
    	    game.physics.arcade.enable(endDoor);
    	    endDoor.body.immovable = true;
    	        	    
    	    doorOne = game.add.sprite(-200, -200, 'door');
    	    game.physics.arcade.enable(doorOne);
    	    doorOne.body.immovable = true;
    	    doorTwo = game.add.sprite(-200, -200, 'door');
    	    game.physics.arcade.enable(doorTwo);
    	    doorTwo.body.immovable = true;
    	    doorThree = game.add.sprite(-200, -200, 'door');
    	    game.physics.arcade.enable(doorThree);
    	    doorThree.body.immovable = true;
    	    doorFour = game.add.sprite(-200, -200, 'door');
    	    game.physics.arcade.enable(doorFour);
    	    doorFour.body.immovable = true;
    	        	    
    	    buttonOne = game.add.sprite(824, 35, 'button');
    	    game.physics.arcade.enable(buttonOne);
    	    buttonOne.body.immovable = true;
    	    buttonTwo = game.add.sprite(482, 35, 'button');
    	    game.physics.arcade.enable(buttonTwo);
    	    buttonTwo.body.immovable = true;
    	    buttonThree = game.add.sprite(482, 481, 'button');
    	    game.physics.arcade.enable(buttonThree);
    	    buttonThree.body.immovable = true;
    	    buttonFour = game.add.sprite(155, 481, 'button');
    	    game.physics.arcade.enable(buttonFour);
    	    buttonFour.body.immovable = true;
    	    
    	    buttonCoverOne = game.add.sprite(-100, -100, 'buttondown');
    	    game.physics.arcade.enable(buttonCoverOne);
    	    buttonCoverOne.body.immovable = true;
    	    buttonCoverTwo = game.add.sprite(-100, -100, 'buttondown');
    	    game.physics.arcade.enable(buttonCoverTwo);
    	    buttonCoverTwo.body.immovable = true;
    	    buttonCoverThree = game.add.sprite(-100, -100, 'buttondown');
    	    game.physics.arcade.enable(buttonCoverThree);
    	    buttonCoverThree.body.immovable = true;
    	    buttonCoverFour = game.add.sprite(-100, -100, 'buttondown');
    	    game.physics.arcade.enable(buttonCoverFour);
    	    buttonCoverFour.body.immovable = true;
    	    
    	    guardTop = game.add.sprite(80, 200, 'dude2');
    	    game.physics.arcade.enable(guardTop);
    	    guardTop.animations.add('left', [0, 1, 2, 3], 10, true);
    	    guardTop.animations.add('right', [5, 6, 7, 8], 10, true);
    	    guardTop.frame = 5;
    	    guardGroup.add(guardTop);
    	    guardBottom = game.add.sprite(610, 340, 'dude2');
    	    game.physics.arcade.enable(guardBottom);
    	    guardBottom.animations.add('left', [0, 1, 2, 3], 10, true);
    	    guardBottom.animations.add('right', [5, 6, 7, 8], 10, true);
    	    guardGroup.add(guardBottom);
    	    
    	    avatar = game.add.sprite(950, 480, 'dude');
    	    game.physics.arcade.enable(avatar);
    	    avatar.animations.add('left', [0, 1, 2, 3], 10, true);
    	    avatar.animations.add('right', [5, 6, 7, 8], 10, true);
    	    
    	    cursors = game.input.keyboard.createCursorKeys();
    	    
    	    death = game.add.audio('death');
    	    shoot = game.add.audio('shoot');
    	    shoot.allowMultiple = true;
    	    music = game.add.audio('music');
    	        	        	    
    	    bloodDict[0] = 'b1';
    	    bloodDict[1] = 'b2';
    	    bloodDict[2] = 'b3';
    	    bloodDict[3] = 'b4';
    	    bloodDict[4] = 'b5';
    	    bloodDict[5] = 'b6';
    	    bloodDict[6] = 'b7';
    	    bloodDict[7] = 'b8';
    	    bloodDict[8] = 'b9';
    	    
    	    introBack = game.add.sprite(0, 0, 'back');
    	    introTitleText = game.add.text(500, 100, 'Escape!', titleStyle);
    	    introTitleText.anchor.set(0.5);
    	    introText = game.add.text(500, 250, 'Use the arrow keys to move.\nActivate the buttons to escape.', textStyle);
    	    introText.anchor.set(0.5);
    	    
    	    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    	    game.input.onDown.add(fullScreenStart, this);
    	    game.paused = true;
    }
    
    function fullScreenStart() //fullscreen method
    {
    	    if (game.scale.isFullScreen)
    	    {
    	    	    game.paused = true;
    	    	    game.scale.stopFullScreen();
    	    }
    	    else
    	    {
    	    	    if (firstTime)
    	    	    {
    	    	    	    killIntro();
    	    	    	    music.play('',0,1,true);
    	    	    	    gameRunning = 1;
    	    	    	    firstTime = 0;
    	    	    }
    	    	    game.scale.startFullScreen(true);
    	    	    game.paused = false;
    	    }
    }
    
    function update() //main game logic
    {
    	    if (gameRunning)
    	    {
    	    	    game.physics.arcade.overlap(avatar, guardGroup, kill, null, this);
    	    	    game.physics.arcade.overlap(avatar, attackplane, checkShot, null, this);
    	    	    game.physics.arcade.overlap(avatar, buttonOne, pushOne, null, this);
    	    	    game.physics.arcade.overlap(avatar, buttonTwo, pushTwo, null, this);
    	    	    game.physics.arcade.overlap(avatar, buttonThree, pushThree, null, this);
    	    	    game.physics.arcade.overlap(avatar, buttonFour, pushFour, null, this);
    	    	    game.physics.arcade.collide(avatar, wallGroup, null, null, this);
    	    	    game.physics.arcade.overlap(avatar, doorGroup, unclipWall, null, this);
    	    	    game.physics.arcade.overlap(avatar, doorOne, reachOne, null, this);
    	    	    game.physics.arcade.overlap(avatar, doorTwo, reachTwo, null, this);
    	    	    game.physics.arcade.overlap(avatar, doorThree, reachThree, null, this);
    	    	    game.physics.arcade.overlap(avatar, doorFour, reachFour, null, this);
    	    	    game.physics.arcade.overlap(avatar, endDoor, winGame, null, this);
    	    	    game.physics.arcade.overlap(shot, wallGroup, killShot, null, this);
    	    	    game.physics.arcade.overlap(shot, wallGroupSpecial, killShot, null, this);
    	    	    game.physics.arcade.overlap(avatar, shot, killPlayer, null, this);
    	    
    	    	    if (avatarOverlap)
    	    	    {
    	    	    	    game.physics.arcade.collide(avatar, wallGroupSpecial, null, null, this);
    	    	    }
    	    
    	    	    if (guardTopTurn)
    	    	    {
    	    	    	    if (guardTop.body.x <= 80)
    	    	    	    {
    	    	    	    	    guardTop.body.x = guardTop.body.x + moveSpeedTop;
    	    	    	    	    guardTop.animations.play('right');
    	    	    	    	    guardTopTurn = 0;
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    guardTop.body.x = guardTop.body.x - moveSpeedTop;
    	    	    	    	    guardTop.animations.play('left');
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (guardTop.body.x >= 910)
    	    	    	    {
    	    	    	    	    guardTop.body.x = guardTop.body.x - moveSpeedTop;
    	    	    	    	    guardTop.animations.play('left');
    	    	    	    	    guardTopTurn = 1;
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    guardTop.body.x = guardTop.body.x + moveSpeedTop;
    	    	    	    	    guardTop.animations.play('right');
    	    	    	    }
    	    	    }
    	    	    if (guardBottomTurn)
    	    	    {
    	    	    	    if (guardBottom.body.x <= 80)
    	    	    	    {
    	    	    	    	    guardBottom.body.x = guardBottom.body.x + moveSpeed;
    	    	    	    	    guardBottom.animations.play('right');
    	    	    	    	    guardBottomTurn = 0;
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    guardBottom.body.x = guardBottom.body.x - moveSpeed;
    	    	    	    	    guardBottom.animations.play('left');
    	    	    	    }
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (guardBottom.body.x >= 910)
    	    	    	    {
    	    	    	    	    guardBottom.body.x = guardBottom.body.x - moveSpeed;
    	    	    	    	    guardBottom.animations.play('left');
    	    	    	    	    guardBottomTurn = 1;
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    guardBottom.body.x = guardBottom.body.x + moveSpeed;
    	    	    	    	    guardBottom.animations.play('right');
    	    	    	    }
    	    	    }
    	    
    	    	    avatar.body.velocity.x = 0;
    	    	    avatar.body.velocity.y = 0;
    	    	    if (cursors.up.isDown && cursors.right.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.y = -200;
    	    	    	    avatar.body.velocity.x = 200;
    	    	    	    avatar.animations.play('right');
    	    	    	    avatarDirect = 0;
    	    	    }
    	    	    else if (cursors.up.isDown && cursors.left.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.y = -200;
    	    	    	    avatar.body.velocity.x = -200;
    	    	    	    avatar.animations.play('left');
    	    	    	    avatarDirect = 1;
    	    	    }
    	    	    else if (cursors.down.isDown && cursors.right.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.y = 200;
    	    	    	    avatar.body.velocity.x = 200;
    	    	    	    avatar.animations.play('right');
    	    	    	    avatarDirect = 0;
    	    	    }
    	    	    else if (cursors.left.isDown && cursors.down.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.y = 200;
    	    	    	    avatar.body.velocity.x = -200;
    	    	    	    avatar.animations.play('left');
    	    	    	    avatarDirect = 1;
    	    	    }
    	    	    else if (cursors.up.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.y = -200;
    	    	    	    if (avatarDirect)
    	    	    	    {
    	    	    	    	    avatar.animations.play('left');
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    avatar.animations.play('right');
    	    	    	    }
    	    	    }
    	    	    else if (cursors.down.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.y = 200;
    	    	    	    if (avatarDirect)
    	    	    	    {
    	    	    	    	    avatar.animations.play('left');
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    avatar.animations.play('right');
    	    	    	    }
    	    	    }
    	    	    else if (cursors.left.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.x = -200;
    	    	    	    avatar.animations.play('left');
    	    	    	    avatarDirect = 1;
    	    	    }
    	    	    else if (cursors.right.isDown)
    	    	    {
    	    	    	    avatar.body.velocity.x = 200;
    	    	    	    avatar.animations.play('right');
    	    	    	    avatarDirect = 0;
    	    	    }
    	    	    else
    	    	    {
    	    	    	    if (avatarDirect)
    	    	    	    {
    	    	    	    	    avatar.frame = 0;
    	    	    	    }
    	    	    	    else
    	    	    	    {
    	    	    	    	    avatar.frame = 5;
    	    	    	    }
    	    	    }
    	    
    	    	    avatarOverlap = 1;
    	   	 }
    }
    
    function render()
    {
    	    //game.debug.cameraInfo(game.camera, 500, 32);
    	    //game.debug.spriteCoords(game.camera, 32, 32);
    }
    
    function checkShot() //see if guard can shoot
    {
    	    if (shotFired < 2)
    	    {
    	    	  if ((guardTop.x < avatar.x) && (guardTopTurn === 0) && (avatar.y < 260))
    	    	  {
    	    	  	  shoot.play('', .6, 1, false);
    	    	  	  shot = game.add.sprite(guardTop.x + 5, guardTop.y, 'shot');
    	    	  	  game.physics.arcade.enable(shot);
    	    	    	  shot.body.velocity.x = 1000;
    	    	    	  shot.body.velocity.y = game.rnd.integerInRange(-500, 500);
    	    	    	  shot.animations.add('shot', [0, 1], 10, true);
    	    	    	  shot.animations.play('shot');
    	    	    	  shotFired = shotFired + 1;
    	    	  }
    	    	  else if ((guardTop.x > avatar.x) && (guardTopTurn === 1) && (avatar.y < 260))
    	    	  {
    	    	  	  shoot.play('', .6, 1, false);
    	    	  	  shot = game.add.sprite(guardTop.x - 5, guardTop.y, 'shot');
    	    	  	  game.physics.arcade.enable(shot);
    	    	    	  shot.body.velocity.x = -1000;
    	    	    	  shot.body.velocity.y = game.rnd.integerInRange(-500, 500);
    	    	    	  shot.animations.add('shot', [0, 1], 10, true);
    	    	    	  shot.animations.play('shot');
    	    	    	  shotFired = shotFired + 1;
    	    	  }
    	    	  if ((guardBottom.x < avatar.x) && (guardBottomTurn === 0) && (avatar.y > 275))
    	    	  {
    	    	  	  shoot.play('', .6, 1, false);
    	    	  	  shot = game.add.sprite(guardBottom.x + 5, guardBottom.y, 'shot');
    	    	  	  game.physics.arcade.enable(shot);
    	    	    	  shot.body.velocity.x = 1000;
    	    	    	  shot.body.velocity.y = game.rnd.integerInRange(-500, 500);
    	    	    	  shot.animations.add('shot', [0, 1], 10, true);
    	    	    	  shot.animations.play('shot');
    	    	    	  shotFired = shotFired + 1;
    	    	  }
    	    	  else if ((guardBottom.x > avatar.x) && (guardBottomTurn === 1) && (avatar.y > 275))
    	    	  {
    	    	  	  shoot.play('', .6, 1, false);
    	    	  	  shot = game.add.sprite(guardBottom.x - 5, guardBottom.y, 'shot');
    	    	  	  game.physics.arcade.enable(shot);
    	    	    	  shot.body.velocity.x = -1000;
    	    	    	  shot.body.velocity.y = game.rnd.integerInRange(-500, 500);
    	    	    	  shot.animations.add('shot', [0, 1], 10, true);
    	    	    	  shot.animations.play('shot');
    	    	    	  shotFired = shotFired + 1;
    	    	  }
    	    }
    }
    
    function killIntro()
    {
    	    introBack.destroy();
    	    introText.destroy();
    	    introTitleText.destroy();
    }
    
    function kill() //player guard collision
    {
    	    death.play('', 0, 1);
    	    avatar.body.x = 950;
    	    avatar.body.y = 480;
    	    deathCount = deathCount + 1;
    	    if (!(blood == null))
    	    {
    	    	  blood.destroy();  
    	    }
    	    blood = game.add.sprite(avatar.x, avatar.y, bloodDict[game.rnd.integerInRange(0, 8)]);
    	    game.time.events.add(Phaser.Timer.SECOND * 2, killBlood, null);
    	    overlapOne = 0;
    	    overlapTwo = 0;
    	    overlapThree = 0;
    	    overlapFour = 0;
    	    resetButtonOne();
    	    resetButtonTwo();
    	    resetButtonThree();
    	    resetButtonFour();
    }
    
    function killPlayer(avatar, shot) //player shot collision
    {
    	    death.play('', 0, 1);
    	    avatar.body.x = 950;
    	    avatar.body.y = 480;
    	    shot.destroy();
    	    deathCount = deathCount + 1;
    	    shotFired = shotFired - 1;
    	    if (!(blood == null))
    	    {
    	    	  blood.destroy();  
    	    }
    	    blood = game.add.sprite(avatar.x, avatar.y, bloodDict[game.rnd.integerInRange(0, 8)]);
    	    game.time.events.add(Phaser.Timer.SECOND * 2, killBlood, null);
    	    overlapOne = 0;
    	    overlapTwo = 0;
    	    overlapThree = 0;
    	    overlapFour = 0;
    	    resetButtonOne();
    	    resetButtonTwo();
    	    resetButtonThree();
    	    resetButtonFour();
    }
    
    function killBlood()
    {
    	    blood.destroy();
    }
    
    function killShot(shot)
    {
    	    shot.destroy();
    	    shotFired = shotFired - 1;
    }
    
    function changeSpeed() //vary guard speed
    {
    	    if (moveSpeedTop === 2)
    	    {
    	    	    moveSpeedTop = 1;
    	    }
    	    else
    	    {
    	    	    moveSpeedTop = 2;
    	    }
    	    if (moveSpeed === 2)
    	    {
    	    	    moveSpeed = 1;
    	    }
    	    else
    	    {
    	    	    moveSpeed = 2;
    	    }
    }
    
    function winGame() //endgame state
    {
    	    music.stop();
    	    gameRunning = 0;
    	    introBack = game.add.sprite(0, 0, 'back');
    	    introTitleText = game.add.text(500, 100, 'Escape!', titleStyle);
    	    introTitleText.anchor.set(0.5);
    	    introText = game.add.text(500, 250, 'You have escaped! Great job!\nYou foresaw ' + deathCount + ' bad future(s).', textStyle);
    	    introText.anchor.set(0.5);
    }
    
    function unclipWall()
    {
    	    avatarOverlap = 0;
    }
    
    function reachOne()
    {
    	    avatarOverlap = 0;
    	    overlapOne = 1;
    }
    
    function reachTwo()
    {
    	    avatarOverlap = 0;
    	    overlapTwo = 1;
    }
    
    function reachThree()
    {
    	    avatarOverlap = 0;
    	    overlapThree = 1;
    }
    
    function reachFour()
    {
    	    avatarOverlap = 0;
    	    overlapFour = 1;
    }
    
    function pushOne()
    {
    	    if (buttonOneTime)
    	    {
    	    	    changeSpeed();
    	    	    buttonCoverOne.x = 824;
    	    	    buttonCoverOne.y = 35;
    	    	    buttonOneTime = 0;
    	    	    doorOne.x = 470;
    	    	    doorOne.y = 426;
    	    	    game.time.events.add(Phaser.Timer.SECOND * 10, resetButtonOne, null);
    	    }
    }
    
    function resetButtonOne()
    {
    	    if (!overlapOne)
    	    {
    	    	    buttonCoverOne.x = -200;
    	    	    buttonCoverOne.y = -200;
    	    	    buttonOneTime = 1;
    	    	    doorOne.x = -100;
    	    	    doorOne.y = -100;
    	    } 
    }
    
    function pushTwo()
    {
    	    if (buttonTwoTime)
    	    {
    	    	    changeSpeed();
    	    	    buttonCoverTwo.x = 482;
    	    	    buttonCoverTwo.y = 35;
    	    	    buttonTwoTime = 0;
    	    	    doorTwo.x = 130;
    	    	    doorTwo.y = 426;
    	    	    game.time.events.add(Phaser.Timer.SECOND * 10, resetButtonTwo, null);
    	    }
    }
    
    function resetButtonTwo()
    {
    	    if (!overlapTwo)
    	    {
    	    	    buttonCoverTwo.x = -200;
    	    	    buttonCoverTwo.y = -200;
    	    	    buttonTwoTime = 1;
    	    	    doorTwo.x = -100;
    	    	    doorTwo.y = -100;
    	    } 
    }
    
    function pushThree()
    {
    	    if (buttonThreeTime)
    	    {
    	    	    changeSpeed();
    	    	    buttonCoverThree.x = 482;
    	    	    buttonCoverThree.y = 481;
    	    	    buttonThreeTime = 0;
    	    	    doorThree.x = 470;
    	    	    doorThree.y = 150;
    	    	    game.time.events.add(Phaser.Timer.SECOND * 10, resetButtonThree, null);
    	    }
    }
    
    function resetButtonThree()
    {
    	    if (!overlapThree)
    	    {
    	    	    buttonCoverThree.x = -200;
    	    	    buttonCoverThree.y = -200;
    	    	    buttonThreeTime = 1;
    	    	    doorThree.x = -100;
    	    	    doorThree.y = -100;
    	    }  
    }
    
    function pushFour()
    {
    	    if (buttonFourTime)
    	    {
    	    	    changeSpeed();
    	    	    buttonCoverFour.x = 155;
    	    	    buttonCoverFour.y = 481;
    	    	    buttonFourTime = 0;
    	    	    doorFour.x = 130;
    	    	    doorFour.y = 150;
    	    	    game.time.events.add(Phaser.Timer.SECOND * 10, resetButtonFour, null);
    	    }
    }
    
    function resetButtonFour()
    {
    	    if (!overlapFour)
    	    {
    	    	    buttonCoverFour.x = -200;
    	    	    buttonCoverFour.y = -200;
    	    	    buttonFourTime = 1;
    	    	    doorFour.x = -100;
    	    	    doorFour.y = -100;
    	    }
    }
};