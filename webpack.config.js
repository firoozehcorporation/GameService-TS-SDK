const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: "./src/index.ts",
    devtool: 'source-map',
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    output: {
        filename: "gameservice-sdk.js",
        path: path.resolve(__dirname, "prod"),
        libraryTarget: 'umd',
        library: 'gameservice-sdk',
        umdNamedDefine: true
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         minimize: true,
    //         sourceMap: true,
    //         include: /\.min\.js$/,
    //     })
    // ],
    // module: {
    //     loaders: [{
    //         test: /\.tsx?$/,
    //         loader: 'awesome-typescript-loader',
    //         exclude: /node_modules/,
    //         query: {
    //             declaration: false,
    //         }
    //     }]
    // }
};