<template lang="pug">
  md-step(:id="stepId" md-label="Player" md-description="Choose a player or add a new one" :md-done.sync="step")
    .players
      .player.md-elevation-2(@click="select(beneficiary)" v-for="beneficiary in beneficiaries" :key="beneficiary._id")
        md-avatar.md-elevation-4
          img(src="@/assets/avatar.jpg")
        .name.md-body-2 {{ beneficiary.firstName }} {{ beneficiary.firstLastName }}
        .team.md-caption {{ beneficiary.organizationName }}
    md-button.lblue.md-accent(@click="cancel") CANCEL
    md-button.lblue.md-accent.md-raised ADD NEW PLAYER
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    stepId: {
      type: String,
      required: true
    },
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
      this.$emit('select', param)
    },
    cancel () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
