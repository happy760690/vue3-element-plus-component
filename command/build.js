const path = require('path')
const {defineConfig, build} = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

// 打包入口文件夹
const entryDir = path.resolve(__dirname, '../packages')
// 出口文件夹
const outDir = path.resolve(__dirname, '../lib')

// vite基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
})

// rollup配置
const rollupOptions = {
  // 不想打包进去的依赖项
  externals: ['vue'],
  output: {
    // 在umd模式下为外部化的依赖提供一个全局变量
    globals: {
      vue: 'vue'
    }
  }
}

// 全量打包构建
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'juan-element-components',
        fileName: 'juan-element-components', // 打包出来的文件名
        formats: ['es', 'umd'] // 输出格式
      },
      outDir,
    }
  })
}
// 打包成库
const buildLib = async () => {
  await buildAll()
}

buildLib()