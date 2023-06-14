import { Game } from "./Game";

export const Config = {
    scenes: {
        "Game": Game
    },
    player: {
        "height": 100,
        "width": 100,
        "x": 150,
        "y": 700,
        "animatedSpeed": 0.15,
        "speed": 5,
        "realWidth": 60,
        "jumpHight": 90,
    },
    bot: {
        "height": 100,
        "width": 100,
        "x": 1525,
        "y": 700,
        "animatedSpeed": 0.15,
        "speed": 5,
        "realWidth": 50,
        "jumpHight": 90,
        "timePunch": 500,
        "life": 5
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
            "x": 170,
            "y": 700,
            "number": 50,
            "width": 12,
            "height": 30
        },

    ]
};