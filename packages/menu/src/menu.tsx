import {defineComponent, PropType, useAttrs} from 'vue'
import { MenuItem } from './types'
import * as Icons from '@element-plus/icons-vue'
import './styles/index.scss'

export default defineComponent({
  props: {
    // 导航菜单的数据
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
    // 默认选中的菜单
    defaultActive: {
      type: String,
      default: "",
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false,
    },
    // 键名
    // 菜单标题的键名
    name: {
      tnameype: String,
      default: "name",
    },
    // 菜单标识的键名
    index: {
      type: String,
      default: 'index'
    },
    // 图标的键名
    icon: {
      type: String,
      default: 'icon'
    },
    // 子菜单的键名
    children: {
      type: String,
      default: 'children'
    }
  },
  setup(props, ctx) {
    // 封装一个渲染无限层级菜单的方法
    // 函数会返回一个jsx代码
    let renderMenu = (data: any[]) => {
      return data.map((item: any) =>{
        // 每个菜单的图标（假如一些需要处理的属性）
        item.i = (Icons as any)[item[props.icon]!]

        // 单独处理插槽sub-menu
        let slots = {
          title: () => {
            return <>
              <item.i></item.i>
              <span>{ item[props.name] }</span>
            </>
          }
        }
        // 递归渲染children
        if (item[props.children] && item[props.children].length) {
          return (
            <el-sub-menu index={item[props.index]} v-slots={slots}>
              {renderMenu(item[props.children])}
            </el-sub-menu>
          )  
        }
        // 正常渲染普通菜单
        return (
          <el-menu-item index={item[props.index]}>
            <item.i></item.i>
            <span>{ item[props.name] }</span>
          </el-menu-item>
        )

      })
    }
    let attrs = useAttrs()
    return () => {
      return (
        <el-menu 
          class="menu-icon-svg"
          default-active={props.defaultActive}
          router={props.router}
          {...attrs}
        >
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})