export const manifest = {
    bundles: [
        {
            name: 'mouse',
            assets: [
                {
                    name: 'mouse1',
                    srcs: 'assets/images/mouse.png',
                },
                {
                    name: 'mouse2',
                    srcs: 'assets/images/cat.png',
                },
            ],
        },
        {
            name: 'cat',
            assets: [
                {
                    name: 'cat',
                    srcs: 'assets/images/cat.png',
                }
            ],
        },
        {
            name: 'background',
            assets: [
                {
                    name: 'bg',
                    srcs: 'assets/images/bg.png'
                }
            ]
        }

    ]
};
