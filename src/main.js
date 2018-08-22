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
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

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

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:9005/graphql'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.token
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  })

  return forward(operation)
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueMaterial)
// MATERIAL DESIGN COMPONENTS END

Vue.use(LoadScript)
Vue.use(FBSignInButton)
Vue.use(Vuelidate)
Vue.use(VueResource)
// Install the vue plugin
Vue.use(VueApollo)

Vue.config.productionTip = false
Vue.material.locale.dateFormat = 'MM-DD-YYYY'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  provide: apolloProvider.provide(),
  components: { App }
})
