System.register(['./Options.js', './MazeImage.js', './Canvas.js'], function (_export) {
    'use strict';

    var Options, MazeImage, Canvas, MazeSolver;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_OptionsJs) {
            Options = _OptionsJs.Options;
        }, function (_MazeImageJs) {
            MazeImage = _MazeImageJs.MazeImage;
        }, function (_CanvasJs) {
            Canvas = _CanvasJs.Canvas;
        }],
        execute: function () {
            MazeSolver = function MazeSolver(options) {
                _classCallCheck(this, MazeSolver);

                MazeImage.fetch(options).then(function (image) {
                    var canvas = new Canvas(image.getWidth(), image.getHeight());

                    image.appendTo(document.body);
                    canvas.appendTo(document.body);

                    canvas.getContext().drawImage(image.getElement(), 0, 0);
                });
            };

            new MazeSolver(new Options());
        }
    };
});