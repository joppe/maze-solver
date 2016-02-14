System.register([], function (_export) {
    'use strict';

    var url, options;

    function post(url, params, success) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            success(this.responseText);
        };
        xhr.send(params.join('&'));
    }

    function get(url, params, success) {
        var xhr = new XMLHttpRequest();
        console.log('GET', url + '?' + params.join('&'));
        xhr.open('GET', url + '?' + params.join('&'), true);
        xhr.onload = function () {
            success(this.responseText);
        };
        xhr.send();
    }

    function getImage(success) {
        var params = [];

        for (var option in options) {
            if (options.hasOwnProperty(option)) {
                params.push(option + '=' + options[option]);
            }
        }

        post(url, params, function (response) {
            var search = response.match(/\<img src="([^\"]*)"[^>]*>/i);

            if (0 < search.length) {
                get('save-image.php', ['url=' + search[1]], function (src) {
                    var image = new Image();
                    image.addEventListener('load', function () {
                        success(image);
                    });
                    image.setAttribute('src', src);
                });
            }
        });
    }

    function createCanvas(width, height) {
        var canvas = document.createElement('canvas');

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        document.body.appendChild(canvas);

        return canvas;
    }

    function isValidPosition(ctx, position) {
        var imageData = ctx.getImageData(position.x, position.y, options.mazecell, options.mazecell),
            data = imageData.data;

        for (var i = 0, n = data.length; i < n; i += 4) {
            var red = data[i],
                green = data[i + 1],
                blue = data[i + 2];

            if (options.pathr !== red || options.pathg !== green || options.pathb !== blue) {
                return false;
            }
        }

        return true;
    }

    function draw(ctx, position) {
        ctx.beginPath();
        ctx.rect(position.x, position.y, options.mazecell, options.mazecell);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    }

    function solve(ctx) {
        var position = { x: 0, y: 0 };

        console.log(isValidPosition(ctx, position));
        draw(ctx, position);
        //ctx.save();
        //ctx.restore();
    }

    return {
        setters: [],
        execute: function () {
            url = 'proxy.php';
            options = {
                mazewidth: 50,
                mazehight: 30,
                mazecell: 6,
                mazewall: 2,
                lengthfactor: 5,
                wallr: 0,
                wallg: 0,
                wallb: 0,
                pathr: 255,
                pathg: 255,
                pathb: 255
            };
            getImage(function (image) {
                var canvas = createCanvas(image.naturalWidth, image.naturalHeight),
                    ctx = canvas.getContext('2d');

                ctx.drawImage(image, 0, 0);

                solve(ctx);
            });
        }
    };
});