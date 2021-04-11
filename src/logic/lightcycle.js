import Path from "./path";
import { UP, DOWN, LEFT, RIGHT } from './direction';

const ALLOWED_TURNS = {
    'u': [LEFT, RIGHT],
    'd': [LEFT, RIGHT],
    'l': [UP, DOWN],
    'r': [UP, DOWN]
};

export default function LightCycle(x, y, color) {
    this.paths = [new Path(x, y)]
    this.color = color;
}

LightCycle.prototype.update = function(deltaTime) {
    const front = this.paths[0];
    front.update(deltaTime);
}

LightCycle.prototype.render = function(context) {
    context.fillStyle = this.color;

    for (let i = 1; i < this.paths.length; i ++) {
        const path = this.paths[i];
        path.render(context);
    }
}

LightCycle.prototype.renderFront = function(context) {
    context.fillStyle = this.color;
    
    const front = this.paths[0];
    front.render(context);
}

LightCycle.prototype.turn = function(direction) {
    const front = this.paths[0];

    if (this.paths.length === 1 && front.direction === undefined) {
        front.direction = direction;
    }
    else if (ALLOWED_TURNS[front.direction].includes(direction)) {
        let join = front.join(direction);
        this.paths.unshift(new Path(join.x, join.y, direction));
    }
}

LightCycle.prototype.collision = function(other) {
    const front = this.paths[0];

    for (let path of other.paths) {
        if (path === front) {
            continue;
        }
        if (front.intersects(path)) {
            return true;
        }
    }
    return false;
}