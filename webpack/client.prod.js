const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: {
        vendor: [
            'react',
            'react-dom',
            'react-router-dom'
        ],
        app: [path.join(__dirname, '../client/src/index.js')]
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, "../server/public"),
        filename: "js/[name].bundle.js",
        // publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: "/node_modules",
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                // 오른쪽에서 왼쪽으로 순으로 실행된다. 순서에 유의!
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: [
                            // Fix and adjust for known flexbox issues
                            // See https://github.com/philipwalton/flexbugs
                            require('postcss-flexbugs-fixes'),


                            // Transpile stage-3 CSS standards based on browserslist targets.
                            // See https://preset-env.cssdb.org/features for supported features.
                            // Includes support for targetted auto-prefixing.
                            require('postcss-preset-env')({
                                autoprefixer: true,
                                stage: 3,
                                features: { 'custom-properties': false }
                            }),
                        ]
                    }
                },
                ]
            },
            {
                test: /\.scss$/,
                // 실제로 scss 파일을 css로 트랜스파일링 하는것은 node-sass 모듈이다.
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                // Fix and adjust for known flexbox issues
                                // See https://github.com/philipwalton/flexbugs
                                require('postcss-flexbugs-fixes'),


                                // Transpile stage-3 CSS standards based on browserslist targets.
                                // See https://preset-env.cssdb.org/features for supported features.
                                // Includes support for targetted auto-prefixing.
                                require('postcss-preset-env')({
                                    autoprefixer: true,
                                    stage: 3,
                                    features: { 'custom-properties': false }
                                }),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    name: '[hash].[ext]',
                    limit: 10000,
                    esModule: false,
                    // outputPath: 'images/'
                },
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    extractComments: 'all',
                    compress: {
                        drop_console: true,
                    },
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            name: 'vendor',
            chunks: 'initial'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../client/public/index.html"),
            filename: "index.html"
        }),

        new MiniCssExtractPlugin({
            // output 경로에 생성된다.
            filename: 'style.css'
        }),
        new CleanWebpackPlugin(),

    ],
};