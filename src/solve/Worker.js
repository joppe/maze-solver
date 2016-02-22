import {Workable} from './../webworkers/Workable.js';
import {Response} from './../webworkers/Response.js';
import {Solver} from './Solver.js';
import {Matrix} from './../normalize/Matrix.js';

const REQUEST_TYPE_SIMPLE = 1;

/**
 * @class Worker
 */
export class Worker extends Workable {
    /**
     * @param {Request} request
     */
    handleRequest(request) {
        if (REQUEST_TYPE_SIMPLE === request.type) {
            let data = request.data,
                solver = new Solver(Matrix.createFromRaw(data.matrix)),
                path = solver.simple();

            this.postMessage(new Response({
                path: path.raw()
            }));
        }
    }
}

export {REQUEST_TYPE_SIMPLE}