import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Player } from "./Player";
import { bot } from "./bot";
import { Wall } from "./Wall";
import * as PIXI from 'pixi.js'

export class camera {
    constructor(player, wallList, botList, heartListItem, shurikenListItem) {
        this.player = player
        this.wallList = wallList
        this.botList = botList
        this.heartListItem = heartListItem
        this.shurikenListItem = shurikenListItem
    }
    _initCamera() {
        if (this.player.Player.x > window.innerWidth / 2) {
            this.player.Player.x -= App.config.player['speed']

            this.wallList.forEach(wall => {
                wall.wallSprite.x -= App.config.player['speed']
            });
            this.botList.forEach(bot => {
                bot.botSprite.x -= App.config.player['speed']
            });
            this.heartListItem.forEach(heart => {
                heart.heartSprite.x -= App.config.player['speed']
            });
            this.shurikenListItem.forEach(shuriken => {
                shuriken.kameSprite.x -= App.config.player['speed']
            });
        }
        if (this.player.Player.x < window.innerWidth / 2) {
            this.player.Player.x += App.config.player['speed']

            this.wallList.forEach(wall => {
                wall.wallSprite.x += App.config.player['speed']
            });
            this.botList.forEach(bot => {
                bot.botSprite.x += App.config.player['speed']
            });
            this.heartListItem.forEach(heart => {
                heart.heartSprite.x += App.config.player['speed']
            });
            this.shurikenListItem.forEach(shuriken => {
                shuriken.kameSprite.x += App.config.player['speed']
            });
        }
        if (this.player.Player.y > window.innerHeight / 2) {
            this.player.Player.y -= App.config.player['speed']

            this.wallList.forEach(wall => {
                wall.wallSprite.y -= App.config.player['speed']
            });
            this.botList.forEach(bot => {
                bot.botSprite.y -= App.config.player['speed']
            });
            this.heartListItem.forEach(heart => {
                heart.heartSprite.y -= App.config.player['speed']
            });
            this.shurikenListItem.forEach(shuriken => {
                shuriken.kameSprite.y -= App.config.player['speed']
            });
        }
        if (this.player.Player.y < window.innerHeight / 2) {
            this.player.Player.y += App.config.player['speed']

            this.wallList.forEach(wall => {
                wall.wallSprite.y += App.config.player['speed']
            });
            this.botList.forEach(bot => {
                bot.botSprite.y += App.config.player['speed']
            });
            this.heartListItem.forEach(heart => {
                heart.heartSprite.y += App.config.player['speed']
            });
            this.shurikenListItem.forEach(shuriken => {
                shuriken.kameSprite.y += App.config.player['speed']
            });
        }
    }
}
