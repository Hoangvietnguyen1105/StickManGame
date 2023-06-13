import * as PIXI from 'pixi.js'
import { Container } from 'pixi.js'
import { App } from '../system/App'


export class Wall extends Container {
    constructor() {
        super()
        this.wallTexture = null; // Khai báo biến wallTexture và gán giá trị null
        this.createWallSprite()
    }
    createWallSprite() {
        this.wallSprite = App.sprite('wall')
        this.wallSprite.scale.set(0.5)

    }


}

