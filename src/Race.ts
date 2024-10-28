import { Player } from './Player';

export class Race {
    private players: Player[];
    private track: HTMLDivElement;
    private cars: HTMLDivElement[];
    private keyPressed: { [key: string]: boolean };
    public onRaceFinish: ((winner: Player) => void) | null = null; 

    constructor(players: Player[]) {
        this.players = players;
        this.track = document.getElementById('track') as HTMLDivElement;
        this.cars = []; 
        this.keyPressed = {}; 
    }

    public init() {
        this.players.forEach((player, index) => {
            const carDiv = document.createElement('div'); 
            carDiv.classList.add('car'); 
            carDiv.innerText = player.car;
            carDiv.style.position = 'absolute'; 
            carDiv.style.left = '0px';
            carDiv.style.top = `${index * 50}px`; 
            this.track.appendChild(carDiv); 
            this.cars.push(carDiv); 

            this.keyPressed[player.key] = false;

            document.addEventListener('keydown', (event) => {
                if (event.key.toUpperCase() === player.key && !this.keyPressed[player.key]) {
                    this.keyPressed[player.key] = true; 
                    this.moveCar(carDiv, player); 
                }
            });

            document.addEventListener('keyup', (event) => {
                if (event.key.toUpperCase() === player.key) {
                    this.keyPressed[player.key] = false; 
                }
            });
        });

        this.renderKeys();
    }

    private moveCar(carDiv: HTMLDivElement, player: Player) {
        const currentPosition = parseInt(carDiv.style.left) || 0;
        carDiv.style.left = (currentPosition + 10) + 'px'; 

        if (currentPosition + 10 >= this.track.offsetWidth - 50) {
            this.finishRace(player);
        }
    }

    private finishRace(player: Player) {
        alert(`${player.car} ha cruzado la meta!`);
        if (this.onRaceFinish) {
            this.onRaceFinish(player); 
        }
    }

    private renderKeys() {
        const keysDiv = document.getElementById('assigned-keys') as HTMLDivElement; 
        
        const keysText = this.players.map(player => `${player.nickname}: ${player.key}`).join(', ');

        keysDiv.innerHTML = `<p>Teclas asignadas: ${keysText}</p>`;
    }
}
