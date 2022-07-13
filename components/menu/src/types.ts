export interface MenuItem {
  // 导航图标
  icon?: string,
  // 处理后的图标
  i?: any,
  // 导航名字
  name: string
  // 导航的标识
  index: string
  // 导航子菜单
  children?: MenuItem[]
}