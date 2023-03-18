const path = require('path');
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './scripts/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new Webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: true,
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                        // Prefer `dart-sass`
                        implementation: require("sass"),
                        },
                    },
                ],
            },
        ]
    },
    devServer: {
        static: {
            publicPath: path.join(__dirname, 'dist')
        },
        port: 3000,
        liveReload: true,
        compress: true,
        hot: false,
    }
}