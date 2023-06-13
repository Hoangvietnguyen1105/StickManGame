import { Game } from "./Game";

export const Config = {
    scenes: {
        "Game": Game
    },
    player: {
        "height": 100,
        "width": 100,
        "x": 25,
        "y": 800,
        "animatedSpeed": 0.15,
        "speed": 5,
        "realWidth": 50,
        "jumpHight": 90,
    },
    bot: {
        "height": 100,
        "width": 100,
        "x": 525,
        "y": 800,
        "animatedSpeed": 0.15,
        "speed": 5,
        "realWidth": 50,
        "jumpHight": 90,
        "timePunch": 500,
        "life": 5
    },
    wall: [
        {
            "x": 100,
            "y": 780,
            "number": 5,
            "width": 32,
        },
        {
            "x": 10,
            "y": 2,
            "number": 5,
            "width": 32,
        }
    ]
};