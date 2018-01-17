<template>
  <div class="content">
    {{ $t('component.main.welcome') }} {{user.firstName}}
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState('userModule', {
      user: 'user'
    })
  }
}
</script>

