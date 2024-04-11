import { ref, reactive } from 'vue'
import alovaInstance from '@/utils/alova'

/**
 * 分页列表
 * @param {object} params
 * @param {string} params.queryUrl 接口url
 * @param {object=} params.pagination 初始pagination，可选
 * @param {number=1} params.pagination.pageNum 初始页码，默认1
 * @param {number=10} params.pagination.pageSize 初始每页显示条数，默认10
 */
const usePaginationList = (params) => {
  const { queryUrl = '', method = 'Post', pagination: defaultPagination = {} } = params || {}

  const listData = reactive([])
  const searchParams = reactive({})
  const pagination = reactive({
    pageNum: 1,
    pageNo: 1,
    pageSize: 10,
    ...defaultPagination
  })
  const totalCount = ref(0)
  const loading = ref(false)

  /**
   * @description 切换页码
   * @param {number} page 页码
   */
  const onCurrentChange = (page) => {
    pagination.pageNum = page
    pagination.pageNo = page
    loadData()
  }

  /**
   * @description 切换每页显示数量
   * @param {number} pageSize 每页数量
   */
  const onSizeChange = (pageSize) => {
    pagination.pageSize = pageSize
    pagination.pageNum = 1
    pagination.pageNo = 1
    loadData()
  }

  /**
   * 合并更新 pagination
   * @param {object} newValue pagination
   * @param {number=1} newValue.pageNum 初始页码
   * @param {number=10} newValue.pageSize 初始每页显示条数
   */
  function setPagination(newValue) {
    Object.assign(pagination, newValue)
  }

  /**
   * 更新请求参数
   * 此操作会将当前页码置为1
   * @param {object} newValue 请求参数
   */
  function setSearchParams(newValue) {
    setPagination({
      pageNum: 1,
      pageNo: 1
    })
    for (const key in searchParams) {
      delete searchParams[key]
    }
    Object.assign(searchParams, newValue)
  }

  /**
   * @description 获取列表数据
   */
  function loadData() {
    loading.value = true
    let params = { pageNo: pagination.pageNum, ...pagination, ...searchParams }
    switch (method) {
      case 'Post':
        break
      case 'Get':
        params = { params }
        break
      default:
        break
    }

    alovaInstance[method](queryUrl, params).then((data) => {
      loading.value = false
      const list = data?.lists ?? data?.totalList ?? []
      listData.length = 0
      listData.push(...list)
      totalCount.value = data?.totalCount ?? data?.total ?? 0
    })
  }

  return {
    loading,
    listData,
    pagination,
    totalCount,
    searchParams,
    setPagination,
    setSearchParams,
    onCurrentChange,
    onSizeChange,
    loadData
  }
}

export default usePaginationList
