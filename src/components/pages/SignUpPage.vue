<template>
  <div class="signup-page">
    <div class="names-box">
      <md-field :class="{'md-invalid': $v.userForm.firstName.$error}">
        <label>{{ $t('component.signup.first_name') }}</label>
        <md-input v-model.trim="userForm.firstName" @input="$v.userForm.firstName.$touch()"></md-input>
        <span class="md-error" v-if="!$v.userForm.firstName.required">{{ $t('validations.required', { field: 'First Name' }) }}</span>
      </md-field>
      <md-field :class="{'md-invalid': $v.userForm.lastName.$error}">
        <label>{{ $t('component.signup.last_name') }}</label>
        <md-input v-model.trim="userForm.lastName" @input="$v.userForm.lastName.$touch()"></md-input>
        <span class="md-error" v-if="!$v.userForm.lastName.required">{{ $t('validations.required', { field: 'Last Name' }) }}</span>
      </md-field>
    </div>
    <md-field :class="{'md-invalid': $v.userForm.email.$error}">
      <label>{{ $t('component.signup.email') }}</label>
      <md-input v-model.trim="userForm.email" @input="$v.userForm.email.$touch()"></md-input>
      <span class="md-error" v-if="!$v.userForm.email.required">{{ $t('validations.required', { field: 'Email' }) }}</span>
      <span class="md-error" v-if="!$v.userForm.email.email">{{ $t('validations.email') }}</span>
    </md-field>
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
    <md-field :class="{'md-invalid': $v.userForm.phone.$error}">
      <label>{{ $t('component.signup.phone') }}</label>
      <md-input v-model="userForm.phone" type="number" @input="$v.userForm.phone.$touch()"></md-input>
      <span class="md-error" v-if="!$v.userForm.phone.minLength">{{ $t('validations.min_length_num', { field: 'Phone', value: $v.userForm.phone.$params.minLength.min }) }}</span>
      <span class="md-error" v-if="!$v.userForm.phone.numeric">{{ $t('validations.numeric', { field: 'Phone' }) }} </span>
    </md-field>
    <md-checkbox v-model="agree" class="lblue bold">
      {{ $t('component.signup.terms.agree') }}
      <a href="https://getpaidup.com/terms-of-service/" target="_blank" class="clblue">{{ $t('component.signup.terms.ts') }}</a>
      {{ $t('component.signup.terms.and') }}
      <a href="https://getpaidup.com/privacy-policy/" target="_blank" class="clblue">{{ $t('component.signup.terms.pp') }}</a>.
    </md-checkbox>
    <div class="create-account-box">
      <md-button class="md-raised md-accent lblue" :disabled="$v.userForm.$invalid || !agree"  @click="submit">{{ $t('component.signup.create') }}</md-button>
    </div>
    <div class="last-info-box">
      {{ $t('component.signup.already_have_account') }}
      <router-link to="../login" class="clblue">{{ $t('component.signup.login') }}</router-link>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import { required, email, minLength, sameAs, numeric } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        agree: false,
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
        if (!this.agree) {
          return this.setWarning('validations.agree')
        }
        this.signup(this.userForm)
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
        password: {
          required
        },
        phone: {
          numeric,
          minLength: minLength(10)
        }
      }
    }
  }
</script>
