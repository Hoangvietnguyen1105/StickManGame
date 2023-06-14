import { Game } from "./Game";

export const Config = {
    scenes: {
        "Game": Game
    },
    player: {
        "height": 100,
        "width": 100,
        "x": 200,
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
        "speed": 5,
        "realWidth": 50,
        "jumpHight": 90,
        "timePunch": 500,
        "life": 5,
        "range": 250
    },
    wall: [
        {
            "x": 70,
            "y": 780,
            "number": 50,
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
            "x": 650,
            "y": 620,
            "number": 50,
            "width": 4,
            "height": 30
        },
        {
            "x": 850,
            "y": 540,
            "number": 50,
            "width": 4,
            "height": 30
        },
        {
            "x": 550,
            "y": 460,
            "number": 50,
            "width": 4,
            "height": 30
        },

    ]
};