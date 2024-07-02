const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        client: {
            logging: 'error',
        },
        compress: true,
        port: 4444,
        open: true,
        watchFiles: ['src/**/*.html'],
        devMiddleware: {
            stats: 'errors-only',
        },
    },
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: '[id].css',
        }),
    ],
};