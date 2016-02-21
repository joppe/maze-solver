const RESPONSE_TYPE_DEFAULT = 1;

/**
 * @class Response
 */
export class Response {
    /**
     * @param {*} data
     * @param {number} type
     */
    constructor(data, type = RESPONSE_TYPE_DEFAULT) {
        this.data = data;
        this.type = type;
    }

    /**
     * @returns {{type: (number), data: *}}
     */
    raw() {
        return {
            type: this.type,
            data: this.data
        }
    }
}

export {RESPONSE_TYPE_DEFAULT}