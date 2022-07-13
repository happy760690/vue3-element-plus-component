import { App } from "vue";
import chooseArea from './chooseArea'
import chooseIcon from './chooseIcon'
import trend from './trend'
import notification from './notification'
import list from './list'
import menu from './menu'
import progress from './progress'
import chooseTime from './chooseTime'
import chooseDate from './chooseDate'
import chooseCity from './chooseCity'
import form from './form'
import editor from './editor'
import uploadFile from './uploadFile'
import modalForm from './modalForm'
import table from './table'
import calendar from './calendar'
import * as Icons from '@element-plus/icons-vue'

const components = [
  calendar,
  table,
  modalForm,
  uploadFile,
  editor,
  form,
  chooseArea,
  chooseIcon,
  trend,
  notification,
  list,
  menu,
  progress,
  chooseTime,
  chooseDate,
  chooseCity,
]

export default { 
  install(app: App) {
    // 全局注册图标  会牺牲一点性能
    for(const [key, component] of Object.entries(Icons)) {
      app.component(key, component)
      // app.component(`el-icon${toLine(key)}`, component)
    }

    components.map(item => {
      app.use(item)
    })
  }
}