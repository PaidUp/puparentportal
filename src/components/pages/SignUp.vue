<template lang="pug">
  div
    md-field(:class="{'md-invalid': $v.userForm.firstName.$error}")
      label {{ $t('component.signup.first_name') }}
      md-input(v-model.trim="userForm.firstName" @input="$v.userForm.firstName.$touch()")
      span.md-error(v-if="!$v.userForm.firstName.required") {{ $t('validations.required', { field: 'First Name' }) }}

    
    md-field(:class="{'md-invalid': $v.userForm.lastName.$error}")
      label {{ $t('component.signup.last_name') }}
      md-input(v-model.trim="userForm.lastName" @input="$v.userForm.lastName.$touch()")
      span.md-error(v-if="!$v.userForm.lastName.required") {{ $t('validations.required', { field: 'Last Name' }) }}


    md-field(:class="{'md-invalid': $v.userForm.email.$error}")
      label {{ $t('component.signup.email') }}
      md-input(v-model.trim="userForm.email" @input="$v.userForm.email.$touch()")
      span.md-error(v-if="!$v.userForm.email.required") {{ $t('validations.required', { field: 'Email' }) }}
      span.md-error(v-if="!$v.userForm.email.email") {{ $t('validations.email') }}

    md-field(:class="{'md-invalid': $v.password.$error}")
      label {{ $t('component.signup.password') }}
      md-input(v-model.trim="userForm.password" type="password" @input="$v.password.$touch()")
      span.md-error(v-if="!$v.password.required") {{ $t('validations.required', { field: 'Password' }) }}      

    md-field(:class="{'md-invalid': $v.confirmPassword.$error}")
      label {{ $t('component.signup.confirm_password') }}
      md-input(v-model.trim="confirmPassword", @input="$v.confirmPassword.$touch()", type="password")
      span.md-error(v-if="!$v.confirmPassword.sameAsPassword") {{ $t('validations.identical', { field: 'Password' }) }}

    md-field(:class="{'md-invalid': $v.userForm.contacts.phone.$error}")
      label {{ $t('component.signup.phone') }}
      md-input(v-model="userForm.contacts.phone" type="number" @input="$v.userForm.contacts.phone.$touch()")
      span.md-error(v-if="!$v.userForm.contacts.phone.minLength") {{ $t('validations.min_length_num', { field: 'Phone', value: $v.userForm.contacts.phone.$params.minLength.min }) }} 
      span.md-error(v-if="!$v.userForm.contacts.phone.numeric") {{ $t('validations.numeric', { field: 'Phone' }) }} 

    md-checkbox(v-model="agree") {{ $t('component.signup.terms.agree') }} &nbsp;
      a(href="#") {{ $t('component.signup.terms.ts') }}
      span , &nbsp;
      a(href="#") {{ $t('component.signup.terms.pp') }}
      span , &nbsp; and &nbsp;
      a(href="#") {{ $t('component.signup.terms.stripe') }}
      span .

    div
      md-button.md-raised.md-primary(@click="submit") {{ $t('component.signup.create') }}

    div {{ $t('component.signup.already_have_account') }} &nbsp;
      router-link(to="../login") {{ $t('component.signup.login') }}

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email, minLength, sameAs, numeric } from 'vuelidate/lib/validators'

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
        this.$router.push({ name: 'home' })
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

