const path = require( 'path' );
const webpack = require( 'webpack' );
const { VueLoaderPlugin } = require( 'vue-loader' );

const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
    mode: 'development',
  
    entry: {
        app: './src/assets/js/app.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve( __dirname, 'src/assets/js/bundles' ),
        publicPath: '/assets/js/bundles/'
    },
    
    resolve:  {
        modules: [
            'node_modules',
            path.resolve( __dirname, 'src/assets/js/components' ),
            path.resolve( __dirname, 'src/assets/js' ),
            path.resolve( __dirname, 'src/assets' )
        ],
        
        extensions: [ '.js', '.vue' ],
        
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    compress: true,
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            } )
        ]
    },
    
    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin( {
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            jQuery: 'jquery'
        } )
    ]
};