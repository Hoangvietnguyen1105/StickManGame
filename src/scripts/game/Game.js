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
        console.log('create wall')
        this.wall = new Wall()
        this.container.addChild(this.wall)
    }

    follow(deltaTime) {
        this.botList.forEach(bot => {
            if (!bot.destroyed) {
                bot.update(deltaTime);
            }
        });
        this.checkDame();
        this.checkDame2();
    }

    checkDame() {
        let playerPunched = false; // Biến để kiểm tra xem người chơi đã tác động đến ít nhất một bot hay chưa

        this.botList.forEach(bot => {
            if (!bot.destroyed && this.player.isPunch === true) {
                if (this.player.Player.scale.x === 0.5) {
                    if (this.checkCollision(this.player.Player, bot.botSprite)) {
                        bot.botSprite.pain = true;
                        bot.scaleD = true;
                        bot.scaleA = false;
                        playerPunched = true; // Đánh dấu là người chơi đã tác động đến bot
                    }
                } else {
                    if (this.checkCollision2(this.player.Player, bot.botSprite)) {
                        bot.botSprite.pain = true;
                        bot.scaleD = false;
                        bot.scaleA = false;
                        playerPunched = true; // Đánh dấu là người chơi đã tác động đến bot
                    }
                }
            }

            if (bot.botSprite.life <= 0) {
                bot.destroyed = true;
                this.container.removeChild(bot.botSprite);
            }
        });

        // Nếu người chơi đã tác động đến ít nhất một bot, reset trạng thái đấm của người chơi
        if (playerPunched) {
            this.player.isPunch = false;
        }
    }


    checkDame2() {

        this.botList.forEach(bot => {
            if (!bot.destroyed && bot.botSprite.isPunch === true) {
                bot.botSprite.isPunch = false;
                if (bot.botSprite.scale.x === -0.5) {
                    if (this.checkCollision(this.player.Player, bot.botSprite)) {
                        this.player.pain = true;
                        this.player.scaleD = true;
                        this.player.scaleA = false;
                    }
                } else {
                    if (this.checkCollision2(this.player.Player, bot.botSprite)) {
                        this.player.pain = true;
                        this.player.scaleD = false;
                        this.player.scaleA = false;
                    }
                }
            }
        });

        if (this.player.life <= 0) {
            this.container.removeChild(this.player.Player);
        }
    }

    checkCollision(objA, objB) {
        var a = objA.getBounds();
        var b = objB.getBounds();
        if (a.right >= b.left && a.left <= b.left) {
            return true;
        } else {
            return false;
        }
    }

    checkCollision2(objA, objB) {
        var a = objA.getBounds();
        var b = objB.getBounds();
        if (b.right >= a.left && b.left <= a.left) {
            return true;
        } else {
            return false;
        }
    }
}
