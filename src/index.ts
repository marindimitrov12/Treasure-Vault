import { Application, Loader, Texture, AnimatedSprite, Sprite } from "pixi.js";
import { getSpine } from "./spine-example";
import { gsap } from "gsap";
import { GameEngine, StepDirection } from "./GameEngine";
import "./style.css";
import { writeHeapSnapshot } from "v8";

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
    app.stage.interactive = true;
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
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

            handle.anchor.set(0.5);
            shadow.anchor.set(0.5);

            backGround.width = app.renderer.width;
            backGround.height = app.renderer.height;
            const centerX = app.renderer.width / 2;
            const centerY = app.renderer.height / 2;

            doorClosed.scale.x = 0.13;
            doorClosed.scale.y = 0.195;
            handle.scale.x = 0.15;
            handle.scale.y = 0.15;
            shadow.scale.x = 0.15;
            shadow.scale.y = 0.15;

            doorClosed.x = centerX - doorClosed.width / 2 + 6;
            doorClosed.y = centerY - doorClosed.height / 2 - 10;
            handle.x = centerX - handle.width / 2 + 44;
            handle.y = centerY - handle.height / 2 + 39;
            shadow.x = centerX - shadow.width / 2 + 45;
            shadow.y = centerY - shadow.height / 2 + 42;

            app.stage.addChild(backGround, doorClosed, shadow, handle);
            doorClosed.interactive = true;

            let xLimit = window.innerWidth / 2;
            let direction = 0;
            const engine = new GameEngine();
            console.log(engine.secredCode);
            console.log(engine.secredCode2);
            doorClosed.on("pointertap", (e) => {
                let clickedPosition = e.data.global.x;
                console.log(window.innerWidth / 2);
                console.log(clickedPosition);

                if (clickedPosition > xLimit) {
                    engine.Add("clockwise");
                    console.log(engine.userInput.length);
                    console.log(engine.secredCode2.length);
                    animation.restart();
                } else {
                    engine.Add("counterclockwise");
                    console.log(engine.userInput.length);
                    console.log(engine.secredCode2.length);
                    animation2.restart();
                }
            });

            let targetRotation = 60;

            const animation = gsap.to([handle, shadow], {
                rotation: (targetRotation * Math.PI) / 180,
                paused: true,
                duration: 1,
                ease: "liniar",
                repeat: 0,

                onComplete: () => {
                    targetRotation += 60;
                },
            });

            let targetRotation2 = 60;
            const animation2 = gsap.to([handle, shadow], {
                rotation: -(targetRotation2 * Math.PI) / 180,
                paused: true,
                duration: 1,
                ease: "liniar",
                repeat: 0,
                onComplete: () => {
                    targetRotation2 -= 60;
                },
            });
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
