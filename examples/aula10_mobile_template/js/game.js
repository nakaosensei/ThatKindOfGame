'use strict'

// APP DO JOGO ///////////////////////////////////////////////////////////////////
let GAME = null

class Game extends Phaser.Game {
    constructor () {        
        // Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig)
        super(1024, 600, Phaser.CANVAS, 'game-container', null, false, false)

        // adiciona estados ao jogo
        this.state.add('Play', PlayState, false)
        //this.state.add('Title', TitleState, false)
        this.state.start('Play')
        GAME = this
    }

    hello() {
        window.alert('hello')
    }
}

// CLASSE GENERICA DE TELAS //////////////////////////////////////////////////////

class GameState extends Phaser.State {
    initFullScreenButtons() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        let fullScreenButton = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        fullScreenButton.onDown.add(this.toggleFullScreen, this)    

        // full screen touch button
        let fullScreenIcon = this.game.add.sprite(this.game.width - 10, this.game.height - 10, 
            'fullscreen-button')
        fullScreenIcon.anchor.setTo(1, 1)
        fullScreenIcon.scale.setTo(0.75, 0.75)
        fullScreenIcon.inputEnabled = true
        fullScreenIcon.events.onInputDown.add(this.toggleFullScreen, this)            
    }

    toggleFullScreen() {
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        if (this.scale.isFullScreen) {
            this.scale.stopFullScreen();
        } else {
            this.scale.startFullScreen(false);
        }
    }
}

function fullScreen() {
    GAME.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    if (GAME.scale.isFullScreen) {
        GAME.scale.stopFullScreen();
    } else {
        GAME.scale.startFullScreen(false);
    }
}

// cria jogo
window.onload = function() {
    // funciona como singleton
    GAME = new Game()
}