<template>
  <div class="reset-page">
    <div class="info-msg bold">
     Update your password.
    </div>
    <md-field :class="{'md-invalid': $v.password.$error}">
      <label>{{ $t('component.signup.password') }}</label>
      <md-input v-model.trim="userForm.password" type="password" @input="$v.password.$touch()"></md-input>
      <span class="md-error" v-if="!$v.password.required">{{ $t('validations.required', { field: 'Password' }) }} </span>
    </md-field>
    <md-field :class="{'md-invalid': $v.confirmPassword.$error}">
      <label>{{ $t('component.signup.confirm_password') }}</label>
      <md-input v-model.trim="confirmPassword" @input="$v.confirmPassword.$touch()" type="password"></md-input>
      <span class="md-error" v-if="!$v.confirmPassword.sameAsPassword">{{ $t('validations.identical', { field: 'Password' }) }}</span>
    </md-field>
    <div class="action-box">
      <md-button class="md-raised md-accent lblue" @click="submit">RESET PASSWORD</md-button>
    </div>
  </div>
</template>
<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  import {
    required,
    sameAs
  } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        confirmPassword: '',
        userForm: {}
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
    computed: {
      ...mapGetters('userModule', {
        isAutenticated: 'isAutenticated'
      }),
      password () {
        return this.userForm.password
      }
    },
    methods: {
      ...mapActions('userModule', {
        signup: 'signup'
      }),
      ...mapActions('messageModule', {
        setWarning: 'setWarning'
      }),
      submit () {
        if (this.$v.userForm.$invalid) {
          return this.setWarning('validations.form')
        }
        // LOGIN HERE?
      }
    },
    validations: {
      confirmPassword: {
        sameAsPassword: sameAs('password')
      },
      password: {
        required
      },
      userForm: {
        password: {
          required
        }
      }
    }
  }
</script>
