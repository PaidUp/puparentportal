<template>
  <div class="payments-page md-elevation-4">
    <div class="md-title">
      Make/Schedule Payment
    </div>
    <md-steppers md-vertical md-linear md-dynamic-height :md-active-step.sync="active">

      <v-players :step="step1" @select="setPlayer" />
      <v-programs :player="playerSelected" :step="step2" @select="setProgram" />
      <v-payment-accounts :step="step3" @select="setPaymentAccount" />
      <v-payment-plans @select="setPaymentPlan" />
      <v-additional-info @select="setCustomInfo" />
      <v-document-signature @select="setSignature" />
      <v-review-approve @select="approve" />
     
    </md-steppers>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
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
        selectedDate: null,
        playerSelected: null
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
        } else {
          this.step1 = false
          this.active = 'step1'
        }
      }
    },
    methods: {
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
        console.log('program: ', program)
        this.setDone('step2', 'step3')
      },
      setPaymentAccount (paymetMethod) {
        console.log('paymetMethod: ', paymetMethod)
        this.setDone('step3', 'step4')
      },
      setPaymentPlan (paymentPlan) {
        console.log('paymentPlan: ', paymentPlan)
        this.setDone('step4', 'step5')
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
