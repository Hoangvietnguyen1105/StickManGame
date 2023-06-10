import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Player } from "./Player";
import * as PIXI from 'pixi.js'
export class Game extends Scene {
    create() {

        this.createBackground();
        this.createPlayer()

    }
    createBackground() {
        this.bg = App.sprite("bg");
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    }
    createPlayer() {
        this.player = new Player()
        this.container.addChild(this.player.Player)
        //  console.log(this.player.test)
    }
}
