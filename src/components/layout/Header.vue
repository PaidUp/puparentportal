<template lang="pug">
header
  pu-lang
  .content(v-show="isAutenticated")
    a(@click="logout()") {{ $t('component.header.logout') }}
  .content(v-if="isAutenticated") {{$t('component.header.default')}}
  .content
  router-link(to="main") Main  
  router-link(to="bank") Bank  
  router-link(to="card") Card
  router-link(to="accounts") Accounts
    
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import PuLang from '@/components/shared/Lang.vue'

export default {
  computed: {
    ...mapGetters('userModule', {
      isAutenticated: 'isAutenticated'
    })
  },
  methods: {
    ...mapActions('userModule', {
      logout: 'logout'
    })
  },
  components: { PuLang }
}
</script>

