export class GameEngine {
    readonly secredCode: { steps: number; direction: StepDirection }[]; /*= [
        { steps: 1, direction: 'clockwise' },
        { steps: 1, direction: 'clockwise' },
        { steps: 1, direction: 'counterclockwise' },
        { steps: 1, direction: 'counterclockwise' },
        { steps: 1, direction: 'clockwise' },
    ];*/
    userInput: { steps: number; direction: StepDirection }[] = [];
    secredCode2: { steps: number; direction: StepDirection }[] = [];
    constructor() {
        this.secredCode = this.generateRandomPairs();
        this.TransformSecretCode();
    }
    generateRandomPairs(): { steps: number; direction: StepDirection }[] {
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
    private checkCode(): void {
        let win: boolean = true;
        for (let i = 0; i < this.secredCode2.length; i++) {
            if (this.userInput[i].direction != this.secredCode2[i].direction) {
                win = false;
                break;
            }
        }
        if (win) {
            console.log("You win");
        } else {
            console.log("You loose");
        }
    }
}
export type StepDirection = "clockwise" | "counterclockwise";
