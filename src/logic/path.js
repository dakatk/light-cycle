import { UP, DOWN, LEFT, RIGHT } from './direction';

const SIZE = 20;
const SPEED = 0.4;

export default function Path(x, y, direction) {
    this.x = x;
    this.y = y;
    this.w = SIZE;
    this.h = SIZE;
    this.direction = direction;
}

Path.SIZE = SIZE;
Path.SPEED = SPEED;

Path.prototype.update = function(deltaTime) {
    if (this.direction === undefined) {
        return;
    }
    const moveSpeed = SPEED * deltaTime;

    switch (this.direction) {
        case UP:
            this.y -= moveSpeed;

        case DOWN:
            this.h += moveSpeed;
            break;

        case LEFT:
            this.x -= moveSpeed;

        case RIGHT:
            this.w += moveSpeed;
            break;

        default:
            break;
    }
}

Path.prototype.render = function(context) {
    let x = this.x - 2;
    let y = this.y - 2;
    let h = this.h + 2;
    let w = this.w + 2;

    context.fillRect(x, y, w, h);
}

Path.prototype.join = function(nextDirection) {
    let x = 0;
    let y = 0;

    switch (this.direction) {
        case UP:
            y = this.y;
            if (nextDirection === LEFT) {
                x = this.x - SIZE - 1;
            }
            else if (nextDirection === RIGHT) {
                x = this.x + SIZE + 1;
            }
            break;

        case DOWN:
            y = this.y + this.h - SIZE;
            if (nextDirection === LEFT) {
                x = this.x - SIZE - 1;
            }
            else if (nextDirection === RIGHT) {
                x = this.x + SIZE + 1;
            }
            break;

        case LEFT:
            x = this.x;
            if (nextDirection === UP) {
                y = this.y - SIZE - 1;
            }
            else if (nextDirection === DOWN) {
                y = this.y + SIZE + 1;
            }
            break;

        case RIGHT:
            x = this.x + this.w - SIZE;
            if (nextDirection === UP) {
                y = this.y - SIZE - 1;
            }
            else if (nextDirection === DOWN) {
                y = this.y + SIZE + 1;
            }
            break;

        default:
            break;
    }
    return { x, y };
}

Path.prototype.intersects = function(other) {

    const bl1 = {
        x: this.x,
        y: this.y + this.h
    };
    const tr1 = {
        x: this.x + this.w,
        y: this.y
    };
    const bl2 = {
        x: other.x,
        y: other.y + other.h
    };
    const tr2 = {
        x: other.x + other.w,
        y: other.y
    };

    if (tr1.y >= bl2.y || bl1.y <= tr2.y) {
        return false;
    }

    if (tr1.x <= bl2.x || bl1.x >= tr2.x) {
        return false;
    }
    return true;
}