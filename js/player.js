class Player extends Phaser.Sprite {
  constructor(game, x, y, asset, vetorDefault, speed, munitionText,
    characterCtrl) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5, 0.5)
      //this.inputEnabled = true
      //this.input.enableDrag(false, true)
    this.vetorDefault = vetorDefault
    this.speed = speed //velocidade de troca dos sprites
    this.animations.add('default', this.vetorDefault, this.speed, true);
    this.animations.play('default');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.lifeTotal = 4;
    this.hit = 0;
    this.game = game;
    this.lastActionTime = 0;
    this.munitionText = munitionText;
    this.lifeSprite = this.game.add.sprite(10, 10, 'life');
    this.lifeSprite.animations.add("4Life", [0], 1, true);
    this.lifeSprite.animations.add("3Life", [1], 1, true);
    this.lifeSprite.animations.add("2Life", [2], 1, true);
    this.lifeSprite.animations.add("1Life", [3], 1, true);
    this.lifeSprite.animations.play("4Life");
    this.lifeSprite.fixedToCamera = true;
    this.municao = 5;
    this.characterCtrl = characterCtrl
    this.crowSound = this.game.add.audio('crow');
    this.collectShot = this.game.add.audio('collectShot');
    this.collectLife = this.game.add.audio('collectLife');
    this.body.setSize(50, 40, 60, 80)
    this.defaultXSpeed = 5; //Velocidade de movimento com teclado em x
    this.defaultYSpeed = 5; //Velocidade de movimento com teclado em y
    this.moveWithGyroscope()
  }

  update() {    
    this.moveWithPointer()
    this.moveWithArrows()     
  }

  moveWithArrows() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.x -= this.defaultXSpeed;
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.x += this.defaultXSpeed;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.y -= this.defaultYSpeed;
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.y += this.defaultYSpeed;
    }
  }


  moveWithGyroscope() {    
    this.body.bounce.set(0.8)
    gyro.frequency = 10;
    gyro.startTracking(function (o){
      this.body.velocity.x += o.gamma/20;
      this.body.velocity.y += o.beta/20;
    })
  }

  moveWithPointer() {
    if (this.game.input.activePointer.isDown) {
      if (this.game.input.activePointer.worldX >= this.game.width * 0.8 &&
        this.game.input.activePointer.worldY > this.game.height * 0.8) {
        return null;
      }
      //  400 is the speed it will move towards the mouse
      this.game.physics.arcade.moveToPointer(this, 500);
      if (Phaser.Rectangle.contains(this.body, this.game.input.x, this.game
          .input.y)) {
        //this.body.velocity.setTo(0, 0);
      }
    } else {
      this.body.velocity.setTo(0, 0);
    }
  }

  gainLife(source, victim) {
    if (source != null) {
      source.destroy();
    }
    if (victim.lifeTotal <= 0 || victim.lifeTotal >= 4) {
      return 0;
    }
    victim.lifeTotal += 1;
    victim.collectLife.play();
    if (victim.lifeTotal == 4) {
      victim.lifeSprite.animations.play('4Life');
    } else if (victim.lifeTotal == 3) {
      victim.lifeSprite.animations.play('3Life');
    } else if (victim.lifeTotal == 2) {
      victim.lifeSprite.animations.play('2Life');
    } else if (victim.lifeTotal == 1) {
      victim.lifeSprite.animations.play('1Life');
    }
  }

  addShot(source, victim) {
    if (source != null) {
      source.destroy();
    }
    victim.collectShot.play();
    victim.municao += 1;
    victim.munitionText.text = '' + victim.municao;
  }
  takeHit(source, victim) {
    if (victim.hit == 0) {
      victim.lastActionTime = victim.game.time.now;
      console.log(victim.lastActionTime)
    } else {
      if (source != null && source.typeEnemy == "MOB") {
        source.destroy();
      }
      if (victim.game.time.now - victim.lastActionTime > 1000) {
        victim.crowSound.play();
        victim.lifeTotal = victim.lifeTotal - 1;
        victim.hit = 0;
        victim.lastActionTime = victim.game.time.now;
        if (victim.lifeTotal == 4) {
          victim.lifeSprite.animations.play('4Life');
        } else if (victim.lifeTotal == 3) {
          victim.lifeSprite.animations.play('3Life');
        } else if (victim.lifeTotal == 2) {
          victim.lifeSprite.animations.play('2Life');
        } else if (victim.lifeTotal == 1) {
          victim.lifeSprite.animations.play('1Life');
        } else if (victim.lifeTotal == 0) {
          victim.destroy();
        }
      }
    }
  }
}
class PlayerNPC extends Phaser.Sprite {
  constructor(game, x, y, asset, vetorDefault, speed, munitionText,
    characterCtrl) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5, 0.5)
      //this.inputEnabled = true
      //this.input.enableDrag(false, true)
    this.vetorDefault = vetorDefault
    this.speed = speed //velocidade de troca dos sprites
    this.animations.add('default', this.vetorDefault, this.speed, true);
    this.animations.play('default');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.lifeTotal = 4;
    this.hit = 0;
    this.game = game;
    this.lastActionTime = 0;
    this.munitionText = munitionText;
    //this.lifeSprite=this.game.add.sprite(10,10,'life');
    //this.lifeSprite.animations.add("4Life",[0],1,true);
    //this.lifeSprite.animations.add("3Life",[1],1,true);
    //this.lifeSprite.animations.add("2Life",[2],1,true);
    //this.lifeSprite.animations.add("1Life",[3],1,true);
    //this.lifeSprite.animations.play("4Life");
    //this.lifeSprite.fixedToCamera = true;
    //this.municao=5;
    //this.characterCtrl=characterCtrl
    this.crowSound = this.game.add.audio('crow');
    //this.collectShot = this.game.add.audio('collectShot');
    //this.collectLife = this.game.add.audio('collectLife');
    this.body.setSize(50, 40, 60, 80)
  }

  update() {
    this.x++;
    /*
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
    }*/
  }
}
