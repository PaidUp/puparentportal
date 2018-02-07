// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import i18n from '@/i18n'
import FBSignInButton from 'vue-facebook-signin-button'
// eslint-disable-next-line
import fs from '@/vendor/fb'

Vue.use(FBSignInButton)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
  i18n
})
