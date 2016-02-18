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
     * @param {Point} position
     * @param {number} width
     * @param {number} height
     * @returns {CanvasPixelArray}
     */
    getImageData(position, width, height) {
        let imageData = this.getContext().getImageData(position.x, position.y, width, height);

        return imageData.data;
    }

    /**
     * @param {Point} position
     * @param {number} width
     * @param {number} height
     * @param {string} color
     * @returns {Canvas}
     */
    drawRectangle(position, width, height, color) {
        let ctx = this.getContext();

        ctx.beginPath();
        ctx.rect(position.x, position.y, width, height);
        ctx.fillStyle = color;
        ctx.fill();

        return this;
    }

    /**
     * @param {HTMLImageElement} image
     * @param {Point} position
     * @returns {Canvas}
     */
    drawImage(image, position) {
        let ctx = this.getContext();

        ctx.drawImage(image, position.x, position.y);

        return this;
    }
}
