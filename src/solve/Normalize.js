import {Path} from './Path.js';

export function normalize(path) {
    'use strict';

    let normalized = new Path(),
        index = 0;

    function findHighestIndex(point) {
        let index = -1;

        for (let i = (path.points.length - 1); i >= 0; i -= 1) {
            let compare = path.points[i];

            if (compare.position.x === point.position.x && compare.position.y === point.position.y) {
                index = i;
                break;
            }
        }

        return index;
    }

    while (index < path.points.length) {
        let point = path.points[index];

        normalized.add(point);

        index = findHighestIndex(point) + 1;
    }

    return normalized;
}