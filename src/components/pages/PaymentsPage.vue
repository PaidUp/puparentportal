<template>
  <div class="common-page payments-page">
    <div class="title">
      Make/Schedule Payment for {{ playerSelected ? playerSelected.firstName : '' }}
    </div>
    <br/>
    <md-steppers md-vertical md-linear md-dynamic-height :md-active-step.sync="active">
      <md-step id="step2" md-label="Program" :md-description="programDescription" :md-done.sync="step2">
        <v-programs @next="step2Next"/>
      </md-step>
      
      <md-step id="step4" md-label="Payment Plan" :md-description="planDescription" :md-done.sync="step4">
        <v-payment-plans :program="programSelected" @selectAccount="setPaymentAccount" @select="setPaymentPlan" />
        <v-review-approve :processing="processing" @select="approve" />
      </md-step>
      <!-- v-payment-accounts step-id="step3" :step="step3" @select="setPaymentAccount" / -->
      <!-- v-payment-plans step-id="step4" :program="programSelected" :step="step4" @selectAccount="setPaymentAccount" @select="setPaymentPlan" / -->
      <!-- <v-additional-info v-if="false" step-id="step5" :step="step5" @select="setCustomInfo" /> -->
      <!-- <v-document-signature v-if="false" step-id="step6" :step="step6" @select="setSignature" /> -->
      <!-- v-review-approve step-id="step7" :processing="processing" :step="step7" :plan="paymentPlanSelected" @select="approve" / -->
    </md-steppers>
    <v-pay-animation :animate="processing" @finish="redirect" />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
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
        processing: false,
        preventExit: false,
        confirmMessage: 'STOP!!! You have not finished setting up your payments. Please scroll down, check all the boxes and click on AUTHORIZE PAYMENTS.'
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.preventExit) {
        const answer = window.confirm(this.confirmMessage)
        this.setPrc(!answer)
        if (answer) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    },
    beforeRouteUpdate (to, from, next) {
      if (this.preventExit) {
        const answer = window.confirm(this.confirmMessage)
        this.setPrc(!answer)
        if (answer) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    },
    mounted () {
      if (this.user) {
        this.getBeneficiary(this.$route.params.id).then(ps => {
          Promise.all([
            this.getOrganization({id: ps.organizationId}),
            this.getPreorders({beneficiaryId: this.$route.params.id, userEmail: this.user.email}),
            this.getProducts(ps.organizationId)
          ]).then(values => {
            this.setPlayerSelected(ps)
          })
        })
      }
    },
    beforeDestroy () {
      this.clean()
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      ...mapState('paymentModule', {
        playerSelected: 'playerSelected',
        programSelected: 'programSelected',
        paymentPlanSelected: 'paymentPlanSelected'
      }),
      ...mapState('playerModule', {
        beneficiaries: 'beneficiaries',
        allPreorders: 'allPreorders'
      }),
      programDescription () {
        return this.programSelected.name || 'Click on your program below or search to filter the list.'
      },
      planDescription () {
        return this.paymentPlanSelected ? this.paymentPlanSelected.description : 'Review & Approve'
      }
    },
    watch: {
      preventExit () {
        this.setPrc(this.preventExit)
      }
    },
    methods: {
      ...mapMutations('uiModule', {
        setPrc: 'setPrc'
      }),
      ...mapMutations('paymentModule', {
        clean: 'clean',
        setPlayerSelected: 'setPlayerSelected'
      }),
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
        getPreorders: 'getPreorders',
        getBeneficiaries: 'getBeneficiaries',
        getBeneficiary: 'getBeneficiary',
        getOrganization: 'getOrganization'
      }),
      step2Next () {
        if (this.programSelected._id) {
          this.preventExit = true
          this.getPlans(this.programSelected._id)
          this.step2 = true
          this.active = 'step4'
        } else {
          this.preventExit = false
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
          // this.active = 'step7'
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
        this.checkout().then(res => {
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
        this.preventExit = false
        this.setPrc(false)
        this.$router.push({
          name: 'history',
          params: { id: this.playerSelected._id }
        })
      }
    }
  }
</script>
