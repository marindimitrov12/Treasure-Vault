import { Application, Loader, Sprite, Container, Text } from "pixi.js";
import { gsap } from "gsap";
export class GameEngine {
    secredCode: { steps: number; direction: StepDirection }[];
    readonly app;
    gameWidth = 800;
    gameHeight = 600;
    userInput: { steps: number; direction: StepDirection }[] = [];
    secredCode2: { steps: number; direction: StepDirection }[] = [];
    backGround: Sprite = new Sprite();
    doorClosed: Sprite = new Sprite();
    handle: Sprite = new Sprite();
    shadow: Sprite = new Sprite();
    doorOpen = new Sprite();
    doorOpenShadow = new Sprite();
    mainScreen = new Container();
    endScreen = new Container();


    constructor() {
        this.secredCode = this.generateRandomPairs();
        this.TransformSecretCode();
        this.app = new Application({
            backgroundColor: 0xd3d3d3,
            width: this.gameWidth,
            height: this.gameHeight,
        });


    }
    private resetSecretCode(): void {
        this.secredCode = this.generateRandomPairs();
        this.TransformSecretCode();
    }
    private generateRandomPairs(): { steps: number; direction: StepDirection }[] {
        const pairs: { steps: number; direction: StepDirection }[] = [];
        const directions: StepDirection[] = ["clockwise", "counterclockwise"];

        for (let i = 0; i < 3; i++) {
            const randomNumber = Math.floor(Math.random() * 9) + 1;
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];

            pairs.push({ steps: randomNumber, direction: randomDirection });
        }

        return pairs;
    }
    private TransformSecretCode(): void {
        for (let i = 0; i < this.secredCode.length; i++) {
            for (let j = 0; j < this.secredCode[i].steps; j++) {
                this.secredCode2.push({ steps: 1, direction: this.secredCode[i].direction });
            }
        }
    }
    private startGame() {
        this.doorClosed.interactive = true;
        let xLimit = window.innerWidth / 2;
        console.log(this.secredCode);
        console.log(this.secredCode2);
        console.log(this.doorClosed);
        const self = this;
        this.doorClosed.on("pointertap", function (e) {
            let clickedPosition = e.data.global.x;
            console.log(window.innerWidth / 2);
            console.log(clickedPosition);

            if (clickedPosition > xLimit) {
                self.Add("clockwise");
                console.log(self.userInput.length);
                console.log(self.secredCode2.length);
                animation.restart();
            } else {
                self.Add("counterclockwise");
                console.log(self.userInput.length);
                console.log(self.secredCode2.length);
                animation2.restart();
            }
        });
        let targetRotation = 60;

        const animation = gsap.to([this.handle, this.shadow], {
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
        const animation2 = gsap.to([this.handle, this.shadow], {
            rotation: -(targetRotation2 * Math.PI) / 180,
            paused: true,
            duration: 1,
            ease: "liniar",
            repeat: 0,
            onComplete: () => {
                targetRotation2 -= 60;
            },
        });




    }
    public loadGameAssets(): Promise<void> {

        return new Promise((res, rej) => {
            const loader = Loader.shared;
            loader.add("safe", "./assets/bg.png");
            loader.add("doorClosed", "./assets/door.png");
            loader.add("handle", "./assets/handle.png");
            loader.add("shadow", "./assets/handleShadow.png");
            loader.add("doorOpen", "./assets/doorOpen.png");
            loader.add("doorOpenShadow", "./assets/doorOpenShadow.png");
            loader.add("blink", "./assets/blink.png");
            loader.onComplete.once(() => {
                res();
            });

            loader.onError.once(() => {
                rej();
            });

            loader.load((loader, resources) => {
                const timerText = new Text('00:00', {
                    fontFamily: 'Arial',
                    fontSize: 9,
                    fill: 0xFF0000, // Text color in hexadecimal
                    align: 'center', // Text alignment (left, center, right)
                });
                let startTime = Date.now();
                let timerInterval = setInterval(updateTimer, 1000);
                this.backGround = new Sprite(resources.safe.texture);
                let backGround2 = new Sprite(resources.safe.texture);
                this.doorClosed = new Sprite(resources.doorClosed.texture);
                this.handle = new Sprite(resources.handle.texture);
                this.shadow = new Sprite(resources.shadow.texture);
                this.doorOpen = new Sprite(resources.doorOpen.texture);
                this.doorOpenShadow = new Sprite(resources.doorOpenShadow.texture);
                let blink = new Sprite(resources.blink.texture);
                let blink2 = new Sprite(resources.blink.texture);
                let blink3 = new Sprite(resources.blink.texture);

                this.mainScreen.visible = true;
                this.endScreen.visible = false;
                this.handle.anchor.set(0.5);
                this.shadow.anchor.set(0.5);
                this.app.stage.addChild(this.mainScreen);
                this.app.stage.addChild(this.endScreen);
                this.backGround.width = this.app.renderer.width;
                this.backGround.height = this.app.renderer.height;
                backGround2.width = this.app.renderer.width;
                backGround2.height = this.app.renderer.height;
                const centerX = this.app.renderer.width / 2;
                const centerY = this.app.renderer.height / 2;

                this.doorOpen.scale.x = 0.13;
                this.doorOpen.scale.y = 0.195;
                this.doorClosed.scale.x = 0.13;
                this.doorClosed.scale.y = 0.195;
                this.handle.scale.x = 0.15;
                this.handle.scale.y = 0.15;
                this.shadow.scale.x = 0.15;
                this.shadow.scale.y = 0.15;
                this.doorOpenShadow.scale.x = 0.13;
                this.doorOpenShadow.scale.y = 0.195;
                blink.scale.x = 0.13;
                blink.scale._y = 0.195;
                blink2.scale.x = 0.13;
                blink2.scale._y = 0.195;
                blink3.scale.x = 0.13;
                blink3.scale._y = 0.195;

                timerText.x = this.app.screen.width / 2 - timerText.width / 2 - 155;
                timerText.y = this.app.screen.height / 2 - timerText.height / 2 - 30;
                blink.x = centerX - this.doorOpenShadow.width / 2 - 20;
                blink.y = centerY - this.doorOpenShadow.height / 2 + 120;
                blink2.x = centerX - this.doorOpenShadow.width / 2 + 40;
                blink2.y = centerY - this.doorOpenShadow.height / 2 + 120;
                blink3.x = centerX - this.doorOpenShadow.width / 2 + 80;
                blink3.y = centerY - this.doorOpenShadow.height / 2 + 200;
                this.doorOpenShadow.x = centerX - this.doorOpenShadow.width / 2 + 200;
                this.doorOpenShadow.y = centerY - this.doorOpenShadow.height / 2;
                this.doorOpen.x = centerX - this.doorOpen.width / 2 + 190;
                this.doorOpen.y = centerY - this.doorOpen.height / 2 - 10;
                this.doorClosed.x = centerX - this.doorClosed.width / 2 + 6;
                this.doorClosed.y = centerY - this.doorClosed.height / 2 - 10;
                this.handle.x = centerX - this.handle.width / 2 + 44;
                this.handle.y = centerY - this.handle.height / 2 + 39;
                this.shadow.x = centerX - this.shadow.width / 2 + 45;
                this.shadow.y = centerY - this.shadow.height / 2 + 42;

                this.endScreen.addChild(backGround2, blink, blink2, blink3, this.doorOpenShadow, this.doorOpen);

                this.mainScreen.addChild(this.backGround, this.doorClosed, this.shadow, this.handle, timerText);
                const tl = gsap.timeline({ repeat: -1 });
                tl.to([blink, blink2, blink3], { duration: 0.5, alpha: 1, ease: "power0.easeNone" })
                    .to([blink, blink2, blink3], { duration: 0.5, alpha: 0, ease: "power0.easeNone" })
                    .delay(Math.random() * 2);
                this.doorClosed.interactive = true;

                function updateTimer() {
                    const currentTime = Date.now();
                    const elapsedTime = new Date(currentTime - startTime);

                    const minutes = elapsedTime.getMinutes().toString().padStart(2, '0');
                    const seconds = elapsedTime.getSeconds().toString().padStart(2, '0');


                    timerText.text = `${minutes}:${seconds}`;
                }
                updateTimer.call(this);
                this.startGame();

            });
        });
    }

    private checkCode(): void {

        const endAnimation = gsap.to([this.handle, this.shadow], {
            rotation: (360 * Math.PI) / 180,
            paused: true,
            duration: 1,
            ease: "liniar",
            repeat: 5,

        });
        let win: boolean = true;
        for (let i = 0; i < this.secredCode2.length; i++) {
            if (this.userInput[i].direction != this.secredCode2[i].direction) {
                win = false;
                break;
            }
        }
        if (win) {
            console.log("You win");
            this.mainScreen.visible = false;
            this.endScreen.visible = true;
        } else {
            console.log("You loose");

            this.userInput = [];
            this.secredCode2 = [];
            this.secredCode = [];

            endAnimation.restart();
            this.resetSecretCode();
            console.log(this.secredCode);
        }
    }
    public Add(direction: StepDirection): void {
        const newStep: { steps: number; direction: StepDirection } = {
            steps: 1,
            direction: direction,
        };
        if (this.userInput.length < this.secredCode2.length) {
            this.userInput.push(newStep);
            console.log("add");
        } else {
            this.checkCode();
        }
    }
}
export type StepDirection = "clockwise" | "counterclockwise";
