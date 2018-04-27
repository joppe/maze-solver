const path = require('path');
const config = {
    devtool: 'source-map',

    devServer: {
        port: 9000
    },

    entry: [
        './src/main.ts',
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },

            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname, 'src')
        },
        extensions: [
            '.js', '.ts', '.tsx'
        ]
    }
};

module.exports = config;
