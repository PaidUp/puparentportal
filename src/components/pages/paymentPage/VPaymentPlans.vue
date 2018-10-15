<template lang="pug">
  div
    .md-theme-default(v-if="paymentPlanSelected") Click EDIT to change the payment date and/or payment account as allowed by the club.
      br 
      b IMPORTANT:&nbsp;
      | Scroll down and click&nbsp;
      b AUTHORIZE PAYMENTS&nbsp;
      | to complete the payment process.
      br
      | You are authorizing autopay for the entire payment plan and cannot pay just a single invoice.
      br
      | For custom payment plans or questions, please email &nbsp;
      a(href="mailto:support@getpaidup.com") support@getpaidup.com &nbsp;
      | or call &nbsp;
      a(href="tel:+18557643232") (855) 764-3232. &nbsp;
      | (M-F 9am-5pm CST).

    div(v-if="preorders.length && !paymentPlanSelected") Your payment plans
    .custom-input-small(v-if="paymentPlanSelected")
      md-field(v-if="paymentAccountSelected")
        md-input(:readonly="true" :placeholder="placeholderSelectAccount" :value="paymentAccountDesc" @click="showPaymentAccountDialog = true")
        md-icon arrow_drop_down
      div(v-else)
        br
        md-button(class="md-accent lblue md-raised" @click="showPaymentAccountDialog = true") {{placeholderSelectAccount}}    
    .cred(v-if="paymentPlanSelected && paymentAccountSelected && paymentAccountSelected.object === 'card' && programSelected.unbundle")  IMPORTANT: There is an additional 2.9% + $0.30 fee per installment for paying with a debit/credit card. Bank account/ACH payments do not have a fee.
    br
    .payment-plans.cards-layout(v-if="!paymentPlanSelected")
      v-payment-plan-card(@click="setPaymentPlanSelected" v-for="plan in preorders" :key="plan._id" :plan="plan")
    div(v-if="preorders.length && !paymentPlanSelected") All Payments Plan
    br
    .payment-plans.cards-layout
      v-payment-plan-card(v-if="!paymentPlanSelected" @click="setPaymentPlanSelected" v-for="plan in plansFiltered" :key="plan._id" :plan="plan")
      md-card(v-if="paymentPlanSelected" v-for="due in dues" :key="due._id")
        v-payment-plan-details(v-if="due.type === 'invoice'" :due="due" :program="programSelected" @updated="editDue")
        v-payment-plan-credit-details(v-else :due="due" @updated="editDue")

    //- .steppers-btns
    //-   md-button.lblue.md-accent(@click="cancel") CANCEL
    //-   md-button.lblue.md-accent(v-if="planSelected" @click="planSelected=null") BACK    
    //-   md-button.lblue.md-accent.md-raised.blinker(v-if="planSelected" @click="accept" :class="{'blinker': this.paymentAccount}" :disabled="!this.paymentAccount") ACCEPT PAYMENT PLAN
    
    payment-accounts-dialog(:showDialog="showPaymentAccountDialog" :unbundle="programSelected ? programSelected.unbundle : false" @close="showPaymentAccountDialog = false" :accounts="paymentAccounts" @selected="setPaymentAccountSelected")

</template>
<script>
import VPaymentPlanCard from './VPaymentPlanCard.vue'
import VPaymentPlanDetails from './VPaymentPlanDetails.vue'
import VPaymentPlanCreditDetails from './VPaymentPlanCreditDetails.vue'
import PaymentAccountsDialog from '@/components/shared/payment/PaymentAccountsDialog.vue'
import Calculations from '@/helpers/calculations'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: { VPaymentPlanCard, VPaymentPlanDetails, VPaymentPlanCreditDetails, PaymentAccountsDialog },
  data () {
    return {
      description: 'If you need a custom payment plan, please email support@getpaidup.com or call (855) 764-3232',
      showPaymentAccountDialog: false
    }
  },
  mounted () {
    if (this.paymentAccounts && this.paymentAccounts.length > 0) {
      this.setPaymentAccountSelected(this.paymentAccounts[0])
    }
  },
  computed: {
    ...mapState('paymentModule', {
      programSelected: 'programSelected',
      paymentAccountSelected: 'paymentAccountSelected',
      paymentPlanSelected: 'paymentPlanSelected',
      dues: 'dues',
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
      return this.paymentAccountSelected ? 'Click to Select Payment Account' : 'Click to Add New Payment Account'
    },
    paymentAccountDesc () {
      return this.paymentAccountSelected ? `${this.paymentAccountSelected.brand || this.paymentAccountSelected.bank_name}••••${this.paymentAccountSelected.last4}` : ''
    }
  },
  watch: {
    paymentAccounts () {
      if (this.paymentAccounts && this.paymentAccounts.length > 0) {
        this.setPaymentAccountSelected(this.paymentAccounts[0])
      }
    },
    programSelected () {
      this.description = 'If you need a custom payment plan, please email support@getpaidup.com or call (855) 764-3232'
      this.setPaymentPlanSelected(null)
      this.setDues({})
    },
    paymentAccountSelected () {
      this.calculatePlan()
    },
    paymentPlanSelected () {
      this.calculatePlan()
    }
  },
  methods: {
    ...mapActions('messageModule', {
      setWarning: 'setWarning'
    }),
    ...mapMutations('paymentModule', {
      setPaymentAccountSelected: 'setPaymentAccountSelected',
      setPaymentPlanSelected: 'setPaymentPlanSelected',
      setDues: 'setDues'
    }),
    // selectAccount (account) {
    //   this.setPaymentAccountSelected(account)
    //   this.calculatePlan()
    // },
    // select (param) {
    //   this.setPaymentPlanSelected(param)
    //   this.calculatePlan()
    // },
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
      this.setDues(newDues)
      this.paymentPlanSelected.dues = dues.filter(due => {
        return typeof due.account === 'object'
      })
    },
    calculatePlan () {
      this.setDues({})
      if (!this.paymentPlanSelected) {
        this.description = 'If you need a custom payment plan, please email support@getpaidup.com or call (855) 764-3232'
      } else {
        this.description = this.paymentPlanSelected.description
        this.paymentPlanSelected.dues.forEach(due => {
          due.account = this.paymentAccountSelected
          due.type = 'invoice'
        })
        let items = this.paymentPlanSelected.dues.concat(this.paymentPlanSelected.credits)
        items.sort((itemA, itemB) => {
          itemA.dateCharge = typeof itemA.dateCharge === 'string' ? new Date(itemA.dateCharge) : itemA.dateCharge
          itemB.dateCharge = typeof itemB.dateCharge === 'string' ? new Date(itemB.dateCharge) : itemB.dateCharge
          return itemA.dateCharge.getTime() - itemB.dateCharge.getTime()
        })
        let resp = {}
        items.forEach(due => {
          let cloneDue = Object.assign({}, due)
          cloneDue.baseAmount = cloneDue.baseAmount || cloneDue.amount
          if (this.programSelected.unbundle && cloneDue.account && cloneDue.type === 'invoice') {
            let calculation = Calculations.exec(this.programSelected, cloneDue.account.object, cloneDue.baseAmount)
            cloneDue.amount = calculation.price
          }

          resp[due._id] = cloneDue
        })
        this.setDues(resp)
      }
    }
  }
}
</script>

