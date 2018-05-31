import Vue from 'vue'

Vue.filter('capitalize', function (value) {
  this.value = value.charAt(0).toUpperCase() + value.toLowerCase().slice(1)
})
