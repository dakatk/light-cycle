export default function KeyHandler(allowedKeys) {
    this.lastKeyPressed = '';
    this.allowedKeys = allowedKeys;
}

KeyHandler.prototype.handleKeyDown = function(event) {
    const key = event.key;
    if (!this.allowedKeys.includes(key)) {
        return;
    }
    this.lastKeyPressed = key;
}