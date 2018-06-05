<template lang="pug">
  span
    md-list-item(v-if="type === 'item'" @click="handleOnClick")
        md-icon.add-icon add
        .md-list-item-text
          div Add New Bank
    md-button.lblue.md-accent.md-raised(v-if="type === 'button'" @click="handleOnClick") ADD NEW BANK
    button.plaid-link-button(v-if="false" @click="handleOnClick")
      slot
</template>

<script>
import Vue from 'vue'
export default {
  name: 'plaid-link',
  props: {
    type: {
      type: String
    },
    plaidUrl: {
      type: String,
      default: 'https://cdn.plaid.com/link/v2/stable/link-initialize.js'
    },
    env: {
      type: String,
      default: 'sandbox'
    },
    institution: String,
    selectAccount: String,
    token: String,
    product: {
      type: String,
      default: 'auth'
    },
    clientName: String,
    publicKey: String,
    webhook: String,
    onSuccess: Function,
    onExit: Function,
    onEvent: Function
  },
  created () {
    Vue.loadScript(this.plaidUrl)
            .then(this.onScriptLoaded)
            .catch(this.onScriptError)
  },
  methods: {
    onScriptError (error) {
      console.log(error)
      console.error('There was an issue loading the link-initialize.js script')
    },
    onScriptLoaded () {
      window.linkHandler = window.Plaid.create({
        clientName: this.clientName,
        env: this.env,
        key: this.publicKey,
        onExit: this.onExit,
        onEvent: this.onEvent,
        onSuccess: this.onSuccess,
        product: this.product,
        selectAccount: this.selectAccount === 'true',
        token: this.token,
        webhook: this.webhook
      })
    },
    handleOnClick () {
      const institution = this.institution || null
      if (window.linkHandler) {
        window.linkHandler.open(institution)
      }
    }
  }
}
</script>
<style>
  iframe[id^="plaid-link-iframe-"]{height:100vh}
</style>