import formatPhone from './formatPhone'
import currency from '../helpers/currency'
import { formatDate, localFormatDate } from '../helpers/formatDate'

export default (Vue) => {
  Vue.filter('formatPhone', formatPhone)
  Vue.filter('currency', currency)
  Vue.filter('formatDate', formatDate)
  Vue.filter('localFormatDate', localFormatDate)
}
