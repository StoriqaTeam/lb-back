const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
    'process.env': {
        'NODE_ENV': `"development"`
    }
});
module.exports = {
    mode: 'development',
    entry: ['webpack-dev-server/client?http://0.0.0.0:443',
        'webpack/hot/only-dev-server', // WebpackDevServer host and port
        // "only" prevents reload on syntax errors
        "./src/index.js"
    ],
    devtool: "inline-source-map",
    devServer: {
        port: 443,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:443",
            "Access-Control-Allow-Credentials": "true"
        }
    },
    resolve: {
        extensions: [".jsx", ".js", ".css"]
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ["react"]
                }
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /views/],
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ["style-loader", 'css-loader']
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                loader: 'file-loader'
            },
              {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
            new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "footer"
        }),
        new ScriptExtHtmlWebpackPlugin(),
        devFlagPlugin
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: '/'
    }
};