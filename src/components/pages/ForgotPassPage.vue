<template>
  <div class="forgot-page">
    <div class="info-msg bold">
      Enter your email address below and we will send you a secure link to reset your password.
    </div>
    <md-field :class="{'md-invalid': $v.email.$error}">
      <label>{{ $t('component.login.email') }}</label>
      <md-input v-model.trim="email" @input="$v.email.$touch()"></md-input>
      <span class="md-error" v-if="!$v.email.required">{{ $t('validations.required', { field: 'Email' }) }}</span>
      <span class="md-error" v-if="!$v.email.email">{{ $t('validations.email') }}</span>
    </md-field>
    <div class="action-box">
      <md-button :disabled="disabled" class="md-raised md-accent lblue" @click="submit">RESET PASSWORD</md-button>
    </div>
    <div class="last-info-box">
      {{ $t('component.signup.already_have_account') }}
      <router-link to="../login" class="clblue">{{ $t('component.signup.login') }}</router-link>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        email: '',
        submited: false
      }
    },
    watch: {
    },
    computed: {
      disabled () {
        return this.$v.email.$invalid || this.submited
      }
    },
    methods: {
      ...mapActions('userModule', {
        reset: 'reset'
      }),
      ...mapActions('messageModule', {
        setWarning: 'setWarning',
        setInfo: 'setInfo'
      }),
      submit () {
        this.submited = true
        this.reset(this.email).then(resp => {
          this.submited = false
          if (resp) {
            this.setInfo('A reset link was send to your email, please check it')
            this.$router.push({name: 'login'})
          } else {
            this.setWarning('Please verify if you sign up with a Facebook account')
          }
        })
        // RESET LOGIC HERE?
      }
    },
    validations: {
      email: {
        email,
        required
      }
    }
  }
</script>
