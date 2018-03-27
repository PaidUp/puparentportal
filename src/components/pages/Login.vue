<template lang="pug">
  div
    md-field
      label {{ $t('component.login.email') }}
      md-input(v-model="loginParams.email")

    md-field
      label {{ $t('component.login.password') }}
      md-input(v-model="loginParams.password")
    div
      md-button.md-raised.md-primary(@click="login(loginParams)") {{ $t('component.login.submit') }}

    div
      md-switch.md-primary(v-model="loginParams.rememberMe") {{ $t('component.login.remember_me') }}

    div
      fb-signin-button(:params="fbSignInParams" @success="onFbLoginSuccess" @error="onFbLoginError") {{ $t('component.login.sign_fb') }}

    div
      span {{ $t('component.login.dont_have_account') }} 
        router-link(to="signup") {{ $t('component.login.sign_up') }}  

</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      fbSignInParams: {
        scope: 'email',
        return_scopes: true
      }
    }
  },
  watch: {
    isAutenticated () {
      if (this.isAutenticated) {
        this.$router.push({ name: 'home' })
      }
    }
  },
  computed: {
    ...mapState('userModule', {
      loginParams: 'loginParams'
    }),
    ...mapGetters('userModule', {
      isAutenticated: 'isAutenticated'
    })
  },
  methods: {
    ...mapActions('userModule', {
      login: 'login',
      onFbLoginSuccess: 'onFbLoginSuccess',
      onFbLoginError: 'onFbLoginError'
    })
  }
}
</script>
<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
</style>


