<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import config from '@/config'
  export default {
    name: 'app',
    computed: {
      ...mapGetters('userModule', {
        isAutenticated: 'isAutenticated'
      })
    },
    watch: {
      isAutenticated () {
        if (!this.isAutenticated) {
          this.$router.push({ name: 'login' })
        }
      }
    },
    created () {
      console.log('load scrips')
      Vue.loadScript('https://js.stripe.com/v3/')
      .then(() => {
        this.setStripe(window.Stripe(config.stripe.publicKey))
      })
      .catch(() => {
        console.log('There was an issue loading the link-initialize.js script')
      })
    },
    mounted () {
      if (this.$router.history.current.path === '/' || (this.$router.history.current.meta && this.$router.history.current.meta.roles)) {
        this.getUser().then(user => {
          this.setUser(user)
        })
      }
    },
    methods: {
      ...mapMutations('paymentModule', {
        setStripe: 'setStripe'
      }),
      ...mapMutations('userModule', {
        setUser: 'setUser'
      }),
      ...mapActions('userModule', {
        getUser: 'getUser'
      })
    }
  }
</script>

<style lang="stylus">
  @import './style/main.styl'
</style>
