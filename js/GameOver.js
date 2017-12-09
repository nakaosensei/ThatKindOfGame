
class GameOver extends GameState {
    preload() {
        this.game.load.image('background', 'assets/gameOver1.jpg')
        this.game.load.image('gameOver', 'assets/fimJogo.png')
        this.game.load.image('logo', 'assets/logo.png')
        this.game.load.image('retry', 'assets/retry.png')
        this.game.load.audio('whiteSpecter', ['assets/audio/whiteSpecter.mp3']);
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
        this.gameOver = this.game.add.sprite(this.game.width-this.game.width/2, this.game.height-this.game.height/2, 'gameOver');
        this.gameOver.anchor.setTo(0.5, 0.5);
        this.game.time.events.add(Phaser.Timer.SECOND*2, this.fadePicturegameOver , this);        
        this.game.time.events.add(Phaser.Timer.SECOND*4, this.showLogo , this);      
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

    fadePicturegameOver() {

        this.game.add.tween(this.gameOver).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);        
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


