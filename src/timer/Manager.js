import {Timer} from './Timer.js';

let timers = {};

/**
 * @class Manager
 */
export class Manager {
    /**
     * @param {string} id
     * @returns {Timer}
     */
    static getTimer(id) {
        if (undefined === timers[id]) {
            timers[id] = new Timer();
        }

        return timers[id];
    }

    /**
     * @param {string} id
     * @returns {Timer}
     */
    static start(id) {
        let timer = Manager.getTimer(id);

        timer.start();

        return timer;
    }
    /**
     * @param {string} id
     * @returns {Timer}
     */
    static end(id) {
        let timer = Manager.getTimer(id);

        timer.stop();

        return timer;
    }

    /**
     * @param {string} id
     * @returns {number}
     */
    static duration(id) {
        return getTimer(id).getDuration();
    }

    /**
     * @returns {Iterator}
     */
    static getIterator() {
        let current = null,
            ids = Object.keys(timers);

        return {
            [Symbol.iterator]() {
                let step = 0;

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
    }
}