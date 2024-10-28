import { WaitingRoom } from './WaitingRoom';
import { Countdown } from './Countdown';
import { Race } from './Race';
import { Podium } from './Podium';
import { Player } from './Player';

export class Game {
    private players: Player[] = [];
    private waitingRoom: WaitingRoom;
    private countdown: Countdown | null = null;
    private race: Race | null = null;
    private podium: Podium | null = null;

    constructor() {
        this.waitingRoom = new WaitingRoom(this.players, this.addPlayer.bind(this), this.onStartGameClick.bind(this));
    }

    public init() {
        this.waitingRoom.init();
    }

    public addPlayer(nickname: string, car: string, key: string) {
        const player = new Player(nickname, car, key);
        this.players.push(player);

        this.waitingRoom.toggleStartButton(this.players.length >= 2);
    }

    public onStartGameClick() {
        if (this.players.length < 2) {
            alert('Se requieren al menos 2 jugadores para iniciar el juego.');
            return;
        }
        this.startCountdown();
    }

    public startCountdown() {
        this.waitingRoom.hide();
        const gameScreen = document.getElementById('game-screen') as HTMLDivElement;
        gameScreen.style.display = 'block';
        this.countdown = new Countdown(this.players, this.startRace.bind(this));
        this.countdown.init();
    }

    public startRace() {
        if (this.race) return;

        this.race = new Race(this.players);
        this.race.init();
        this.race.onRaceFinish = this.showPodium.bind(this);
    }

    private showPodium(winner: Player) {
        this.podium = new Podium(this.players, winner);
        this.podium.show();
    }
}
