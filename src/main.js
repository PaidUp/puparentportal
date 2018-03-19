// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import i18n from '@/i18n'
import FBSignInButton from 'vue-facebook-signin-button'
import LoadScript from 'vue-plugin-load-script'
// eslint-disable-next-line
import fs from '@/vendor/fb'

// MATERIAL DESIGN COMPONENTS START
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)
// MATERIAL DESIGN COMPONENTS END

Vue.use(LoadScript)
Vue.use(FBSignInButton)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
