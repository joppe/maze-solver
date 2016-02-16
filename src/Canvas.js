export class Canvas {
    constructor(width, height) {
        this.width = width;
        this.heigth = height;

        this.el = document.createElement('canvas');

        this.el.setAttribute('width', width);
        this.el.setAttribute('height', height);
    }

    getContext() {
        return this.el.getContext('2d');
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.heigth;
    }

    /**
     * @param {HTMLElement} target
     * @returns {Canvas}
     */
    appendTo(target) {
        target.appendChild(this.el);

        return this;
    }
}