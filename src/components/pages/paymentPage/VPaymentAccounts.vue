<template lang="pug">
  md-step(:id="stepId" md-label="Payment Account" :md-description="description" :md-done.sync="step")
    .payment-accounts
      .account.md-elevation-2(@click="select(account)" v-for="account in paymentAccounts" :key="account._id")
        md-icon.md-size-2x(v-if="account.object==='bank_account'") account_balance
        md-icon.md-size-2x(v-if="account.object==='card'") credit_card
        .name.md-body-2(v-if="account.object==='bank_account'") {{ account.account_holder_name }} 
        .name.md-body-2(v-if="account.object==='card'") {{ account.name }}
        .card-details.md-caption(v-if="account.object==='bank_account'") {{ account.bank_name }}
        .card-details.md-caption(v-if="account.object==='card'") {{ account.brand }}••••{{ account.last4 }}
        .card-details.md-caption(v-if="account.object==='bank_account'") ••••{{ account.last4 }}
        .card-details.md-caption(v-if="account.object==='card'") Exp. {{ account.exp_month }}/{{ account.exp_year % 100 }}

    md-button.lblue.md-accent(@click="cancel") CANCEL
    md-button.lblue.md-accent.md-raised(@click="showAddCardDialog=true") ADD NEW CARD
    md-button.lblue.md-accent.md-raised ADD NEW BANK
    add-card-dialog(:showDialog="showAddCardDialog" @close="showAddCardDialog = false")

</template>
<script>
import { mapGetters } from 'vuex'
import AddCardDialog from '@/components/shared/AddCardDialog.vue'

export default {
  props: {
    stepId: {
      type: String,
      required: true
    },
    step: Boolean
  },
  components: { AddCardDialog },
  data () {
    return {
      selected: null,
      showAddCardDialog: false
    }
  },
  watch: {
    user () {
      if (this.user && this.user.externalCustomerId) {
        this.listCards(this.user)
        this.listBanks(this.user)
      }
    }
  },
  computed: {
    ...mapGetters('paymentModule', {
      paymentAccounts: 'paymentAccounts'
    }),
    description () {
      if (!this.selected) return ''
      return `${this.selected.bank_name || this.selected.brand}••••${this.selected.last4}`
    }
  },
  methods: {
    select (param) {
      this.selected = param
      this.$emit('select', param)
    },
    closeDialog () {
      this.showAddCardDialog = false
    },
    cancel () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
