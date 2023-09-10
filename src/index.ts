import { Application, Loader, Texture, AnimatedSprite, Sprite } from "pixi.js";
import { getSpine } from "./spine-example";
import "./style.css";

declare const VERSION: string;

const gameWidth = 800;
const gameHeight = 600;

console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    resizeCanvas();

    //const birdFromSprite = getBird();
    //birdFromSprite.anchor.set(0.5, 0.5);
    //birdFromSprite.position.set(gameWidth / 2, 530);

    //const spineExample = getSpine();
    // spineExample.position.y = 580;

    //app.stage.addChild(birdFromSprite);
    //app.stage.addChild(spineExample);
    app.stage.interactive = true;
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        //loader.add("rabbit", "./assets/simpleSpriteSheet.json");
        //loader.add("pixie", "./assets/spine-assets/pixie.json");
        loader.add("safe", "./assets/bg.png");
        loader.add("doorClosed", "./assets/door.png");
        loader.add("handle", "./assets/handle.png");
        loader.add("shadow", "./assets/handleShadow.png");
        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load((loader, resources) => {
            const backGround = new Sprite(resources.safe.texture);
            const doorClosed = new Sprite(resources.doorClosed.texture);
            const handle = new Sprite(resources.handle.texture);
            const shadow = new Sprite(resources.shadow.texture);

            backGround.width = app.renderer.width;
            backGround.height = app.renderer.height;
            const centerX = app.renderer.width / 2;
            const centerY = app.renderer.height / 2;

            doorClosed.scale.x = 0.13;
            doorClosed.scale.y = 0.195;
            handle.scale.x = 0.13;
            handle.scale.y = 0.18;
            shadow.scale.x = 0.13;
            shadow.scale.y = 0.18;

            doorClosed.x = centerX - doorClosed.width / 2 + 6;
            doorClosed.y = centerY - doorClosed.height / 2 - 10;
            handle.x = centerX - handle.width / 2 - 5;
            handle.y = centerY - handle.height / 2 - 10;
            shadow.x = centerX - shadow.width / 2 - 4;
            shadow.y = centerY - shadow.height / 2 - 2;

            app.stage.addChild(backGround, doorClosed, shadow, handle);
        });
    });
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
}

/*function getBird(): AnimatedSprite {
    const bird = new AnimatedSprite([
        Texture.from("birdUp.png"),
        Texture.from("birdMiddle.png"),
        Texture.from("birdDown.png"),
    ]);

    bird.loop = true;
    bird.animationSpeed = 0.1;
    bird.play();
    bird.scale.set(3);

    return bird;
}*/
