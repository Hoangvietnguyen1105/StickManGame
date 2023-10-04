import * as PIXI from 'pixi.js'
import { App } from '../system/App'
import { Sound } from "@pixi/sound";

export class bot {
    constructor(player) {
        this.player = player
        this.createBot()
        this.createSound()

    }
    createBot() {
        this.punchAnimation = App.ListOfTexture('punch') // khai bao List texture punch
        this.runAnimation = App.ListOfTexture('run') // khai bao List texture run
        this.painAnimation = App.ListOfTexture('pain')

        this.botSprite = App.animatedSprite('run') // gan animated bang run
        this.botSprite.width = App.config.bot['width']
        this.botSprite.height = App.config.bot['height']
        this.botSprite.scale.x = 0.5
        //tse

        this.botSprite.animationSpeed = App.config.bot['animatedSpeed']
        this.botSprite.anchor.set(0.5)
        this.botSprite.botPunch = false
        this.botSprite.botPunchLoad = false
        this.botSprite.botLeft = false
        this.botSprite.botRight = false
        this.botSprite.jumpHight = App.config.bot['jumpHight']

        this.timePunch = App.config.bot['timePunch']
        this.botSprite.pain = false
        this.botSprite.life = App.config.bot['life']
        this.botSprite.tint = 0x070a06;
    }
    createSound() {
        this.punchSound = Sound.from("../../../assets/sounds/1.ogg");
        this.punchSound.volume = 0.5
        this.painSound = Sound.from("../../../assets/sounds/pain4.wav")
        this.painSound.volume = 0.5
        this.deadSound = Sound.from("../../../assets/sounds/die1.wav")
    }
    followplayer() {
        if (this.botSprite.y > this.player.y - 200 && this.botSprite.y < this.player.y + 200) {
            if (this.botSprite.x < this.player.x) {
                this.botSprite.scale.x = 0.5
            }
            if (this.botSprite.x > this.player.x) {
                this.botSprite.scale.x = -0.5
            }


            if (this.botSprite.x >= this.player.x + 50 && this.botSprite.x <= this.player.x + App.config.bot['range'] && this.botPunchLoad !== true) {
                this.botSprite.scale.x = -0.5
                this.botSprite.botRight = false
                this.botSprite.botLeft = true
                this.botSprite.botPunch = false
                // this.botSprite.botPunchLoad = false // Đặt lại trạng thái của botPunchLoad

            }
            else if (this.botSprite.x <= this.player.x - 50 && this.botSprite.x >= this.player.x - App.config.bot['range']) {
                console.log('right')
                this.botSprite.scale.x = 0.5
                this.botSprite.botRight = true
                this.botSprite.botLeft = false
                this.botSprite.botPunch = false
                // this.botSprite.botPunchLoad = false // Đặt lại trạng thái của botPunchLoad
            }
            //dat trang thai của bot thành punch
            else if (this.botSprite.x <= this.player.x + 50 && this.botSprite.x >= this.player.x - 50) {
                this.botSprite.botRight = false
                this.botSprite.botLeft = false
                this.botSprite.botPunch = true
            } else {
                this.botSprite.gotoAndStop(0)
                this.botSprite.botRight = false
                this.botSprite.botLeft = false
                this.botSprite.botPunch = false
            }
        }
        else {
            this.botSprite.gotoAndStop(0)
            this.botSprite.botRight = false
            this.botSprite.botLeft = false
            this.botSprite.botPunch = false
        }
        // const randomNumber = Math.floor(Math.random() * 3) + 1;

    }


    setAllDown() {
        this.botSprite.botRight = false
        this.botSprite.botLeft = false
        this.botSprite.botPunch = false
        this.botSprite.pain = false
    }

    startPain() {
        this.painSound.play()
        this.botSprite.pain = false
        this.botSprite.textures = this.painAnimation
        this.botSprite.play()
        this.botSprite.painLoad = true
    }

    startPunch() {
        this.punchSound.play()
        this.botSprite.isPunch = true
        this.botSprite.botPunchLoad = true;
        this.botSprite.textures = this.punchAnimation;
        console.log("start punch")
        this.botSprite.play() // Chờ cho animation "punch" hoàn thành trước khi tiếp tục
    }

    loadPunch() {
        if (this.botSprite.currentFrame === 2) {
            this.botSprite.stop()
            this.botSprite.botPunch = false
            this.botSprite.botPunchLoad = false
            this.timePunch = App.config.bot['timePunch']

        }
    }
    loadPain() {
        this.botSprite.life -= 1
        this.botSprite.gotoAndStop(0)
        this.botSprite.painLoad = false
        this.timeStay = 500
        this.botSprite.textures = this.runAnimation;
        this.botSprite.play()
    }

    painBack() {
        if (this.scaleD === true) {
            this.botSprite.x += 10
        }
        else {
            this.botSprite.x -= 10
        }
    }

    moveLeft() {
        if (this.inWallLeft !== true) {

            if (this.botSprite.textures !== this.runAnimation) {
                this.botSprite.textures = this.runAnimation;
                this.botSprite.play();
            }
            this.botSprite.x -= App.config.bot['speed'];
        }
        else if (this.inWallLeft === true) {
            this.botSprite.y -= App.config.bot['speed']
        }

    }

    moveRight() {
        console.log(this.inWallRight)
        if (this.inWallRight !== true) {
            if (this.botSprite.textures !== this.runAnimation) {
                this.botSprite.textures = this.runAnimation;
                this.botSprite.play();
            }
            this.botSprite.x += App.config.bot['speed'];
        } else if (this.inWallRight === true) {
            this.botSprite.y -= App.config.bot['speed'];
        }
    }
    moveDown() {
        this.botSprite.y += App.config.bot['speed']
    }


    update(deltaTime) {
        if (this.isDown !== false) {
            this.moveDown()
        }
        if (this.timeStay && this.timeStay > 0) {
            this.setAllDown()
            this.timeStay -= deltaTime
            return;
        }
        else {
            this.timePunch -= deltaTime
            this.followplayer()
            if (this.botSprite.pain === true && this.botSprite.painLoad !== true) {
                this.startPain()
            }
            //hàm này check xem hành động pain đã xảy ra chưa, nếu xảy ra xong rồi mới tới hành động khác 
            else if (this.botSprite.painLoad === true) {

                if (this.inWallLeft !== true && this.inWallRight !== true) {
                    console.log('skdfjk')
                    this.painBack()
                }
                if (this.botSprite.currentFrame === 1) {
                    this.loadPain()
                }
                else {
                    return
                }
            }

            if (this.botSprite.botPunchLoad === true) {
                this.loadPunch()
            }
            else if (this.botSprite.botPunch === true && this.botSprite.botPunchLoad !== true) {
                if (this.timePunch < 0) {
                    if (Math.floor(Math.random() * 40) + 1 === 3) {
                        this.startPunch();
                    }
                }
            }

            if (this.botSprite.botLeft === true && this.botSprite.botPunchLoad === false && this.botSprite.botPunchLoad === false) {
                this.moveLeft()
            }
            if (this.botSprite.botRight === true && this.botSprite.botPunchLoad === false && this.botSprite.botPunchLoad === false) {
                this.moveRight()
            }
        }
    }
    stopTicker() {
        App.app.ticker.remove(this.update, this);
    }

}
