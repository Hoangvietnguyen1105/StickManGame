import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Player } from "./Player";
import { bot } from "./bot";
import { Wall } from "./Wall";
import { camera } from "./camera";
import * as PIXI from 'pixi.js'
import { Sound } from "@pixi/sound";

export class gameOver extends Scene {
    create() {
        this.createBackground();
    }

    createBackground() {
        this.bg = App.sprite("bg");
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    }
}

