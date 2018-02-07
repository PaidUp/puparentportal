<template lang="pug">
.content
  .section
    fb-signin-button(:params="fbSignInParams" @success="onFbLoginSuccess" @error="onFbLoginError") Sign in with Facebook
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
        router-link(to="signup") SignUp

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
        this.$router.push({ name: 'main' })
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


