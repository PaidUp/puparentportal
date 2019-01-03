<template lang="pug">

md-list.bottom-list.has-arrow
  md-icon.down-arrow expand_more
  md-list-item(v-if="showAlert")
    md-icon(style="color: red") notification_important
    .notification-important Please note new PaidUp Support hours effective January 7, 2019
  md-list-item
    md-icon contact_phone
    p.md-list-item-text PaidUp Support
      br 
      | Mon - Fri: 7am - 7pm CT
      br
      | Sat, Sun : 9am - 6pm CT
  md-list-item
    md-icon send
    a.md-list-item-text(href="mailto:support@getpaidup.com")
      div Email Support
      div support@getpaidup.com
  md-list-item
    md-icon call
    a.md-list-item-text(href="tel:855-764-3232")
      div Call Support
      div (855) 764-3232
  md-list-item
    md-icon help
    a.md-list-item-text(href="https://getpaidup.zendesk.com/hc/en-us" target="_blank") Help Articles
    md-icon launch
  md-list-item.logout-btn-nav(@click="logout()")
    md-icon power_settings_new
    div.md-list-item-text LOGOUT
</template>
<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    showAlert () {
      return this.$moment().isBefore('2019-01-07')
    }
  },
  methods: {
    ...mapActions('userModule', {
      logout: 'logout'
    })
  }
}
</script>
