<template lang="pug">
.content
  .section
    .field
      label.label {{ $t('component.login.email') }}
      .control
        input.input(v-model="loginParams.email", type="text", :placeholder="$t('component.login.email')")
    .field
      label.label {{ $t('component.login.password') }}
      .control
        input.input(v-model="loginParams.password", type="text", :placeholder="$t('component.login.password')")
    .field
      .control
        label.checkbox
          input(v-model="loginParams.rememberMe", type="checkbox") 
          span {{ $t('component.login.remember_me') }}
    .field.is-grouped
      .control
        button.button.is-link(@click="login(loginParams)") {{ $t('component.login.submit') }}

</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      loginParams: {}
    }
  },
  watch: {
    isAutenticated () {
      if (this.isAutenticated) {
        this.$router.push({ name: 'main' })
      }
    }
  },
  computed: {
    ...mapGetters('userModule', {
      isAutenticated: 'isAutenticated'
    })
  },
  methods: {
    ...mapActions('userModule', {
      login: 'login'
    })
  }
}
</script>

