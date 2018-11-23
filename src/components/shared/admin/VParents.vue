<template>
  <div class="cards-layout">
    <md-card class="card-person">
      <md-avatar class="md-large">
        <img src="@/assets/avatar.jpg" alt="avatar">
      </md-avatar>
      <div class="name">Felipe Fernandez</div>
      <div class="title-info">Isotopes Club</div>
      <div class="title-info">(512) 234-1233</div>
    </md-card>

    <div class="md-card-add-circle">
      <md-button class="md-fab lblue">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      parents: {}
    }
  },
  mounted () {
    this.getParentsByEmails(this.playerSelectedObj.assigneesEmail).then(parents => {
      this.parents = parents
    })
  },
  computed: {
    ...mapGetters('clubprogramsModule', {
      playerSelectedObj: 'playerSelectedObj'
    })
  },
  watch: {
    async playerSelectedObj () {
      this.parents = await this.getParentsByEmails(this.playerSelectedObj.assigneesEmail)
    }
  },
  methods: {
    ...mapActions('userModule', {
      getParentsByEmails: 'getParentsByEmails'
    })
  }
}
</script>

