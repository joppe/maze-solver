import {Workable} from './../webworkers/Workable.js';
import {Response} from './../webworkers/Response.js';
import {Solver} from './Solver.js';
import {Matrix} from './../normalize/Matrix.js';
import {Point} from './../geometry/Point.js';
import {Vector} from './../geometry/Vector.js';

const REQUEST_TYPE_SIMPLE = 2,
    RESPONSE_TYPE_SOLVED = 2;

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
                start = Point.createFromRaw(data.start),
                direction = Vector.createFromRaw(data.direction),
                matrix = Matrix.createFromRaw(data.matrix),
                solver = new Solver(matrix, start, direction),
                path = solver.simple();

            this.postMessage(new Response({
                path: path.raw()
            }, RESPONSE_TYPE_SOLVED));
        }
    }
}

export {REQUEST_TYPE_SIMPLE, RESPONSE_TYPE_SOLVED}