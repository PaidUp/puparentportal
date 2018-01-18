<template lang="pug">
#app
  pu-header
  pu-message
  router-view
  pu-footer
</template>

<script>
import PuHeader from '@/components/layout/Header.vue'
import PuFooter from '@/components/layout/Footer.vue'
import PuMessage from '@/components/shared/Message.vue'

export default {
  name: 'app',
  components: { PuHeader, PuFooter, PuMessage }
}
</script>

<style lang="stylus">
@import './style/main.styl'
</style>
