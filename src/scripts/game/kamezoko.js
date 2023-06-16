import * as PIXI from 'pixi.js'
import { Container } from 'pixi.js'
import { App } from '../system/App'


export class Kame extends Container {
    constructor() {
        super()
        this.createKamezoko()
    }
    createKamezoko() {
        this.kameSprite = App.sprite('kamezoko')
        this.kameSprite.anchor.set(0.5)
        this.kameSprite.scale.set(0.1)
        console.log(this.kameSprite.width)
        this.right = false
        this.left = false
    }
    kameGo() {
        if (this.right)
            this.kameSprite.x += 10
        else
            this.kameSprite.x -= 10
    }



}

