<template lang="pug">
  md-step(:id="stepId" md-label="Payment Plan" :md-description="description" :md-done.sync="step")
    .md-theme-default(v-if="planSelected") You are accepting the entire payment plan and cannot pay just a single invoice.
      br
      | Your account will be automatically charged on the dates below (autopay).
      br 
      | Click EDIT on each invoice below to change the payment date or payment account for any specific installment.
      br
      | If you need a custom payment plan, please email 
      a(href="mailto:support@getpaidup.com") support@getpaidup.com 
      | or call 
      a(href="tel:+18557643232") (855) 764-3232.

    .steppers-btns(v-if="planSelected")
      md-button.lblue.md-accent(@click="cancel") CANCEL
      md-button.lblue.md-accent(@click="planSelected=null") BACK    
      md-button.lblue.md-accent.md-raised.blinker(@click="accept") ACCEPT PAYMENT PLAN

    div(v-if="preorders.length && !planSelected") Your payment plans
    .custom-input-small
      md-field(v-if="planSelected")
        md-input(:readonly="true" :placeholder="placeholderSelectAccount" v-model="paymentAccountDesc" @click="showPaymentAccountDialog = true")
        md-icon arrow_drop_down
    .cred(v-if="planSelected && paymentAccount && paymentAccount.object === 'card' && program.unbundle")  IMPORTANT: There is an additional 2.9% + $0.30 fee per installment for paying with a debit/credit card. Bank account/ACH payments do not have a fee.
    br
    .payment-plans.cards-layout
      v-payment-plan-card(v-if="!planSelected" @click="select" v-for="plan in preorders" :key="plan._id" :plan="plan")
    div(v-if="preorders.length && !planSelected") All Payments Plan
    br
    .payment-plans.cards-layout
      v-payment-plan-card(v-if="!planSelected" @click="select" v-for="plan in plansFiltered" :key="plan._id" :plan="plan")
      md-card(v-if="planSelected" v-for="due in dues" :key="due._id")
        v-payment-plan-details(v-if="due.type === 'invoice'" :due="due" :program="program" @updated="editDue")
        v-payment-plan-credit-details(v-else :due="due" @updated="editDue")

    .steppers-btns
      md-button.lblue.md-accent(@click="cancel") CANCEL
      md-button.lblue.md-accent(v-if="planSelected" @click="planSelected=null") BACK    
      md-button.lblue.md-accent.md-raised.blinker(v-if="planSelected" @click="accept") ACCEPT PAYMENT PLAN
    
    payment-accounts-dialog(:showDialog="showPaymentAccountDialog" :unbundle="program ? program.unbundle : false" @close="showPaymentAccountDialog = false" :accounts="paymentAccounts" @selected="selectAccount")

</template>
<script>
import VPaymentPlanCard from './VPaymentPlanCard.vue'
import VPaymentPlanDetails from './VPaymentPlanDetails.vue'
import VPaymentPlanCreditDetails from './VPaymentPlanCreditDetails.vue'
import PaymentAccountsDialog from '@/components/shared/payment/PaymentAccountsDialog.vue'
import Calculations from '@/helpers/calculations'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: { VPaymentPlanCard, VPaymentPlanDetails, VPaymentPlanCreditDetails, PaymentAccountsDialog },
  props: {
    stepId: {
      type: String,
      required: true
    },
    step: Boolean,
    program: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      description: 'If you need a custom payment plan, please email support@getpaidup.com or call (855) 764-3232',
      planSelected: null,
      dues: {},
      showPaymentAccountDialog: false,
      paymentAccount: null,
      paymentAccountDesc: null
    }
  },
  mounted () {
    if (this.paymentAccounts && this.paymentAccounts.length > 0) {
      this.paymentAccount = this.paymentAccounts[0]
    }
  },
  computed: {
    ...mapState('paymentModule', {
      plans: 'plans'
    }),
    ...mapGetters('paymentModule', {
      paymentAccounts: 'paymentAccounts'
    }),
    ...mapState('playerModule', {
      allPreorders: 'allPreorders'
    }),
    plansFiltered () {
      if (!this.allPreorders) {
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
          if (!exist && plan.status === 'active' && plan.visible) pps.push(plan)
        })
        return pps
      }
    },
    preorders () {
      if (!this.allPreorders) return []
      let pps = []
      this.plans.forEach(plan => {
        this.allPreorders.forEach(po => {
          if (plan._id === po.planId && po.status === 'active') {
            plan.preorderId = po._id
            pps.push(plan)
          }
        })
      })
      return pps
    },
    placeholderSelectAccount () {
      return this.paymentAccount ? 'Click to Select Payment Account' : 'Click to Add New Payment Accoun'
    }
  },
  watch: {
    paymentAccounts () {
      if (this.paymentAccounts && this.paymentAccounts.length > 0) {
        this.paymentAccount = this.paymentAccounts[0]
      }
    },
    program () {
      this.description = 'If you need a custom payment plan, please email support@getpaidup.com or call (855) 764-3232'
      this.planSelected = null
      this.dues = {}
    },
    paymentAccount () {
      this.paymentAccountDesc = `${this.paymentAccount.brand || this.paymentAccount.bank_name}••••${this.paymentAccount.last4}`
    }
  },
  methods: {
    ...mapActions('messageModule', {
      setWarning: 'setWarning'
    }),
    selectAccount (account) {
      this.paymentAccount = account
      this.calculatePlan()
    },
    select (param) {
      this.planSelected = param
      this.calculatePlan()
    },
    accept () {
      if (!this.paymentAccount) return this.setWarning('You must be select a payment account first')
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
    },
    calculatePlan () {
      this.dues = {}
      if (!this.planSelected) {
        this.description = 'If you need a custom payment plan, please email support@getpaidup.com or call (855) 764-3232'
      } else {
        this.description = this.planSelected.description
        this.planSelected.dues.forEach(due => {
          due.account = this.paymentAccount
          due.type = 'invoice'
        })
        let items = this.planSelected.dues.concat(this.planSelected.credits)
        items.sort((itemA, itemB) => {
          itemA.dateCharge = typeof itemA.dateCharge === 'string' ? new Date(itemA.dateCharge) : itemA.dateCharge
          itemB.dateCharge = typeof itemB.dateCharge === 'string' ? new Date(itemB.dateCharge) : itemB.dateCharge
          return itemA.dateCharge.getTime() - itemB.dateCharge.getTime()
        })
        let resp = {}
        items.forEach(due => {
          let cloneDue = Object.assign({}, due)
          cloneDue.baseAmount = cloneDue.baseAmount || cloneDue.amount
          if (this.program.unbundle && cloneDue.type === 'invoice') {
            let calculation = Calculations.exec(this.program, cloneDue.account.object, cloneDue.baseAmount)
            cloneDue.amount = calculation.price
          }

          resp[due._id] = cloneDue
        })
        this.dues = resp
      }
    }
  }
}
</script>
<style>
.blinker {
  animation-name: blink;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name:blink;
  -webkit-animation-duration: 3s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes blink{  
  0% { opacity: 1.0; }
  50% { opacity: 0.6; }
  100% { opacity: 1.0; }
}

@-webkit-keyframes blink {  
  0% { opacity: 1.0; }
  50% { opacity: 0.6; }
  100% { opacity: 1.0; }
}

@keyframes blink {  
  0% { opacity: 1.0; }
  50% { opacity: 0.6; }
  100% { opacity: 1.0; }
}
</style>

