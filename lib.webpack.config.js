const path = require('path');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const APP_DIR = path.resolve(__dirname, 'src', 'phaser3-transitions.js');
const BUILD_DIR = path.resolve(__dirname, 'build');

module.exports = {
    name: "phaser3-transitions",
    mode: "production",
    entry: APP_DIR,
    output: {
            path: BUILD_DIR,
            filename: 'phaser3-transitions.js',
            library: 'phaser3-transitions',
            libraryTarget: 'umd',
    },
    externals : {
        phaser : 'phaser'
    },
    module: {
        rules: [ { test: /\.js$/, use: ['babel-loader'] } ]
    },
    optimization: {
        minimize: true
    },
    //plugins: [
    //    new BundleAnalyzerPlugin()
    //]
}
