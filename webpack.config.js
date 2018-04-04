let path = require('path'),
    fs = require('fs'),
    colors = require('colors'),
    webpack = require('webpack');

const envFile = './.env.js';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin("app.bundle.css");

if (!fs.existsSync(envFile)) {
    console.log('.env.js file does not exists!!!'.red.underline.bold);
    console.log('Please create .env.js file in frontend directory'.blue);
    process.exit();
}

const config = require(envFile);

const API_BASE_URL = config.API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('You must specify API_BASE_URL')
}

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        app: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
            './src/index.js'
        ],
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'API_BASE_URL': JSON.stringify(API_BASE_URL),
        }),
        extractSass
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|sass)$/,
                use: extractSass.extract({
                    use: ["css-loader", "sass-loader"],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.css$/,
                use: extractSass.extract({
                    use: ["css-loader"],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: "assets/[hash].[ext]"
                        }
                    }
                ]
            },
        ]
    }
};