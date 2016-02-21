const defaultOptions = {
        mazewidth: 25,
        mazehight: 15,
        mazecell: 10,
        mazewall: 2,
        lengthfactor: 5,
        wallr: 0,
        wallg: 0,
        wallb: 0,
        pathr: 255,
        pathg: 255,
        pathb: 255
    };

/**
 * @param {Object} target
 * @param {Array} sources
 * @returns {Object}
 */
function copy(target, ...sources) {
    sources.forEach((source) => {
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    });

    return target;
}

/**
 * @class Options
 */
export class Options {
    /**
     * @param {Object} options
     */
    constructor(options) {
        this.options = copy({}, defaultOptions, options);
    }

    /**
     * @param key
     * @returns {*}
     */
    get(key) {
        if (undefined === this.options[key]) {
            throw `Undefined key "${key}"`;
        }

        return this.options[key];
    }

    /**
     * @returns {Array}
     */
    toArray() {
        let array = [];

        for (let option in this.options) {
            if (this.options.hasOwnProperty(option)) {
                array.push(`${option}=${this.options[option]}`);
            }
        }

        return array;
    }

    /**
     * @returns {Object}
     */
    raw() {
        return this.options;
    }
}