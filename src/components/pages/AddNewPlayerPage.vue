<template>
  <div class="add-new-player-page md-elevation-4">
    <div class="md-title">
      Add New Player
    </div>
    <md-steppers md-vertical md-linear md-dynamic-height :md-active-step.sync="active">
      <md-step id="step1" md-label="Player Info" :md-description="nameSelected">
        <div class="step-box">
          <div class="update-pic">
            <md-icon class="md-size-3x md-primary">account_circle</md-icon>
            <div>
              <md-button class="clblue bold">UPDATE PROFILE PICTURE</md-button>
            </div>
          </div>
          <div class="names-box">
            <md-field>
              <label>First Name</label>
              <md-input></md-input>
            </md-field>
            <md-field>
              <label>Last Name</label>
              <md-input></md-input>
            </md-field>
          </div>
          <md-button class="lblue md-accent md-raised" @click="setDone('step1', 'step2')">NEXT</md-button>
          <md-button class="lblue md-accent" @click="setDone('step1', 'step2')">CANCEL</md-button>
        </div>
      </md-step>
      <md-step id="step2" md-label="Second Step" md-description="Start typing below to search and choose your club">
        <md-field class="club-search-field">
          <label>Club</label>
          <md-input></md-input>
        </md-field>
        <div class="clubs">
          <div class="club md-elevation-2">
            <img src="@/assets/ntxbanditos.png" alt="club">
            <div class="title cblue bold">Isotopes Volleyball Club</div>
            <div class="location">Springfield, MA</div>
          </div>
          <div class="club md-elevation-2 selected">
            <img src="@/assets/ntxbanditos.png" alt="club">
            <div class="title cblue bold">Isotopes Volleyball Club</div>
            <div class="location">Springfield, MA</div>
          </div>
          <div class="club md-elevation-2">
            <img src="@/assets/ntxbanditos.png" alt="club">
            <div class="title cblue bold">Isotopes Volleyball Club</div>
            <div class="location">Springfield, MA</div>
          </div>
          <div class="club md-elevation-2">
            <img src="@/assets/ntxbanditos.png" alt="club">
            <div class="title cblue bold">Isotopes Volleyball Club</div>
            <div class="location">Springfield, MA</div>
          </div>
        </div>
        <md-button class="lblue md-accent md-raised" to="/players/99">ADD PLAYER</md-button>
        <md-button class="lblue md-accent" @click="setDone('step2')">CANCEL</md-button>
      </md-step>

    </md-steppers>
  </div>
</template>

<script>
  export default {
    components: {},
    data: function () {
      return {
        active: 'step1',
        step1: false,
        step2: false,
        nameSelected: ''
      }
    },
    methods: {
      setDone (id, index) {
        this[ id ] = true
        if (index) {
          this.active = index
        }
        this.nameSelected = 'Enzo Hernandez'
      }
    }
  }
</script>
