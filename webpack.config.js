var path = require('path');
var webpack = require('webpack');
var sassloader = 'style-loader!css-loader!sass-loader?sourceMap=true';

module.exports = {
    entry: './src/NodeGarden.js',
    output: {
        filename: 'NodeGarden.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/'
    },
    module: {
        rules: [
            { test: /\.js$/, include: path.resolve(__dirname, 'src'), loader: 'babel-loader' },
            { test: /\.scss$/, include: path.resolve(__dirname, 'src'), loader: sassloader }
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.scss']
    },
    devServer: {
        port: 3000
    }    
}