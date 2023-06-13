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
        for (var i = 0; i < App.config.wall.length; i++) {
            for (var j = 0; j < App.config.wall[i]['number']; j++) {
                var temp = App.sprite('wall')
                temp.scale.set(0.5)
                temp.x = App.config.wall[i]['x'] + j * App.config.wall[i]['width']
                temp.y = App.config.wall[i]['y']
                this.addChild(temp)
            }

        }


    }

}