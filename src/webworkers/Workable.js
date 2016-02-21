import {Response} from './Response.js';
import {Request} from './Request.js';

/**
 * @class Workable
 */
export class Workable {
    /**
     * @param {*} message
     */
    handleMessage(message) {
        this.handleRequest(Request.createFromRaw(message));
    }

    /**
     * @param {Request} request
     */
    handleRequest(request) {
        console.log('This method should be implemented by the subclass');
    }

    /**
     * @param {Response} message
     */
    postMessage(message) {
        if (false === (message instanceof Response)) {
            throw 'Message is not of type Response';
        }

        this.listener(message.raw());
    }

    /**
     * @param {Function} listener
     */
    onPostMessage(listener) {
        this.listener = listener;
    }
}