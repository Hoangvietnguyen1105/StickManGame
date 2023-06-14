import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Player } from "./Player";
import { bot } from "./bot";
import { Wall } from "./Wall";
import * as PIXI from 'pixi.js'

export class camera {
    constructor(player, wallList, botList) {
        this.player = player
        this.wallList = wallList
        this.botList = botList
    }
    _initCamera() {
        if (this.player.Player.x > window.innerWidth / 2) {
            this.player.Player.x -= 5

            this.wallList.forEach(wall => {
                wall.wallSprite.x -= 5
            });
            this.botList.forEach(bot => {
                bot.botSprite.x -= 5
            });
        }
        if (this.player.Player.x < window.innerWidth / 2) {
            this.player.Player.x += 5

            this.wallList.forEach(wall => {
                wall.wallSprite.x += 5
            });
            this.botList.forEach(bot => {
                bot.botSprite.x += 5
            });
        }
        if (this.player.Player.y > window.innerHeight / 2) {
            this.player.Player.y -= 5

            this.wallList.forEach(wall => {
                wall.wallSprite.y -= 5
            });
            this.botList.forEach(bot => {
                bot.botSprite.y -= 5
            });
        }
        if (this.player.Player.y < window.innerHeight / 2) {
            this.player.Player.y += 5

            this.wallList.forEach(wall => {
                wall.wallSprite.y += 5
            });
            this.botList.forEach(bot => {
                bot.botSprite.y += 5
            });
        }
    }
}
