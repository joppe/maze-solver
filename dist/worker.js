importScripts(
    'vendor/es6-module-loader/dist/es6-module-loader.js',
    'vendor/system.js/dist/system.js',
    'system.conf.js'
);

/**
 * 1. To be able to call the constructor with apply use the following:
 * Function.bind.apply(CLASS, [bind_context, arg1, arg2...])
 *
 * The CLASS is used for the apply context, so the bind function is executed with the CLASS context.
 * In this way the bind is called on the constructor function of the CLASS.
 * The array argument is passed to the bind call, the first item in the array is the context for the bound function
 * (the constructor), for a constructor function this value has no effect. The rest of the items is used for the
 * constructor function.
 *
 * @see http://stackoverflow.com/questions/10594957/binding-applying-constructors-in-javascript
 */

var getInstance;

getInstance = (function (context) {
    'use strict';

    var pool = {};

    return function (file, className, args) {
        return new Promise(function (resolve, reject) {
            if (undefined !== pool[file]) {
                resolve(pool[file]);
            } else {
                Promise.all([
                    System.import('./webworkers/Workable.js'),
                    System.import(file)
                ]).then(function (modules) {
                    var Class,
                        worker;

                    if (modules[1][className].prototype instanceof modules[0].Workable) {
                        Class = modules[1][className];

                        // [1]
                        args.unshift(null);

                        /** @var {Workable} worker */
                        worker = new (Function.bind.apply(Class, args))();
                        worker.onPostMessage(function (message) {
                            context.postMessage(message);
                        });

                        pool[file] = worker;

                        resolve(pool[file]);
                    } else {
                        reject('Module name "' + className + '" does not implement Workable');
                    }
                }).catch(reject);
            }
        });
    };
})(this);

this.addEventListener('message', function (message) {
    'use strict';

    getInstance(message.data.file, message.data.className, message.data.args).then(function (worker) {
        worker.handleMessage(message.data.message);
    }).catch(function (error) {
        console.log(error);
    });
});