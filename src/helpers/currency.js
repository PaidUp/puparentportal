import numeral from 'numeral'

export default function currency (value) {
  return numeral(value).format('0,0.00')
};
