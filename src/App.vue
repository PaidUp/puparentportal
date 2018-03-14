<template lang="pug">
#app
  pu-message
  router-view
</template>

<script>
import PuHeader from '@/components/layout/Header.vue'
import PuFooter from '@/components/layout/Footer.vue'
import PuMessage from '@/components/shared/Message.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'app',
  components: { PuHeader, PuFooter, PuMessage },
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
  mounted () {
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
