import moment from 'moment-timezone'

const formatStr = 'MM/DD/YYYY'

export const formatDate = (value) => {
  if (!value) return moment().format(formatStr)
  if (typeof value === 'number') return moment.unix(value).format(formatStr)
  return moment(value).format(formatStr)
}

export const removeTimeZone = (value) => {
  const ltz = moment.tz.guess()
  const str = moment.tz(value, ltz).format().substring(0, 10)
  console.log(`str: `, str)
  const res = moment.tz(str, 'America/Chicago')
  console.log('res: ', res.toDate())
  return res
}
