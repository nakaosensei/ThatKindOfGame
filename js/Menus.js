
class Menu extends GameState {
    preload() {
        this.game.load.image('wall', 'assets/wall.png')
        //this.game.load.image('player', 'assets/airplane1.png')
        this.game.load.image('background', 'assets/Menu3.jpg')
        this.game.load.image('adrian', 'assets/adrian1.png')
        this.game.load.image('logo', 'assets/logo.png')
        this.game.load.image('begin', 'assets/begin.png')
        this.game.load.spritesheet('explosion', 'assets/explosion.png', 56, 56)
        this.game.load.image('fullscreen-button', 'assets/fullscreen-button.png')
        this.game.load.audio('darknessBeloved', ['assets/audio/Darkness2.mp3']);
        this.game.load.audio('tamb', ['assets/audio/drum.wav']);
        this.game.load.spritesheet('life','assets/lightHalf.png',298,74)
    }

    create() {
        this.game.renderer.roundPixels = true
        //game.renderer.clearBeforeRender = false
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.gameSound = this.game.add.audio('darknessBeloved');
        this.gameSound.play();
        this.touch = this.game.add.audio('tamb');
        
        let background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background')
        //background.autoScroll(-30, 0)
        this.adrian = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'adrian');
        this.adrian.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND*6, this.fadePictureAdrian , this);
        
        this.game.time.events.add(Phaser.Timer.SECOND*8, this.showLogo , this);
        

        // adicionar controles de full screen a tela
        super.initFullScreenButtons()
    }

    update() { 
        // colisoes
        // this.game.physics.arcade.collide(player1, bullets2, hitPlayer)
    }

    showLogo(){
        this.logoSprite = this.game.add.sprite((this.game.width-this.game.width/2)-this.game.width*0.05, (this.game.height-this.game.height/2)-60, 'logo');
        this.logoSprite.anchor.setTo(0.5, 0.5);
        this.logoSprite.alpha = 0;
        this.game.add.tween(this.logoSprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);

        let beginButton = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        beginButton.onDown.add(this.begin, this)
        let bbIcon = this.game.add.sprite(this.game.width-10, this.game.height-10,'begin')
        bbIcon.anchor.setTo(1, 1)
        //fireIcon.scale.setTo(0.75, 0.75)
        bbIcon.inputEnabled = true
        bbIcon.events.onInputDown.add(this.begin, this)

    }

    begin(){
        this.state.start('Play')
        this.gameSound.stop();        
        this.touch.play();

    }

    fadePictureAdrian() {
        this.game.add.tween(this.adrian).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);        
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


