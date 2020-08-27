const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/client/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use:{
                    loader:"file-loader",
                    options:{
                        name: "[name].[ext]",
                        outputPath: "assets/imgs"
                    }
                }
            },
            {
                test: /\.mp4$/,
                use:{
                    loader:"file-loader",
                    options:{
                        name: "[name].[ext]",
                        outputPath: "assets/vids"
                    }
                }
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: "[name].[ext]",
                    outputPath: 'assets/fonts'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        })
    ]
};