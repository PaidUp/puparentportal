import moment from 'moment-timezone'

const formatStr = 'MM/DD/YYYY'

export const formatDate = (value) => {
  console.log('into cal')
  if (!value) return moment().format(formatStr)
  if (typeof value === 'number') return moment.unix(value).format(formatStr)
  return moment(value).format(formatStr)
}
