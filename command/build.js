const path = require('path')
const {defineConfig, build} = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const fsExtra = require('fs-extra')
const fs = require('fs')

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
        name: 'index',
        fileName: 'index',
        // name: 'juan-element-components',
        // fileName: 'juan-element-components', // 打包出来的文件名
        formats: ['es', 'umd'] // 输出格式
      },
      outDir,
    }
  })
}
// 单组件打包
/**
 * 
 * @param {*} name 组件名称
 */
const buildSingle = async (name) => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, name),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd'],
      },
      outDir: path.resolve(outDir, name)
    }
  })
}
// 每个组件生成package.json
const createPackageJson = (name)=>{
  const fileStr = `
  {
    "name": "${name}",
    "main": "index.umd.js",
    "module": "index.es.js",
    "style": "style.css"
  }
  `
  // 输出
  fsExtra.outputFile(
    path.resolve(outDir, `${name}/package.json`),
    fileStr,
    'utf-8'
  )
}

const createInfoFile = (name) => {
  const fileStr = `
  // 提示使用组件库的项目，组件是一个vue插件
  import { App } from 'vue'
  declare const _default: {
    install(app: App): void;
  }
  
  export default _default
  `
  // 输出
  fsExtra.outputFile(
    path.resolve(outDir, `${name}/index.d.ts`),
    fileStr,
    'utf-8'
  )
}

// 打包成库
const buildLib = async () => {
  await buildAll()

  // 获取组件名称组成的数组
  const components = fs.readdirSync(entryDir).filter(name => {
    const componentDir = path.resolve(entryDir, name)
    const isDir = fs.lstatSync(componentDir).isDirectory()
    return isDir && fs.readdirSync(componentDir).includes('index.ts')
  })

  // 循环构建
  for(const name of components) {
    await buildSingle(name)
    createPackageJson(name)
    createInfoFile(name)
  }
}

buildLib()