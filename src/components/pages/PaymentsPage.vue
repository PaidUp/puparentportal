<template>
  <div class="common-page payments-page">
    <div class="title">
      Make/Schedule Payment for {{ playerSelected ? playerSelected.firstName : '' }}
    </div>
    <md-steppers md-vertical md-linear md-dynamic-height :md-active-step.sync="active">
      <v-programs step-id="step2" :step="step2" :player="playerSelected" @select="setProgram" />
      <v-payment-accounts step-id="step3" :step="step3" @select="setPaymentAccount" />
      <v-payment-plans step-id="step4" :step="step4" @select="setPaymentPlan" :account="paymentAccountSelected" />
      <v-additional-info step-id="step5" :step="step5" @select="setCustomInfo" />
      <v-document-signature step-id="step6" :step="step6" @select="setSignature" />
      <v-review-approve step-id="step7" :processing="processing" :step="step7" :account="paymentAccountSelected" :plan="paymentPlanSelected" @select="approve" />
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
        active: 'step2',
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
        step7: false,
        processing: false,
        programSelected: null,
        paymentAccountSelected: null,
        paymentPlanSelected: null
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      ...mapState('playerModule', {
        beneficiaries: 'beneficiaries',
        allPreorders: 'allPreorders'
      }),
      playerSelected () {
        let ps
        if (this.beneficiaries) {
          this.beneficiaries.forEach(beneficiary => {
            if (beneficiary._id === this.$route.params.id) {
              ps = beneficiary
              this.getPreorders(this.$route.params.id)
              this.getProducts(ps.organizationId)
            }
          })
        }
        return ps
      },
      preorders () {
        // dfs
      }
    },
    methods: {
      ...mapActions('paymentModule', {
        getPlans: 'getPlans',
        getProducts: 'getProducts',
        checkout: 'checkout'
      }),
      ...mapActions('messageModule', {
        setWarning: 'setWarning',
        setSuccess: 'setSuccess'
      }),
      ...mapActions('playerModule', {
        getPreorders: 'getPreorders'
      }),
      setPlayer (player) {
        this.playerSelected = player
        if (player) {
          this.step1 = true
          this.active = 'step2'
        }
      },
      setProgram (program) {
        this.programSelected = program
        if (program._id) {
          this.getPlans(this.programSelected._id)
          this.step2 = true
          this.active = 'step3'
        } else {
          this.step2 = false
          this.active = 'step2'
          this.step3 = false
          this.step4 = false
          this.step5 = false
          this.step6 = false
          this.step7 = false
          this.programSelected = null
          this.paymentAccountSelected = null
          this.paymentPlanSelected = null
        }
      },
      setPaymentAccount (paymetAccount) {
        this.paymentAccountSelected = paymetAccount
        if (paymetAccount) {
          this.step3 = true
          this.active = 'step4'
        }
      },
      setPaymentPlan (paymentPlan) {
        this.paymentPlanSelected = paymentPlan
        if (paymentPlan) {
          this.step4 = true
          this.step5 = true
          this.step6 = true
          this.active = 'step7'
        }
      },
      setCustomInfo (setCustomInfo) {
        console.log('setCustomInfo: ', setCustomInfo)
        this.setDone('step5', 'step6')
      },
      setSignature (signature) {
        console.log('setCustomInfo: ', signature)
        this.setDone('step6', 'step7')
      },
      approve (status) {
        if (!status) return
        this.processing = true
        this.checkout({
          playerSelected: this.playerSelected,
          programSelected: this.programSelected,
          paymentAccountSelected: this.paymentAccountSelected,
          paymentPlanSelected: this.paymentPlanSelected
        }).then(res => {
          this.setSuccess('component.payment.done')
          this.$router.push({
            name: 'history',
            params: { id: this.playerSelected._id }
          })
        }).catch(reason => {
          this.setWarning('common.error')
          this.processing = false
        })
      }
    }
  }
</script>
