<template>
  <div class="forgot-page">
    <div class="info-msg bold">
      Enter your email address below and we will send you a secure link to reset your password.
    </div>
    <md-field :class="{'md-invalid': $v.loginParams.email.$error}">
      <label>{{ $t('component.login.email') }}</label>
      <md-input v-model.trim="loginParams.email" @input="$v.loginParams.email.$touch()"></md-input>
      <span class="md-error" v-if="!$v.loginParams.email.required">{{ $t('validations.required', { field: 'Email' }) }}</span>
      <span class="md-error" v-if="!$v.loginParams.email.email">{{ $t('validations.email') }}</span>
    </md-field>
    <div class="action-box">
      <md-button class="md-raised md-accent lblue" @click="submit">RESET PASSWORD</md-button>
    </div>
    <div class="last-info-box">
      {{ $t('component.signup.already_have_account') }}
      <router-link to="../login" class="clblue">{{ $t('component.signup.login') }}</router-link>
    </div>
  </div>
</template>
<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    required,
    email
  } from 'vuelidate/lib/validators'

  export default {
    watch: {
      isAutenticated () {
        if (this.isAutenticated) {
          this.$router.push({
            name: 'home'
          })
        }
      },
      fbUser () {
        if (this.fbUser.email) {
          this.$router.push({
            name: 'fbSignup'
          })
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
        // RESET LOGIC HERE?
      }
    },
    validations: {
      loginParams: {
        email: {
          email,
          required
        }
      }
    }
  }
</script>
