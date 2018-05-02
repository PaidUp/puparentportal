<template>
  <div class="profile-page md-elevation-4">
    <div class="main-box">
      <div class="title bold">Profile</div>
      <div class="content-box">
        <div class="centered">
          <md-avatar class="md-avatar-icon md-large md-elevation-4">
            <img src="@/assets/avatar.jpg" />
          </md-avatar>
        </div>
        <md-button class="md-accent lblue update-btn">UPDATE PROFILE PICTURE</md-button>
        <div class="names-box">
          <md-field>
            <label>First Name</label>
            <md-input v-model="name" :disabled="!editing"></md-input>
          </md-field>
          <md-field>
            <label>Last Name</label>
            <md-input v-model="name" :disabled="!editing"></md-input>
          </md-field>
        </div>
        <md-field>
          <label>Email</label>
          <md-input v-model="name" :disabled="!editing"></md-input>
          <img class="fb-icon" src="@/assets/facebook.png" />
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="name" :disabled="!editing"></md-input>
        </md-field>
        <md-field v-if="editing">
          <label>Confirm Password</label>
          <md-input v-model="name" :disabled="!editing"></md-input>
        </md-field>
        <md-field>
          <label>Phone Number</label>
          <md-input v-model="name" :disabled="!editing"></md-input>
        </md-field>
        <div class="actions-box">
          <md-button class="md-accent lblue" @click="editFields" v-if="!editing">EDIT FIELDS</md-button>
          <md-button class="md-accent lblue" v-if="editing" @click="editing=false">CANCEL</md-button>
          <md-button class="md-accent lblue md-raised" @click="editing=false" v-if="editing">SAVE</md-button>
        </div>
        <div class="upgrade-box" v-if="!editing">
          Upgrade your account if your are a Club Director to receive payments from parents
          and access the Scoreboard (PaidUp approval required).
          <md-button to="/upgrade" class="md-accent md-raised lblue upgrade-btn">UPGRADE TO CLUB DIRECTOR ACCOUNT</md-button>
        </div>
      
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data: function () {
      return {
        name: 'Diego',
        editing: false
      }
    },
    methods: {
      editFields: function () {
        this.editing = true
      }
    }
  }
</script>
