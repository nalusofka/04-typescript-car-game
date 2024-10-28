import { Player } from './Player';

export class Podium {
    private players: Player[];
    private winner: Player;

    constructor(players: Player[], winner: Player) {
        this.players = players;
        this.winner = winner;
    }

    public show() {
        const podiumElement = document.getElementById('podium') as HTMLDivElement;
        podiumElement.innerHTML = '';

        const winnerDiv = document.createElement('div');
        winnerDiv.innerText = `¡Ganador: ${this.winner.nickname} con el auto ${this.winner.car}!`;
        winnerDiv.classList.add('winner');
        podiumElement.appendChild(winnerDiv);

        this.players.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.innerText = `${player.nickname} - ${player.car}`;
            podiumElement.appendChild(playerDiv);
        });

        const restartButton = document.createElement('button');
        restartButton.innerText = 'Reiniciar Juego';
        restartButton.classList.add('restart-button');
        podiumElement.appendChild(restartButton);

        restartButton.addEventListener('click', () => {
            this.restartGame();
        });

        podiumElement.style.display = 'block';
    }

    private restartGame() {
        location.reload();
    }
}
