import dayjs from 'dayjs'

/**
 * @description 格式化时间，默认格式：YYYY-MM-DD HH:mm:ss
 */
export const formatDate = (value, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  if (!value) {
    return '-'
  }
  return dayjs(value).format(fmt)
}
