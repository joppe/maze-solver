import {Workable} from './../webworkers/Workable.js';
import {Response} from './../webworkers/Response.js';
import {Scanner} from './Scanner.js';
import {Options} from './../maze/Options.js';

const REQUEST_TYPE_SCAN = 1;

/**
 * @class Worker
 */
export class Worker extends Workable {
    /**
     * @param {Request} request
     */
    handleRequest(request) {
        if (REQUEST_TYPE_SCAN === request.type) {
            let data = request.data,
                scanner = new Scanner(data.imageData, data.canvasSize, new Options(data.options));

            this.postMessage(new Response({
                matrix: scanner.scan()
            }));
        }
    }
}

export {REQUEST_TYPE_SCAN}