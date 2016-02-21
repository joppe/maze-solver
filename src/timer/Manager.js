import {Timer} from './Timer.js';

let timers = {};

export var Manager = {
    /**
     * @param {string} id
     * @returns {Timer}
     */
    getTimer(id) {
        if (undefined === timers[id]) {
            timers[id] = new Timer();
        }

        return timers[id];
    },

    /**
     * @param {string} id
     * @returns {Timer}
     */
    start(id) {
        let timer = Manager.getTimer(id);

        timer.start();

        return timer;
    },

    /**
     * @param {string} id
     * @returns {Timer}
     */
    end(id) {
        let timer = Manager.getTimer(id);

        timer.stop();

        return timer;
    },

    /**
     * @param {string} id
     * @returns {number}
     */
    duration(id) {
        return getTimer(id).getDuration();
    },

    [Symbol.iterator]() {
        let current = null,
            ids = Object.keys(timers);

        return {
            next() {
                let value;

                if (null === current) {
                    current = ids[0];
                    value = current;
                } else {
                    let index = ids.indexOf(current);

                    if (-1 !== index && ids.length > (index + 1)) {
                        current = ids[index + 1];
                        value = current;
                    }
                }

                return {
                    value,
                    done: undefined === value
                };
            }
        };
    }
};