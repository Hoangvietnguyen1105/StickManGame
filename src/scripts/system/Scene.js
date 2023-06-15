import * as PIXI from "pixi.js";
import { App } from "./App";

export class Scene extends PIXI.Container {
    constructor() {
        super()
        this.container = new PIXI.Container();
        this.create();
        App.app.ticker.add(this.update, this);
    }

    create() { }
    update() { }
    destroy() { }

    remove() {
        App.app.ticker.remove(this.update, this);
        this.destroy();
    }
}