import * as PIXI from 'pixi.js'
import { Container } from 'pixi.js'
import { App } from '../system/App'


export class Heart extends Container {
    constructor() {
        super()
        this.createHeart()
    }
    createHeart() {
        this.heartSprite = App.sprite('heart')
        this.heartSprite.anchor.set(0.5)
        this.heartSprite.scale.set(1)

    }


}

