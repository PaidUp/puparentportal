import moment from 'moment-timezone'

const formatStr = 'MM/DD/YYYY'

export const formatDate = (value) => {
  if (!value) return moment().format(formatStr)
  if (typeof value === 'number') return moment.unix(value).format(formatStr)
  return moment(value).format(formatStr)
}

export const localFormatDate = (value) => {
  if (!value) return value
  const ltz = moment.tz.guess()
  return moment.tz(value, ltz).format(formatStr)
}

export const removeTimeZone = (value) => {
  if (!value) return value
  const ltz = moment.tz.guess()
  const str = moment.tz(value, ltz).format('YYYY-MM-DD')
  const res = moment.utc(str.substring(0, 10)).add(16, 'hours')
  return res
}
