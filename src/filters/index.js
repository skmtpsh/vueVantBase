import dayjs from 'dayjs'
export const FilterTime = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  let momentObj = dayjs(value)
  if (value) {
    return momentObj.format(format)
  }
  return value
}

export default {
  FilterTime
}
