import * as PIXI from "pixi.js";

import { Loader } from "./Loader";
import { ScenesManager } from "./ScenesManager";
class Application {
    run(config) {


        this.config = config;
        this.resources = null
        this.app = new PIXI.Application({ resizeTo: window });
        document.body.appendChild(this.app.view);

        this.scenes = new ScenesManager();
        //this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);
        this.load().then(() => this.start());

    }
    async load() {
        this.List = await Loader.loadAll()
    }

    sprite(key) {
        return new PIXI.Sprite(PIXI.Texture.from(`${key}`));
    }

    animatedSprite(keyCode) {
        let textures = []
        const keys2 = Object.keys(this.List[keyCode]);
        const mappedArray2 = keys2.map(key => this.List[keyCode][key]);
        for (var i = 0; i < mappedArray2.length; i++) {
            textures.push(mappedArray2[i])
        }
        return new PIXI.AnimatedSprite(textures)
    }

    ListOfTexture(keyCode) {
        let textures = []
        const keys2 = Object.keys(this.List[keyCode]);
        const mappedArray2 = keys2.map(key => this.List[keyCode][key]);
        for (var i = 0; i < mappedArray2.length; i++) {
            textures.push(mappedArray2[i])
        }
        return textures
    }

    start() {
        this.scenes.start("Game");
    }
}

export const App = new Application();
