<template>
  <div>
    <div>{{ $t('component.main.welcome') }}</div>
    <AddCardDialog :showDialog="showAddCardDialog" :closeDialog="closeDialog" />
    <md-button class="md-accent md-raised lblue" @click="openCardDialog()">ADD CARD DIALOG</md-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddCardDialog from '@/components/shared/AddCardDialog.vue'

export default {
  components: {
    AddCardDialog
  },
  data: function () {
    return {
      showAddCardDialog: false
    }
  },
  methods: {
    closeDialog () {
      this.showAddCardDialog = false
    },
    openCardDialog () {
      this.showAddCardDialog = true
    }
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    })
  }
}
</script>

