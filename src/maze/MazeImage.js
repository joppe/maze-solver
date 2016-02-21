import {Xhr} from './../request/Xhr.js';

/**
 * @class MazeImage
 */
export class MazeImage {
    /**
     * @param {HTMLImageElement} el
     */
    constructor(el) {
        this.el = el;
        this.src = el.getAttribute('src');
    }

    /**
     * @returns {number}
     */
    getWidth() {
        return this.el.naturalWidth;
    }

    /**
     * @returns {number}
     */
    getHeight() {
        return this.el.naturalHeight;
    }

    /**
     * @param {HTMLElement} target
     * @returns {MazeImage}
     */
    appendTo(target) {
        target.appendChild(this.el);

        return this;
    }

    /**
     * @returns {HTMLImageElement}
     */
    getElement() {
        return this.el;
    }

    /**
     * @param {Options} options
     * @returns {Promise}
     */
    static fetch(options) {
        return new Promise((resolve) => {
            let params = options.toArray();

            // Submit the form and get the response of the form submission
            Xhr.post('proxy.php', params).then((response) => {
                let search = response.match(/<img src="([^"]*)"[^>]*>/i);

                if (0 < search.length) {
                    // Use the php script to store the maze image local
                    Xhr.get('save-image.php', [`url=${search[1]}`]).then((src) => {
                        MazeImage.createFromSrc(src).then((image) => {
                            resolve(image);
                        });
                    });
                }
            });
        });
    }

    /**
     * @param {string} src
     * @returns {Promise}
     */
    static createFromSrc(src) {
        return new Promise((resolve, reject) => {
            let image = new Image();

            image.addEventListener('load', () => {
                resolve(new MazeImage(image));
            });
            image.addEventListener('error', () => {
                reject();
            });

            image.setAttribute('src', src);
        });
    }
}