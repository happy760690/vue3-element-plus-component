import { App } from 'vue'
import editor from './src/index.vue'

// 让组件可以通过use的形式使用
export default {
  install(app: App) {
    app.component('el-editor', editor)
  }
}