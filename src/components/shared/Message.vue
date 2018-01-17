<template lang="pug">
  .content
    article.message(:class="'is-' + value.type", v-for="(value, key) in messages")
      .message-header
        p 
        button.delete(aria-label="delete", @click="remove(key)")
      .message-body {{ $t(value.content) }}
        p 
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('messageModule', {
      messages: 'messages'
    })
  },
  watch: {

  },

  methods: {
    ...mapMutations('messageModule', {
      remove: 'remove'
    })
  }
}
</script>

