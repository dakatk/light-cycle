import Game from './game';
import '../css/style.css';

var lastTime = 0;
var game;

function loop(timestamp) {
    let deltaTime = timestamp - lastTime;

    game.update(deltaTime);
    game.render();

    if (!game.gameover) {
        lastTime = timestamp;
        window.requestAnimationFrame(loop);
    }
}

function main() {
    const canvas = document.getElementById('canvas');
    const banner = document.getElementById('winner');

    const context = canvas.getContext('2d');

    game = new Game(context, banner, canvas.width, canvas.height);

    document.addEventListener('keydown', event => game.handleKeyDown(event));
    window.requestAnimationFrame(loop);
}

window.addEventListener('DOMContentLoaded', _ => main());