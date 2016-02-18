/**
 * @class Canvas
 */
export class Canvas {
    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.el = document.createElement('canvas');

        this.el.setAttribute('width', width);
        this.el.setAttribute('height', height);
    }

    /**
     * @returns {CanvasRenderingContext2D}
     */
    getContext() {
        return this.el.getContext('2d');
    }

    /**
     * @returns {number}
     */
    getWidth() {
        return this.width;
    }

    /**
     * @returns {number}
     */
    getHeight() {
        return this.height;
    }

    /**
     * @param {HTMLElement} target
     * @returns {Canvas}
     */
    appendTo(target) {
        target.appendChild(this.el);

        return this;
    }

    /**
     * @param {Point} point
     * @param {number} width
     * @param {number} height
     * @returns {CanvasPixelArray}
     */
    getImageData(point, width, height) {
        let imageData = this.getContext().getImageData(point.x, point.y, width, height);

        return imageData.data;
    }

    /**
     * @param {Point} point
     * @param {number} width
     * @param {number} height
     * @param {string} color
     * @returns {Canvas}
     */
    drawRectangle(point, width, height, color) {
        let ctx = this.getContext();

        ctx.beginPath();
        ctx.rect(point.x, point.y, width, height);
        ctx.fillStyle = color;
        ctx.fill();

        return this;
    }
}
