<template>
  <div>
    <div class="cards-layout">
      <v-parent-card  :parent="parent" v-for="parent in parents" :key="parent._id"></v-parent-card>
      <div class="md-card-add-circle">
        <md-button class="md-fab lblue" @click="showDialog = true">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </div>
    <v-edit-parent-dialog :beneficiary-id="playerSelectedObj._id" :parent="parentSelected" :show-dialog="showDialog" @close="showDialog = false" @completed="reloadParents"></v-edit-parent-dialog>
  </div>
</template>
<script>
import VParentCard from './VParentCard.vue'
import VEditParentDialog from './VEditParentDialog.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { VParentCard, VEditParentDialog },
  data () {
    return {
      parents: {},
      parentSelected: null,
      showDialog: false
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
    }),
    reloadParents (usr) {
      this.playerSelectedObj.assigneesEmail.push(usr.email)
      this.getParentsByEmails(this.playerSelectedObj.assigneesEmail).then(parents => {
        this.parents = parents
      })
      this.showDialog = false
    }
  }
}
</script>

