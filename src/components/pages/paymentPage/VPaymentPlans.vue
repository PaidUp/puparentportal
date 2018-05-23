<template lang="pug">
  md-step(:id="stepId" md-label="Payment Plan" :md-description="description" :md-done.sync="step")
    div(v-if="preorders.length && !planSelected") Your payment plans
    .payment-plans
      v-payment-plan-card(v-if="!planSelected" @click="select" v-for="plan in preorders" :key="plan._id" :plan="plan")
    div(v-if="preorders.length && !planSelected") All Payments Plan
    .payment-plans 
      v-payment-plan-card(v-if="!planSelected" @click="select" v-for="plan in plansFiltered" :key="plan._id" :plan="plan")
      v-payment-plan-details(v-if="planSelected" v-for="due in dues" :key="due._id" :due="due" @updated="editDue")
    md-button.lblue.md-accent(@click="cancel") CANCEL
    md-button.lblue.md-accent.md-raised(v-if="planSelected" @click="acept") ACEPT PAYMENT PLAN
    md-button.lblue.md-accent(v-if="planSelected" @click="planSelected=null") BACK

</template>
<script>
import VPaymentPlanCard from './VPaymentPlanCard.vue'
import VPaymentPlanDetails from './VPaymentPlanDetails.vue'
import { mapState } from 'vuex'

export default {
  components: { VPaymentPlanCard, VPaymentPlanDetails },
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
        let resp = {}
        this.planSelected.dues.forEach(due => {
          due.account = this.account
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
      this.planSelected.dues = dues
    }
  }
}
</script>
