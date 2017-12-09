
class FramesPerSecond extends Phaser.Text {    
        constructor(game, x, y) {
            super(game, x, y, 'FPS 00' )
            this.setStyle({font: 'bold 16px Arial', fill: 'white'})
            this.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2)
            this.anchor.setTo(0.5, 0.5)
            this.fixedToCamera = true
            this.startTime = Date.now()
    
            // controle de atualizacao do calculo e mostrador
            this.frames = 0 
            this.nextUpdate = this.startTime + 500 // atualiza a cada 0,5 segundos
            this.accumulated = 0
        }
    
        update() {
            // calcula e mostra fps
            this.accumulated += 1000/(Date.now() - this.startTime)
            this.frames++
            this.startTime = Date.now()
            
            if (Date.now() >= this.nextUpdate) {
                this.text = 'FPS ' + Math.floor(this.accumulated/this.frames)
                this.nextUpdate = this.startTime + 500
                this.accumulated = 0
                this.frames = 0
            }
        }
    
    }
