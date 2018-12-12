import numeral from 'numeral'

export default function currency (value) {
  if (!value) return '0.00'
  return numeral(value).format('0,0.00')
}
