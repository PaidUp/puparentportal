<template>
  <div class="add-new-player-page md-elevation-4">
    <div class="md-title">
      Add New Player
    </div>
    <md-steppers md-vertical md-linear md-dynamic-height :md-active-step.sync="active">
      <md-step id="step1" md-label="Player Info" >
        <div class="step-box">
          <div class="update-pic">
            <md-icon class="md-size-3x md-primary">account_circle</md-icon>
            <div class="clblue bold">UPDATE PROFILE PICTURE</div>
          </div>
          <md-button @click="setDone('step1', 'step2')"></md-button>
        </div>
      </md-step>
      <md-step id="step2" md-label="Second Step" md-description="Optional">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
      </md-step>
     
    </md-steppers>
  </div>
</template>

<script>
  // import { mapState } from 'vuex'
  // import VPlayers from './paymentPage/VPlayers.vue'
  // import VPrograms from './paymentPage/VPrograms.vue'
  // import VPaymentAccounts from './paymentPage/VPaymentAccounts.vue'
  // import VPaymentPlans from './paymentPage/VPaymentPlans.vue'
  // import VAdditionalInfo from './paymentPage/VAdditionalInfo.vue'
  // import VDocumentSignature from './paymentPage/VDocumentSignature.vue'
  // import VReviewApprove from './paymentPage/VReviewApprove.vue'

  export default {
    components: { },
    data: function () {
      return {
        active: 'step1',
        step1: false,
        step2: false
      }
    },
    methods: {
      setDone (id, index) {
        this[id] = true

        this.secondStepError = null

        if (index) {
          this.active = index
        }
      }
    }
  }
</script>
