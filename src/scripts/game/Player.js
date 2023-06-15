import * as PIXI from 'pixi.js'
import { App } from '../system/App'
import { Sound } from "@pixi/sound";
export class Player {
    constructor() {
        this.createPlayer()
        this.createSound()
        //Tạo các sự kiện cho ấn phím 
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
        this.boundHandleKeyUp = this.handleKeyUp.bind(this);

        // Tạo các sự kiện cho ấn phím
        window.addEventListener("keydown", this.boundHandleKeyDown);
        window.addEventListener("keyup", this.boundHandleKeyUp);

        App.app.ticker.add(this.update, this);
    }


    //xử lí sự kiện nhấn bàn phím
    handleKeyDown(event) {
        switch (event.keyCode) {
            case 37: // Arrow left{
                this.moveLeft = true
                this.Player.scale.x = -0.5
                this.Player.play()

                break;
            case 38: // Arrow up
                this.isJump = true
                break;
            case 39: // Arrow right

                this.moveRight = true
                this.Player.scale.x = 0.5
                this.Player.play()

                break;
            case 40: // Arrow down
                break;
            case 32:
                if (this.punch === false) {
                    this.punchSound.play()
                    this.swapAnimation()
                    this.Player.play()
                    this.punch = true
                    if (this.pain !== true) {
                        this.isPunch = true
                    }
                }
                break;

        }
    }

    handleKeyUp(event) {
        switch (event.keyCode) {
            case 37: // Arrow left
                this.moveLeft = false
                if (this.punch === false && this.painLoad === false) {
                    this.Player.gotoAndStop(0)
                }
                break;
            case 38: // Arrow up
                break;
            case 39: // Arrow right
                this.moveRight = false
                if (this.punch === false && this.painLoad === false) {
                    this.Player.gotoAndStop(0)
                }
                break;
            case 40: // Arrow down
                break;
            case 32:
                break;

        }
    }


    playerMoveLeft() {

        if (this.Player.x > 0 + App.config.player['realWidth'] / 2 && this.inWallLeft !== true) {
            this.Player.x -= App.config.player['speed'];
        }
    }
    playerMoveRight() {
        if (this.Player.x < App.app.screen.width - App.config.player['realWidth'] / 2 && this.inWallRight !== true)
            this.Player.x += App.config.player['speed'];
    }

    PlayerJump() {
        this.Player.y -= App.config.player['speed']
    }

    PlayerDown() {
        this.Player.y += App.config.player['speed']
    }

    createSound() {
        this.punchSound = Sound.from("../../../assets/sounds/6.ogg");
        this.punchSound.volume = 0.5
        this.painSound = Sound.from("../../../assets/sounds/pain1.wav")
        this.painSound.volume = 0.5
        this.gameOverSound = Sound.from("../../../assets/sounds/gameOver.wav")
    }



    createPlayer() {
        this.punchAnimation = App.ListOfTexture('punch') // khai bao List texture punch
        this.runAnimation = App.ListOfTexture('run') // khai bao List texture run
        this.painAnimation = App.ListOfTexture('pain')

        this.Player = App.animatedSprite('run') // gan animated bang run
        this.Player.width = App.config.player['width']
        this.Player.height = App.config.player['height']
        this.Player.scale.x = 0.5
        this.Player.x = App.config.player['x']
        this.Player.y = App.config.player['y']

        this.Player.animationSpeed = App.config.player['animatedSpeed']
        this.Player.anchor.set(0.5)

        this.punch = false
        this.checkPunch = true
        this.jumpHight = App.config.player['jumpHight']
        this.painLoad = false
        this.life = 1
    }
    swapAnimation() {
        this.Player.textures = this.punchAnimation
    }

    playAnimationOnce(sprite) {

        return new Promise(resolve => {
            sprite.onComplete = () => {
                sprite.stop();
                sprite.onComplete = null; // Xóa hàm callback onComplete
                resolve();
            };
        });
    }





    update() {
        if (this.painLoad === true) {
            if (this.inWallLeft !== true && this.inWallRight !== true) {
                if (this.scaleD !== true) {
                    this.Player.x += 10
                }
                else {
                    this.Player.x -= 10
                }
            }

            if (this.Player.currentFrame === 1) {
                this.life--
                this.Player.stop()
                this.Player.textures = this.runAnimation
                this.painLoad = false
            }
        }
        if (this.pain === true) {
            this.painSound.play()
            this.Player.textures = this.painAnimation
            this.Player.play()
            this.painLoad = true
            this.pain = false
        }
        if (this.isJump !== true && this.painLoad !== true) {
            if (this.punch !== true) {
                if (this.moveLeft === true) {
                    this.playerMoveLeft()
                }
                if (this.moveRight === true) {
                    this.playerMoveRight()
                }
            }
        } else if (this.pain !== true) {
            if (this.moveLeft === true) {
                this.playerMoveLeft()
            }
            if (this.moveRight === true) {
                this.playerMoveRight()
            }
        }


        // if (this.jumpHight === App.config.player['jumpHight'] && this.painLoad !== true) {
        //     this.isDown = false
        // }
        if (this.jumpHight <= 0) {
            this.isJump = false
            this.isDown = true
            this.jumpHight = App.config.player['jumpHight']
        }
        //xử lí rơi xuống đất
        if (this.isDown === true) {
            //this.isDown = true
            this.PlayerDown()
        }
        //xử lũ nhảy
        if (this.isDown !== true && this.isJump === true && this.painLoad !== true) {
            this.PlayerJump()
            this.jumpHight -= App.config.player['speed']
        }
        //đảm bảo thực hiện xong đấm mới thực hiện lại
        if (this.punch === true && this.checkPunch === true && this.painLoad !== true) {
            this.checkPunch = false

        }
        //đảm bảo chỉ thực hiện 1 hoạt ảnh đánh đấm 
        if (this.punch === true && this.Player.currentFrame === 2 && this.painLoad !== true) {
            this.Player.gotoAndStop(0)
            this.isPunch = false
            this.Player.textures = this.runAnimation
            if (this.moveLeft === true || this.moveRight === true)
                this.Player.play()
            this.punch = false
        }

    }
    stopTicker() {
        PIXI.Ticker.shared.remove(this.update, this);
    }




}