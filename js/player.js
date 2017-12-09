
class Player extends Phaser.Sprite {
    constructor(game, x, y, asset, vetorDefault,speed) {
        super(game, x, y, asset)   
        this.anchor.setTo(0.5, 0.5)        
        //this.inputEnabled = true
        //this.input.enableDrag(false, true)
        this.vetorDefault = vetorDefault
        this.speed = speed //velocidade de troca dos sprites
        this.animations.add('default',this.vetorDefault,this.speed,true);  
        this.animations.play('default');      
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.lifeTotal=4;
        this.hit = 0;
        this.game=game;
        this.lastActionTime=0;
        this.lifeSprite=this.game.add.sprite(10,10,'life');
        this.lifeSprite.animations.add("4Life",[0],1,true);
        this.lifeSprite.animations.add("3Life",[1],1,true);
        this.lifeSprite.animations.add("2Life",[2],1,true);
        this.lifeSprite.animations.add("1Life",[3],1,true);
        this.lifeSprite.animations.play("4Life");
        this.lifeSprite.fixedToCamera = true;
        this.crowSound = this.game.add.audio('crow');        
    }

    update() {
        if (this.game.input.activePointer.isDown){
            if(this.game.input.activePointer.worldX>=this.game.width*0.8&&this.game.input.activePointer.worldY>this.game.height*0.8){
               return null; 
            }
            //  400 is the speed it will move towards the mouse
            this.game.physics.arcade.moveToPointer(this, 500);
            if (Phaser.Rectangle.contains(this.body, this.game.input.x, this.game.input.y)){
                //this.body.velocity.setTo(0, 0);
            }
        }else{
            this.body.velocity.setTo(0, 0);
        }
    }

    takeHit(source,victim){        
        if(victim.hit==0){
            victim.lastActionTime = victim.game.time.now;                        
            console.log(victim.lastActionTime)        
        }else{               
           if(victim.game.time.now - victim.lastActionTime > 1000){
              victim.crowSound.play();
              victim.lifeTotal = victim.lifeTotal-1;
              victim.hit=0;
              victim.lastActionTime = victim.game.time.now;
              if(victim.lifeTotal==4){
                  victim.lifeSprite.animations.play('4Life');
              }else if(victim.lifeTotal==3){
                  victim.lifeSprite.animations.play('3Life');
              }else if(victim.lifeTotal==2){
                  victim.lifeSprite.animations.play('2Life');
              }else if(victim.lifeTotal==1){
                   victim.lifeSprite.animations.play('1Life');
              }else if(victim.lifeTotal==0){                   
                   victim.destroy();
              }              
           }
        }
    }
}
