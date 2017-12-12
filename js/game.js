'use strict'

// APP DO JOGO ///////////////////////////////////////////////////////////////////
let GAME = null

class Game extends Phaser.Game {
    constructor () {        
        // Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig)
        super(1024, 600, Phaser.CANVAS, 'game-container', null, false, false)

        // adiciona estados ao jogo
        this.state.add('Menu', Menu, false)
        this.state.add('Fase1', Fase1, false)
        this.state.add('Fase2', Fase2, false)
        this.state.add('Fase3', Fase3, false)
        this.state.add('Boss', BossFight, false)
        this.state.add('CG', CG1, false)
        this.state.add('GameOver',GameOver,false)
        //this.state.add('Title', TitleState, false)
        this.state.start('Menu')
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
        let fullScreenIcon = this.game.add.sprite(this.game.width - 10, this.game.height - this.game.height*0.8, 
            'fullscreen-button')
        fullScreenIcon.anchor.setTo(1, 1)
        fullScreenIcon.scale.setTo(0.75, 0.75)
        fullScreenIcon.inputEnabled = true
        fullScreenIcon.fixedToCamera = true
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