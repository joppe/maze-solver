const REQUEST_TYPE_DEFAULT = 1;

/**
 * @class Request
 */
export class Request {
    /**
     * @param {number} type
     * @param {*} data
     */
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }

    /**
     * @param {{type: number, data: *}} message
     * @returns {Request}
     */
    static createFromRaw(message) {
        if (undefined === message.type || undefined === message.data) {
            throw 'Message doest not contain "type" and/or "data" property';
        }

        return new Request(message.type, message.data);
    }
}

export {REQUEST_TYPE_DEFAULT}