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

LightCycle.prototype.update = function(deltaTime, canvasWidth, canvasHeight) {
    const front = this.paths[0];
    front.update(deltaTime);

    let extension = undefined;

    if (front.x < 0) {
        extension = {
            x: canvasWidth + front.x - 1,
            y: front.y,
            w: -front.x,
            h: front.h
        };
    }
    else if ((front.x + front.w) > canvasWidth) {
        extension = {
            x: 0,
            y: front.y,
            w: (front.x + front.w) - canvasWidth,
            h: front.h
        };
    }

    if (front.y < 0) {
        let y = canvasHeight + front.y - 1;
        let h = -front.y;

        if (extension !== undefined) {
            extension.y = y;
            extension.h = h;
        }
        else {
            extension = {
                x: front.x,
                y: y,
                w: front.w,
                h: h
            };
        }
    }
    else if ((front.y + front.h) > canvasHeight) {
        let h = (front.y + front.h) - canvasHeight;

        if (extension !== undefined) {
            extension.y = 0;
            extension.h = h;
        }
        else {
            extension = {
                x: front.x,
                y: 0,
                w: front.w,
                h: h
            };
        }
    }

    if (extension !== undefined) {
        let path = new Path(extension.x, extension.y, front.direction);

        path.w = extension.w;
        path.h = extension.h;

        this.paths.unshift(path);
    }
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