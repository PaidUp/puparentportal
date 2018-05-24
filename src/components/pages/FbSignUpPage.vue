<template>
  <div class="signup-page">
    <div class="names-box">
      <md-field :class="{'md-invalid': $v.fbUser.firstName.$error}">
        <label>{{ $t('component.signup.first_name') }}</label>
        <md-input v-model.trim="fbUser.firstName" @input="$v.fbUser.firstName.$touch()"></md-input>
        <span class="md-error" v-if="!$v.fbUser.firstName.required">{{ $t('validations.required', { field: 'First Name' }) }}</span>
      </md-field>
      <md-field :class="{'md-invalid': $v.fbUser.lastName.$error}">
        <label>{{ $t('component.signup.last_name') }}</label>
        <md-input v-model.trim="fbUser.lastName" @input="$v.fbUser.lastName.$touch()"></md-input>
        <span class="md-error" v-if="!$v.fbUser.lastName.required">{{ $t('validations.required', { field: 'Last Name' }) }}</span>
      </md-field>
    </div>
    <md-field :class="{'md-invalid': $v.fbUser.email.$error}">
      <label>{{ $t('component.signup.email') }}</label>
      <md-input v-model.trim="fbUser.email" @input="$v.fbUser.email.$touch()"></md-input>
      <span class="md-error" v-if="!$v.fbUser.email.required">{{ $t('validations.required', { field: 'Email' }) }}</span>
      <span class="md-error" v-if="!$v.fbUser.email.email">{{ $t('validations.email') }}</span>
    </md-field>
    <md-field :class="{'md-invalid': $v.fbUser.contacts.phone.$error}">
      <label>{{ $t('component.signup.phone') }}</label>
      <md-input v-model="fbUser.contacts.phone" type="number" @input="$v.fbUser.contacts.phone.$touch()"></md-input>
      <span class="md-error" v-if="!$v.fbUser.contacts.phone.minLength">{{ $t('validations.min_length_num', { field: 'Phone', value: $v.fbUser.contacts.phone.$params.minLength.min }) }} </span>
      <span class="md-error" v-if="!$v.fbUser.contacts.phone.numeric">{{ $t('validations.numeric', { field: 'Phone' }) }} </span>
    </md-field>
    <md-checkbox v-model="agree" class="md-accent lblue bold">
      {{ $t('component.signup.terms.agree') }}
      <a href="https://getpaidup.com/terms-of-service/" target="_blank" class="clblue">{{ $t('component.signup.terms.ts') }}</a>
      {{ $t('component.signup.terms.and') }}
      <a href="https://getpaidup.com/privacy-policy/" target="_blank" class="clblue">{{ $t('component.signup.terms.pp') }}</a>.
    </md-checkbox>
    <div class="create-account-box">
      <fb-signin-button :params="fbSignInParams" @success="submit" @error="onFbLoginError" class="fb-button md-elevation-4">{{ $t('component.signup.create') }}</fb-signin-button>
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
    mapActions,
    mapGetters
  } from 'vuex'
  import {
    required,
    email,
    minLength,
    numeric
  } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        fbSignInParams: {
          scope: 'email',
          return_scopes: true
        },
        agree: false
      }
    },
    watch: {
      isAutenticated () {
        if (this.isAutenticated) {
          this.$router.push({
            name: 'home'
          })
        }
      }
    },
    mounted () {
      // if (!this.fbUser.email) {
      //   this.$router.push({ name: 'login' })
      // }
    },
    computed: {
      ...mapState('userModule', {
        fbUser: 'fbUser'
      }),
      ...mapGetters('userModule', {
        isAutenticated: 'isAutenticated'
      })
    },
    methods: {
      ...mapActions('userModule', {
        onFbSignupSuccess: 'onFbSignupSuccess',
        onFbLoginError: 'onFbLoginError'
      }),
      ...mapActions('messageModule', {
        setWarning: 'setWarning'
      }),
      submit (fbResponse) {
        if (this.$v.fbUser.$invalid) {
          return this.setWarning('validations.form')
        }
        if (!this.agree) {
          return this.setWarning('validations.agree')
        }
        this.onFbSignupSuccess(fbResponse)
      }
    },
    validations: {
      fbUser: {
        firstName: {
          required
        },
        lastName: {
          required
        },
        email: {
          required,
          email
        },
        contacts: {
          phone: {
            numeric,
            minLength: minLength(10)
          }
        }
      }
    }
  }
</script>
