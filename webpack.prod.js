const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    module: {
    	rules: [
    		{
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
    	]
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "main.[contentHash].js"
    },
    plugins: [
    	new MiniCssExtractPlugin({filename: "[name].[contentHash].css"}),
     	new CleanWebpackPlugin(),
        new WorkboxPlugin.GenerateSW()
     ]
});