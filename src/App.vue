<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    name: 'app',
    computed: {
      ...mapGetters('userModule', {
        isAutenticated: 'isAutenticated'
      })
    },
    watch: {
      isAutenticated () {
        console.log('watch: ', this.$router.history)
        if (!this.isAutenticated) {
          this.$router.push({ name: 'login' })
        }
      }
    },
    created () {
      if (this.isAutenticated) {
        this.getUser().then(user => {
          this.setUser(user)
        })
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
