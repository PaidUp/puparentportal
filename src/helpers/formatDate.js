import moment from 'moment-timezone'

const formatStr = 'MM/DD/YYYY'

export const formatDate = (value) => {
  if (!value) return moment().format(formatStr)
  if (typeof value === 'number') return moment.unix(value).format(formatStr)
  return moment(value).format(formatStr)
}

export const removeTimeZone = (value) => {
  if (!value) return value
  const ltz = moment.tz.guess()
  const str = moment.tz(value, ltz).format().substring(0, 10)
  const res = moment.utc(str).add(16, 'hours')
  return res
}
