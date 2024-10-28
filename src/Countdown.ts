import { Player } from './Player';

export class Countdown {
    private players: Player[];
    private countdownElement: HTMLDivElement;
    private startRaceCallback: () => void;

    constructor(players: Player[], startRaceCallback: () => void) {
        this.players = players;
        this.startRaceCallback = startRaceCallback;
        this.countdownElement = document.getElementById('countdown-timer') as HTMLDivElement;

        if (!this.countdownElement) {
            throw new Error('Error');
        }
    }

    public init() {
        let countdown = 10;
        this.countdownElement.innerText = countdown.toString();

        const interval = setInterval(() => {
            countdown--;
            this.countdownElement.innerText = countdown.toString();
            if (countdown <= 0) {
                clearInterval(interval);
                this.startRace();
            }
        }, 1000);
    }

    private startRace() {
        this.startRaceCallback();
    }
}
