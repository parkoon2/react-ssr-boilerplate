const path = require("path");
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    name: "boilerpate",
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
        vendor: [
            'react',
            'react-dom',
            'react-router-dom'
        ],
        app: [path.join(__dirname, '../client/src/index.js')]
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
    output: {
        path: path.resolve(__dirname, "../server/public"),
        filename: "[name].[hash].js",
        chunkFilename: "[name].[chunkhash].chunk.js",
    },

    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial'
        }
    },
    // development 환경에서만 실행되어야함!
    // production 에서 실행해도 되지만, 변경 사항이 적용되는데 시간이 오래걸림.
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../client/public/index.html"),
            filename: "index.html"
        }),
        // CSS 파일이 방대해지면 자바스크립트 파일에서 분리하는 것이 효율적일 수 있다.
        // bundle.js에 포함시키지 말고, 별도의 css 파일로 분리해서 하나의 파일로 번들링하자.
        new MiniCssExtractPlugin({
            // output 경로에 생성된다.
            filename: 'style.css'
        }),
    ],

    // development 환경에서만 실행되어야함!
    // production 에서 실행해도 되지만, 변경 사항이 적용되는데 시간이 오래걸림.
    devServer: {
        contentBase: path.resolve(__dirname, '../client/public'),
        // 전체 페이지 리로딩
        inline: true,
        // 부분 리로딩
        hot: true,
        host: 'localhost',
        port: 5500,
        // Enable gzip compression of generated files.
        compress: true,
        // It is important to tell WebpackDevServer to use the same "root" path
        // as we specified in the config. In development, we always serve from /.
        publicPath: '/',
        historyApiFallback: true,
    },

}