<template lang="pug">
header
  pu-lang
  .content(v-show="isAutenticated")
    a(@click="logout()") {{ $t('component.header.logout') }}
  .content(v-if="isAutenticated") {{$t('component.header.default')}}
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import PuLang from '@/components/shared/Lang.vue'

export default {
  computed: {
    ...mapGetters('userModule', {
      isAutenticated: 'isAutenticated',
      token: 'token'
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
      getUser: 'getUser',
      logout: 'logout'
    })
  },
  components: { PuLang }
}
</script>

