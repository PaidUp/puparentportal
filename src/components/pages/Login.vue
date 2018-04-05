<template lang="pug">
  div
    md-field(:class="{'md-invalid': $v.loginParams.email.$error}")
      label {{ $t('component.login.email') }}
      md-input(v-model.trim="loginParams.email" @input="$v.loginParams.email.$touch()")
      span.md-error(v-if="!$v.loginParams.email.required") {{ $t('validations.required', { field: 'Email' }) }}
      span.md-error(v-if="!$v.loginParams.email.email") {{ $t('validations.email') }}

    md-field(:class="{'md-invalid': $v.loginParams.password.$error}")
      label {{ $t('component.login.password') }}
      md-input(v-model.trim="loginParams.password" @input="$v.loginParams.password.$touch()" type="password")
      span.md-error(v-if="!$v.loginParams.password.required") {{ $t('validations.required', { field: 'Password' }) }}

    div
      md-button.md-raised.md-primary(@click="submit") {{ $t('component.login.submit') }}

    div
      md-switch.md-primary(v-model="loginParams.rememberMe") {{ $t('component.login.remember_me') }}

    div
      fb-signin-button(:params="fbSignInParams" @success="onFbLoginSuccess" @error="onFbLoginError") {{ $t('component.login.login_fb') }}

    div
      span {{ $t('component.login.dont_have_account') }} 
        router-link(to="signup") {{ $t('component.login.sign_up') }}  
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

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
    },
    fbUser () {
      if (this.fbUser.email) {
        this.$router.push({ name: 'fbSignup' })
      }
    }
  },
  computed: {
    ...mapState('userModule', {
      loginParams: 'loginParams',
      fbUser: 'fbUser'
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
    }),
    ...mapActions('messageModule', {
      setWarning: 'setWarning'
    }),
    submit () {
      if (this.$v.loginParams.$invalid) {
        return this.setWarning('validations.form')
      }
      this.login()
    }
  },
  validations: {
    loginParams: {
      email: {
        email,
        required
      },
      password: {
        required
      }
    }
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


