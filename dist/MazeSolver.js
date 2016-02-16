System.register(['./Options.js', './MazeImage.js', './Canvas.js', './Scanner.js'], function (_export) {
    'use strict';

    var Options, MazeImage, Canvas, Scanner, MazeSolver;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_OptionsJs) {
            Options = _OptionsJs.Options;
        }, function (_MazeImageJs) {
            MazeImage = _MazeImageJs.MazeImage;
        }, function (_CanvasJs) {
            Canvas = _CanvasJs.Canvas;
        }, function (_ScannerJs) {
            Scanner = _ScannerJs.Scanner;
        }],
        execute: function () {
            MazeSolver = (function () {
                function MazeSolver() {
                    _classCallCheck(this, MazeSolver);
                }

                _createClass(MazeSolver, null, [{
                    key: 'solve',
                    value: function solve(options) {
                        MazeImage.fetch(options).then(function (image) {
                            var canvas = new Canvas(image.getWidth(), image.getHeight()),
                                scanner = new Scanner(canvas, options);

                            image.appendTo(document.body);
                            canvas.appendTo(document.body);

                            canvas.getContext().drawImage(image.getElement(), 0, 0);

                            scanner.scan();
                        });
                    }
                }]);

                return MazeSolver;
            })();

            MazeSolver.solve(new Options());
        }
    };
});