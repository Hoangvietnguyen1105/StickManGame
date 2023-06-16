import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Player } from "./Player";
import { bot } from "./bot";
import { Wall } from "./Wall";
import { camera } from "./camera";
import * as PIXI from 'pixi.js'
import { Sound } from "@pixi/sound";
import { Heart } from "./heart";
import { Kame } from './kamezoko';
export class Game extends Scene {
    create() {
        this.run = true
        this.kamezoko = null
        this.createBackground();
        this.createPlayer();
        this.createBot();
        this.createWall()
        this.createHeart()
        this.createShuriken()
        this.camera = new camera(this.player, this.wallList, this.botList, this.heartListItem, this.shurikenListItem)
        App.app.ticker.add((delta) => {
            const deltaTime = delta / PIXI.settings.TARGET_FPMS;
            this.update(deltaTime); // Truyền delta time vào phương thức follow
        });
    }

    createBackground() {
        this.bg = App.sprite("bg");
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    }

    createPlayer() {
        this.player = new Player();
        this.container.addChild(this.player.Player);
    }

    createBot() {

        this.botList = [];
        for (var i = 0; i < App.config.botLocation.length; i++) {
            var botTmp = new bot(this.player.Player);
            botTmp.botSprite.x = App.config.botLocation[i]['x'];
            botTmp.botSprite.y = App.config.botLocation[i]['y']
            this.container.addChild(botTmp.botSprite);
            this.botList.push(botTmp);
        }
    }

    createWall() {

        this.wallList = []
        for (var i = 0; i < App.config.wall.length; i++) {
            for (var j = 0; j < App.config.wall[i]['number']; j++) {
                var temp = new Wall()
                temp.wallSprite.x = App.config.wall[i]['x'] + j * App.config.wall[i]['width']
                temp.wallSprite.y = App.config.wall[i]['y']
                this.wallList.push(temp)
                this.container.addChild(temp.wallSprite);
            }

        }
    }
    createHeart() {
        this.heartList = []
        for (var i = 0; i < this.player.life; i++) {
            var heart = new Heart()
            heart.heartSprite.x = 100 + i * heart.heartSprite.width
            heart.heartSprite.y = 70
            this.heartList.push(heart)
            this.container.addChild(heart.heartSprite)
        }
        this.heartListItem = []
        for (var i = 0; i < App.config.heart.length; i++) {
            console.log(App.config.heart[i]['x'])
            var heart = new Heart()
            this.heartListItem.push(heart)
            heart.heartSprite.x = App.config.heart[i]['x']
            heart.heartSprite.y = App.config.heart[i]['y']
            this.container.addChild(heart.heartSprite)
        }
    }
    createShuriken() {
        this.shurikenList = []
        for (var i = 0; i < this.player.phiTieu; i++) {
            var shuriken = new Kame()
            shuriken.kameSprite.x = 100 + i * shuriken.kameSprite.width
            shuriken.kameSprite.y = 110
            this.shurikenList.push(shuriken)
            this.container.addChild(shuriken.kameSprite)
        }
        this.shurikenListItem = []
        for (var i = 0; i < App.config.shuriken.length; i++) {
            console.log(App.config.shuriken[i]['x'])
            var shuriken2 = new Kame()
            this.shurikenListItem.push(shuriken2)
            shuriken2.kameSprite.x = App.config.shuriken[i]['x']
            shuriken2.kameSprite.y = App.config.shuriken[i]['y']
            this.container.addChild(shuriken2.kameSprite)
        }
    }


    update(deltaTime) {


        // cài đặt rơi quá lâu sẽ chết

        if (App.config.status['play'] === 'start') {

            if (this.player.kamezoko !== true && this.player.kame && !this.checkKame) {
                if (this.shurikenList.length > 0) {
                    var deleteShuriken = this.shurikenList.pop()
                    this.container.removeChild(deleteShuriken.kameSprite)
                }

                console.log('asjdfjaksdjfkkkkkkkk')
                this.checkKame = true
                this.kamezoko = new Kame()
                this.kamezoko.kameSprite.x = this.player.Player.x
                this.kamezoko.kameSprite.y = this.player.Player.y
                if (this.player.Player.scale.x === 0.5) {
                    this.kamezoko.right = true
                }
                else {
                    this.kamezoko.left = true
                }
                this.container.addChild(this.kamezoko.kameSprite)
            }
            if (this.kamezoko) {
                this.kamezoko.kameGo()
            }
            if (this.kamezoko && (this.kamezoko.kameSprite.x > this.player.Player.x + 250 || this.kamezoko.kameSprite.x < this.player.Player.x - 250)) {
                this.container.removeChild(this.kamezoko.kameSprite)
                console.log('yes')
                this.kamezoko.destroy()
                this.kamezoko = null
                this.player.kamezoko = false
                this.checkKame = false
            }
            if (this.player.isDown === true) {
                this.player.timeDown += deltaTime
            }
            else {
                this.player.timeDown = 0
            }
            if (this.camera)
                this.camera._initCamera()
            this.botList.forEach(bot => {
                if (!bot.destroyed) {
                    bot.update(deltaTime);
                }
            });
            if (this.run === true) {
                this.checkLifeOfPlayer()
                this.checkDamePlayerToBot();
                this.checkPlayerCollisionWithWalls()
                this.checkBotCollisionWithWalls()
                this.checkCollisionWithItem()
                this.checkDameBotToPlayer();
                if (this.kamezoko) {
                    this.checkCollisionKameWithBot()
                }
            }

        }
        else {
            return
        }

    }
    checkLifeOfPlayer() {

        if (this.player.heartDown === true) {
            var lastHeart = this.heartList.pop()
            if (lastHeart) {
                this.container.removeChild(lastHeart.heartSprite)
                lastHeart.destroy()
            }
            this.player.heartDown = false
        }
    }


    checkDamePlayerToBot() {
        let playerPunched = false; // Biến để kiểm tra xem người chơi đã tác động đến ít nhất một bot hay chưa

        this.botList.forEach(bot => {
            if (!bot.destroyed && this.player.isPunch === true) {
                if (this.player.Player.scale.x === 0.5) {
                    if (this.checkCollisionRight(this.player.Player, bot.botSprite)) {
                        if (this.player.Player.y > bot.botSprite.y - App.config.player['height'] / 2 && this.player.Player.y < bot.botSprite.y + App.config.player['height'] / 2) {
                            bot.botSprite.pain = true;
                            bot.scaleD = true;
                            bot.scaleA = false;
                            playerPunched = true;
                        }
                        // Đánh dấu là người chơi đã tác động đến bot
                    }
                } else {
                    if (this.checkCollisionLeft(this.player.Player, bot.botSprite)) {
                        if (this.player.Player.y > bot.botSprite.y - App.config.player['height'] / 2 && this.player.Player.y < bot.botSprite.y + App.config.player['height'] / 2) {
                            bot.botSprite.pain = true;
                            bot.scaleD = false;
                            bot.scaleA = true;
                            playerPunched = true;
                        }
                        // Đánh dấu là người chơi đã tác động đến bot
                    }
                }
            }


            if (bot.botSprite.life <= 0 || bot.botSprite.y >= 2000) {
                bot.deadSound.play()
                bot.destroyed = true;
                this.container.removeChild(bot.botSprite);
                bot.stopTicker()
            }
        });
        this.botList = this.botList.filter(bot => !bot.destroyed);

        // Nếu người chơi đã tác động đến ít nhất một bot, reset trạng thái đấm của người chơi
        if (playerPunched) {
            this.player.isPunch = false;
        }
    }


    checkDameBotToPlayer() {

        this.botList.forEach(bot => {
            if (!bot.destroyed && bot.botSprite.isPunch === true) {
                bot.botSprite.isPunch = false;
                if (bot.botSprite.scale.x === -0.5) {
                    if (this.checkCollisionRight(this.player.Player, bot.botSprite)) {
                        if (bot.botSprite.y >= this.player.Player.y - App.config.player['height'] / 2 && bot.botSprite.y <= this.player.Player.y + App.config.player['height'] / 2) {
                            this.player.pain = true;
                            this.player.scaleD = true;
                            this.player.scaleA = false;
                        }

                    }
                } else {
                    if (this.checkCollisionLeft(this.player.Player, bot.botSprite)) {
                        if (bot.botSprite.y >= this.player.Player.y - App.config.player['height'] / 2 && bot.botSprite.y <= this.player.Player.y + App.config.player['height'] / 2) {
                            this.player.pain = true;
                            this.player.scaleD = false;
                            this.player.scaleA = true;
                        }
                    }
                }
            }
        });

        if (this.player.life <= 0 || this.player.timeDown > 3000) {
            App.config.status['play'] = 'stop'
            this.player.life = 1000
            this.player.deltaTime = 0
            this.player.timeDown = null
            // this.notCheckThis = true
            this.container.removeChild(this.player.Player);
            this.player.gameOverSound.play()

        }
    }


    checkCollisionRight(objA, objB) {
        var a = objA.getBounds();
        var b = objB.getBounds();
        if (a.right >= b.left + 40 && a.left <= b.left) {
            return true;
        } else {
            return false;
        }
    }

    checkCollisionLeft(objA, objB) {
        var a = objA.getBounds();
        var b = objB.getBounds();
        if (b.right >= a.left + 40 && b.left <= a.left) {
            return true;
        } else {
            return false;
        }
    }
    checkCollision(objA, objB, offsetX = App.config.player['realWidth'] / 2, offsetY = 0) {
        let boundsA
        let boundsB
        if (objA.getBounds() && objB.getBounds()) {
            boundsA = objA.getBounds();
            boundsB = objB.getBounds();
        }




        // Add the offset values to the bounds of objA
        boundsA.x += offsetX;
        boundsA.width -= offsetX * 2;

        // Perform the collision check
        if (
            boundsA.x + boundsA.width >= boundsB.x &&
            boundsB.x + boundsB.width >= boundsA.x &&
            boundsA.y + boundsA.height >= boundsB.y &&
            boundsB.y + boundsB.height >= boundsA.y
        ) {
            // Collision detected
            return true;
        } else {
            // No collision
            return false;
        }
    }
    // kiem tra va cham player voi tuong
    checkPlayerCollisionWithWalls() {
        var inWall = false
        this.wallList.forEach(wall => {
            if (this.checkCollision(this.player.Player, wall.wallSprite)) {
                this.player.inWallLeft = false
                this.player.inWallRight = false
                //kiem tra dang dung tren tuong
                if (this.player.Player.y <= wall.wallSprite.y - App.config.player['height'] / 2 - App.config.wall[0]['height'] / 2) {
                    this.player.isDown = false
                    inWall = true
                }
                else if (this.player.Player.y >= wall.wallSprite.y + App.config.player['height'] / 2 + App.config.wall[0]['height'] / 2 && this.player.isJump === true) {
                    this.player.isDown = true
                    this.player.isJump = false
                }
                //kiem tra dang dung ben trai cua tuong
                else if (wall.wallSprite.x > this.player.Player.x) {
                    //this.player.moveRight = false
                    this.player.inWallRight = true
                    inWall = true
                }
                //kiem tra dang dung ben phai tuong
                else if (wall.wallSprite.x < this.player.Player.x) {
                    //this.player.moveLeft = false
                    this.player.inWallLeft = true
                    inWall = true
                }


            }

        });
        // check neu khong cham tuong
        if (inWall === false && this.player.isJump !== true) {
            this.player.isDown = true
            this.player.inWallRight = false
            this.player.inWallLeft = false
        }
    }
    checkBotCollisionWithWalls() {
        this.botList.forEach(bot => {
            var jumpOne = false
            var inWall = false;
            this.wallList.forEach(wall => {
                if (this.checkCollision(bot.botSprite, wall.wallSprite)) {
                    if (bot.botSprite.y <= wall.wallSprite.y - App.config.player['height'] / 2 - App.config.wall[0]['height'] / 2) {
                        bot.isDown = false;
                        inWall = true;
                    }
                    else if (bot.botSprite.y >= wall.wallSprite.y + App.config.player['height'] / 2 + App.config.wall[0]['height'] / 2 && bot.isJump !== true) {
                        bot.isDown = true;
                        bot.isJump = false;

                    }
                    // kiem tra dang dung ben trai cua tuong
                    else if (wall.wallSprite.x > bot.botSprite.x) {
                        bot.inWallRight = true;
                        inWall = true;
                    }
                    //kiem tra dang dung ben phai tuong
                    else if (wall.wallSprite.x < bot.botSprite.x) {
                        bot.inWallLeft = true;
                        inWall = true;
                    }
                }
            });
            if (!inWall) {
                bot.isDown = true;
                bot.inWallRight = false;
                bot.inWallLeft = false;
            }

        });
    }
    checkCollisionWithItem() {


        if (this.heartListItem.length > 0) {
            this.heartListItem.forEach((heart, index) => {
                if (heart.heartSprite !== null && this.player.Player !== null) {
                    if (this.checkCollision(this.player.Player, heart.heartSprite)) {
                        this.container.addChild(heart.heartSprite);
                        this.heartListItem.splice(index, 1);
                        this.heartList.push(heart)
                        heart.heartSprite.x = 100 + this.player.life * heart.heartSprite.width
                        heart.heartSprite.y = 70

                        // Thực hiện các hành động khác khi player va chạm với heart
                        this.player.life++;
                        console.log("Player collected a heart!");
                    }
                }

            });
        }

        this.shurikenListItem.forEach((shuriken, index) => {
            if (this.checkCollision(this.player.Player, shuriken.kameSprite)) {
                this.container.addChild(shuriken.kameSprite);
                this.shurikenListItem.splice(index, 1);
                this.shurikenList.push(shuriken)
                shuriken.kameSprite.x = 100 + this.player.phiTieu * shuriken.kameSprite.width
                shuriken.kameSprite.y = 110

                // Thực hiện các hành động khác khi player va chạm với heart
                this.player.phiTieu++;
                console.log("Player collected a shuriken!");
            }
        });

    }
    checkCollisionKameWithBot() {
        this.botList.forEach(bot => {
            if (this.checkCollision(this.kamezoko.kameSprite, bot.botSprite)) {
                bot.botSprite.pain = true;
                if (this.player.Player.scale.x === 0.5) {
                    bot.scaleD = true;
                    bot.scaleA = false;
                }
                else {
                    bot.scaleD = false;
                    bot.scaleA = true;
                }
            }

        });
    }









}
