<template>
  <div class="payments-page md-elevation-4">
    <div class="md-title">
      Make/Schedule Payment
    </div>
    <md-steppers md-vertical md-dynamic-height md-linear :md-active-step.sync="active">
      <md-step id="step1" md-label="Player" md-description="Choose a player or add a new one" :md-done.sync="step1">
        <div class="players">
          <div class="player md-elevation-2" @click="setDone('step1', 'step2')">
            <md-avatar class="md-elevation-4">
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="name md-body-2">Enzo Fernandez</div>
            <div class="team md-caption">Isotopes Baseball Club</div>
          </div>
          <div class="player md-elevation-2" @click="setDone('step1', 'step2')">
            <md-avatar class="md-elevation-4">
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="name md-body-2">Enzo Fernandez</div>
            <div class="team md-caption">Isotopes Baseball Club</div>
          </div>
          <div class="player md-elevation-2" @click="setDone('step1', 'step2')">
            <md-avatar class="md-elevation-4">
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="name md-body-2">Enzo Fernandez</div>
            <div class="team md-caption">Isotopes Baseball Club</div>
          </div>
        </div>
        <md-button class="lblue md-accent md-raised">ADD NEW PLAYER</md-button>
        <md-button class="lblue md-accent">CANCEL</md-button>
      </md-step>

      <md-step id="step2" md-label="Program" :md-done.sync="step2">
        <div class="programs">
          <div class="program md-elevation-2 md-body-2" @click="setDone('step2', 'step3')">12U Red Premier</div>
          <div class="program md-elevation-2 md-body-2" @click="setDone('step2', 'step3')">13U Redgional</div>
          <div class="program md-elevation-2 md-body-2" @click="setDone('step2', 'step3')">16U Elite</div>
          <div class="program md-elevation-2 md-body-2" @click="setDone('step2', 'step3')">Summer Clinics sessions</div>
        </div>
        <div class="step-actions">
          <md-button class="lblue md-accent">CANCEL</md-button>
        </div>
      </md-step>

      <md-step id="step3" md-label="Payment Account" :md-done.sync="step3">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed,
          temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
      </md-step>
      <md-step id="step4" md-label="Payment Plan">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed,
          temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
      </md-step>
      <md-step id="step5" md-label="Additional Info">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed,
          temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
      </md-step>
      <md-step id="step6" md-label="Document Signature">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed,
          temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
      </md-step>
      <md-step id="step7" md-label="Review &amp; Approve">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed,
          temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    components: {},
    data: function () {
      return {
        active: 'step1',
        step1: false,
        step2: false,
        step3: false
      }
    },
    methods: {
      setDone (id, index) {
        this[ id ] = true
        if (index) {
          this.active = index
        }
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    }
  }
</script>
