<template lang="pug">
  .content {{user.firstName}}
    md-button(class='md-raised md-primary') show message
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('userModule', {
      user: 'user'
    })
  }
}
</script>

