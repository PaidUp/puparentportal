// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import i18n from '@/i18n'
import FBSignInButton from 'vue-facebook-signin-button'
import LoadScript from 'vue-plugin-load-script'
import VueResource from 'vue-resource'

// eslint-disable-next-line
import fs from '@/vendor/fb'
// eslint-disable-next-line
// import zendesk from '@/vendor/zendesk'
import Vuelidate from 'vuelidate'

// MATERIAL DESIGN COMPONENTS START
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'
import '@/style/theme.css'

Vue.use(VueMaterial)
// MATERIAL DESIGN COMPONENTS END

Vue.use(LoadScript)
Vue.use(FBSignInButton)
Vue.use(Vuelidate)
Vue.use(VueResource)

Vue.config.productionTip = false
Vue.material.locale.dateFormat = 'MM-DD-YYYY'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
