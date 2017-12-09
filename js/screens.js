
class Fase1 extends GameState {
    preload() {        
        this.game.load.image('background', 'assets/stage2.jpg');
        this.game.load.image('spike', 'assets/spike.png');
        this.game.load.image('fullscreen-button', 'assets/fullscreen-button.png');
        this.game.load.spritesheet('player','assets/crow075.png',187,187);
        this.game.load.spritesheet('darkball','assets/darkball1.5.png',144,144);
        this.game.load.image('buttonFire','assets/FireButton190.png',90,90);
        this.game.load.audio('fable', ['assets/audio/Fable.mp3']);        
        this.game.load.audio('blueFlameSound', ['assets/audio/blueBlast.wav']);
        this.game.load.audio('crow', ['assets/audio/crow.wav']);
        this.game.load.spritesheet('life','assets/lightHalf.png',298,74);
        this.game.load.spritesheet('phoenix','assets/phoenix1.5.png',144,144);
        this.game.load.spritesheet('story','assets/story1.png',186,533);
        this.game.load.spritesheet('owl','assets/mysticCrow075.png',193,150);
        this.game.load.audio('tamb', ['assets/audio/drum.wav']);   
    }

    create() {
        this.game.world.setBounds(0, 0, 385*32, this.game.height);
        this.game.renderer.roundPixels = true;
        this.game.renderer.roundPixels = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.gameSound = this.game.add.audio('fable');
        this.gameSound.play();
        this.crowSound = this.game.add.audio('crow');
        this.game.camera.speedX = 2;
		this.gameStart=0
        
        this.gameSound.loopFull(2.5);        
        let background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background')
        background.autoScroll(-30, 0);
        background.fixedToCamera = true;

        this.touch = this.game.add.audio('tamb');

        // players
        this.player1 = new Player(this.game, this.game.width*1/5, this.game.height/2, 'player',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],10)
        //this.player1.fixedToCamera = true;
        this.game.add.existing(this.player1);

        let fireButton = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
        fireButton.onDown.add(this.doFireButtonAction, this);    

        this.createMap();
        this.storyPic = this.game.add.sprite(this.game.width-this.game.width/2+30, this.game.height-this.game.height/2, 'story');
        this.storyPic.anchor.setTo(0.5, 0.5);
        // full screen touch button
        let fireIcon = this.game.add.sprite(this.game.width-10, this.game.height-10,'buttonFire');
        fireIcon.anchor.setTo(1, 1);
        fireIcon.scale.setTo(0.75, 0.75);
        fireIcon.inputEnabled = true;
        fireIcon.fixedToCamera = true;
        fireIcon.events.onInputDown.add(this.doFireButtonAction, this);
        //this.createTimeEvents();
        super.initFullScreenButtons();
        //this.createPhoenixMiddle();
        //this.createPhoenixTop();
        //this.createPhoenixBottom();
        
        this.game.time.events.add(Phaser.Timer.SECOND*2, this.fadePictureStory , this);
    }


    fadePictureStory(){
    	console.log("HELLO")
    	this.gameStart=1
    	this.game.add.tween(this.storyPic).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    }

    createTimeEvents(){
        this.game.time.events.add(Phaser.Timer.SECOND*5, this.createPhoenixMiddle , this);
        this.game.time.events.add(Phaser.Timer.SECOND*9, this.createPhoenixTop , this);
        this.game.time.events.add(Phaser.Timer.SECOND*14, this.createPhoenixBottom , this);
    }
    
    createPhoenixMiddle(){
        this.enemy1 = new Owl(this.game, this.game.width,this.game.height/2,this.player1);        
        this.game.add.existing(this.enemy1);
    }

    createPhoenixTop(){
        this.enemy2 = new Phoenix(this.game, this.game.width,this.game.height-this.game.height*0.8,this.player1);        
        this.game.add.existing(this.enemy2);
    }
    createPhoenixBottom(){
        this.enemy3 = new Phoenix(this.game, this.game.width,this.game.height-this.game.height*0.2,this.player1);        
        this.game.add.existing(this.enemy3);
    }

    doFireButtonAction(){
        this.blueBlast = new Blueball(this.game, this.player1.x, this.player1.y-81, 'darkball',[0,1,2,3,4,5,6],5,this.enemy1,this.enemy2,this.enemy3)
        this.game.add.existing(this.blueBlast);
        var soundEff = this.game.add.audio('blueFlameSound');
        soundEff.play();
    }

    createMap() {
        let mapData = [ "                                            XXXXX         XXXXXXXXXXXXXXXXXXXX                   XXXXXXX                                                                    XXXXX         XXXXXXXXXXXXXXXXXXXX                   XXXXXXX                                                                    XXXXX         XXXXXXXXXXXXXXXXXXXX                                                  ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                "]
                        
        this.map = this.game.add.group()
        for (let row = 0; row < mapData.length; row++) {
            for (let col = 0; col < mapData[0].length; col++) {
                if (mapData[row][col] == 'X') {
                	var spike = new Spike(this.game, col*32,row*32+20,this.player1);
                	/*
                    let block = this.map.create(col*32, row*32, 'spike')
                    block.scale.setTo(0.5, 0.5)
                    this.game.physics.arcade.enable(block, Phaser.Physics.ARCADE)
                    block.body.immovable = true
                    block.tag = 'spike'
                    block.autoCull = true
                    block.scale.setTo(1.3, 1.3)
                    block.inputEnabled = true
                    block.input.enableDrag(true, false)*/

                }
            }
        }
    }

    update() { 
    	if(this.gameStart==1){
    		if(this.player1.lifeTotal<=0){
	        	this.game.camera.x = 0
	            this.state.start('GameOver')
	            this.gameSound.stop();        
	            this.touch.play();
	        }        
	        this.game.camera.x += this.game.camera.speedX	        
	        if (this.game.camera.x >= this.game.world.width - this.game.width) {
	            //this.game.camera.speedX *= -1
	        }else{
	            this.player1.x+= this.game.camera.speedX    
	        }
    	}        
    }

    render() {
    //    game.debug.body(npc)
    //    game.debug.body(player1)
    //    game.debug.body(player2)
    }
}

window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}