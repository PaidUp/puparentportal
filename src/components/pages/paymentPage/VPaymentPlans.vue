<template lang="pug">
  md-step(id="step4" md-label="Payment Plan" :md-description="description" :md-done.sync="step")
    .payment-plans
      v-payment-plan-card(v-if="!planSelected" @click="select" v-for="plan in plans" :key="plan._id" :plan="plan")
      v-payment-plan-details(v-if="planSelected" v-for="due in dues" :key="due._id" :due="due" :account="account")
    div(v-if="planSelected")
      md-button.lblue.md-accent.md-raised(@click="acept") ACEPT PAYMENT PLAN
      md-button.lblue.md-accent(@click="planSelected=null") CANCEL

</template>
<script>
import VPaymentPlanCard from './VPaymentPlanCard.vue'
import VPaymentPlanDetails from './VPaymentPlanDetails.vue'
import { mapState } from 'vuex'

export default {
  components: { VPaymentPlanCard, VPaymentPlanDetails },
  props: {
    step: Boolean,
    account: Object
  },
  data () {
    return {
      description: 'If you need a custom payment plan, please email support@getpaidup.com or call (855) 764-3232',
      planSelected: null
    }
  },
  computed: {
    ...mapState('paymentModule', {
      plans: 'plans'
    }),
    dues () {
      return this.planSelected ? this.planSelected.dues : []
    }
  },
  methods: {
    select (param) {
      this.planSelected = param
    },
    acept () {
      this.$emit('select', this.planSelected)
    }
  }
}
</script>
