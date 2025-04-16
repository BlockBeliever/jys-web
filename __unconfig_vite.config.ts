
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}

// 设置别名
const alias: Record<string, string> = {
  '/@': pathResolve('src'),
  '@': pathResolve('src'),
  '@build': pathResolve('build')
}
// https://vitejs.dev/config/
const __unconfig_default =  ({ mode }) => defineConfig({
  resolve: { alias },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: [],
      dts: './src/auto-import.d.ts'
    }),
    styleImport({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => {
            if (['show-toast', 'show-loading-toast', 'close-toast', 'show-success-toast', 'show-fail-toast'].includes(name)) {
              return '../es/toast/style'
            } else if (name === 'show-image-preview') {
              return '..//es/image-preview/style'
            } else if (name === 'show-confirm-dialog') {
              return '../es/dialog/style'
            }
            return `../es/${name}/style`
          }
        }
      ],
    }),
    svgLoader(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [pathResolve('src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    Components({
      resolvers: [VantResolver()],
      directoryAsNamespace: true,
    }),
  ],
  base: mode === 'production' ? './' : '/',
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  server: {
    // 是否开启 https
    https: false,
    // 端口号
    port: 3002,
    host: '0.0.0.0',
    // 本地跨域代理
    proxy: {
      '/v1/api': {
        target: loadEnv(mode, process.cwd()).VITE_BASE_API,
        changeOrigin: true,
      }
    },
    watch: {
      usePolling: true,
    }
  }
})


if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;