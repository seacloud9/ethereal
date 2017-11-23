/**
 * Created by brsmith on 7/3/17.
 */
const path = require('path')
const webpack =  require('webpack')
var WebpackStrip = require('webpack-strip')
const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = {
    context: __dirname + '/src',

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new WebpackAssetsManifest({
            output: '../public/asset-manifest.json',
            merge: true
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
                test: /\.js$/, 
                loader: WebpackStrip.loader('debug', 'console.log') 
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            
            {
                test: require.resolve('latest-createjs'),
                loader: 'imports?this=>window!exports?window.createjs'
              }
            

        ]
    }
}
