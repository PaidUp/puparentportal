import formatPhone from './formatPhone'
import currency from '../helpers/currency'

export default (Vue) => {
  Vue.filter('formatPhone', formatPhone)
  Vue.filter('currency', currency)
}
