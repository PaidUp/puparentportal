<template>
  <div>
    <div>{{ $t('component.main.welcome') }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  data: function () {
    return {
      showAddCardDialog: false
    }
  },
  methods: {
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    })
  }
}
</script>

