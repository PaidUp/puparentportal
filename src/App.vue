<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
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
          this.$router.push({
            name: 'login'
          })
        }
      }
    },
    mounted () {
      if (this.isAutenticated) {
        this.getUser().then(user => {
          this.setUser(user)
        })
      } else {
        // SKIP LOGIN: comment next statement
        this.$router.push({ name: 'login' })
      }
    },
    methods: {
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
