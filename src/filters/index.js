import formatPhone from './formatPhone'

export default (Vue) => {
  Vue.filter('formatPhone', formatPhone)
}
