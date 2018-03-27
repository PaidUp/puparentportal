<template lang="pug">
  .pure-form.pure-form-aligned
    fieldset
      .pure-control-group
        label(for="firsName") First Name
        input(v-model="userForm.firstName" id="firstName", type="text" placeHolder="first name")
        span.pure-form-message-inline required

      .pure-control-group
        label(for="lastName") Last Name
        input(v-model="userForm.lastName" id="lastName", type="text" placeHolder="last name")
        span.pure-form-message-inline required

      .pure-control-group
        label(for="email") Email
        input(v-model="userForm.email" id="email", type="text" placeHolder="email")
        span.pure-form-message-inline required

      .pure-control-group
        label(for="password") Password
        input(v-model="userForm.password" id="password", type="password" placeHolder="password")
        span.pure-form-message-inline required

      .pure-control-group
        label(for="confirmPassword") Confirm Password
        input(v-model="confirmPassword" id="confirmPassword", type="password" placeHolder="confirm password")
        span.pure-form-message-inline required

      .pure-control-group
        label(for="phone") Phone Number
        input(v-model="userForm.contacts.phone" id="phone", type="text" placeHolder="Phone")
        span.pure-form-message-inline required

      .pure-controls
        label.pure-checkbox
          input(type="checkbox")  
          span I've read the terms and conditions
        button.pure-button.pure-button-primary(type="submit" @click="signup(userForm)") submit
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
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

