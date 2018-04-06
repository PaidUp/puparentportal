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
    <md-field :class="{'md-invalid': $v.userForm.contacts.phone.$error}">
      <label>{{ $t('component.signup.phone') }}</label>
      <md-input v-model="userForm.contacts.phone" type="number" @input="$v.userForm.contacts.phone.$touch()"></md-input>
      <span class="md-error" v-if="!$v.userForm.contacts.phone.minLength">{{ $t('validations.min_length_num', { field: 'Phone', value: $v.userForm.contacts.phone.$params.minLength.min }) }}
      </span>
      <span class="md-error" v-if="!$v.userForm.contacts.phone.numeric">{{ $t('validations.numeric', { field: 'Phone' }) }} </span>
    </md-field>
    <md-checkbox v-model="agree" class="md-accent lblue bold">
      {{ $t('component.signup.terms.agree') }}
      <a href="#" class="clblue">{{ $t('component.signup.terms.ts') }}</a>,
      <a href="#" class="clblue">{{ $t('component.signup.terms.pp') }}</a>,
      and <a href="#" class="clblue">{{ $t('component.signup.terms.stripe') }}</a>.
    </md-checkbox>
    <div class="create-account-box">
      <md-button class="md-raised md-accent lblue" @click="submit">{{ $t('component.signup.create') }}</md-button>
    </div>
    <div class="last-info-box">
      {{ $t('component.signup.already_have_account') }}
      <router-link to="../login" class="clblue">{{ $t('component.signup.login') }}</router-link>
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
    email,
    minLength,
    sameAs,
    numeric
  } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        agree: false,
        confirmPassword: '',
        userForm: {
          contacts: {}
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
