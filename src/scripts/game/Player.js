import * as PIXI from 'pixi.js'
import { App } from '../system/App'

export class Player {
    constructor() {
        this.createPlayer()

        // this.playerContainer = new PIXI.Container()
        // this.playerContainer.addChild(this.Player)
    }
    createPlayer() {
        console.log('helo')
        this.Player = App.sprite('mouse1')
        this.Player.width = App.config.player['width']
        this.Player.height = App.config.player['height']
        this.Player.x = App.config.player['x']
        this.Player.y = App.config.player['y']
    }
}