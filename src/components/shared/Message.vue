<template lang="pug">
  md-snackbar(md-position="center" :md-duration="Infinity" :md-active="showSnackbar")
    ul(v-for="message in messages" :key="message.id")
      li {{ $t(message.content) }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('messageModule', {
      messages: 'messages',
      showSnackbar: 'showSnackbar'
    })
  },
  watch: {
  },

  methods: {
  }
}
</script>

