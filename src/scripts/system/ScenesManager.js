import * as PIXI from "pixi.js";
import { App } from "./App";

export class ScenesManager {
    constructor() {
        this.container = new PIXI.Container();
        //this.container.interactive = true;
        this.scene = null;
    }

    start(scene) {
        if (this.scene) {
            this.container.removeChild(this.scene.container)
            this.scene.remove();
            console.log('contaier', this.container.children.length)

        }

        this.scene = new App.config.scenes[scene]();
        console.log(this.scene)
        this.container.addChild(this.scene.container);
    }
}
