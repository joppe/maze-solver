importScripts(
    'vendor/es6-module-loader/dist/es6-module-loader.js',
    'vendor/system.js/dist/system.js',
    'system.conf.js'
);

self.addEventListener('message', function (message) {
    'use strict';

    System.import('./' + message.data.file).then(function (exports) {
        let properties = Object.getOwnPropertyNames(exports);

        properties.forEach((property) => {
            if (undefined !== exports[property].handleMessage && 'function' === typeof exports[property].handleMessage) {
                let worker = exports[property];

                worker.handleMessage(message.data.data);
            }
        });
    }).catch(function (error) {
        console.error(error)
    });
});