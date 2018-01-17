<template lang="pug">
header
  pu-lang
  .content(v-show="isAutenticated")
    a(@click="logout()") {{ $t('component.header.logout') }}
  .content(v-if="isAutenticated") {{$t('component.header.default')}}
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
      this.getUser().then().catch(reason => {
        if (reason.status === 401) {
          this.setToken('')
        }
      })
    }
  },
  methods: {
    ...mapActions('userModule', {
      getUser: 'getUser',
      setToken: 'setToken',
      logout: 'logout'
    })
  },
  components: { PuLang }
}
</script>

