<template>
  <div class="common-page payments-page">
    <div class="title">
      Make/Schedule Payment for {{ playerSelected ? playerSelected.firstName : '' }}
    </div>
    <md-steppers md-vertical md-linear md-dynamic-height :md-active-step.sync="active">
      <v-programs step-id="step2" :step="step2" :player="playerSelected" @select="setProgram" />
      <!-- v-payment-accounts step-id="step3" :step="step3" @select="setPaymentAccount" / -->
      <v-payment-plans step-id="step4" :program="programSelected" :step="step4" @selectAccount="setPaymentAccount" @select="setPaymentPlan" />
      <v-additional-info v-if="false" step-id="step5" :step="step5" @select="setCustomInfo" />
      <v-document-signature v-if="false" step-id="step6" :step="step6" @select="setSignature" />
      <v-review-approve step-id="step7" :processing="processing" :step="step7" :plan="paymentPlanSelected" @select="approve" />
    </md-steppers>
    <v-pay-animation :animate="processing" @finish="redirect" />
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
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'

  export default {
    components: { VPlayers, VPrograms, VPaymentAccounts, VPaymentPlans, VAdditionalInfo, VDocumentSignature, VReviewApprove, VPayAnimation },
    data: function () {
      return {
        animation: false,
        active: 'step2',
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
        step7: false,
        playerSelected: null,
        processing: false,
        programSelected: null,
        paymentPlanSelected: null
      }
    },
    mounted () {
      if (this.user) {
        this.load()
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      ...mapState('playerModule', {
        beneficiaries: 'beneficiaries',
        allPreorders: 'allPreorders'
      })
    },
    watch: {
      user () {
        // this.load()
      },
      programSelected () {
        this.paymentPlanSelected = null
      }
    },
    methods: {
      ...mapActions('paymentModule', {
        getPlans: 'getPlans',
        getProducts: 'getProducts',
        checkout: 'checkout',
        inactivePreorder: 'inactivePreorder'
      }),
      ...mapActions('messageModule', {
        setWarning: 'setWarning',
        setSuccess: 'setSuccess'
      }),
      ...mapActions('playerModule', {
        getPreorders: 'getPreorders',
        getBeneficiaries: 'getBeneficiaries',
        getBeneficiary: 'getBeneficiary',
        getOrganization: 'getOrganization'
      }),
      load () {
        this.getBeneficiary(this.$route.params.id).then(ps => {
          Promise.all([
            this.getOrganization({id: ps.organizationId}),
            this.getPreorders({beneficiaryId: this.$route.params.id, userEmail: this.user.email}),
            this.getProducts(ps.organizationId)
          ]).then(values => {
            this.playerSelected = ps
          })
        })
      },
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
          this.active = 'step4'
        } else {
          this.step2 = false
          this.active = 'step2'
        }
      },
      setPaymentAccount (paymetAccount) {
        this.paymentAccountSelected = paymetAccount
        // if (paymetAccount) {
        //   this.step3 = true
        //   this.active = 'step4'
        // }
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
      updateDues (dues) {
        this.paymentPlanSelected = dues
      },
      approve (status) {
        if (!status) return
        this.processing = true
        this.checkout({
          playerSelected: this.playerSelected,
          programSelected: this.programSelected,
          paymentPlanSelected: this.paymentPlanSelected,
          user: this.user
        }).then(res => {
          this.getBeneficiaries(this.user.email).then(res => {
            this.setSuccess('component.payment.done')
            this.processing = false
          })
        }).catch(reason => {
          console.log('reason: ', reason)
          this.setWarning('common.error')
          this.processing = false
        })
      },
      redirect () {
        this.$router.push({
          name: 'history',
          params: { id: this.playerSelected._id }
        })
      }
    }
  }
</script>
