import { Application, Loader, Texture, AnimatedSprite, Sprite } from "pixi.js";
import { gsap } from "gsap";
import { GameEngine, StepDirection } from "./GameEngine";
import "./style.css";


declare const VERSION: string;



console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

const engine = new GameEngine();

window.onload = async (): Promise<void> => {
    await engine.loadGameAssets();

    document.body.appendChild(engine.app.view);

    resizeCanvas();

};


function resizeCanvas(): void {
    const resize = () => {
        engine.app.renderer.resize(window.innerWidth, window.innerHeight);
        engine.app.stage.scale.x = window.innerWidth / engine.gameWidth;
        engine.app.stage.scale.y = window.innerHeight / engine.gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
}
