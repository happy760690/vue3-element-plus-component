export interface TableOptions {
  // 表头
  label: string,
  // 字段名称
  prop?: string,
  // 列宽
  width?: string | number,
  // 对齐方式
  align?: 'left' | 'center' | 'right',
  // 自定义列模板名称
  slot?: string,
  // 是否有操作项
  action?: boolean,
  // 是否是可编辑的单元格
  editable?: boolean,
}