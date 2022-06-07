import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from './utils'
import mUI from './components'


const app = createApp(App)

// 全局注册图标  会牺牲一点性能
for(const [key, component] of Object.entries(Icons)) {
  // 注册全局组件
  // console.log(key);
  
  app.component(key, component)
  // console.log(`el-icon${toLine(key)}`);
  
  // app.component(`el-icon${toLine(key)}`, component)
}

app.use(router)
app.use(ElementPlus).use(mUI)
app.mount('#app')
// createApp(App).mount('#app')
