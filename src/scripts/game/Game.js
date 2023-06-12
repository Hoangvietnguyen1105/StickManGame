import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Player } from "./Player";
import { bot } from "./bot";
import * as PIXI from 'pixi.js'

export class Game extends Scene {
    create() {
        this.createBackground();
        this.createPlayer();
        this.createBot();
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
        this.List = []
        for (var i = 0; i < 3; i++) {
            var botTmp = new bot(this.player.Player)
            this.container.addChild(botTmp.botSprite);
            botTmp.botSprite.x += i * 40
            this.List.push(this.bot)
        }
        this.bot = new bot(this.player.Player)
        this.container.addChild(this.bot.botSprite);
    }

    follow(deltaTime) {
        if (this.bot.destroyed) return; // Kiểm tra trạng thái đã bị hủy

        this.bot.update(deltaTime);
        this.checkDame();
        this.checkDame2();
    }

    checkDame() {
        if (this.bot.destroyed) return; // Kiểm tra trạng thái đã bị hủy

        if (this.player.isPunch === true) {
            this.player.isPunch = false;
            if (this.player.Player.scale.x === 0.5) {
                if (this.checkCollision(this.player.Player, this.bot.botSprite)) {
                    this.bot.botSprite.pain = true;
                    this.bot.scaleD = true;
                    this.bot.scaleA = false;
                }
            } else {
                if (this.checkCollision2(this.player.Player, this.bot.botSprite)) {
                    this.bot.botSprite.pain = true;
                    this.bot.scaleD = false;
                    this.bot.scaleA = false;
                }
            }
        }

        if (this.bot.botSprite.life <= 0) {
            this.bot.destroyed = true
            this.container.removeChild(this.bot.botSprite)

        }
    }

    checkDame2() {
        if (this.bot.destroyed) return; // Kiểm tra trạng thái đã bị hủy

        if (this.bot.botSprite.isPunch === true) {
            this.bot.botSprite.isPunch = false;
            if (this.bot.botSprite.scale.x === -0.5) {
                if (this.checkCollision(this.player.Player, this.bot.botSprite)) {
                    this.player.pain = true;
                    this.player.scaleD = true;
                    this.player.scaleA = false;
                }
            } else {
                if (this.checkCollision2(this.player.Player, this.bot.botSprite)) {
                    this.player.pain = true;
                    this.player.scaleD = false;
                    this.player.scaleA = false;
                }
            }
        }

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
