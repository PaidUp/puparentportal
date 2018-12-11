<template>
  <div>
    <div class="cards-layout">
      <v-parent-card @click="setParentSelected"  :parent="parent" v-for="parent in parents" :key="parent._id"></v-parent-card>
      <div class="md-card-add-circle">
        <md-button class="md-fab lblue" @click="showDialog = true">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </div>
    <v-add-parent-dialog :beneficiary-id="playerSelectedObj._id" :show-dialog="showDialog" @close="showDialog = false" @completed="reloadParents"></v-add-parent-dialog>
    <v-edit-parent-dialog :beneficiary-id="playerSelectedObj._id" :parent="parentSelected" :show-dialog="showDialogEdit" @close="closeDialogEdit" @completed="reloadParents"></v-edit-parent-dialog>
  </div>
</template>
<script>
import VParentCard from './VParentCard.vue'
import VAddParentDialog from './VAddParentDialog.vue'
import VEditParentDialog from './VEditParentDialog.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { VParentCard, VAddParentDialog, VEditParentDialog },
  data () {
    return {
      parents: {},
      parentSelected: null,
      showDialog: false,
      showDialogEdit: false
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
    closeDialogEdit () {
      this.showDialogEdit = false
      this.parentSelected = null
    },
    setParentSelected (parent) {
      this.showDialogEdit = true
      this.parentSelected = parent
    },
    reloadParents (usr) {
      this.playerSelectedObj.assigneesEmail.push(usr.email)
      this.getParentsByEmails(this.playerSelectedObj.assigneesEmail).then(parents => {
        this.parents = parents
      })
      this.showDialog = false
      this.showDialogEdit = false
      this.parentSelected = null
    }
  }
}
</script>

