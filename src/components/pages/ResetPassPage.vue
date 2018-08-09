<template>
  <div class="reset-page">
    <div class="info-msg bold">
     Update your password.
    </div>
    <md-field :class="{'md-invalid': $v.password.$error}">
      <label>{{ $t('component.signup.password') }}</label>
      <md-input v-model.trim="password" type="password" @input="$v.password.$touch()"></md-input>
      <span class="md-error" v-if="!$v.password.required">{{ $t('validations.required', { field: 'Password' }) }} </span>
    </md-field>
    <md-field :class="{'md-invalid': $v.confirmPassword.$error}">
      <label>{{ $t('component.signup.confirm_password') }}</label>
      <md-input v-model.trim="confirmPassword" @input="$v.confirmPassword.$touch()" type="password"></md-input>
      <span class="md-error" v-if="!$v.confirmPassword.sameAsPassword">{{ $t('validations.identical', { field: 'Password' }) }}</span>
    </md-field>
    <div class="action-box">
      <md-button :disabled='disabled' class="md-raised md-accent lblue" @click="submit">RESET PASSWORD</md-button>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import { required, sameAs } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        email: '',
        confirmPassword: '',
        password: '',
        submited: false
      }
    },
    watch: {
    },
    computed: {
      disabled () {
        return this.$v.$invalid || this.submited
      }
    },
    mounted () {
      this.verifyResetToken(this.$route.params.token).then(resp => {
        if (!resp) {
          this.setWarning('Invalid link')
          this.$router.push({name: 'login'})
        } else {
          this.email = resp
        }
      })
    },
    methods: {
      ...mapActions('userModule', {
        verifyResetToken: 'verifyResetToken',
        recovery: 'recovery'
      }),
      ...mapActions('messageModule', {
        setWarning: 'setWarning',
        setInfo: 'setInfo'
      }),
      submit () {
        this.submited = true
        this.recovery({email: this.email,
          token: this.$route.params.token,
          password: this.password
        }).then(resp => {
          if (resp) {
            this.setInfo('Your password was updated successfully')
            this.$router.push({name: 'login'})
          }
        }).catch(reason => {
          this.setWarning(`Password don't updated, please contact us`)
        })
      }
    },
    validations: {
      confirmPassword: {
        sameAsPassword: sameAs('password')
      },
      password: {
        required
      }
    }
  }
</script>
