/**
 * @class Xhr
 */
export class Xhr {
    /**
     * @param {string} url
     * @param {Array} params
     * @returns {Promise}
     */
    static get(url, params) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', `${url}?${params.join('&')}`, true);
            xhr.addEventListener('load', function () {
                resolve(xhr.responseText);
            });
            xhr.addEventListener('error', reject);

            xhr.send();
        });
    }

    /**
     * @param {string} url
     * @param {Array} params
     * @returns {Promise}
     */
    static post(url, params) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.addEventListener('load', () => {
                resolve(xhr.responseText);
            });
            xhr.addEventListener('error', reject);

            xhr.send(params.join('&'));
        });
    }
}