<template>
  <div class="assign-plan-page md-elevation-4">
    <div class="md-title">
      Assign Payment Plan to Parent
    </div>

    <md-steppers md-vertical md-linear md-dynamic-height :md-active-step.sync="active">
      <md-step id="step1" md-label="Choose Player" :md-editable="false" :md-done.sync="step1" md-description="Choose for a player to assign plan to parent">
        <div class="step-box">
          <md-field>
            <label>Player Name</label>
            <md-input></md-input>
          </md-field>
          <div class="cards-layout">
            <md-card md-with-hover class="card-person">
              <md-avatar class="md-large">
                <img src="@/assets/avatar.jpg" alt="avatar">
              </md-avatar>
              <div class="name">Felipe Fernandez</div>
              <div class="title-info">Isotopes Club</div>
            </md-card>
            <md-card md-with-hover class="card-person">
              <md-icon class="md-size-3x">account_circle</md-icon>
              <div class="name">Felipe Fernandez</div>
              <div class="title-info">Red Bull Team</div>
            </md-card>
          </div>
        </div>
        <md-button class="md-accent lblue" to="/chapclubprograms">CANCEL</md-button>
        <md-button class="md-raised md-accent lblue" @click="setDone('step1', 'step2')">NEXT</md-button>
      </md-step>
      <md-step id="step2" md-label="Choose Parent" :md-editable="false" :md-done.sync="step2" md-description="Choose parent or enter Parent email to assign to this plan">
        <div class="step-box">
          <div class="cards-layout">
            <md-card md-with-hover class="card-person">
              <md-icon class="md-size-3x">account_circle</md-icon>
              <div class="name">Felipe Fernandez</div>
              <div class="title-info">felipe@gmail.com</div>
              <div class="title-info">(512) 555-1234</div>
            </md-card>
          </div>
          <md-field>
            <label>New Parent Email</label>
            <md-input></md-input>
          </md-field>

        </div>
        <md-button class="md-accent lblue" to="/chapclubprograms">CANCEL</md-button>
        <md-button class="md-raised md-accent lblue" @click="setDone('step2')">ASSIGN PAYMENT PLAN</md-button>
      </md-step>
    </md-steppers>
  </div>

</template>

<script>
  export default {
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
        // next step
        if (index) {
          this.active = index
        }
      }
    }
  }
</script>
