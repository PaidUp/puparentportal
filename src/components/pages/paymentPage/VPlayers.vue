<template lang="pug">
  md-step(id="step1" md-label="Player" md-description="Choose a player or add a new one" :md-done.sync="step")
    .players
      .player.md-elevation-2(@click="select(beneficiary)" v-for="beneficiary in beneficiaries" :key="beneficiary._id")
        md-avatar.md-elevation-4
          img(src="@/assets/avatar.jpg")
        .name.md-body-2 {{ beneficiary.firstName }} {{ beneficiary.firstLastName }}
        .team.md-caption {{ beneficiary.organizationName }}
    md-button.lblue.md-accent.md-raised ADD NEW PLAYER
    md-button.lblue.md-accent CANCEL
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    step: Boolean
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('playerModule', {
      orders: 'orders',
      beneficiaries: 'beneficiaries'
    })
  },
  methods: {
    select (param) {
      console.log('param: ', param)
      this.$emit('select', param)
    }
  }
}
</script>
