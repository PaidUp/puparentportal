<template>
  <div class="cards-layout">
    <v-parent-card  :parent="parent" v-for="parent in parents" :key="parent._id"></v-parent-card>
    <div class="md-card-add-circle">
      <md-button class="md-fab lblue">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  </div>
</template>
<script>
import VParentCard from './VParentCard'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { VParentCard },
  data () {
    return {
      parents: {}
    }
  },
  async mounted () {
    if (this.playerSelectedObj) {
      this.parents = await this.getParentsByEmails(this.playerSelectedObj.assigneesEmail)
    }
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

