/**
 * @returns {number}
 */
function timestamp() {
    return (new Date()).getTime();
}

/**
 * @class Timer
 */
export class Timer {
    start() {
        this.startTime = timestamp();
    }

    stop() {
        this.stopTime = timestamp();
    }

    /**
     * @returns {number}
     */
    getDuration() {
        if (undefined === this.stopTime || undefined === this.startTime) {
            throw 'Timer never stopped and/or started';
        }

        return this.stopTime - this.startTime;
    }
}