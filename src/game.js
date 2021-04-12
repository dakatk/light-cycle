import KeyHandler from './input/keyboard';
import LightCycle from './logic/lightcycle';
import Path from './logic/path';
import { UP, DOWN, LEFT, RIGHT } from './logic/direction';

export default function Game(renderContext, banner, canvasWidth, canvasHeight) {
    this.renderContext = renderContext;
    this.banner = banner;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.blueKeyHandler = new KeyHandler(['w', 'a', 's', 'd']);
    this.orangeKeyHandler = new KeyHandler(['i', 'j', 'k', 'l']);

    this.blueCycle = new LightCycle(Path.SIZE, Path.SIZE, 'blue');
    this.orangeCycle = new LightCycle(canvasWidth - (Path.SIZE * 2), canvasHeight - (Path.SIZE * 2), 'orange');

    this.gameover = false;
}

Game.prototype.update = function(deltaTime) {
    switch (this.blueKeyHandler.lastKeyPressed) {
        case 'w':
            this.blueCycle.turn(UP);
            break;

        case 'a':
            this.blueCycle.turn(LEFT);
            break;

        case 's':
            this.blueCycle.turn(DOWN);
            break;

        case 'd':
            this.blueCycle.turn(RIGHT);
            break;

        default:
            break;
    }

    switch (this.orangeKeyHandler.lastKeyPressed) {
        case 'i':
            this.orangeCycle.turn(UP);
            break;

        case 'j':
            this.orangeCycle.turn(LEFT);
            break;

        case 'k':
            this.orangeCycle.turn(DOWN);
            break;

        case 'l':
            this.orangeCycle.turn(RIGHT);
            break;

        default:
            break;
    }
    this.blueCycle.update(deltaTime, this.canvasWidth, this.canvasHeight);

    if (this.blueCycle.collision(this.orangeCycle) || this.blueCycle.collision(this.blueCycle)) {
        if (this.banner !== undefined) {
            this.banner.innerHTML = 'ORANGE WINS';
        }
        this.gameover = true;
        return;
    }

    this.orangeCycle.update(deltaTime, this.canvasWidth, this.canvasHeight);

    if (this.orangeCycle.collision(this.blueCycle) || this.orangeCycle.collision(this.orangeCycle)) {
        if (this.banner !== undefined) {
            this.banner.innerHTML = 'BLUE WINS';
        }
        this.gameover = true;
    }
}

Game.prototype.render = function() {
    this.renderContext.clearRect(0, 0, 600, 600);

    this.blueCycle.render(this.renderContext);
    this.orangeCycle.render(this.renderContext);

    this.blueCycle.renderFront(this.renderContext);
    this.orangeCycle.renderFront(this.renderContext);
}

Game.prototype.handleKeyDown = function(event) {
    this.blueKeyHandler.handleKeyDown(event);
    this.orangeKeyHandler.handleKeyDown(event);
}