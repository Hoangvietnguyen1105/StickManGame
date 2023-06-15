import { Game } from "./Game";
import { gameOver } from "./gameOver";
export const Config = {
    scenes: {
        "Game": Game,
        "GameOver": gameOver
    },
    status: {
        "play": "start",
    },
    player: {
        "height": 100,
        "width": 100,
        "x": 70,
        "y": 700,
        "animatedSpeed": 0.15,
        "speed": 5,
        "realWidth": 60,
        "jumpHight": 90,
    },
    bot: {
        "height": 100,
        "width": 100,
        "x": 1500,
        "y": 700,
        "animatedSpeed": 0.15,
        "speed": 2.1,
        "realWidth": 50,
        "jumpHight": 90,
        "timePunch": 500,
        "life": 5,
        "range": 450
    },
    botLocation: [
        {
            "x": 1500,
            "y": 700,
        },
        {
            "x": 1100,
            "y": 700,
        },
        {
            "x": 2250,
            "y": 340
        }
    ],
    wall: [
        {
            "x": 70,
            "y": 780,
            "number": 50,
            "width": 32,
            "height": 30
        },
        {
            "x": 1850,
            "y": 780,
            "number": 200,
            "width": 32,
            "height": 30
        },
        {
            "x": 350,
            "y": 700,
            "number": 50,
            "width": 4,
            "height": 30
        },
        {
            "x": 550,
            "y": 620,
            "number": 50,
            "width": 4,
            "height": 30
        },
        {
            "x": 750,
            "y": 540,
            "number": 50,
            "width": 4,
            "height": 30
        },
        {
            "x": 950,
            "y": 460,
            "number": 50,
            "width": 4,
            "height": 30
        },
        {
            "x": 1950,
            "y": 700,
            "number": 5,
            "width": 32,
            "height": 30
        },
        {
            "x": 2050,
            "y": 620,
            "number": 5,
            "width": 32,
            "height": 30
        },
        {
            "x": 2150,
            "y": 540,
            "number": 50,
            "width": 32,
            "height": 30
        },

    ],
    heart: [
        {
            "x": 120,
            "y": 700
        }
    ],


};