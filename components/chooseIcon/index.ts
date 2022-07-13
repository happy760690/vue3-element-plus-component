import { App } from 'vue'
import chooseIcon from './src/index.vue'

// 让组件可以通过use的形式使用
export default {
  install(app: App) {
    app.component('m-choose-icon', chooseIcon)
  }
}