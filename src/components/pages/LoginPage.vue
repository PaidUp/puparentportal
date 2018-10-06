<template>
  <div class="login-page" v-if="!isIE">
    <md-field :class="{'md-invalid': $v.loginParams.email.$error}">
      <label>{{ $t('component.login.email') }}</label>
      <md-input v-model.trim="loginParams.email" @keyup.enter="focusPassword"></md-input>
      <span class="md-error" v-if="!$v.loginParams.email.required">{{ $t('validations.required', { field: 'Email' }) }}</span>
      <span class="md-error" v-if="!$v.loginParams.email.email">{{ $t('validations.email') }}</span>
    </md-field>
    <md-field :class="{'md-invalid': $v.loginParams.password.$error}">
      <label>{{ $t('component.login.password') }}</label>
      <md-input id="password" v-model.trim="loginParams.password" @keyup.enter="submit" @input="$v.loginParams.password.$touch()" type="password"></md-input>
      <span class="md-error" v-if="!$v.loginParams.password.required">{{ $t('validations.required', { field: 'Password' }) }}</span>
    </md-field>
    <div>
      <md-button class="md-raised md-accent lblue" :disabled="$v.loginParams.$invalid" @click="submit">{{ $t('component.login.submit') }}</md-button>
    </div>
    <div>
      <md-switch class="md-accent lblue" v-model="loginParams.rememberMe">{{ $t('component.login.remember_me') }}</md-switch>
    </div>
    <div>
      <router-link to="forgot" class="clblue bold">Forgot Password?</router-link>
    </div>
    <div>
      <fb-signin-button :params="fbSignInParams" @success="onFbLoginSuccess" @error="onFbLoginError" class="fb-button md-elevation-4">{{ $t('component.login.login_fb') }}</fb-signin-button>
    </div>
    <div class="last-info-box">
      <span>
        {{ $t('component.login.dont_have_account') }}
        <router-link to="signup" class="clblue signup-link">{{ $t('component.login.sign_up') }} </router-link>
      </span>
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
      ...mapGetters('uiModule', {
        isIE: 'isIE'
      }),
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
      },
      focusPassword: function (event) {
        document.getElementById('password').focus()
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
