<template lang="pug">
  md-step(:id="stepId" md-label="Payment Plan" :md-description="description" :md-done.sync="step")
    div(v-if="preorders.length && !planSelected") Your payment plans
    .payment-plans
      v-payment-plan-card(v-if="!planSelected" @click="select" v-for="plan in preorders" :key="plan._id" :plan="plan")
    div(v-if="preorders.length && !planSelected") All Payments Plan
    .payment-plans 
      v-payment-plan-card(v-if="!planSelected" @click="select" v-for="plan in plansFiltered" :key="plan._id" :plan="plan")
      div(v-if="planSelected" v-for="due in dues" :key="due._id")
        v-payment-plan-details(v-if="due.account" :due="due" @updated="editDue")
        v-payment-plan-credit-details(v-if="!due.account" :due="due" @updated="editDue")
    md-button.lblue.md-accent(@click="cancel") CANCEL
    md-button.lblue.md-accent.md-raised(v-if="planSelected" @click="acept") ACEPT PAYMENT PLAN
    md-button.lblue.md-accent(v-if="planSelected" @click="planSelected=null") BACK

</template>
<script>
import VPaymentPlanCard from './VPaymentPlanCard.vue'
import VPaymentPlanDetails from './VPaymentPlanDetails.vue'
import VPaymentPlanCreditDetails from './VPaymentPlanCreditDetails.vue'
import { mapState } from 'vuex'

export default {
  components: { VPaymentPlanCard, VPaymentPlanDetails, VPaymentPlanCreditDetails },
  props: {
    stepId: {
      type: String,
      required: true
    },
    step: Boolean,
    account: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      description: 'If you need a custom payment plan, please email support@getpaidup.com or call (855) 764-3232',
      planSelected: null,
      dues: {}
    }
  },
  computed: {
    ...mapState('paymentModule', {
      plans: 'plans'
    }),
    ...mapState('playerModule', {
      allPreorders: 'allPreorders'
    }),
    plansFiltered () {
      if (!this.allPreorders.length) {
        return this.plans.filter(plan => {
          return plan.status === 'active'
        })
      } else {
        let pps = []
        this.plans.forEach(plan => {
          let exist = false
          this.allPreorders.forEach(po => {
            if (plan._id === po.planId) exist = true
          })
          if (!exist && plan.status === 'active') pps.push(plan)
        })
        return pps
      }
    },
    preorders () {
      if (!this.allPreorders.length) return []
      let pps = []
      this.plans.forEach(plan => {
        this.allPreorders.forEach(po => {
          if (plan._id === po.planId) {
            plan.preorderId = po._id
            pps.push(plan)
          }
        })
      })
      return pps
    }
  },
  watch: {
    planSelected () {
      if (!this.planSelected) {
        this.description = 'If you need a custom payment plan, please email support@getpaidup.com or call (855) 764-3232'
      } else {
        this.description = this.planSelected.description
        this.planSelected.dues.forEach(due => {
          due.account = this.account
        })
        let items = this.planSelected.dues.concat(this.planSelected.credits)
        items.sort((itemA, itemB) => {
          itemA.dateCharge = typeof itemA.dateCharge === 'string' ? new Date(itemA.dateCharge) : itemA.dateCharge
          itemB.dateCharge = typeof itemB.dateCharge === 'string' ? new Date(itemB.dateCharge) : itemB.dateCharge
          return itemA.dateCharge.getTime() - itemB.dateCharge.getTime()
        })
        let resp = {}
        items.forEach(due => {
          resp[due._id] = due
        })
        this.dues = resp
      }
    }
  },
  methods: {
    select (param) {
      this.planSelected = param
    },
    acept () {
      this.$emit('select', this.planSelected)
    },
    cancel () {
      this.$router.push({
        name: 'home'
      })
    },
    editDue (due) {
      let dues = []
      this.dues[due._id] = due
      let newDues = JSON.parse(JSON.stringify(this.dues))
      for (var key in newDues) {
        newDues[key].dateCharge = new Date(newDues[key].dateCharge)
        dues.push(newDues[key])
      }
      this.dues = newDues
      this.planSelected.dues = dues.filter(due => {
        return typeof due.account === 'object'
      })
    }
  }
}
</script>
