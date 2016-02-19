let worker = new Worker('dist/worker.js');

worker.addEventListener('message', (ev) => {
    console.log(ev);
}, false);
worker.postMessage({
    file: 'Foo.js',
    data: "Lorem ipsum"
});