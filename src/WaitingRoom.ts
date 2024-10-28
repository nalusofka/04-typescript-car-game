import { Player } from './Player';

export class WaitingRoom {
    private players: Player[];
    private addPlayerCallback: (nickname: string, car: string, key: string) => void;
    private startGameCallback: () => void;
    private playerListDiv: HTMLDivElement;
    private mainScreen: HTMLDivElement;
    private playerForm: HTMLFormElement;
    private startGameButton: HTMLButtonElement;
    private carSelect: HTMLSelectElement;

    constructor(players: Player[], addPlayerCallback: (nickname: string, car: string, key: string) => void, startGameCallback: () => void) {
        this.players = players;
        this.addPlayerCallback = addPlayerCallback;
        this.startGameCallback = startGameCallback;
        this.playerListDiv = document.getElementById('player-list') as HTMLDivElement;
        this.mainScreen = document.getElementById('main-screen') as HTMLDivElement;
        this.playerForm = document.getElementById('player-form') as HTMLFormElement;
        this.startGameButton = document.getElementById('start-game') as HTMLButtonElement;
        this.carSelect = document.getElementById('car-select') as HTMLSelectElement;

        this.playerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addPlayer();
        });

        this.startGameButton.addEventListener('click', () => {
            this.startGameCallback();
        });
    }

    public init() {
        this.mainScreen.style.display = 'block';
        this.startGameButton.style.display = 'none';
    }

    public toggleStartButton(isVisible: boolean) {
        this.startGameButton.style.display = isVisible ? 'block' : 'none';
    }

    private addPlayer() {
        if (this.players.length < 5) {
            const nicknameInput = document.getElementById('nickname') as HTMLInputElement;
            const nickname = nicknameInput.value;
            const car = this.carSelect.value;

            if (!nickname || !car) return;

            const key = String.fromCharCode(65 + this.players.length);

            this.addPlayerCallback(nickname, car, key);
            this.renderPlayer(nickname, car, key);
            nicknameInput.value = '';

            this.updateCarSelection(car);
        }
    }

    private renderPlayer(nickname: string, car: string, key: string) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-item';
        playerDiv.innerHTML = `
            <span>${nickname} - ${car} (Tecla: ${key})</span>
            <button class="remove-player-btn">Eliminar</button>
        `;
        playerDiv.querySelector('.remove-player-btn')?.addEventListener('click', () => {
            this.removePlayer(nickname, car, playerDiv);
        });
        this.playerListDiv.appendChild(playerDiv);
    }

    private removePlayer(nickname: string, car: string, playerDiv: HTMLElement) {
        this.players = this.players.filter(player => player.nickname !== nickname);

        this.updateCarSelection(car, false);

        playerDiv.remove();
        
        this.toggleStartButton(this.players.length >= 2);
    }

    private updateCarSelection(car: string, disable: boolean = true) {
        Array.from(this.carSelect.options).forEach(option => {
            if (option.value === car) option.disabled = disable;
        });
    }

    public hide() {
        this.mainScreen.style.display = 'none';
    }
}
