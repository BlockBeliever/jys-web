// vue.config.js
const path = require('path');

const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const zlib = require('zlib')


const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',  // 公共路径
	indexPath: 'index.html' , // 相对于打包路径index.html的路径
	outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
	assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
	lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
	runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
	productionSourceMap: !IS_PROD, // 生产环境的 source map
	
	css: {
		extract: IS_PROD,
		requireModuleExtension: true,
		loaderOptions: {
			// 给 less-loader 传递 Less.js 相关选项
			less: {
				// `globalVars` 定义全局对象，可加入全局变量
				globalVars: {
						primary: '#333'
				}
			}
		}
	},
	devServer: {
		overlay: { // 让浏览器 overlay 同时显示警告和错误
			warnings: true,
			errors: true
		},
		host: "0.0.0.0",
		port: 8080, // 端口号
		https: false, // https:{type:Boolean}
		open: false, // 配置自动启动浏览器
		hotOnly: true, // 热更新
		// proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
		// proxy: { //配置多个跨域
		// 	"/index": {
		// 		target: "http://172.11.11.11:7071",
		// 		changeOrigin: true,
		// 		// ws: true,//websocket支持
		// 		secure: false,
		// 		pathRewrite: {
		// 				"^/index": "/"
		// 		}
		// 	}
		// }
	},
	configureWebpack: {
		resolve: {
		  alias: {
			'@': path.resolve(__dirname, './src'),
			'@i': path.resolve(__dirname, './src/assets'),
		  }
		},
		
		plugins: [
		  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		  // 下面两项配置才是 compression-webpack-plugin 压缩配置
		  // 压缩成 .gz 文件
		  new CompressionPlugin({
			filename: '[path][base].gz',
			algorithm: 'gzip',
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		  }),
		  // 压缩成 .br 文件，如果 zlib 报错无法解决，可以注释这段使用代码，一般本地没问题，需要注意线上服务器会可能发生找不到 zlib 的情况。
		  new CompressionPlugin({
			filename: '[path][base].br',
			algorithm: 'brotliCompress',
			test: /\.(js|css|html|svg)$/,
			compressionOptions: {
			  params: {
				[zlib.constants.BROTLI_PARAM_QUALITY]: 11
			  }
			},
			threshold: 10240,
			minRatio: 0.8
		  }),
		  
		  
		],
		// 开启分离 js
		optimization: {
		  runtimeChunk: 'single',
		  splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 20000,
			cacheGroups: {
			  vendor: {
				test: /[\\/]node_modules[\\/]/,
				name (module) {
				  // get the name. E.g. node_modules/packageName/not/this/part.js
				  // or node_modules/packageName
				  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
				  // npm package names are URL-safe, but some servers don't like @ symbols
				  return `npm.${packageName.replace('@', '')}`
				}
			  }
			}
		  }
		}
	  }


}