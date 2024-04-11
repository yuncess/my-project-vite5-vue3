import { defineComponent } from 'vue'
import { type PaginationProps } from 'element-plus'

export default defineComponent<PaginationProps>({
  name: 'Pagination',
  setup(props, context) {
    console.log({ ...context })
    const attr = context.attrs
    return () => <el-pagination {...attr} {...props} layout="prev, pager, next" />
  }
})
