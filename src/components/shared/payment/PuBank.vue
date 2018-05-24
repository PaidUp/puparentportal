<template lang="pug">
  plaid-link(:env="props.env" :publicKey="props.publicKey" :clientName="props.clientName"
    :product="props.product" :selectAccount="props.selectAccount"
    :apiVersion='props.apiVersion' :type="type" v-bind="{ onSuccess }") Open Plaid Link
</template>

<script>
import PlaidLink from './PlaidLink.vue'
import config from '@/config'
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    type: String
  },
  data () {
    return {
      props: config.plaid
    }
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    })
  },
  components: { PlaidLink },
  methods: {
    ...mapActions('messageModule', {
      setSuccess: 'setSuccess',
      setDanger: 'setDanger'
    }),
    ...mapActions('paymentModule', {
      addBank: 'addBank',
      listBanks: 'listBanks'
    }),
    onSuccess (publicToken, metadata) {
      const accountId = metadata.account_id
      this.addBank({ user: this.user, publicToken, accountId }).then(bank => {
        this.listBanks(this.user)
        this.setSuccess('module.payment.add_bank_success')
      }).catch(reason => {
        this.setSuccess('module.payment.add_bank_fail')
      })
    }
  }
}
</script>