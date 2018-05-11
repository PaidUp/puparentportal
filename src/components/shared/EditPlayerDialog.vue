<template>
  <md-dialog :md-active.sync="showDialog" class="edit-player-dialog" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Player Details</div>
    </div>
    <div class="common-player-info">
      <md-avatar class="md-large">
        <img src="@/assets/avatar.jpg" alt="avatar">
      </md-avatar>
      <div class="name">
        Isotopes Volleybal Club
      </div>
      <div class="team">
        Springfield, CA
      </div>
      <md-button class="md-accent lblue update-pic">UPDATE PROFILE PICTURE</md-button>
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
    <div class="actions">
      <md-button class="md-accent lblue delete-btn">DELETE</md-button>
      <div>
        <md-button class="md-accent lblue">CANCEL</md-button>
        <md-button class="md-accent lblue md-raised">SAVE</md-button>
      </div>
    </div>
  </md-dialog>
</template>

<script>
  export default {
    props: {
      showDialog: Boolean
    },
    data () {
      return {
        ttt: false
      }
    }
  }
</script>
