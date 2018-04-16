<template>
  <div class="payments-page md-elevation-4">
    <div class="md-title">
      Make/Schedule Payment
    </div>
    <md-steppers md-vertical md-linear md-dynamic-height :md-active-step.sync="active">

      <v-players :step="step1" @select="setPlayer" />
      <v-programs :step="step2" :player="playerSelected" @select="setProgram" />
      <v-payment-accounts :step="step3" @select="setPaymentAccount" />
      <v-payment-plans :step="step4" @select="setPaymentPlan" :account="paymentAccountSelected" />
      <v-additional-info :step="step5" @select="setCustomInfo" />
      <v-document-signature :step="step6" @select="setSignature" />
      <v-review-approve :step="step7" :account="paymentAccountSelected" :plan="paymentPlanSelected" @select="approve" />
     
    </md-steppers>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import VPlayers from './paymentPage/VPlayers.vue'
  import VPrograms from './paymentPage/VPrograms.vue'
  import VPaymentAccounts from './paymentPage/VPaymentAccounts.vue'
  import VPaymentPlans from './paymentPage/VPaymentPlans.vue'
  import VAdditionalInfo from './paymentPage/VAdditionalInfo.vue'
  import VDocumentSignature from './paymentPage/VDocumentSignature.vue'
  import VReviewApprove from './paymentPage/VReviewApprove.vue'

  export default {
    components: { VPlayers, VPrograms, VPaymentAccounts, VPaymentPlans, VAdditionalInfo, VDocumentSignature, VReviewApprove },
    data: function () {
      return {
        active: 'step1',
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
        step7: false,
        selectedDate: null,
        playerSelected: null,
        programSelected: null,
        paymentAccountSelected: null,
        paymentPlanSelected: null
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    },
    watch: {
      playerSelected () {
        if (this.playerSelected) {
          this.step1 = true
          this.active = 'step2'
        }
      },
      programSelected () {
        if (this.programSelected) {
          this.getPlans(this.programSelected._id)
          this.step2 = true
          this.active = 'step3'
        }
      },
      paymentAccountSelected () {
        if (this.paymentAccountSelected) {
          this.step3 = true
          this.active = 'step4'
        }
      },
      paymentPlanSelected () {
        if (this.paymentPlanSelected) {
          this.step7 = true
          this.active = 'step7'
        }
      }
    },
    methods: {
      ...mapActions('paymentModule', {
        getPlans: 'getPlans'
      }),
      setDone (id, index) {
        this[ id ] = true
        if (index) {
          this.active = index
        }
      },
      setPlayer (player) {
        this.playerSelected = player
      },
      setProgram (program) {
        this.programSelected = program
      },
      setPaymentAccount (paymetAccount) {
        this.paymentAccountSelected = paymetAccount
      },
      setPaymentPlan (paymentPlan) {
        this.paymentPlanSelected = paymentPlan
      },
      setCustomInfo (setCustomInfo) {
        console.log('setCustomInfo: ', setCustomInfo)
        this.setDone('step5', 'step6')
      },
      setSignature (signature) {
        console.log('setCustomInfo: ', signature)
        this.setDone('step6', 'step7')
      },
      approve (signature) {
        console.log('aprove: ')
      }
    }
  }
</script>
