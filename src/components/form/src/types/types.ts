import { CSSProperties } from "vue";
import { RuleItem } from "./rule";

// 表单每一项的配置选项
export interface FormOptions {
  // 表单项显示元素
  type: 'autocomplete' | 'text' | 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button'
  | 'color-picker' | 'date-picker' | 'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' | 'rate' | 'select' | 'select'
  | 'select' | 'option' | 'slider' | 'switch' | 'time-picker' | 'time-select' | 'transfer'
  | 'upload',
  // 表单项的值
  value?: any,
  // 表单项label
  label?: string,
  // 表单项的标识
  prop?: string,
  // 表单验证规则
  rules?: RuleItem[],
  // 表单项占位符
  placeholder?: string,
  // 表单元素特有的属性
  attrs?: {
    style?: CSSProperties,
    clearable?: boolean,
    showPassword?: boolean,
    disabled?: boolean,
  },
  // 表单项的子元素
  children?: FormOptions[],
  uploadAttrs?:{
    action: string,
    headers?: object,
    method?: 'put' | 'post' | 'patch',
    multiple?: boolean,
    data?: any,
    name?: string,
    withCredentials?: boolean,
    showFileList?: boolean,
    drag?: boolean,
    accept?: string,
    thumbnailMode?: boolean, 
    fileList?: any[],
    listType?: "text" | "picture" | "picture-card",
    autoUpload?: boolean,
    disabled?: boolean,
    limit?: number,
  }
}