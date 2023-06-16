import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Player } from "./Player";
import { bot } from "./bot";
import { Wall } from "./Wall";
import { camera } from "./camera";
import * as PIXI from 'pixi.js'
import { Sound } from "@pixi/sound";
import { Heart } from "./heart";
import { Kame } from './kamezoko';

export class collision {
    static checkCollisionRight(objA, objB) {
        var a = objA.getBounds();
        var b = objB.getBounds();
        if (a.right >= b.left + 40 && a.left <= b.left) {
            return true;
        } else {
            return false;
        }
    }

    static checkCollisionLeft(objA, objB) {
        var a = objA.getBounds();
        var b = objB.getBounds();
        if (b.right >= a.left + 40 && b.left <= a.left) {
            return true;
        } else {
            return false;
        }
    }
    static checkCollision(objA, objB, offsetX = App.config.player['realWidth'] / 2, offsetY = 0) {
        let boundsA
        let boundsB
        if (objA.getBounds() && objB.getBounds()) {
            boundsA = objA.getBounds();
            boundsB = objB.getBounds();
        }




        // Add the offset values to the bounds of objA
        boundsA.x += offsetX;
        boundsA.width -= offsetX * 2;

        // Perform the collision check
        if (
            boundsA.x + boundsA.width >= boundsB.x &&
            boundsB.x + boundsB.width >= boundsA.x &&
            boundsA.y + boundsA.height >= boundsB.y &&
            boundsB.y + boundsB.height >= boundsA.y
        ) {
            // Collision detected
            return true;
        } else {
            // No collision
            return false;
        }
    }
}
