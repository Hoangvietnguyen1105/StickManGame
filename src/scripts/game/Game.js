import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Player } from "./Player";
import { bot } from "./bot";
import { Wall } from "./Wall";
import * as PIXI from 'pixi.js'

export class Game extends Scene {
    create() {
        this.createBackground();
        this.createPlayer();
        this.createBot();
        this.createWall()
        App.app.ticker.add((delta) => {
            const deltaTime = delta / PIXI.settings.TARGET_FPMS;
            this.follow(deltaTime); // Truyền delta time vào phương thức follow
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
        for (var i = 0; i < 3; i++) {
            var botTmp = new bot(this.player.Player);
            botTmp.botSprite.x += i * 40;
            this.container.addChild(botTmp.botSprite);
            this.botList.push(botTmp);
        }
    }

    createWall() {
        console.log('abc')

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

    follow(deltaTime) {
        this.botList.forEach(bot => {
            if (!bot.destroyed) {
                bot.update(deltaTime);
            }
        });
        this.checkDamePlayerToBot();
        this.checkDameBotToPlayer();
    }


    checkDamePlayerToBot() {
        let playerPunched = false; // Biến để kiểm tra xem người chơi đã tác động đến ít nhất một bot hay chưa

        this.botList.forEach(bot => {
            if (!bot.destroyed && this.player.isPunch === true) {
                if (this.player.Player.scale.x === 0.5) {
                    if (this.checkCollisionRight(this.player.Player, bot.botSprite)) {
                        bot.botSprite.pain = true;
                        bot.scaleD = true;
                        bot.scaleA = false;
                        playerPunched = true; // Đánh dấu là người chơi đã tác động đến bot
                    }
                } else {
                    if (this.checkCollisionLeft(this.player.Player, bot.botSprite)) {
                        bot.botSprite.pain = true;
                        bot.scaleD = false;
                        bot.scaleA = false;
                        playerPunched = true; // Đánh dấu là người chơi đã tác động đến bot
                    }
                }
            }

            if (bot.botSprite.life <= 0) {
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

        if (this.player.life <= 0) {
            this.container.removeChild(this.player.Player);
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
    checkCollision(objA, objB) {
        const boundsA = objA.getBounds();
        const boundsB = objB.getBounds();

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



}
