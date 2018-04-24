/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CellType;
(function (CellType) {
    CellType[CellType["UnSet"] = 0] = "UnSet";
    CellType[CellType["OpenDoor"] = 1] = "OpenDoor";
    CellType[CellType["ClosedDoor"] = 2] = "ClosedDoor";
    CellType[CellType["Wall"] = 3] = "Wall";
    CellType[CellType["Entrance"] = 4] = "Entrance";
    CellType[CellType["Exit"] = 5] = "Exit";
    CellType[CellType["Room"] = 6] = "Room";
})(CellType = exports.CellType || (exports.CellType = {}));
function getCellType(cell) {
    return cell.map((c) => {
        return c.value;
    });
}
exports.getCellType = getCellType;
function isA(cell, type) {
    const t = getCellType(cell);
    return t.getOrElse(undefined) === type;
}
exports.isA = isA;
function isOneOf(cell, types) {
    const t = getCellType(cell);
    return types.indexOf(t.getOrElse(undefined)) !== -1;
}
exports.isOneOf = isOneOf;
function isUnset(cell) {
    return isA(cell, CellType.UnSet);
}
exports.isUnset = isUnset;
function isRoom(cell) {
    return isA(cell, CellType.Room);
}
exports.isRoom = isRoom;
function isWall(cell) {
    return isA(cell, CellType.Wall);
}
exports.isWall = isWall;
function isOpenDoor(cell) {
    return isA(cell, CellType.OpenDoor);
}
exports.isOpenDoor = isOpenDoor;
function isClosedDoor(cell) {
    return isA(cell, CellType.ClosedDoor);
}
exports.isClosedDoor = isClosedDoor;
function isDoor(cell) {
    return isOneOf(cell, [
        CellType.ClosedDoor,
        CellType.OpenDoor
    ]);
}
exports.isDoor = isDoor;
function isEntrance(cell) {
    return isA(cell, CellType.Entrance);
}
exports.isEntrance = isEntrance;
function isExit(cell) {
    return isA(cell, CellType.Exit);
}
exports.isExit = isExit;
function isWallOrDoor(cell) {
    return isOneOf(cell, [
        CellType.ClosedDoor,
        CellType.OpenDoor,
        CellType.Wall,
        CellType.Entrance,
        CellType.Exit
    ]);
}
exports.isWallOrDoor = isWallOrDoor;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = __webpack_require__(7);
function startDirection(position, cols, rows) {
    let x = 0;
    let y = 0;
    if (position.col === 0) {
        x = 1;
    }
    else if (position.col === cols - 1) {
        x = -1;
    }
    else if (position.row === 0) {
        y = 1;
    }
    else if (position.row === rows - 1) {
        y = -1;
    }
    else {
        throw new Error(`Illegal start position {row: ${position.row}, col: ${position.col}} with grid rows ${rows} and cols ${cols}.`);
    }
    return new Vector_1.Vector(x, y);
}
exports.startDirection = startDirection;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Maybe {
    constructor(value) {
        this._value = value;
    }
    get value() {
        if (this.hasValue()) {
            return this._value;
        }
        throw new Error('There is only "none"');
    }
    static some(value) {
        if (value === undefined) {
            throw new Error('Provided value must not be undefined');
        }
        return new Maybe(value);
    }
    static none() {
        return new Maybe(undefined);
    }
    static fromValue(value) {
        return value !== undefined ? Maybe.some(value) : Maybe.none();
    }
    map(f) {
        if (this.hasValue()) {
            return Maybe.some(f(this._value));
        }
        else {
            return Maybe.none();
        }
    }
    flatMap(f) {
        if (this.hasValue()) {
            return f(this._value);
        }
        else {
            return Maybe.none();
        }
    }
    getOrElse(defaultValue) {
        return this._value === undefined ? defaultValue : this._value;
    }
    do(f) {
        if (this.hasValue()) {
            f(this._value);
        }
    }
    hasValue() {
        return !this.isNothing();
    }
    isNothing() {
        return this._value === undefined;
    }
}
exports.Maybe = Maybe;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = __webpack_require__(5);
const Solver_1 = __webpack_require__(12);
const AsciiRenderer_1 = __webpack_require__(15);
const CanvasRenderer_1 = __webpack_require__(16);
const body = window.document.querySelector('body');
const maze = generate_1.generate(10, 10);
const ascii = new AsciiRenderer_1.AsciiRenderer(maze);
const canvas = new CanvasRenderer_1.CanvasRenderer(maze, {
    pathColor: '#f00',
    roomColor: '#fff',
    roomHeight: 30,
    roomWidth: 30,
    speed: 10,
    wallColor: '#000',
    wallHeight: 5,
    wallWidth: 5
});
ascii.render(body);
canvas.render(body);
const path = Solver_1.solve(maze);
ascii.plot(path);
canvas.plot(path);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const shuffle_1 = __webpack_require__(6);
const CellType_1 = __webpack_require__(0);
const startDirection_1 = __webpack_require__(1);
const Maze_1 = __webpack_require__(9);
const random_1 = __webpack_require__(11);
function generate(horizontalRooms, verticalRooms) {
    const maze = new Maze_1.Maze((horizontalRooms * 2) + 1, (verticalRooms * 2) + 1);
    const start = maze.getCell({
        col: (random_1.random(1, horizontalRooms) * 2) - 1,
        row: 0
    });
    const end = maze.getCell({
        col: (random_1.random(1, verticalRooms) * 2) - 1,
        row: maze.height - 1
    });
    const direction = startDirection_1.startDirection(start.value.position, maze.width, maze.height);
    const room = maze.nextCell(start, direction);
    function createPath(currentCell, currentDirection) {
        const possibilities = shuffle_1.shuffle(maze.getPossibilities(currentCell, currentDirection));
        possibilities.forEach((possibility) => {
            if (CellType_1.isClosedDoor(possibility.door) &&
                CellType_1.isUnset(possibility.room)) {
                possibility.door.value.value = CellType_1.CellType.OpenDoor;
                possibility.room.value.value = CellType_1.CellType.Room;
                createPath(possibility.room, possibility.direction);
            }
        });
    }
    start.value.value = CellType_1.CellType.Entrance;
    room.value.value = CellType_1.CellType.Room;
    end.value.value = CellType_1.CellType.Exit;
    createPath(room, direction);
    return maze;
}
exports.generate = generate;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function shuffle(arr) {
    let currentIndex = arr.length;
    const copy = [...arr];
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        const temporaryValue = copy[currentIndex];
        copy[currentIndex] = copy[randomIndex];
        copy[randomIndex] = temporaryValue;
    }
    return copy;
}
exports.shuffle = shuffle;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const angle_1 = __webpack_require__(8);
class Vector {
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    rotate(degrees) {
        const angle = this.angle + angle_1.degreesToRadians(degrees);
        const length = this.length;
        const x = this.length * Number(Math.cos(angle).toFixed(10));
        const y = this.length * Number(Math.sin(angle).toFixed(10));
        return new Vector(x, y);
    }
    toString() {
        return `Vector {x: ${this.x}, y: ${this.y}, angle: ${this.angle}, length: ${this.length}`;
    }
}
exports.Vector = Vector;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
exports.degreesToRadians = degreesToRadians;
function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}
exports.radiansToDegrees = radiansToDegrees;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Grid_1 = __webpack_require__(10);
const CellType_1 = __webpack_require__(0);
const Maybe_1 = __webpack_require__(2);
const ANGLES = [90, 0, -90];
class Maze {
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this._grid = this.createGrid();
    }
    getCell(position) {
        return Maybe_1.Maybe.fromValue(this._grid.getCell(position));
    }
    getCells() {
        return this._grid.getCells();
    }
    getPossibilities(cell, direction) {
        const possibilities = [];
        ANGLES.forEach((angle) => {
            const nextDirection = direction.rotate(angle);
            const door = this.nextCell(cell, nextDirection);
            const room = this.nextCell(door, nextDirection);
            possibilities.push({
                direction: nextDirection,
                door,
                room
            });
        });
        return possibilities;
    }
    nextCell(cell, direction) {
        return cell.flatMap((c) => {
            const next = {
                col: c.position.col + direction.x,
                row: c.position.row + direction.y
            };
            return this.getCell(next);
        });
    }
    createGrid() {
        return new Grid_1.Grid(this.height, this.width, (position) => {
            let type = CellType_1.CellType.UnSet;
            if (position.row === 0 ||
                position.row === this.height - 1 ||
                position.col === 0 ||
                position.col === this.width - 1) {
                type = CellType_1.CellType.Wall;
            }
            else if (position.row % 2 === 0 ||
                position.col % 2 === 0) {
                type = CellType_1.CellType.ClosedDoor;
            }
            return type;
        });
    }
}
exports.Maze = Maze;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Grid {
    constructor(rows, cols, valueFactory = () => undefined) {
        this._cells = {};
        this._rows = rows;
        this._cols = cols;
        this._length = rows * cols;
        for (let row = 0; row < this._rows; row += 1) {
            for (let col = 0; col < this._cols; col += 1) {
                const position = {
                    col,
                    row
                };
                this._cells[this.createIndex(position)] = {
                    position,
                    value: valueFactory(position)
                };
            }
        }
    }
    get length() {
        return this._length;
    }
    get cols() {
        return this._cols;
    }
    get rows() {
        return this._rows;
    }
    setCell(position, value) {
        const cell = this.getCell(position);
        if (cell === undefined) {
            throw new Error(`Not existing cell at position row: ${position.row} and col: ${position.col}`);
        }
        cell.value = value;
    }
    getCell(position) {
        const index = this.createIndex(position);
        return this._cells[index];
    }
    isValidPosition(position) {
        const index = this.createIndex(position);
        return this._cells[index] !== undefined;
    }
    *getRow(row) {
        for (let col = 0; col < this._cols; col += 1) {
            yield this.getCell({
                col,
                row
            });
        }
    }
    *getCol(col) {
        for (let row = 0; row < this._rows; row += 1) {
            yield this.getCell({
                col,
                row
            });
        }
    }
    *getCells() {
        for (let row = 0; row < this._rows; row += 1) {
            for (let col = 0; col < this._cols; col += 1) {
                yield this.getCell({
                    col,
                    row
                });
            }
        }
    }
    createIndex(position) {
        return `${position.row}-${position.col}`;
    }
}
exports.Grid = Grid;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function random(min, max) {
    const diff = max - min;
    if (diff <= 0) {
        throw new Error(`Diff between max (${max}) and min (${min}) must be larger then 0 (${diff})`);
    }
    return min + Math.round(Math.random() * diff);
}
exports.random = random;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CellType_1 = __webpack_require__(0);
const startDirection_1 = __webpack_require__(1);
const Path_1 = __webpack_require__(13);
function findStart(maze) {
    const row = 0;
    for (let col = 0; col < maze.width; col += 1) {
        const cell = maze.getCell({
            col,
            row
        });
        if (CellType_1.isEntrance(cell)) {
            return cell;
        }
    }
}
function solve(maze) {
    const path = new Path_1.Path();
    const start = findStart(maze);
    const direction = startDirection_1.startDirection(start.value.position, maze.width, maze.height);
    const room = maze.nextCell(start, direction);
    function findPath(currentCell, currentDirection) {
        const possibilities = maze.getPossibilities(currentCell, currentDirection);
        for (const possibility of possibilities) {
            if (CellType_1.isExit(possibility.door)) {
                path.add(possibility.door);
                if (CellType_1.isRoom(possibility.room)) {
                    path.add(possibility.room);
                }
                return true;
            }
        }
        for (const possibility of possibilities) {
            if (CellType_1.isOpenDoor(possibility.door) &&
                path.has(possibility.door) === false &&
                CellType_1.isRoom(possibility.room) &&
                path.has(possibility.room) === false) {
                path.add(possibility.door);
                path.add(possibility.room);
                if (findPath(possibility.room, possibility.direction)) {
                    return true;
                }
            }
        }
        return false;
    }
    path.add(start);
    path.add(room);
    findPath(room, direction);
    return path;
}
exports.solve = solve;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Maybe_1 = __webpack_require__(2);
const equalPosition_1 = __webpack_require__(14);
class Path {
    constructor() {
        this._cells = [];
    }
    get length() {
        return this._cells.length;
    }
    findByPosition(position, maxIndex) {
        const cell = this._cells.find((b, index) => {
            return (maxIndex === undefined || maxIndex >= index) && equalPosition_1.equalPosition(position, b.value.position);
        });
        if (cell === undefined) {
            return Maybe_1.Maybe.none();
        }
        return cell;
    }
    has(cell) {
        return this._cells.find((b) => {
            return equalPosition_1.equalPosition(cell.value.position, b.value.position);
        }) !== undefined;
    }
    add(cell) {
        this._current = cell;
        this._cells.push(cell);
    }
    get(index) {
        return this._cells[index];
    }
}
exports.Path = Path;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function equalPosition(a, b) {
    return (a.row === b.row &&
        a.col === b.col);
}
exports.equalPosition = equalPosition;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CellType_1 = __webpack_require__(0);
const NEW_LINE = "\n";
class AsciiRenderer {
    constructor(matrix) {
        this._maze = matrix;
        this._element = window.document.createElement('pre');
        this._element.setAttribute('style', 'line-height: 0.6; padding: 5px;');
    }
    render(parent) {
        let text = '';
        let row = 0;
        for (const cell of this._maze.getCells()) {
            if (cell.position.row !== row) {
                text += NEW_LINE;
                row = cell.position.row;
            }
            if (cell.value === CellType_1.CellType.ClosedDoor || cell.value === CellType_1.CellType.Wall) {
                text += '*';
            }
            else {
                text += ' ';
            }
        }
        this._element.innerText = text;
        parent.appendChild(this._element);
    }
    plot(path) {
        let index = 0;
        const draw = () => {
            if (index >= path.length) {
                return;
            }
            let text = '';
            let row = 0;
            for (const cell of this._maze.getCells()) {
                const p = path.findByPosition(cell.position, index);
                if (cell.position.row !== row) {
                    text += NEW_LINE;
                    row = cell.position.row;
                }
                if (p.hasValue()) {
                    text += '0';
                }
                else if (cell.value === CellType_1.CellType.ClosedDoor || cell.value === CellType_1.CellType.Wall) {
                    text += '*';
                }
                else {
                    text += ' ';
                }
            }
            this._element.innerText = text;
            index += 1;
            window.setTimeout(draw, 50);
        };
        draw();
    }
}
exports.AsciiRenderer = AsciiRenderer;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CellType_1 = __webpack_require__(0);
class CanvasRenderer {
    constructor(maze, options) {
        this._maze = maze;
        this._options = options;
        this._canvas = window.document.createElement('canvas');
        this._canvas.setAttribute('width', String(this.getX(this._maze.width)));
        this._canvas.setAttribute('height', String(this.getY(this._maze.height)));
        this._context = this._canvas.getContext('2d');
    }
    render(parent) {
        for (const cell of this._maze.getCells()) {
            const x = this.getX(cell.position.col);
            const y = this.getY(cell.position.row);
            const width = cell.position.col % 2 === 1 ? this._options.roomWidth : this._options.wallWidth;
            const height = cell.position.row % 2 === 1 ? this._options.roomHeight : this._options.wallHeight;
            let color;
            if (cell.value === CellType_1.CellType.Wall || cell.value === CellType_1.CellType.ClosedDoor) {
                color = this._options.wallColor;
            }
            else {
                color = this._options.roomColor;
            }
            this.drawRectangle(x, y, width, height, color);
        }
        parent.appendChild(this._canvas);
    }
    plot(path) {
        let index = 0;
        const draw = () => {
            if (index >= path.length) {
                return;
            }
            const m = path.get(index);
            const cell = m.value;
            const x = this.getX(cell.position.col);
            const y = this.getY(cell.position.row);
            const width = cell.position.col % 2 === 1 ? this._options.roomWidth : this._options.wallWidth;
            const height = cell.position.row % 2 === 1 ? this._options.roomHeight : this._options.wallHeight;
            const color = this._options.pathColor;
            this.drawRectangle(x, y, width, height, color);
            index += 1;
            window.setTimeout(draw, this._options.speed);
        };
        draw();
    }
    getX(col) {
        const wallCount = this.getWallCount(col);
        const pathCount = this.getPathCount(col);
        return (wallCount * this._options.wallWidth) + (pathCount * this._options.roomWidth);
    }
    getY(row) {
        const wallCount = this.getWallCount(row);
        const pathCount = this.getPathCount(row);
        return (wallCount * this._options.wallHeight) + (pathCount * this._options.roomHeight);
    }
    getWallCount(unit) {
        return Math.ceil(unit / 2);
    }
    getPathCount(unit) {
        return Math.floor(unit / 2);
    }
    drawRectangle(x, y, width, height, color) {
        this._context.beginPath();
        this._context.rect(x, y, width, height);
        this._context.fillStyle = color;
        this._context.fill();
    }
}
exports.CanvasRenderer = CanvasRenderer;


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map