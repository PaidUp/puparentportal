<template>
  
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('userModule', {
      logout: 'logout'
    })
  },
  mounted () {
    this.logout().then(res => {
      this.$router.push('/login')
    })
  }
}
</script>
