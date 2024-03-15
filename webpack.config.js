const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const DashboardPlugin = require('webpack-dashboard/plugin');

const devMode = process.env.NODE_ENV !== "production";

plugins = [ 
    new MiniCssExtractPlugin({ filename: "styles.css" }), 
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
]

// if (process.env.NODE_ENV === 'production') {
//     module.exports.plugins.push(
//         new webpack.optimize.TerserPlugin()
//     )
// }

let config = {
    mode: "development",
	// entry: './src/index.js',
    entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, './public'),
		filename: './bundle.js'
	},
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    // plugins: [
    //     new MiniCssExtractPlugin({
    //         // Options similar to the same options in webpackOptions.output
    //         // both options are optional
    //         // filename: "[name].css",
    //         filename: "styles.css",
    //         // chunkFilename: "[id].css",
    //     }),
    // ],
    plugins,
    devtool: "source-map",
    // devServer: {
    //    static: './public',
    //    hot: true,
    //},
    devServer: {
        // contentBase: path.resolve(__dirname, "./public"),
        historyApiFallback: true,
        open: true,
        hot: true
    },
	module: {
		rules: [
			// {
			// 	test: /\.js$/i,
			// 	exclude: /node_modules/,
			// 	loader: 'babel-loader'
			// },
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // https://webpack.js.org/loaders/postcss-loader/#autoprefixer
			{
				test: /\.(sa|sc|c)ss$/,
                use: [
                    // fallback to style-loader in development
                    // Config initiale pour fallback mais ne fonctionne pas
                    // devMode 
                    // ? "style-loader"
                    // : MiniCssExtractPlugin.loader, 
                    MiniCssExtractPlugin.loader,
                    // utilisation des sourceMaps pour tous les loaders
                    { loader: "css-loader", options: { sourceMap: true } }, 
                    { loader: "sass-loader", options: { sourceMap: true } }, 
                    { loader: "postcss-loader", options: { sourceMap: true } }
                ],
			}
		]
	},
    optimization: {
        minimize: false,
        minimizer: [],
    }
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new TerserPlugin({
    //             test: /\.js(\?.*)?$/i,
    //             minify: TerserPlugin.uglifyJsMinify,
    //             // `terserOptions` options will be passed to `uglify-js`
    //             // Link to options - https://github.com/mishoo/UglifyJS#minify-options
    //             terserOptions: {},
    //         }),
    //     ],
    // },
};

// cette instruction implique d'enlever l'option d'optimisation
// dans la config du module webpack
if (!devMode) {
    config.optimization.minimize = true
    config.optimization.minimizer = [
        new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            minify: TerserPlugin.uglifyJsMinify,
            // `terserOptions` options will be passed to `uglify-js`
            // Link to options - https://github.com/mishoo/UglifyJS#minify-options
            terserOptions: {},
        }),
        new CssMinimizerPlugin({
            minify: CssMinimizerPlugin.parcelCssMinify,
        })
    ]
}

// console.log(config)

module.exports = config;
