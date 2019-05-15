var path = require('path');

module.exports = {
        mode: 'production',
        entry: './src/index.js',
        output: {
                path: path.resolve(__dirname, 'build'),
                filename: 'index.js',
                libraryTarget: 'commonjs2'
        },
        module: {
                rules: [
                        {
                                test: /\.js$/,
                                include: path.resolve(__dirname, 'src'),
                                exclude: /(node_modules|bower_components|build)/,
                                use: {
                                        loader: 'babel-loader'
                                }
                        },
                        {
                                test: /\.(png|svg|jpg|gif)$/i,
                                use: {
                                        loader: "url-loader",
                                },
                        }
                ]
        },
        externals: {
                'react': 'commonjs react'
        }
};