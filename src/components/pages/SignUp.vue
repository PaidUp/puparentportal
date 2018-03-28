<template lang="pug">
  div
    md-field
      label {{ $t('component.signup.first_name') }}
      md-input(v-model="userForm.firstName")
    
    md-field
      label {{ $t('component.signup.last_name') }}
      md-input(v-model="userForm.lastName")

    md-field
      label {{ $t('component.signup.email') }}
      md-input(v-model="userForm.email")

    md-field
      label {{ $t('component.signup.password') }}
      md-input(v-model="userForm.password" type="password")

    md-field
      label {{ $t('component.signup.confirm_password') }}
      md-input(v-model="userForm.confirmPassword", type="password")

    md-field
      label {{ $t('component.signup.phone') }}
      md-input(v-model="userForm.contacts.phone")

    md-checkbox(v-model="agree") {{ $t('component.signup.terms.agree') }} &nbsp;
      a(href="#") {{ $t('component.signup.terms.ts') }}
      span , &nbsp;
      a(href="#") {{ $t('component.signup.terms.pp') }}
      span , &nbsp; and &nbsp;
      a(href="#") {{ $t('component.signup.terms.stripe') }}
      span .

    div
      md-button.md-raised.md-primary(@click="signup(userForm)") {{ $t('component.signup.create') }}

    div {{ $t('component.signup.already_have_account') }} &nbsp;
      router-link(to="login") {{ $t('component.signup.login') }}

</template>
<script>
import { mapActions, mapGetters } from 'vuex'

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
    })
  },
  methods: {
    ...mapActions('userModule', {
      signup: 'signup'
    })
  }
}
</script>

