/**
 * Created by brsmith on 7/3/17.
 */
const path = require('path')
const webpack =  require('webpack')

module.exports = {
    context: __dirname + '/src',

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],

    entry: {
        javascript: './index.js',
        html: '../public/index.html'
    },

    output: {
        filename: 'app.js',
        path: __dirname + '/public/js'
    },

    devServer: {
        contentBase: 'public'
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        root: path.resolve(__dirname, './src/')
    },

    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader'],
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            }

        ]
    }
}
