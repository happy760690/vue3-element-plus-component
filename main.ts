import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import { toLine } from './utils'
// import mUI from './components'
import mUI from './lib/index.es'
import './lib/style.scss' 
// 单组件引入
// import chooseIcon from './lib/chooseIcon/index.es'
// import './lib/chooseIcon/style.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
.use(mUI)
// .use(chooseIcon)

app.mount('#app')
// createApp(App).mount('#app')
