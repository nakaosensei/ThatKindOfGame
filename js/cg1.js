
class CG1 extends GameState {
    preload() {
        this.game.load.image('background', 'assets/cg.jpg')
        this.game.load.image('gameOver', 'assets/fimJogo.png')
        this.game.load.image('cg1', 'assets/cg1.png')
        this.game.load.image('cg2', 'assets/cg2.png')
        this.game.load.image('cg3', 'assets/cg3.png')
        this.game.load.image('cg4', 'assets/cg4.png')
        this.game.load.image('cg5', 'assets/cg5.png')
        this.game.load.image('cg6', 'assets/cg6.png')
        this.game.load.image('cg7', 'assets/cg7.png')
        this.game.load.spritesheet('life','assets/lightHalf.png',298,74); 
        this.game.load.image('cg8', 'assets/cg8.png')
        this.game.load.spritesheet('portal','assets/portal.png',94,200);
        this.game.load.image('retry', 'assets/retry.png')
        this.game.load.spritesheet('player','assets/crow075.png',187,187);
        this.game.load.audio('whiteSpecter', ['assets/audio/songOfTheNorth.mp3']);
        this.game.load.audio('tamb', ['assets/audio/drum.wav']);        
    }

    create() {
        this.game.renderer.roundPixels = true
        //game.renderer.clearBeforeRender = false
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.gameSound = this.game.add.audio('whiteSpecter');
        this.gameSound.play();
        this.touch = this.game.add.audio('tamb');
        
        let background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background')
        //background.autoScroll(-30, 0)
        this.cg1 = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'cg1');
        this.cg1.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND*2, this.fadePicturegame1 , this);        
        //this.game.time.events.add(Phaser.Timer.SECOND*4, this.showLogo , this);      
    }

    update() { 
        // colisoes
        // this.game.physics.arcade.collide(player1, bullets2, hitPlayer)
    }

    showLogo(){
        this.logoSprite = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'logo');
        this.logoSprite.anchor.setTo(0.5, 0.5);
        this.logoSprite.alpha = 0;
        this.game.add.tween(this.logoSprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);

        let retryButton = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        retryButton.onDown.add(this.retry, this)
        let bbIcon = this.game.add.sprite(this.game.width-10, this.game.height-10,'retry')
        bbIcon.anchor.setTo(1, 1)
        //fireIcon.scale.setTo(0.75, 0.75)
        bbIcon.inputEnabled = true
        bbIcon.events.onInputDown.add(this.retry, this)

    }

    retry(){
        this.state.start('Menu')
        this.gameSound.stop();        
        this.touch.play();

    }

    fadePicturegame1() {
        this.game.add.tween(this.cg1).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);  
        this.game.time.events.add(Phaser.Timer.SECOND*2, this.inner1 , this);  
    }
    inner1(){
        this.cg2 = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'cg2');
        this.cg2.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND*1, this.fadePicturegame2 , this); 
    }
    fadePicturegame2() {
        this.game.add.tween(this.cg2).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);  
        this.game.time.events.add(Phaser.Timer.SECOND*2, this.inner2 , this);  
    }
    inner2(){
        this.cg3 = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'cg3');
        this.cg3.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND*1, this.fadePicturegame3 , this); 
    }
    fadePicturegame3() {
        this.game.add.tween(this.cg3).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);  
        this.game.time.events.add(Phaser.Timer.SECOND*2, this.inner3 , this);  
    }
    inner3(){
        this.cg4 = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'cg4');
        this.cg4.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND*1, this.fadePicturegame4 , this); 
    }
    fadePicturegame4() {
        this.game.add.tween(this.cg4).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);  
        this.game.time.events.add(Phaser.Timer.SECOND*2, this.inner4 , this);  
    }
    inner4(){
        this.cg5 = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'cg5');
        this.cg5.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND*1, this.fadePicturegame5 , this); 
    }
    fadePicturegame5() {
        this.game.add.tween(this.cg5).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);  
        this.game.time.events.add(Phaser.Timer.SECOND*2, this.inner5 , this);  
    }
    inner5(){
        this.cg6 = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'cg6');
        this.cg6.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND*1, this.fadePicturegame6 , this); 
    }
    fadePicturegame6() {
        this.game.add.tween(this.cg6).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);  
        this.game.time.events.add(Phaser.Timer.SECOND*2, this.inner6 , this);  
    }
    inner6(){
        this.cg7 = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'cg7');
        this.cg7.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND*1, this.fadePicturegame7 , this); 
    }
    fadePicturegame7() {
        this.game.add.tween(this.cg7).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);  
        this.game.time.events.add(Phaser.Timer.SECOND*2, this.inner7 , this);  
    }
    inner7(){
        this.cg8 = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'cg8');
        this.cg8.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND*1, this.fadePicturegame8 , this); 
    }
    fadePicturegame8() {
        //this.game.add.tween(this.cg8).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);  
        this.game.time.events.add(Phaser.Timer.SECOND*2, this.inner8 , this);  
    }
    inner8(){
        console.log("inner 8")
        this.player1 = new PlayerNPC(this.game, this.game.width*1/5, this.game.height/1.5, 'player',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],10,this.munitionQtde)
        this.game.add.existing(this.player1);
        this.portal = new Portal(this.game, this.game.width*1/5+700,this.game.height/1.5,this.player1,'Menu',this.gameSound);
        //this.cg2 = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'cg8');
        //this.cg2.anchor.setTo(0.5, 0.5);
        //this.game.time.events.add(Phaser.Timer.SECOND*3, this.fadePicturegame9 , this); 
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


