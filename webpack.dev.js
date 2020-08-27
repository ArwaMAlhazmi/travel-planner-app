const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = merge(common, {
    mode: "development",
    devtool: false,
    devServer: {
        proxy: {
            "/tripDetails": "http://localhost:3000",
        }
    },
    module: {
    	rules: [
    		{
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
    	]
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "main.js"
    },
    plugins: [
    	new webpack.SourceMapDevToolPlugin({
    		filename: '[name].js.map',
    		exclude: ['vendor.js']
    	})
    ]
});