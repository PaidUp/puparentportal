<template lang="pug">
  div
    md-field(:class="{'md-invalid': $v.fbUser.firstName.$error}")
      label {{ $t('component.signup.first_name') }}
      md-input(v-model.trim="fbUser.firstName" @input="$v.fbUser.firstName.$touch()")
      span.md-error(v-if="!$v.fbUser.firstName.required") {{ $t('validations.required', { field: 'First Name' }) }}

    
    md-field(:class="{'md-invalid': $v.fbUser.lastName.$error}")
      label {{ $t('component.signup.last_name') }}
      md-input(v-model.trim="fbUser.lastName" @input="$v.fbUser.lastName.$touch()")
      span.md-error(v-if="!$v.fbUser.lastName.required") {{ $t('validations.required', { field: 'Last Name' }) }}


    md-field(:class="{'md-invalid': $v.fbUser.email.$error}")
      label {{ $t('component.signup.email') }}
      md-input(v-model.trim="fbUser.email" @input="$v.fbUser.email.$touch()")
      span.md-error(v-if="!$v.fbUser.email.required") {{ $t('validations.required', { field: 'Email' }) }}
      span.md-error(v-if="!$v.fbUser.email.email") {{ $t('validations.email') }}

    md-field(:class="{'md-invalid': $v.fbUser.contacts.phone.$error}")
      label {{ $t('component.signup.phone') }}
      md-input(v-model="fbUser.contacts.phone" type="number" @input="$v.fbUser.contacts.phone.$touch()")
      span.md-error(v-if="!$v.fbUser.contacts.phone.minLength") {{ $t('validations.min_length_num', { field: 'Phone', value: $v.fbUser.contacts.phone.$params.minLength.min }) }} 
      span.md-error(v-if="!$v.fbUser.contacts.phone.numeric") {{ $t('validations.numeric', { field: 'Phone' }) }} 

    md-checkbox(v-model="agree") {{ $t('component.signup.terms.agree') }} &nbsp;
      a(href="#") {{ $t('component.signup.terms.ts') }}
      span , &nbsp;
      a(href="#") {{ $t('component.signup.terms.pp') }}
      span , &nbsp; and &nbsp;
      a(href="#") {{ $t('component.signup.terms.stripe') }}
      span .

    div
      fb-signin-button(:params="fbSignInParams" @success="submit" @error="onFbLoginError") {{ $t('component.signup.create') }}

    div {{ $t('component.signup.already_have_account') }} &nbsp;
      router-link(:to="{name: 'login'}") {{ $t('component.signup.login') }}

</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { required, email, minLength, numeric } from 'vuelidate/lib/validators'

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
        this.$router.push({ name: 'home' })
      }
    }
  },
  mounted () {
    if (!this.fbUser.email) {
      this.$router.push({ name: 'login' })
    }
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