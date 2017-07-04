/**
 * Created by brsmith on 7/3/17.
 */
const path = require('path');

module.exports = {
    context: __dirname + "/src",

    entry: {
        javascript: "./index.js",
        html: "../public/index.html",
    },

    output: {
        filename: "app.js",
        path: __dirname + "/build",
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
                loaders: ["react-hot", "babel-loader"],
                loader: "babel",
                query: {
                        presets:['es2015', 'react']
                    }
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]",
            }

        ],
    },
}