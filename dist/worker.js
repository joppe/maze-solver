importScripts(
    'vendor/es6-module-loader/dist/es6-module-loader.js',
    'vendor/system.js/dist/system.js',
    'system.conf.js'
);

self.addEventListener('message', function (message) {
    System.import('./' + message.data.file).then(function() {
        // Success
    }).catch(function(error) {
        console.error(error)
    });
});