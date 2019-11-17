
class Fase1 extends GameState {
    preload() {
        this.game.load.image('background', 'assets/stage1.jpg');
        this.game.load.image('spike', 'assets/spike.png');
        this.game.load.image('spike2', 'assets/spike2.png');
        this.game.load.image('fullscreen-button', 'assets/fullscreen-button.png');
        this.game.load.spritesheet('player','assets/crow075.png',187,187);
        this.game.load.spritesheet('darkball','assets/darkball1.5.png',144,144);
        this.game.load.image('buttonFire','assets/FireButton190.png',90,90);
        this.game.load.audio('fable', ['assets/audio/Fable.mp3']);
        this.game.load.audio('blueFlameSound', ['assets/audio/blueBlast.wav']);
        this.game.load.audio('collectShot', ['assets/audio/collectShot.wav']);
        this.game.load.audio('collectLife', ['assets/audio/collectLife.wav']);
        this.game.load.spritesheet('test','assets/enemy4.png',118,144);
        this.game.load.audio('crow', ['assets/audio/crow.wav']);
        this.game.load.spritesheet('life','assets/lightHalf.png',298,74);
        this.game.load.spritesheet('phoenix','assets/enemy1.png',144,144);
        this.game.load.spritesheet('fireBlast','assets/enemyAtk1.png',100,50);
        this.game.load.spritesheet('portal','assets/portal.png',94,200);
        this.game.load.spritesheet('story','assets/story1.png',186,533);
        this.game.load.image('story1','assets/story2.png');
        this.game.load.image('lifeSingle','assets/lifeSingle.png');
        this.game.load.image('munition','assets/munition.png');

        this.game.load.spritesheet('owl','assets/enemy3.png',114,144);
        this.game.load.audio('tamb', ['assets/audio/drum.wav']);
    }

    create() {
        this.game.world.setBounds(0, 0, 385*32, this.game.height);
        this.game.renderer.roundPixels = true;
        this.game.renderer.roundPixels = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.gameSound = this.game.add.audio('fable');
        this.gameSound.play();


        this.game.camera.speedX = 2;
		this.gameStart=0
        this.characterCtrl = new PersonagemController();
        this.skillCtrl = new PersonagemController();
        this.gameSound.loopFull(2.5);
        let background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background')
        background.autoScroll(-10, 0);
        background.fixedToCamera = true;

        this.touch = this.game.add.audio('tamb');
        this.munitionQtde = this.game.add.text(this.game.width-50, this.game.height-50, '5', { fontSize: '32px', fill: '#fff' });
        this.munitionQtde.fixedToCamera = true

        /*this.dm = this.game.add.sprite(200,200,'test')
        this.dm.anchor.setTo(0.5,0.5)
        this.game.add.existing(this.dm);
        this.dm.animations.add('full',[0],5,true)
        this.dm.animations.play('full')*/

        // players
        this.player1 = new Player(this.game, this.game.width*1/5, this.game.height/2, 'player',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],10,this.munitionQtde)
        

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

        this.game.time.events.add(Phaser.Timer.SECOND*2, this.fadePictureStory1 , this);
        this.game.time.events.add(Phaser.Timer.SECOND*4, this.fadePictureStory2 , this);
    }


    fadePictureStory1(){
    	this.game.add.tween(this.storyPic).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        this.storyPic2 = this.game.add.sprite(this.game.width-this.game.width/2+30, this.game.height-this.game.height/2, 'story1');
        this.storyPic2.anchor.setTo(0.5, 0.5);
    }
    fadePictureStory2(){
        this.gameStart=1
        this.game.add.tween(this.storyPic2).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

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
    	if(this.player1.municao<=0){
    		return 0;
    	}
        this.blueBlast = new Blueball(this.game, this.player1.x, this.player1.y-81, 'darkball',[0,1,2,3,4,5,6],5,this.characterCtrl,this.player1,this.munitionQtde)
        this.game.add.existing(this.blueBlast);
        var soundEff = this.game.add.audio('blueFlameSound');
        soundEff.play();
    }

    createMap() {
        let mapData = [ "                                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                   XXXXXXX                                                                    XXXXX         XXXXXXXXXXXXXXXXXXXX                   XXXXXXX                                                                    XXXXX         XXXXXXXXXXXXXXXXXXXX                                                  ",
                        "                                                                                                                                                                                                                                                                                                                                                                                                ",
                        "                                                                                                                                                                                        Z                                                                                                                                                                                                       ",
                        "                                                                                                                          Y                              Y                                                                                                                                              Y                                                     Y                                 ",
                        "                                                Y                          Z                        Y                                                                 Y                          Y       M                                                                                                                                                                           Z          ",
                        "                                                                                                                                                                                                                           Y                               Y                                                                   Y                                                                ",
                        "                                                                                                                                           Z              M                                                           Y                                                                Y                                                                                            Y           ",
                        "                                 Y                         Y                                                                                                                   Z                                                               M                       Z                                           Y                               Y           Y                           Z    ",
                        "                                                                                                         Y             M       Z                                                                             Z                                          Y                                                                           M                                                           ",
                        "                                                                                                                                                            Y                                                                                                                     Y                                                                                                 Y          F ",
                        "                                                                  M     Z                                                                                               Z                                                                                                                                                              Y                                  Z                     ",
                        "                                                                                                                                                                                                                                        Z                                M             M              Z                     Z                                                                   ",
                        "                                                                                                                       Y                                                               M     Y                         Y                                                                                                                                                                        ",
                        "                                         Z                                                                                                      Y                          Y                                                                                                        Y      L                                                                                                    ",
                        "                                                                                                 Y                                                                                                                                                                 Y                                                                                                                Y           ",
                        "                                                             Y                                                                    Y                                                                                                                                                                        Y                                            Y                                       ",
                        "                                  Y                                                                                                                                                                 Y                        Y                                                                                                      Z                                                           ",
                        "                                                                                                                                                                                                                                                      Y                                Y                                                                                                        ",
                        "                                                                          KKKKKKKKKKKKKK                                    KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK                                                                                         KKKKKKKKKKKKKKKKKKKKKK                       KKKKKKKKKKKKKKKKKKKKKKKKKK                                                                 "]

        this.map = this.game.add.group()
        for (let row = 0; row < mapData.length; row++) {
            for (let col = 0; col < mapData[0].length; col++) {
                if (mapData[row][col] == 'X') {
                	var spike = new Spike(this.game, col*32,row*32+20,this.player1);
                }
                if (mapData[row][col] == 'K') {
                    var spike = new Spike2(this.game, col*32,row*32,this.player1);
                }
                if (mapData[row][col] == 'Z') {
                	var phoenix = new Phoenix(this.game, col*32,row*32,this.player1,this.skillCtrl);
                	this.characterCtrl.add(phoenix);
                }
                if (mapData[row][col] == 'Y') {
                	var owl = new Owl(this.game, col*32,row*32,this.player1);
                	this.characterCtrl.add(owl);
                }
                if (mapData[row][col] == 'L') {
                	var owl = new Life(this.game, col*32,row*32,this.player1);
                	//this.characterCtrl.add(owl);
                }
                if (mapData[row][col] == 'M') {
                	var owl = new MunitionBlue(this.game, col*32,row*32,this.player1);
                	//this.characterCtrl.add(owl);
                }
                if (mapData[row][col] == 'F') {
                    var owl = new Portal(this.game, col*32,row*32,this.player1,'Fase2',this.gameSound);
                    //this.characterCtrl.add(owl);
                }
                if (mapData[row][col] == 'R') {
                    var owl = new Portal2(this.game, col*32,row*32,this.player1,'GameOver',this.gameSound);
                    this.characterCtrl.add(owl);
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
    //    this.game.debug.body(this.player1)
    //    var i = 0;
    //    for(i=0;i<this.characterCtrl.personagens.length;i++){
    //    	this.game.debug.body(this.characterCtrl.personagens[i])
    //    }
    //    for(i=0;i<this.skillCtrl.personagens.length;i++){
    //    	this.game.debug.body(this.skillCtrl.personagens[i])
    //    }
    //    game.debug.body(player1)
    //    game.debug.body(player2)
    }
}

window.onload = function() {
    // funciona como singleton
    const GAME = new Game()
}
